import "./ProductDetails.css";
export const ProductDetails = () => {
  return (
    <div className="productlist-container">
      <main className="product-details-main">
        <div className="product-details-img-container brd-rd-semi-sq">
          <img
            className="brd-rd-semi-sq img-responsive"
            src="https://picsum.photos/800/800"
            alt=""
          />
        </div>
        <div className="product-details-text-container">
          <h2 className="product-details-header">Puma T-Shirt</h2>
          <small className="product-reviews">4 review</small>
          <p className="text-xl font-wt-semibold product-price">$500 /-</p>
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
