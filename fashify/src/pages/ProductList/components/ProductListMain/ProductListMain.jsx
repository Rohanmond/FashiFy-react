import { useData } from "../../../../contexts/data-context";
import { ProductCard } from "../ProductCard/ProductCard";
import "./ProductListMain.css";

export const ProductListMain = () => {
  const { state } = useData();
  return (
    <main className="productlist-main">
      <div className="productlist-main-header">
        <p className="font-wt-bold">Showing All Products</p>
        <p>(Showing {state.products.length} products)</p>
      </div>
      <div className="productlist-main-card-container">
        {state.products.map((el) => {
          return <ProductCard product={el} key={el._id} />;
        })}
      </div>
    </main>
  );
};
