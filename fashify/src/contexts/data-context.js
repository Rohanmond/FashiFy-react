import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { ActionType } from "../DataReducer/constants";
import { DataReducer, initialState } from "../DataReducer/DataReducer";
import {
  GetAllCategories,
  GetAllProducts,
  GetAllSizes,
  GetWishList,
} from "../Services/services";
import { useAuth } from "./auth-context";

const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const { token } = useAuth();

  const [state, dispatch] = useReducer(DataReducer, initialState);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    (async () => {
      const prodRes = await GetAllProducts();

      if (prodRes.status === 200 || prodRes.status === 201)
        dispatch({
          type: ActionType.InitialDataFetch,
          payload: { products: prodRes.data.products },
        });
      setLoader(false);
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
        const wishListRes = await GetWishList({ encodedToken: token });
        if (wishListRes.status === 200 || wishListRes.status === 201) {
          dispatch({
            type: ActionType.SetWishList,
            payload: { wishlist: wishListRes.data.wishlist },
          });
        }
      }
    })();
  }, []);
  return (
    <DataContext.Provider value={{ state, dispatch, loader, setLoader }}>
      {children}
    </DataContext.Provider>
  );
};
export const useData = () => useContext(DataContext);
