import { useFilterHook } from "../../../../Hooks";
import { ProductCard } from "../ProductCard/ProductCard";
import "./ProductListMain.css";

export const ProductListMain = () => {
  const { filteredData } = useFilterHook();

  return (
    <main className="productlist-main">
      <div className="productlist-main-header">
        <p className="font-wt-bold">Showing All Products</p>
        <p>(Showing {filteredData.length} products)</p>
      </div>
      <div className="productlist-main-card-container">
        {filteredData.map((el) => {
          return <ProductCard product={el} key={el._id} />;
        })}
      </div>
    </main>
  );
};
