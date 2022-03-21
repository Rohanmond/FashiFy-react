import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts";
import "../Auth.css"
const SignUp=()=>{
    const navigate=useNavigate();
    const {token,signupHandler}=useAuth();
    const [signupForm,setSignupForm]=useState({
        name:"",
        password:"",
        email:""
    })
    const [formError,setFormError]=useState({
      nameError:"",
      passwordError:"",
      emailError:""
    })

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
            <h3 class="text-align-center">Signup</h3>
          </div>
          <div class="login-card-item">
            <div class={`input-container ${signupForm.nameError && "error"}`}>
              <label>Name</label>
              <input placeholder="Mr. FashiFy" class="text-input" type="text"
              value={signupForm.name}
              required
              onChange={(e)=>setSignupForm({...signupForm,name:e.target.value})} />
             {formError.nameError && <div class="err-msg">Name shouldn't be number</div>}
            </div>
          </div>

          <div class="login-card-item">
            <div class="input-container error">
              <label>Email address</label>
              <input
                placeholder="abc@fashiFy.com"
                class="text-input"
                type="email"
                required
                value={signupForm.email}
                onChange={(e)=>setSignupForm({...signupForm,email:e.target.value})}
              />
             {formError.emailError && <div class="err-msg">Email should be in proper format</div>}

            </div>
          </div>
          <div class="login-card-item">
            <div class="input-container error">
              <label>Password</label>
              <input placeholder="" class="text-input" type="password"
              value={signupForm.password}
              required
              onChange={(e)=>setSignupForm({...signupForm,password:e.target.value})} />
            </div>
           {formError.passwordError && <div class="err-msg">Password should contain atleast one digit and should be equal or more than 8 chars long</div>}

          </div>
          <div class="login-card-item">
            <div class="input-container">
              <label>Confirm password</label>
              <input placeholder="" class="text-input" type="password" />
            </div>
          </div>
          <div class="login-card-item">
            <div class="input-container-hz">
              <input
                type="checkbox"
                name="terms-conditions-checkbox"
                value="accepted terms conditions"
                id="terms-conditions-checkbox"
              />
              <label for="terms-conditions-checkbox"
                >I accept all Terms &#38; Conditions</label
              >
            </div>
          </div>
          <div class="login-card-item">
            <button
            onClick={()=>signupHandler(signupForm.email,signupForm.password,signupForm.name)}
              class="btn btn-link-primary background-primary text-align-center brd-rd-semi-sq"
              disabled={Object.keys(formError).reduce((acc,curr)=>formError[curr]?true:acc,false)}
              >Create New Account</button>
            <button
              class="btn btn-link-secondary outlined-secondary text-align-center brd-rd-semi-sq"
              onClick={()=>navigate("/login")}
              >Already have an account</button>
          </div>
        </div>
        </main>
      </div>
    )
}
export default SignUp;