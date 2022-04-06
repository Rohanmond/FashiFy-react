import './Nav.css';
import logo from '../../logos/hero-logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';
import { useData } from '../../contexts/data-context';
import { ActionType, Filters } from '../../DataReducer/constants';
import { useEffect, useState } from 'react';

export const Nav = () => {
  const { token, logoutHandler } = useAuth();
  const { state, dispatch } = useData();
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setInput('');
    dispatch({
      type: ActionType.ChangeFilter,
      payload: {
        filterType: Filters.Search,
        filterValue: '',
      },
    });
  }, [navigate]);
  return (
    <nav className='navigation home-nav'>
      <div className='nav-mobile-up'>
        <div className='nav-left productlist-nav-left'>
          <div className='nav-logo-container'>
            <div onClick={() => navigate('/')} className='nav-logo-link'>
              <img className='hero-logo' src={logo} alt='nav logo' />
              <small>FashiFy</small>
            </div>
          </div>
        </div>
        <div className='nav-mid nav-desktop'>
          <input
            placeholder='search'
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.target.value === '') {
                dispatch({
                  type: ActionType.ChangeFilter,
                  payload: {
                    filterType: Filters.Search,
                    filterValue: e.target.value,
                  },
                });
                navigate('/products');
              }
            }}
            className='nav-search brd-rd-semi-sq nav-text-input'
            type='search'
          />
        </div>
        <div className='nav-right'>
          <ul className='nav-links'>
            <li className='nav-link-item nav-explore-link'>
              <Link to='/products'>Explore</Link>
            </li>
            {!token && (
              <li className='nav-link-item nav-link-item-btn'>
                <button
                  onClick={() => navigate('/login')}
                  className='btn btn-secondary outlined-primary brd-rd-semi-sq'
                >
                  Login
                </button>
              </li>
            )}
            {token && (
              <li
                className='nav-link-item'
                onClick={() => navigate('/profile/details')}
              >
                <div className='badge-icon nav-badge-icon'>
                  <span className='material-icons-outlined'>
                    account_circle
                  </span>
                </div>
              </li>
            )}
            <li className='nav-link-item'>
              <div
                className='badge-container'
                onClick={() => navigate('/wishlist')}
              >
                <div className='badge-icon nav-badge-icon'>
                  <span className='material-icons-outlined'>
                    favorite_border
                  </span>
                </div>
                {token && state.wishlist.length > 0 && (
                  <div className='badge-number background-online'>
                    {state.products.reduce(
                      (acc, curr) => (curr.wished ? acc + 1 : acc),
                      0
                    )}
                  </div>
                )}
              </div>
            </li>
            <li className='nav-link-item'>
              <div
                className='badge-container'
                onClick={() => navigate('/cartlist')}
              >
                <div className='badge-icon nav-badge-icon'>
                  <span className='material-icons-outlined'>shopping_cart</span>
                </div>
                {token && state.cartlist.length > 0 && (
                  <div className='badge-number background-online'>
                    {state.products.reduce(
                      (acc, curr) => (curr.carted ? acc + 1 : acc),
                      0
                    )}
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className='nav-mobile-down nav-mobile'>
        <input
          placeholder='search'
          className='nav-search brd-rd-semi-sq nav-text-input'
          type='search'
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.target.value === '') {
              dispatch({
                type: ActionType.ChangeFilter,
                payload: {
                  filterType: Filters.Search,
                  filterValue: e.target.value,
                },
              });
              navigate('/products');
            }
          }}
        />
      </div>
    </nav>
  );
};
