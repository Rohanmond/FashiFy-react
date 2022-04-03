import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts';
import '../Auth.css';
const SignUp = () => {
  const navigate = useNavigate();
  const { token, signupHandler } = useAuth();
  const [signupForm, setSignupForm] = useState({
    name: '',
    password: '',
    email: '',
  });
  const [formError, setFormError] = useState({
    nameError: '',
    passwordError: '',
    emailError: '',
  });

  useEffect(() => {
    let id;
    if (token) {
      id = setTimeout(() => {
        navigate('/products');
      }, 500);
    }
    return () => clearTimeout(id);
  }, [token]);
  return (
    <div className='login-container'>
      <main className='login-main'>
        <div className='login-card brd-rd-semi-sq'>
          <div className='login-card-header'>
            <h3 className='text-align-center'>Signup</h3>
          </div>
          <div className='login-card-item'>
            <div
              className={`input-container ${signupForm.nameError && 'error'}`}
            >
              <label>Name</label>
              <input
                placeholder='Mr. FashiFy'
                className='text-input'
                type='text'
                value={signupForm.name}
                required
                onChange={(e) =>
                  setSignupForm({ ...signupForm, name: e.target.value })
                }
              />
              {formError.nameError && (
                <div className='err-msg'>Name shouldn't be number</div>
              )}
            </div>
          </div>

          <div className='login-card-item'>
            <div className='input-container'>
              <label>Email address</label>
              <input
                placeholder='abc@fashiFy.com'
                className='text-input'
                type='email'
                required
                value={signupForm.email}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, email: e.target.value })
                }
              />
              {formError.emailError && (
                <div className='err-msg'>Email should be in proper format</div>
              )}
            </div>
          </div>
          <div className='login-card-item'>
            <div className='input-container'>
              <label>Password</label>
              <input
                placeholder=''
                className='text-input'
                type='password'
                value={signupForm.password}
                required
                onChange={(e) =>
                  setSignupForm({ ...signupForm, password: e.target.value })
                }
              />
            </div>
            {formError.passwordError && (
              <div className='err-msg'>
                Password should contain atleast one digit and should be equal or
                more than 8 chars long
              </div>
            )}
          </div>
          <div className='login-card-item'>
            <div className='input-container'>
              <label>Confirm password</label>
              <input placeholder='' className='text-input' type='password' />
            </div>
          </div>
          <div className='login-card-item'>
            <div className='input-container-hz'>
              <input
                type='checkbox'
                name='terms-conditions-checkbox'
                value='accepted terms conditions'
                id='terms-conditions-checkbox'
              />
              <label for='terms-conditions-checkbox'>
                I accept all Terms &#38; Conditions
              </label>
            </div>
          </div>
          <div className='login-card-item'>
            <button
              onClick={() =>
                signupHandler(
                  signupForm.email,
                  signupForm.password,
                  signupForm.name
                )
              }
              className='btn btn-link-primary background-primary text-align-center brd-rd-semi-sq'
              disabled={Object.keys(formError).reduce(
                (acc, curr) => (formError[curr] ? true : acc),
                false
              )}
            >
              Create New Account
            </button>
            <button
              className='btn btn-link-secondary outlined-secondary text-align-center brd-rd-semi-sq'
              onClick={() => navigate('/login')}
            >
              Already have an account
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
export default SignUp;
