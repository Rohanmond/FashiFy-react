import './ProductCard.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useData } from '../../../../contexts/data-context';
import {
  DeleteWish,
  PostCart,
  PostWishList,
} from '../../../../Services/services';
import { useAuth } from '../../../../contexts/auth-context';
import { ActionType, ToastType } from '../../../../DataReducer/constants';
import { ToastHandler } from '../../../../utils/utils';

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [cartbuttonDisabled, setcartDisable] = useState(false);
  const [wishButtonDisabled, setWishDisable] = useState(false);
  const { dispatch } = useData();
  const {
    id,
    _id,
    image,
    category,
    size,
    rating,
    title,
    price,
    wished,
    carted,
    trending,
    reviews,
    original_price,
    in_stock,
  } = product;
  const { token } = useAuth();
  const location = useLocation();

  const wishlistHandler = async () => {
    setWishDisable(true);
    try {
      if (!token) {
        navigate('/login', { state: { from: location } });
        return;
      }
      let res = null;
      if (wished)
        res = await DeleteWish({ productId: _id, encodedToken: token });
      else res = await PostWishList({ product, encodedToken: token });
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
  const cartHandler = async () => {
    setcartDisable(true);
    try {
      if (!token) {
        navigate('/login', { state: { from: location } });
        return;
      }
      if (carted) {
        navigate('/cartlist');
        return;
      }
      const res = await PostCart({
        product: { ...product, qty: 1 },
        encodedToken: token,
      });
      if (res.status === 200 || res.status === 201) {
        dispatch({
          type: ActionType.SetCartList,
          payload: { cartlist: res.data.cart },
        });
        ToastHandler(ToastType.Success, 'Successfully added to cart');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setcartDisable(false);
    }
  };

  return (
    <div
      className={`card-container card-container-shadow productlist-card brd-rd-semi-sq ${
        !in_stock && 'product-card-out-of-stock'
      }`}
    >
      <div className='card-img-container cursor-pointer'>
        <img
          onClick={() => navigate(`/product/${_id}`)}
          className='card-img productlist-card-img brd-rd-semi-sq'
          src={image}
          alt='card '
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
        {trending && (
          <div className='productlist-card-new-item-container'>
            <p className='productlist-card-new-item'>Trending</p>
          </div>
        )}
        <div className='productlist-card-rating-container'>
          <i className='fas fa-star'></i>
          <p>{rating}</p> | <p>{reviews}</p>
        </div>
        <div className='productlist-card-size-container'>
          <p>{size}</p>
        </div>
      </div>
      <div className='card-content product-card-content'>
        <div className='product-card-text'>
          <div
            onClick={() => navigate(`/product/${_id}`)}
            className='product-card-title cursor-pointer'
          >
            {title}
          </div>
          <div className='product-card-price-container'>
            <p>₹{price}</p>
            <p className='product-card-original-price'>₹{original_price}</p>
            <p className='product-card-discount'>
              {Math.floor(((original_price - price) / original_price) * 100)}%
              OFF
            </p>
          </div>
        </div>

        <div className='card-footer-elements'>
          <button
            disabled={cartbuttonDisabled}
            onClick={() => cartHandler()}
            className={`btn btn-primary brd-rd-semi-sq ${
              !carted ? 'background-primary' : 'background-success'
            }`}
          >
            <i className='fas fa-shopping-cart'></i>{' '}
            {!carted ? 'Add to cart' : 'Go to cart'}
          </button>
        </div>
      </div>
    </div>
  );
};
