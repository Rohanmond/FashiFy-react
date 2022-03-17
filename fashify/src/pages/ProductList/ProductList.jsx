import "./ProductList.css";
import { ProductListAside, ProductListMain } from "./components";
import { useData } from "../../contexts/data-context";
import { useEffect } from "react";

export const ProductList = () => {
  const { setLoader } = useData();
  useEffect(() => {
    setLoader(true);
    const id = setTimeout(() => {
      setLoader(false);
    }, 500);
  }, []);
  return (
    <div className="productlist-content">
      <ProductListAside />
      <ProductListMain />
    </div>
  );
};
