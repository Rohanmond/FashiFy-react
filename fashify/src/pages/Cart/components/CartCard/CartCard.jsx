import { useState } from 'react';
import { useAuth, useData } from '../../../../contexts';
import './CartCard.css';
import {
  ActionType,
  CartListActionType,
  ToastType,
} from '../../../../DataReducer/constants';
import {
  DeleteCart,
  DeleteWish,
  IncDecCart,
  PostWishList,
} from '../../../../Services/services';
import { ToastHandler } from '../../../../utils/utils';
import { useNavigate } from 'react-router-dom';

const CartCard = ({ el }) => {
  const [cartDisableButton, setDisable] = useState(false);
  const [negativeDisableButton, setNegativeDisableButton] = useState(false);
  const [wishButtonDisabled, setWishDisable] = useState(false);
  const navigate = useNavigate();
  const { image, title, price, qty, _id, id, wished, original_price } = el;
  const { token } = useAuth();
  const { dispatch } = useData();
  const DeleteCartHandler = async () => {
    setDisable(true);
    setNegativeDisableButton(true);
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
      setNegativeDisableButton(false);
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
    if (qty <= 1) {
      DeleteCartHandler();
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

  const wishlistHandler = async () => {
    setWishDisable(true);
    try {
      if (!token) {
        navigate('/login');
        return;
      }
      let res = null;
      if (wished)
        res = await DeleteWish({ productId: _id, encodedToken: token });
      else res = await PostWishList({ product: el, encodedToken: token });
      if (res.status === 200 || res.status === 201) {
        dispatch({
          type: ActionType.SetWishList,
          payload: { wishlist: res.data.wishlist },
        });
        if (wished) {
          ToastHandler(ToastType.Warn, 'Deleted from wishlist');
        } else {
          ToastHandler(ToastType.Success, 'Added to wishlist');
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setWishDisable(false);
    }
  };
  return (
    <div className='card-container card-container-hz brd-rd-semi-sq cart-card-container'>
      <div className='card-img-container-hz cart-card-img-container'>
        <img
          className='card-img brd-rd-semi-sq'
          src={image}
          alt='card'
          onClick={() => navigate(`/product/${_id}`)}
        />
        <button
          onClick={() => {
            wishlistHandler();
          }}
          disabled={wishButtonDisabled}
          className='card-img-tag-btn productlist-card-img-tag-btn-container'
        >
          {!wished ? (
            <span className='material-icons productlist-card-img-tag-btn'>
              favorite_border
            </span>
          ) : (
            <span className='material-icons wishlist-icon-filled'>
              favorite
            </span>
          )}
        </button>
      </div>
      <div className='card-content'>
        <div className='cart_mngmt-card-container'>
          <div className='cart_mngmt-card-item'>
            <h4>{title}</h4>
          </div>
          <div className='cart_mngmt-card-item'>
            <p className='font-wt-semibold'>₹ {price}</p>
            <p className='text-secondary-color'>
              <del>{original_price}</del>
            </p>
          </div>
          <div className='cart_mngmt-card-item'>
            <div className='text-secondary-color font-wt-bold'>
              {Math.floor(((original_price - price) / original_price) * 100)}%
              OFF
            </div>
          </div>
          <div className='cart_mngmt-card-item'>
            <p>Quantity:</p>
            <p
              style={{ cursor: 'pointer' }}
              onClick={DecrementHandler}
              role='button'
              disabled={negativeDisableButton}
              className='text-secondary-color'
            >
              <i className='fas fa-minus-circle'></i>
            </p>
            <p className='cart-quantity-number'>{qty > 0 ? qty : 0}</p>
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
            onClick={DeleteCartHandler}
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
