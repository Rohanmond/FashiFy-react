import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth, useData } from '../../../contexts';
import {
  validateEmail,
  validateOnlyString,
  validatePassword,
} from '../../../utils/utils';
import '../Auth.css';
const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { token, signupHandler } = useAuth();
  const [signupForm, setSignupForm] = useState({
    name: '',
    password: '',
    email: '',
  });
  const resetFormError = {
    name: '',
    email: '',
    password: '',
    'confirm-password': '',
  };
  const [formError, setFormError] = useState(resetFormError);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let flagErr = false;
    let newFormError = {};
    Object.keys(formError).forEach((key) => {
      newFormError[key] = '';
      if (signupForm[key] === '' && key !== 'confirm-password') {
        newFormError[key] = `${key} shouldn't be empty`;
        flagErr = true;
      }
    });
    if (signupForm.password !== signupForm.confirm_password) {
      flagErr = true;
      newFormError['confirm-password'] =
        "Password and confirm password didn't matched";
    }
    if (flagErr) {
      setFormError(newFormError);
      return;
    }

    signupHandler(signupForm.email, signupForm.password, signupForm.name);
  };
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
                onChange={(e) => {
                  setSignupForm({ ...signupForm, name: e.target.value });
                  if (!validateOnlyString(e.target.value)) {
                    setFormError({
                      ...formError,
                      name: 'Name should be in strings',
                    });
                  } else {
                    setFormError({ ...formError, name: '' });
                  }
                }}
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
                onChange={(e) => {
                  setSignupForm({ ...signupForm, email: e.target.value });
                  if (!validateEmail(e.target.value)) {
                    setFormError({
                      ...formError,
                      email: 'Email should be in correct format',
                    });
                  } else {
                    setFormError({ ...formError, email: '' });
                  }
                }}
              />
              {formError.email && (
                <div className='err-msg font-wt-semibold'>
                  {formError.email}
                </div>
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
                onChange={(e) => {
                  setSignupForm({ ...signupForm, password: e.target.value });
                  if (!validatePassword(e.target.value)) {
                    setFormError({
                      ...formError,
                      password:
                        'Password should be in 8 to 20 chars and should have one digit',
                    });
                  } else {
                    setFormError({ ...formError, password: '' });
                  }
                }}
              />
            </div>
            {formError.password && (
              <div className='err-msg font-wt-semibold'>
                {formError.password}
              </div>
            )}
          </div>
          <div className='login-card-item'>
            <div className='input-container'>
              <label>Confirm password</label>
              <input
                placeholder=''
                className='text-input'
                type='password'
                onChange={(e) =>
                  setSignupForm({
                    ...signupForm,
                    confirm_password: e.target.value,
                  })
                }
                onFocus={() =>
                  setFormError({ ...formError, 'confirm-password': '' })
                }
              />
              {formError['confirm-password'] && (
                <div className='err-msg font-wt-semibold'>
                  {formError['confirm-password']}
                </div>
              )}
            </div>
          </div>

          <div className='login-card-item'>
            <button
              onClick={onSubmitHandler}
              className='btn btn-link-primary background-primary text-align-center brd-rd-semi-sq'
            >
              Create New Account
            </button>
            <div className='auth-footer'>
              <p>
                <span>Already have an account?</span>
                <Link className='auth-signup' to={'/login'}>
                  {' '}
                  sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default SignUp;
