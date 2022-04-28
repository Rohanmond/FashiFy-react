import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useData } from '../../contexts';
import { ActionType, ToastType } from '../../DataReducer/constants';
import { useOutsideClickHandler } from '../../Hooks/outsideClickHandler';
import { DeleteCart } from '../../Services/services';
import { popper } from '../../utils/popper';
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
  const [coupon, setCoupon] = useState({ percentage: 0, name: '' });
  const [couponInput, setCouponInput] = useState('');
  const inputRef = useRef();
  const [finalPrice, setFinalPrice] = useState(0);
  const [couponModal, setCouponModal] = useState(false);
  const { resetMenu } = useOutsideClickHandler(inputRef);

  const [responseSummary, setResponseSummary] = useState({
    msg: false,
    id: null,
  });

  useEffect(() => {
    if (resetMenu) setCouponModal(false);
  }, [resetMenu]);

  useEffect(() => {
    let id = null;
    if (responseSummary.msg) {
      popper();
      dispatch({
        type: ActionType.ADD_ORDER,
        payload: {
          order: {
            id: responseSummary.id,
            cart: responseSummary.cart,
            address: address,
            amount: finalPrice,
            date: new Date(),
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

  const couponData = {
    FASH30: [30, 5000],
    FASH20: [20, 2500],
    FASH10: [10, 1500],
    FASH05: [5, 500],
  };
  const qty = state.cartPriceDetails?.qty;
  const price = state.cartPriceDetails?.price;
  const discount = calculateDiscount(price);
  let totalPrice = price - discount + 100;
  totalPrice = Number(
    ((totalPrice * (100 - coupon.percentage)) / 100).toFixed(0)
  );

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
    state.cartlist.forEach((el) => {
      err = clearCart(el, token);
    });

    dispatch({
      type: ActionType.ClearCart,
    });
  };
  const razorpayHandler = () => {
    setFinalPrice(totalPrice);
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
        <div className='checkout-msg font-wt-semibold text-align-center'>
          Your order has successfully placed
        </div>
      )}
      {!responseSummary.msg && (
        <div className='checkout-outer-container'>
          <div className='checkout-address-container'>
            <h3 className='text-align-center'>Address Details</h3>
            {state.addressList.map((el) => {
              return (
                <div
                  key={el.id}
                  className={`checkout-address-box ${
                    el.id === address?.id && 'checkout-address-box-active'
                  }`}
                >
                  <input
                    type='radio'
                    name='address-radio'
                    value={el}
                    onChange={() => setAddress(el)}
                    id={`address ${el.address}`}
                  />
                  <label
                    className='address-label cursor-pointer'
                    htmlFor={`address ${el.address}`}
                  >
                    <h3>{el.name}</h3>
                    <p>{`${el.address} ${el.city} ${el.state} Pin:${el.pincode}`}</p>
                    <p>
                      <span className='font-wt-semibold'>Mobile: </span>
                      {el.mobile}
                    </p>
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
              <p className='add-address-label'>Add new address</p>
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
              <div className='checkout-coupon-code'>
                <i className='fas fa-tag'></i>

                <div ref={inputRef} className='coupon-container'>
                  <input
                    type='text'
                    onClick={() => setCouponModal(true)}
                    className='coupon-field'
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder='coupon code'
                  />
                  <button
                    onClick={() => {
                      if (couponInput === '') {
                        ToastHandler(
                          ToastType.Error,
                          'Please enter the coupon'
                        );
                        return;
                      }
                      const couponObj = Object.keys(couponData).find(
                        (el) => el === couponInput.toUpperCase()
                      );

                      if (!couponObj) {
                        ToastHandler(ToastType.Warn, 'Coupon is not valid');
                        return;
                      }
                      if (totalPrice < couponData[couponObj][1]) {
                        ToastHandler(
                          ToastType.Warn,
                          `Your cart price should be more than ${couponData[couponObj][1]} to apply this coupon`
                        );
                        return;
                      }

                      setCoupon({
                        percentage: couponData[couponObj][0],
                        name: couponObj,
                      });
                      setCouponModal(false);
                    }}
                    className='btn btn-sm btn-primary background-primary'
                  >
                    Apply
                  </button>
                  {couponModal ? (
                    <div className='coupon-details-container'>
                      {Object.keys(couponData).map((el) => {
                        return (
                          <div
                            key={el}
                            onClick={() => {
                              if (totalPrice >= couponData[el][1]) {
                                setCoupon({
                                  percentage: couponData[el][0],
                                  name: el,
                                });
                                setCouponModal(false);
                              } else
                                ToastHandler(
                                  ToastType.Info,
                                  `Total price should be more than ${couponData[el][1]} rs.`
                                );
                            }}
                            title={`${
                              totalPrice < couponData[el][1]
                                ? `Shop more than ${couponData[el][1]} rs`
                                : ''
                            }`}
                            className={`${
                              totalPrice < couponData[el][1]
                                ? 'coupon-item-disabled'
                                : 'coupon-item'
                            }`}
                          >
                            <p className='font-wt-semibold'>
                              {couponData[el][0]}% Off
                            </p>
                            <p className='coupon-text-design'>{el}</p>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </div>
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
                {coupon.percentage > 0 ? (
                  <div className='checkout-price-item color-warn font-wt-semibold'>
                    <p>{coupon.name} coupon applied successfully</p>
                    <p
                      className='cursor-pointer'
                      onClick={() => setCoupon({ percentage: 0, name: '' })}
                    >
                      <i className='fas fa-times'></i>
                    </p>
                  </div>
                ) : null}
                <div className='checkout-price-item'>
                  <p>Delivery charges</p>
                  <p>₹ 100</p>
                </div>
                <hr className='hr' />
                <div className='checkout-price-item total-price'>
                  <p className='font-wt-bold'>Total Price</p>
                  <p className='font-wt-bold'>₹ {totalPrice}</p>
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
