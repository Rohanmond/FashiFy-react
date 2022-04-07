import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';
import { useData } from '../../contexts/data-context';
import { ActionType, ToastType } from '../../DataReducer/constants';
import { DeleteWish, PostCart, PostWishList } from '../../Services/services';
import { ToastHandler } from '../../utils/utils';
import './ProductDetails.css';

export const ProductDetails = () => {
  const { productId } = useParams();
  const location = useLocation();
  const [cartbuttonDisabled, setcartDisable] = useState(false);
  const [wishButtonDisabled, setWishDisable] = useState(false);
  const { token } = useAuth();
  const { dispatch } = useData();
  const {
    state: { products, wishlist, cartlist },
  } = useData();

  const product = products.find((el) => el._id === productId) || {};
  const {
    _id,
    image,
    price,
    wished,
    carted,
    reviews,
    description,
    in_stock,
    trending,
    delivery_time,
    title,
    rating,
    original_price,
    size,
  } = product;
  const navigate = useNavigate();

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
      }
      if (wished)
        ToastHandler(
          ToastType.Warn,
          'Successfully deleted product from wishlist'
        );
      else ToastHandler(ToastType.Success, 'Successfully added to wishlist');
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
      }
      ToastHandler(ToastType.Success, 'Successfully added to cart');
    } catch (err) {
      console.log(err);
    } finally {
      setcartDisable(false);
    }
  };
  return (
    <>
      {_id && (
        <div className='productlist-container'>
          <main className='product-details-main'>
            <div className='product-details-img-container brd-rd-semi-sq'>
              <img
                className='brd-rd-semi-sq img-responsive prod-details-img'
                src={image}
                alt='product_image'
              />
              <button
                onClick={() => wishlistHandler()}
                className='card-img-tag-btn productlist-card-img-tag-btn-container prod-details-img-tag'
                disabled={wishButtonDisabled}
              >
                {!wished ? (
                  <span className='material-icons'>favorite_border</span>
                ) : (
                  <span className='material-icons wishlist-icon-filled'>
                    favorite
                  </span>
                )}
              </button>
              {trending && (
                <div className='productlist-card-new-item-container'>
                  <p className='productlist-card-new-item text-lg'>Trending</p>
                </div>
              )}
              <div className='productlist-card-rating-container'>
                <i className='fas fa-star'></i>
                <p className='text-lg'>{rating}</p>
              </div>
              <div className='productlist-card-size-container'>
                <p className='text-lg'>{size}</p>
              </div>
            </div>
            <div className='product-details-text-container'>
              <h2 className='product-details-header'>{title}</h2>
              <small className='product-reviews'>{reviews} reviews</small>
              <div className='product-price-container'>
                <p className='text-xl font-wt-semibold product-price'>
                  ₹{price}
                </p>
                <p className='text-xl font-wt-semibold product-original-price'>
                  ₹{original_price}
                </p>
                <p className='product-card-discount text-lg font-wt-semibold'>
                  {Math.floor(
                    ((original_price - price) / original_price) * 100
                  )}
                  % OFF
                </p>
              </div>

              <hr />

              <p>
                <span className='font-wt-bold'>Availability : </span>
                <span className='prduct-availability'>
                  {in_stock ? 'In Stock' : 'Out of Stock'}
                </span>
              </p>
              <p>
                <span className='font-wt-bold'>Description : </span>
                <span>{description}</span>
              </p>
              <p>
                <span className='font-wt-bold'>Size : </span>
                <span>{size}</span>
              </p>
              <p>
                <span className='font-wt-bold'>Delivery : </span>
                <span>in {delivery_time} days </span>
              </p>

              <div className='product-details-footer'>
                <button
                  disabled={cartbuttonDisabled}
                  onClick={() => cartHandler()}
                  className={`btn btn-primary brd-rd-semi-sq ${
                    !carted ? 'outlined-primary' : 'background-success'
                  }`}
                >
                  {!carted ? 'Add to cart' : 'Go to cart'}
                </button>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};
