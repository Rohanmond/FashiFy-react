import { useData } from '../../contexts';
import './CartList.css';
import CartCard from './components/CartCard/CartCard';
const CartList = () => {
  const { state } = useData();
  const cartData = state.products.filter((el) => el.carted);
  return (
    <main className='cart_mngmt-main'>
      <div className='cart_mngmt-main-heading text-align-center'>
        <h4>
          MY CART(
          {cartData.length})
        </h4>
      </div>
      <div className='cart_mngmt-content'>
        <div className='cart_mngmt-carts'>
          {cartData.map((el) => {
            return <CartCard el={el} key={el.id} />;
          })}
        </div>
        {cartData.length === 0 && <h2>Your cart is empty</h2>}
        {cartData.length !== 0 && (
          <div className='cart_mngmt-price-details'>
            <div className='card-container cart_mngmt-price-card brd-rd-semi-sq'>
              <div className='mngmt_cart-price-header'>
                <p className='font-wt-bold'>CART PRICE DETAILS</p>
                {/* <button className='btn btn-secondary outlined-secondary brd-rd-semi-sq'>
                  <i className='fas fa-share'></i>
                </button> */}
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
              <a
                className='btn btn-link-primary background-primary brd-rd-semi-sq text-align-center'
                href='../checkout/checkout.html'
              >
                CHECKOUT
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
export default CartList;
