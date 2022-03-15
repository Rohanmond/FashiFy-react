import "./ProductList.css";
import { ProductListAside, ProductListMain } from "./components";
import { useData } from "../../contexts/data-context";

export const ProductList = () => {
  return (
    <div className="productlist-content">
      <ProductListAside />
      <ProductListMain />
    </div>
  );
};
