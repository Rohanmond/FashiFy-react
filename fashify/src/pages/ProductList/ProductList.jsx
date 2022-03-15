import "./ProductList.css";
import { ProductListAside, ProductListMain } from "./components";

export const ProductList = () => {
  return (
    <div className="productlist-content">
      <ProductListAside />
      <ProductListMain />
    </div>
  );
};
