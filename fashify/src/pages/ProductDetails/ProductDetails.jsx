import { useParams } from "react-router-dom";
import { useData } from "../../contexts/data-context";
import "./ProductDetails.css";
export const ProductDetails = () => {
  const { productId } = useParams();
  const {
    state: { products },
  } = useData();

  const { image, price, rating, title } = products.find(
    (el) => el.id === productId
  );
  return (
    <div className="productlist-container">
      <main className="product-details-main">
        <div className="product-details-img-container brd-rd-semi-sq">
          <img
            className="brd-rd-semi-sq img-responsive"
            src={image}
            alt="product_image"
          />
        </div>
        <div className="product-details-text-container">
          <h2 className="product-details-header">{title}</h2>
          <small className="product-reviews">4 review</small>
          <p className="text-xl font-wt-semibold product-price">₹{price} /-</p>
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            quae officiis dolorem amet aliquid, doloribus in vitae ipsa, autem
            soluta est nostrum ex aspernatur, reiciendis dignissimos architecto
            voluptate assumenda consectetur.
          </p>
          <div className="product-details-footer">
            <a
              className="btn btn-link-primary background-primary brd-rd-semi-sq"
              href="../cart_mngmt/cart_mngmt.html"
            >
              Add to cart
            </a>
            <a
              className="btn btn-link-secondary outlined-secondary brd-rd-semi-sq"
              href="../wishlist/wishlist.html"
            >
              Add to wishlist
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};
