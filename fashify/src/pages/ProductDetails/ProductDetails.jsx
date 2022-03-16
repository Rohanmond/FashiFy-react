import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { useData } from "../../contexts/data-context";
import { ActionType } from "../../DataReducer/constants";
import { DeleteWish, PostWishList } from "../../Services/services";
import "./ProductDetails.css";

export const ProductDetails = () => {
  const { productId } = useParams();
  const { token } = useAuth();
  const { dispatch } = useData();
  const {
    state: { products, wishlist },
  } = useData();
  const [wished, setWished] = useState(false);

  const product = products.find((el) => el.id === productId) || {};
  const { _id, image, price } = product;
  const navigate = useNavigate();

  useEffect(() => {
    wishlist.find((el) => el._id === _id) && setWished(true);
  }, [wishlist]);
  const wishlistHandler = async () => {
    try {
      if (!token) {
        navigate("/login");
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
        setWished((wish) => !wish);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {product && (
        <div className="productlist-container">
          <main className="product-details-main">
            <div className="product-details-img-container brd-rd-semi-sq">
              <img
                className="brd-rd-semi-sq img-responsive prod-details-img"
                src={image}
                alt="product_image"
              />
              <button
                onClick={() => wishlistHandler()}
                className="card-img-tag-btn prod-details-img-tag"
              >
                {!wished ? (
                  <span className="material-icons">favorite_border</span>
                ) : (
                  <span className="material-icons wishlist-icon-filled">
                    favorite
                  </span>
                )}
              </button>
            </div>
            <div className="product-details-text-container">
              <h2 className="product-details-header">{product.title}</h2>
              <small className="product-reviews">4 review</small>
              <p className="text-xl font-wt-semibold product-price">
                ₹{price} /-
              </p>
              <hr />
              <p>
                <span className="font-wt-bold">Brand :</span>
                <span className="product-brand">Lorem</span>
              </p>
              <p>
                <span className="font-wt-bold">Availability :</span>
                <span className="prduct-availability">In Stock</span>
              </p>
              <p className="font-wt-bold">Description:</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat quae officiis dolorem amet aliquid, doloribus in vitae
                ipsa, autem soluta est nostrum ex aspernatur, reiciendis
                dignissimos architecto voluptate assumenda consectetur.
              </p>
              <div className="product-details-footer">
                <a
                  className="btn btn-link-primary background-primary brd-rd-semi-sq"
                  href="../cart_mngmt/cart_mngmt.html"
                >
                  Buy Now
                </a>
                <a
                  className="btn btn-link-secondary outlined-secondary brd-rd-semi-sq"
                  href="../wishlist/wishlist.html"
                >
                  Add to Cart
                </a>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};
