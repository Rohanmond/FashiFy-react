import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useData } from '../../contexts';
import { ActionType, ToastType } from '../../DataReducer/constants';
import { DeleteCart } from '../../Services/services';
import { ToastHandler } from '../../utils/utils';
import { AddressForm } from '../Profile/components/Addresses/components/AddressForm/AddressForm';
import './Checkout.css';
export const Checkout = () => {
  const { state, dispatch } = useData();
  const { currUser, token } = useAuth();
  const navigate = useNavigate();
  const [addAddress, setAddAddress] = useState(false);
  const [address, setAddress] = useState(null);
  const { name, email } = currUser;

  const [responseSummary, setResponseSummary] = useState({
    msg: false,
    id: null,
  });
  console.log(responseSummary);
  useEffect(() => {
    let id = null;
    if (responseSummary.msg) {
      dispatch({
        type: ActionType.ADD_ORDER,
        payload: {
          order: {
            id: responseSummary.id,
            cart: responseSummary.cart,
            address: address,
            amount: state.cartPriceDetails,
          },
        },
      });
      id = setTimeout(() => {
        dispatch({
          type: ActionType.ResetCartPriceDetails,
        });
        navigate('/profile/orders');
      }, 3000);
    }
  }, [responseSummary]);

  useEffect(() => {
    if (Object.keys(state.cartPriceDetails).length === 0) navigate('/products');
  }, []);
  const calculateDiscount = (price) => {
    const discount = {
      500: 50,
      1000: 100,
      2000: 300,
      3000: 400,
      5000: 500,
      10000: 750,
      15000: 1000,
    };
    let discountRes = 0;
    if (!price) return 0;
    Object.keys(discount).forEach((el) => {
      if (price >= Number(el)) discountRes = discount[el];
    });
    return discountRes;
  };
  const qty = state.cartPriceDetails?.qty;
  const price = state.cartPriceDetails?.price;
  const discount = calculateDiscount(price);
  const totalPrice = price - discount - 100;

  const clearCart = async (el, token) => {
    try {
      const res = await DeleteCart({ productId: el._id, encodedToken: token });
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  const clearCarts = () => {
    let err = null;
    console.log(state);
    state.cartlist.forEach((el) => {
      err = clearCart(el, token);
    });

    dispatch({
      type: ActionType.ClearCart,
    });
  };
  const razorpayHandler = () => {
    address
      ? displayRazorpay()
      : ToastHandler(ToastType.Info, 'Please select address');
  };
  const loadScript = async (url) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = url;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );

    if (!res) {
      toast.error('Razorpay SDK failed to load, check you connection');
      return;
    }

    const options = {
      key: 'rzp_test_SR2urKhQGjFxHb',
      amount: totalPrice * 100,
      currency: 'INR',
      name: 'Fashify',
      description: 'Thank you for shopping with us',
      image:
        'https://res.cloudinary.com/donqbxlnc/image/upload/v1649318431/Fashify_Transparent_pr_2_qco1nk.png',
      handler: function (response) {
        console.log(response.razorpay_payment_id);
        setResponseSummary({
          msg: true,
          cart: state.cartlist,
          id: response.razorpay_payment_id,
        });
        clearCarts();
      },
      prefill: {
        name: name,
        email: email,
        contact: '9876543210',
      },
      theme: {
        color: '#2B51E1',
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      {responseSummary.msg && (
        <div className='checkout-msg font-wt-semibold'>
          Your order has succssfully placed
        </div>
      )}
      {!responseSummary.msg && (
        <div className='checkout-outer-container'>
          <div className='checkout-address-container'>
            <h3 className='text-align-center'>Address Details</h3>
            {state.addressList.map((el) => {
              return (
                <div className='checkout-address-box'>
                  <input
                    type='radio'
                    name='address-radio'
                    value={el}
                    onChange={() => setAddress(el)}
                    id={`address ${el.address}`}
                  />
                  <label
                    className='address-label'
                    htmlFor={`address ${el.address}`}
                  >
                    <h3>{el.name}</h3>
                    <p>{`${el.address} ${el.city} ${el.state} Pin:${el.pincode}`}</p>
                    <h4>{`Mobile:${el.mobile}`}</h4>
                  </label>
                </div>
              );
            })}
            <div
              onClick={() => setAddAddress(true)}
              className='checkout-controller-container'
            >
              <button className='btn btn-primary background-primary brd-rd-semi-sq'>
                <i className='fas fa-plus'></i>
              </button>
              <p className='text-lg'>Add new address</p>
            </div>
            {addAddress ? (
              <div className='add-address-outer-container'>
                <div className='add-address-container'>
                  <AddressForm
                    openAddressForm={addAddress}
                    setOpenAddressForm={setAddAddress}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className='checkout-box-container'>
            <div className='checkout-box'>
              <h3 className='text-align-center'>Price Details</h3>
              <hr className='hr' />
              <div className='checkout-price-details'>
                <div className='checkout-price-item'>
                  <p>
                    Price ({qty} {qty === 1 ? 'item' : 'items'})
                  </p>
                  <p>₹ {state.cartPriceDetails.price}</p>
                </div>
                <div className='checkout-price-item'>
                  <p>Discount</p>
                  <p>-₹ {discount}</p>
                </div>
                <div className='checkout-price-item'>
                  <p>Delivery charges</p>
                  <p>-₹ 100</p>
                </div>
                <hr className='hr' />
                <div className='checkout-price-item total-price'>
                  <p className='font-wt-bold'>Total Price</p>
                  <p className='font-wt-bold'>₹ {price - discount}</p>
                </div>
              </div>
              <div className='checkout-footer'>
                <button
                  onClick={razorpayHandler}
                  className='btn btn-primary background-primary'
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
