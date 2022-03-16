import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { ActionType } from "../DataReducer/constants";
import { DataReducer, initialState } from "../DataReducer/DataReducer";
import {
  GetAllCategories,
  GetAllProducts,
  GetAllSizes,
} from "../Services/services";

const DataContext = createContext();
export const DataProvider = ({ children }) => {
  console.log("COntext called");
  const [state, dispatch] = useReducer(DataReducer, initialState);
  useEffect(() => {
    console.log("useEffect called");
    (async () => {
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
    })();
  }, []);
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
export const useData = () => useContext(DataContext);
