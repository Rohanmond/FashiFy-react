import { useData } from "../../contexts/data-context";
import { ProductCard } from "../ProductList/components";
import "./WishList.css";
export const WishList = () => {
  const { state } = useData();
  return (
    <main className="wishlist-main-container">
      <div className="wishlist-main-heading text-align-center">
        <h3>MY WISHLIST</h3>
      </div>
      <div className="productlist-main-card-container">
        {state.products.map((el) => {
          return <ProductCard product={el} />;
        })}

        <div className="card-container card-container-shadow productlist-card brd-rd-semi-sq">
          <div className="card-img-container">
            <img
              className="card-img productlist-card-img"
              src="https://picsum.photos/300/400"
              alt="card image"
            />
            <button className="card-img-tag-btn productlist-card-img-tag-btn">
              <span className="material-icons wishlist-icon-filled">
                favorite
              </span>
            </button>
          </div>
          <div className="card-content">
            <div className="card-text">
              <div>Men Premium Jacket</div>
              <div className="card-subtitle">₹2000</div>
            </div>
            <div className="card-footer-elements">
              <button className="btn btn-primary background-primary brd-rd-semi-sq">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
