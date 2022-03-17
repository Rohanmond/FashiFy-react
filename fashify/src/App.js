import { Navigate, Route, Routes, useLocation } from "react-router-dom";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Mockman from "mockman-js";
import { Nav } from "./components";
import { Home, ProductDetails, ProductList, WishList } from "./pages";
import Login from "./pages/Auth/Login/Login";
import { useAuth } from "./contexts/auth-context";
import Loader from "./components/Loader/Loader";
import { useData } from "./contexts/data-context";

function App() {
  const location = useLocation();
  const { token } = useAuth();
  const { loader } = useData();
  return (
    <>
      {loader && <Loader />}
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
