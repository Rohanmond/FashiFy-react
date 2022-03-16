import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Mockman from "mockman-js";
import { Nav } from "./components";
import { Home, ProductDetails, ProductList, WishList } from "./pages";
import Login from "./pages/Auth/Login/Login";
import { useAuth } from "./contexts/auth-context";

function App() {
  const location = useLocation();
  const { token } = useAuth();
  return (
    <>
      {location.pathname !== "/mock-man" && <Nav />}
      <Routes>
        <Route path="/mock-man" element={<Mockman />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route
          path="/wishlist"
          element={token ? <WishList /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
