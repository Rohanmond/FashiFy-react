import axios from "axios";
import { createContext, useContext, useState } from "react";
import { LoginService } from "../Services";
import { SignUpService } from "../Services/services";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const localStorageToken = JSON.parse(localStorage.getItem("loginItems"));
  const [token, setToken] = useState(localStorageToken?.token);
  const [currUser, setCurrUser] = useState(localStorageToken?.user);

  const loginHandler = async (email, password) => {
    try {
      const {
        data: { foundUser, encodedToken },
        status,
      } = await LoginService({ email, password });
      if (status === 200 || status === 201) {
        localStorage.setItem("loginItems",JSON.stringify({token:encodedToken,user:foundUser}))
        setCurrUser(foundUser);
        setToken(encodedToken);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const logoutHandler=()=>{
    localStorage.removeItem("loginItems");
    setToken(null);
    setCurrUser(null);
  }
  const signupHandler=async(email,password,name)=>{
    try{
      const {
        data:{createdUser,encodedToken},
        status
      }=await SignUpService({email,password,name});
      if(status===200 || status===201){
        localStorage.setItem("loginItems",JSON.stringify({token:encodedToken,user:createdUser}))
        setCurrUser(createdUser);
        setToken(encodedToken);
      }
    }catch(err){
      console.log(err)
    }
  }
  return (
    <AuthContext.Provider value={{ token, loginHandler, currUser,signupHandler,logoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
