import { Route, Routes } from "react-router-dom";

import Mockman from "mockman-js";
import { Nav } from "./components";
import { Home, ProductDetails, ProductList } from "./pages";
import { useData } from "./contexts/data-context";

function App() {
  const { state, dispatch } = useData();
  console.log(state);
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/mock-man" element={<Mockman />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product" element={<ProductDetails />} />
      </Routes>
    </>
  );
}

export default App;
