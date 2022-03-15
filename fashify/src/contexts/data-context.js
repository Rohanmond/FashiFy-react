import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { ActionType } from "../DataReducer/constants";
import { DataReducer, initialState } from "../DataReducer/DataReducer";

const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(DataReducer, initialState);
  useEffect(() => {
    (async () => {
      const prodRes = await axios.get("/api/products");

      if (prodRes.status === 200 || prodRes.status === 201)
        dispatch({
          type: ActionType.InitialDataFetch,
          payload: { products: prodRes.data.products },
        });
      const catRes = await axios.get("/api/categories");
      if (catRes.status === 200 || catRes.status === 201)
        dispatch({
          type: ActionType.InitialDataFetch,
          payload: { categories: catRes.data.categories },
        });
      const sizeRes = await axios.get("/api/sizes");
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
