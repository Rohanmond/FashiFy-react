import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/auth-context';
import '../Auth.css';

const Login = () => {
  const { loginHandler, token } = useAuth();
  const navigate = useNavigate();
  const fixedLoginForm = {
    email: 'johndoe@gmail.com',
    password: 'johnDoe123',
  };
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (token) {
      navigate('/products');
    }
  }, [token]);

  return (
    <div className='login-container'>
      <main className='login-main'>
        <div className='login-card brd-rd-semi-sq'>
          <div className='login-card-header'>
            <h3 className='text-align-center'>Sign In</h3>
          </div>
          <div className='login-card-item'>
            <div className='input-container'>
              <label>Email address</label>
              <input
                placeholder='abc@fashiFy.com'
                className='text-input auth-input'
                type='text'
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, email: e.target.value })
                }
              />
            </div>
          </div>
          <div className='login-card-item'>
            <div className='input-container'>
              <label>Password</label>
              <input
                placeholder='abcd1234'
                value={loginForm.password}
                className='text-input'
                type='password'
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
              />
            </div>
          </div>

          <div className='login-card-item'>
            <button
              onClick={() => loginHandler(loginForm.email, loginForm.password)}
              className='btn btn-link-primary background-primary text-align-center brd-rd-semi-sq'
            >
              Login
            </button>
            <button
              onClick={() =>
                loginHandler(fixedLoginForm.email, fixedLoginForm.password)
              }
              className='btn btn-link-primary background-primary text-align-center brd-rd-semi-sq'
            >
              Login As a Guest
            </button>
            <div className='auth-footer'>
              <p>
                <span>Don't have an account?</span>
                <span
                  className='auth-signup'
                  onClick={() => navigate('/signup')}
                >
                  {' '}
                  sign up
                </span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Login;
