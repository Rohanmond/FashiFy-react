import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';
import { useData } from '../../contexts/data-context';
import { ActionType, ToastType } from '../../DataReducer/constants';
import { DeleteWish, PostCart, PostWishList } from '../../Services/services';
import { ToastHandler } from '../../utils/utils';
import './ProductDetails.css';

export const ProductDetails = () => {
  const { productId } = useParams();
  const [cartbuttonDisabled, setcartDisable] = useState(false);
  const [wishButtonDisabled, setWishDisable] = useState(false);
  const { token } = useAuth();
  const { dispatch } = useData();
  const {
    state: { products, wishlist, cartlist },
  } = useData();

  const product = products.find((el) => el._id === productId) || {};
  const { _id, image, price, wished, carted } = product;
  const navigate = useNavigate();

  const wishlistHandler = async () => {
    try {
      if (!token) {
        navigate('/login');
        return;
      }

      let res = null;
      setWishDisable(true);
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
    }
    setWishDisable();
  };
  const cartHandler = async () => {
    try {
      if (!token) {
        navigate('/login');
        return;
      }
      if (carted) {
        navigate('/cartlist');
        return;
      }
      setcartDisable(true);
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
      setcartDisable(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {product && (
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
                className='card-img-tag-btn prod-details-img-tag'
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
            </div>
            <div className='product-details-text-container'>
              <h2 className='product-details-header'>{product.title}</h2>
              <small className='product-reviews'>4 review</small>
              <p className='text-xl font-wt-semibold product-price'>
                ₹{price} /-
              </p>
              <hr />
              <p>
                <span className='font-wt-bold'>Brand :</span>
                <span className='product-brand'>Lorem</span>
              </p>
              <p>
                <span className='font-wt-bold'>Availability :</span>
                <span className='prduct-availability'>In Stock</span>
              </p>
              <p className='font-wt-bold'>Description:</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat quae officiis dolorem amet aliquid, doloribus in vitae
                ipsa, autem soluta est nostrum ex aspernatur, reiciendis
                dignissimos architecto voluptate assumenda consectetur.
              </p>
              <div className='product-details-footer'>
                <button
                  className='btn btn-link-primary background-primary brd-rd-semi-sq'
                  href='../cart_mngmt/cart_mngmt.html'
                >
                  Buy Now
                </button>
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
