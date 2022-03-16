import axios from "axios";
import { createContext, useContext, useState } from "react";
import { LoginService } from "../Services";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const localStorageToken = JSON.parse(localStorage.getItem("login"));
  const [token, setToken] = useState(localStorageToken?.token);
  const [currUser, setCurrUser] = useState(null);

  const loginHandler = async (email, password) => {
    try {
      const {
        data: { foundUser, encodedToken },
        status,
      } = await LoginService({ email, password });
      if (status === 200 || status === 201) {
        localStorage.setItem("login", JSON.stringify({ token: encodedToken }));
        setCurrUser(foundUser);

        setToken(encodedToken);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AuthContext.Provider value={{ token, loginHandler, currUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
