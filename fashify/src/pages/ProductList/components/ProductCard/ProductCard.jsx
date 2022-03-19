import "./ProductCard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../../../contexts/data-context";
import {
  DeleteWish,
  PostCart,
  PostWishList,
} from "../../../../Services/services";
import { useAuth } from "../../../../contexts/auth-context";
import { ActionType } from "../../../../DataReducer/constants";

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { dispatch, state } = useData();
  const { id, _id, image, category, size, rating, title, price,wished ,carted} = product;
  const { token } = useAuth();
  console.log("product",product)
  console.log("product card called")
  // useEffect(() => {
  //   //state.wishlist.find((el) => el._id === _id) && setWished(true);
  //   // state.cartlist.find((el) => el._id === _id) && setCart(true);
  //   // console.log("cart", state.cartlist);
  // }, [ s]);
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
      
      }
    } catch (err) {
      console.log(err);
    }
  };
  const cartHandler = async () => {
    try {
      if (!token) {
        navigate("/login");
        return;
      }
      if (carted) {
        navigate("/cartlist");
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
            onClick={() => cartHandler()}
            className={`btn btn-primary brd-rd-semi-sq ${
              !carted ? "background-primary" : "background-success"
            }`}
          >
            {!carted ? "Add to cart" : "Go to cart"}
          </button>
        </div>
      </div>
    </div>
  );
};
