import { Route, Routes, useLocation } from "react-router-dom";

import Mockman from "mockman-js";
import { Nav } from "./components";
import { Home, ProductDetails, ProductList } from "./pages";

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/mock-man" && <Nav />}
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
