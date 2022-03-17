import "./ProductCard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../../../contexts/data-context";
import { DeleteWish, PostWishList } from "../../../../Services/services";
import { useAuth } from "../../../../contexts/auth-context";
import { ActionType } from "../../../../DataReducer/constants";

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { dispatch, state } = useData();
  const { id, _id, image, category, size, rating, title, price } = product;
  const { token } = useAuth();
  const [showAdd, setShowAdd] = useState(true);
  const [wished, setWished] = useState(false);
  useEffect(() => {
    state.wishlist.find((el) => el._id === _id) && setWished(true);
  }, [state]);
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
    <div className="card-container card-container-shadow productlist-card brd-rd-semi-sq">
      <div className="card-img-container">
        <img
          onClick={() => navigate(`/product/${id}`)}
          className="card-img productlist-card-img brd-rd-semi-sq"
          src={image}
          alt="card "
        />
        <button
          onClick={() => wishlistHandler()}
          className="card-img-tag-btn productlist-card-img-tag-btn"
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
      <div className="card-content">
        <div className="product-card-text">
          <div className="card-sub-text">
            <div>{rating}</div>
            <div>{category}</div>
            <div>{size}</div>
          </div>

          <div className="product-card-title">{title}</div>
          <div>Rs.{price}</div>
        </div>

        <div className="card-footer-elements">
          <button
            // onClick={() => addToCartHandler(el, showAdd) && setShowAdd(false)}
            className={`btn btn-primary brd-rd-semi-sq ${
              showAdd ? "background-primary" : "background-success"
            }`}
          >
            {showAdd ? "Add to cart" : "Go to cart"}
          </button>
        </div>
      </div>
    </div>
  );
};