import { useState } from 'react';
import { useAuth, useData } from '../../../../contexts';
import {
  ActionType,
  CartListActionType,
  ToastType,
} from '../../../../DataReducer/constants';
import { DeleteCart, IncDecCart } from '../../../../Services/services';
import { ToastHandler } from '../../../../utils/utils';

const CartCard = ({ el }) => {
  const [cartDisableButton, setDisable] = useState(false);
  const { image, title, price, qty, _id, id } = el;
  const { token } = useAuth();
  const { dispatch } = useData();
  const DeleteCardHandler = async () => {
    setDisable(true);
    try {
      const res = await DeleteCart({ productId: _id, encodedToken: token });
      if (res.status === 200 || res.status === 201) {
        dispatch({
          type: ActionType.SetCartList,
          payload: { cartlist: res.data.cart },
        });
        ToastHandler(ToastType.Warn, 'Cart deleted successfully');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setDisable(false);
    }
  };
  const IncrementHandler = async () => {
    try {
      const res = await IncDecCart({
        productId: _id,
        encodedToken: token,
        type: CartListActionType.Increment,
      });
      if (res.status === 200 || res.status === 201) {
        dispatch({
          type: ActionType.SetCartList,
          payload: { cartlist: res.data.cart },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const DecrementHandler = async () => {
    if (qty === 1) {
      DeleteCardHandler();
      return;
    }
    try {
      const res = await IncDecCart({
        productId: _id,
        encodedToken: token,
        type: CartListActionType.Decrement,
      });
      if (res.status === 200 || res.status === 201) {
        dispatch({
          type: ActionType.SetCartList,
          payload: { cartlist: res.data.cart },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='card-container card-container-hz brd-rd-semi-sq'>
      <div className='card-img-container-hz'>
        <img className='card-img brd-rd-semi-sq' src={image} alt='card' />
      </div>
      <div className='card-content'>
        <div className='cart_mngmt-card-container'>
          <div className='cart_mngmt-card-item'>
            <h4>{title}</h4>
          </div>
          <div className='cart_mngmt-card-item'>
            <p className='font-wt-semibold'>₹ {price}</p>
            <p className='text-secondary-color'>
              <del>₹3999</del>
            </p>
          </div>
          <div className='cart_mngmt-card-item'>
            <div className='text-secondary-color font-wt-bold'>50% off</div>
          </div>
          <div className='cart_mngmt-card-item'>
            <p>Quantity:</p>
            <p
              style={{ cursor: 'pointer' }}
              onClick={DecrementHandler}
              className='text-secondary-color'
            >
              <i className='fas fa-minus-circle'></i>
            </p>
            <p className='cart-quantity-number'>{qty}</p>
            <p
              style={{ cursor: 'pointer' }}
              onClick={IncrementHandler}
              className='text-secondary-color'
            >
              <i className='fas fa-plus-circle'></i>
            </p>
          </div>
        </div>
        <div className='card-footer-elements cart_mngmt-card-footer'>
          <button
            onClick={DeleteCardHandler}
            disabled={cartDisableButton}
            className='btn btn-secondary outlined-secondary hover-danger brd-rd-semi-sq'
          >
            Remove from cart
          </button>
        </div>
      </div>
    </div>
  );
};
export default CartCard;
