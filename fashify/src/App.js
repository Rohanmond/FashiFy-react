import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Mockman from 'mockman-js';
import { Nav } from './components';
import './App.css';

import {
  CartList,
  Checkout,
  Home,
  MockApi,
  ProductDetails,
  ProductList,
  Profile,
  WishList,
} from './pages';
import Login from './pages/Auth/Login/Login';
import { useAuth } from './contexts/auth-context';
import Loader from './components/Loader/Loader';
import { useData } from './contexts/data-context';

import SignUp from './pages/Auth/Signup/Signup';
import Logout from './pages/Auth/Logout/Logout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Addresses, Details, Orders } from './pages/Profile/components';
function App() {
  const { token } = useAuth();
  const { loader } = useData();
  return (
    <div className='app'>
      {loader && <Loader />}
      <ToastContainer
        position='bottom-right'
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        theme='colored'
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <Nav />
      <Routes>
        <Route path='/mock-man' element={<MockApi />} />
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<ProductList />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/product/:productId' element={<ProductDetails />} />
        <Route
          path='/wishlist'
          element={token ? <WishList /> : <Navigate to='/login' />}
        />
        <Route
          path='/checkout'
          element={token ? <Checkout /> : <Navigate to={'/login'} />}
        />
        <Route
          path='/cartlist'
          element={token ? <CartList /> : <Navigate to={'/login'} />}
        />
        <Route
          path='/profile'
          element={token ? <Profile /> : <Navigate to={'/login'} />}
        >
          <Route path='details' element={<Details />} />
          <Route path='addresses' element={<Addresses />} />
          <Route path='orders' element={<Orders />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
