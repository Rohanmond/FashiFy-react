import "./ProductCard.css";
import { useState } from "react";

export const ProductCard = ({ product }) => {
  const { image, category, size, rating, title, price } = product;
  const [showAdd, setShowAdd] = useState(true);
  return (
    <div className="card-container card-container-shadow productlist-card brd-rd-semi-sq">
      <div className="card-img-container">
        <img
          className="card-img productlist-card-img brd-rd-semi-sq"
          src={image}
          alt="card "
        />
        <button className="card-img-tag-btn productlist-card-img-tag-btn">
          <span className="material-icons">favorite_border</span>
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
