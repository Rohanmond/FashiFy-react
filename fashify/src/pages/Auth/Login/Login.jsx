import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/auth-context";
import "../Auth.css";

const Login = () => {
  const { loginHandler, token } = useAuth();
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: "johndoe@gmail.com",
    password: "johnDoe123",
  });

  useEffect(() => {
    let id;
    if (token) {
      id=setTimeout(() => {
        navigate("/products");
      },500);
    }
    return ()=>clearTimeout(id)
  },[token]);

  return (
    <div class="login-container">
      <main class="login-main">
        <div class="login-card brd-rd-semi-sq">
          <div class="login-card-header">
            <h3 class="text-align-center">Login</h3>
          </div>
          <div class="login-card-item">
            <div class="input-container">
              <label>Email address</label>
              <input
                placeholder="abc@fashiFy.com"
                class="text-input"
                type="text"
                value={loginForm.email}
              />
            </div>
          </div>
          <div class="login-card-item">
            <div class="input-container">
              <label>Password</label>
              <input
                placeholder=""
                value={loginForm.password}
                class="text-input"
                type="password"
              />
            </div>
          </div>
          <div class="login-card-item">
            <div class="input-container-hz">
              <input
                type="checkbox"
                name="remember-me-checkbox"
                value="remember-me"
                id="remember-me-checkbox"
              />
              <label for="remember-me-checkbox">Remember me</label>
            </div>
            <a class="" href="./forgetpassword.html">
              Forgot your password?
            </a>
          </div>
          <div class="login-card-item">
            <button
              onClick={() => loginHandler(loginForm.email, loginForm.password)}
              class="btn btn-link-primary background-primary text-align-center brd-rd-semi-sq"
            >
              Login
            </button>
            <button
              onClick={()=>navigate("/signup")}
              class="btn btn-link-primary outlined-secondary text-align-center brd-rd-semi-sq"
            >
              Create New Account
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Login;
