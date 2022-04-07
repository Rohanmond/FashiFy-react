import { useNavigate } from 'react-router-dom';
import { useData } from '../../contexts';
import { ActionType } from '../../DataReducer/constants';
import './CartList.css';
import CartCard from './components/CartCard/CartCard';
export const CartList = () => {
  const { state, dispatch } = useData();
  const cartData = state.products.filter((el) => el.carted);
  const navigate = useNavigate();

  const checkoutHandler = () => {
    const totalQty = cartData.reduce((acc, curr) => {
      return acc + curr.qty;
    }, 0);
    const totalPrice = cartData.reduce((acc, curr) => {
      return acc + Number(curr.price) * curr.qty;
    }, 0);
    dispatch({
      type: ActionType.SetCartPriceDetails,
      payload: { cartPriceDetails: { price: totalPrice, qty: totalQty } },
    });
    navigate('/checkout');
  };
  return (
    <main className='cart_mngmt-main'>
      <div className='cart_mngmt-main-heading text-align-center'>
        {cartData.length > 0 && (
          <h4>
            MY CART(
            {cartData.length})
          </h4>
        )}
      </div>
      {cartData.length === 0 && <h4>Your cart is empty</h4>}
      <div className='cart_mngmt-content'>
        <div className='cart_mngmt-carts'>
          {cartData.map((el) => {
            return <CartCard el={el} key={el.id} />;
          })}
        </div>

        {cartData.length !== 0 && (
          <div className='cart_mngmt-price-details'>
            <div className='card-container cart_mngmt-price-card brd-rd-semi-sq'>
              <div className='mngmt_cart-price-header'>
                <p className='font-wt-bold'>CART PRICE DETAILS</p>
              </div>
              <hr className='hr' />
              {cartData.map((el) => {
                const { _id, title, qty, price } = el;
                return (
                  <div className='mngmt_cart-price-item' key={_id}>
                    <p>
                      {title} ({qty})
                    </p>

                    <p>{`₹ ${price * qty}`}</p>
                  </div>
                );
              })}

              <div className='mngmt_cart-price-item'>
                <p className='font-wt-bold'>Total price:</p>
                <p className='font-wt-bold'>
                  ₹{' '}
                  {cartData.reduce((acc, curr) => {
                    return acc + curr.price * curr.qty;
                  }, 0)}
                </p>
              </div>
              <button
                className='btn btn-link-primary background-primary brd-rd-semi-sq text-align-center'
                onClick={checkoutHandler}
              >
                CHECKOUT
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
