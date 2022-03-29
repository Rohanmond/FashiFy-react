import axios from 'axios';
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { ActionType } from '../DataReducer/constants';
import { DataReducer, initialState } from '../DataReducer/DataReducer';
import {
  GetAllCategories,
  GetAllProducts,
  GetAllSizes,
  GetCartList,
  GetWishList,
} from '../Services/services';
import { useAuth } from './auth-context';

const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DataReducer, initialState);
  const [loader, setLoader] = useState(false);
  const { token } = useAuth();
  useEffect(() => {
    let id;
    setLoader(true);
    (async () => {
      try {
        const prodRes = await GetAllProducts();

        if (prodRes.status === 200 || prodRes.status === 201)
          dispatch({
            type: ActionType.InitialDataFetch,
            payload: { products: prodRes.data.products },
          });
        const catRes = await GetAllCategories();
        if (catRes.status === 200 || catRes.status === 201)
          dispatch({
            type: ActionType.InitialDataFetch,
            payload: { categories: catRes.data.categories },
          });
        const sizeRes = await GetAllSizes();
        if (sizeRes.status === 200 || sizeRes.status === 201)
          dispatch({
            type: ActionType.InitialDataFetch,
            payload: { sizes: sizeRes.data.sizes },
          });

        if (token) {
          const wishlistRes = await GetWishList({ encodedToken: token });
          if (wishlistRes.status === 200 || wishlistRes.status === 201)
            dispatch({
              type: ActionType.SetWishList,
              payload: { wishlist: wishlistRes.data.wishlist },
            });
          const cartRes = await GetCartList({ encodedToken: token });
          if (cartRes.status === 200 || cartRes.status === 201)
            dispatch({
              type: ActionType.SetCartList,
              payload: { cartlist: cartRes.data.cart },
            });
        }
      } catch (err) {
        console.log(err);
      }

      setLoader(false);
      id = setTimeout(() => {
        setLoader(false);
      }, 1000);
    })();
    return () => clearTimeout(id);
  }, [token]);
  return (
    <DataContext.Provider value={{ state, dispatch, loader, setLoader }}>
      {children}
    </DataContext.Provider>
  );
};
export const useData = () => useContext(DataContext);
