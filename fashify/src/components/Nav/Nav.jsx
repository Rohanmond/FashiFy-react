import './Nav.css';
import logo from '../../logos/hero-logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';
import { useData } from '../../contexts/data-context';
import { ActionType, Filters } from '../../DataReducer/constants';
import { useEffect, useState, useRef } from 'react';

import { searchFilter } from '../../utils/utils';
import { useOutsideClickHandler } from '../../Hooks/outsideClickHandler';

export const Nav = () => {
  const { token } = useAuth();
  const location = useLocation();
  const { state, dispatch } = useData();
  const [input, setInput] = useState('');
  const [searchData, setSearchData] = useState([]);
  const timerId = useRef();
  const navigate = useNavigate();
  const [showSearchOutputModal, setShowOutputModal] = useState(false);

  useEffect(() => {
    if (location.pathname !== '/products') {
      setInput('');
      dispatch({
        type: ActionType.ChangeFilter,
        payload: {
          filterType: Filters.Search,
          filterValue: '',
        },
      });
    }
  }, [location.pathname]);

  useEffect(() => {
    if (input !== '') {
      clearTimeout(timerId.current);
      timerId.current = setTimeout(() => {
        setSearchData(searchFilter(state.products, input));
      }, 500);
    } else {
      setSearchData([]);
      setShowOutputModal(false);
      dispatch({
        type: ActionType.ChangeFilter,
        payload: {
          filterType: Filters.Search,
          filterValue: '',
        },
      });
    }
  }, [input]);

  if (location.pathname === '/404') {
    return null;
  }
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
          <div className='nav-search'>
            <input
              placeholder='search'
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setShowOutputModal(true);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  dispatch({
                    type: ActionType.ChangeFilter,
                    payload: {
                      filterType: Filters.Search,
                      filterValue: e.target.value,
                    },
                  });
                  setSearchData([]);
                  setShowOutputModal(false);
                  navigate('/products');
                }
              }}
              className='nav-search-input brd-rd-semi-sq nav-text-input'
              type='search'
            />
            {showSearchOutputModal ? (
              <div className='nav-search-output-container brd-rd-semi-sq'>
                {searchData.length === 0 ? (
                  <p className='text-align-center'>No item to show</p>
                ) : (
                  searchData.map((el) => {
                    return (
                      <div
                        onClick={() => navigate(`product/${el._id}`)}
                        className='nav-search-output-item brd-rd-semi-sq'
                      >
                        <img
                          className='nav-search-output-item-image brd-rd-semi-sq'
                          src={el.image}
                          alt='nav search img'
                        />
                        <div className='nav-search-output-item-details'>
                          <div className='nav-search-output-item-upper'>
                            <p className='text-lg font-wt-semibold'>
                              {el.title}
                            </p>
                            <div className='nav-search-output-price-details'>
                              <p className='font-wt-semibold'>₹ {el.price}</p>
                            </div>
                          </div>
                          <div className='nav-search-output-item-desc'>
                            <p className='text-md'>{el.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            ) : null}
          </div>
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
                title='profile'
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
                title={'wishlist'}
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
                title='cartlist'
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
        <div className='nav-search'>
          <input
            placeholder='search'
            className='brd-rd-semi-sq nav-text-input nav-search-input'
            type='search'
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setShowOutputModal(true);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                dispatch({
                  type: ActionType.ChangeFilter,
                  payload: {
                    filterType: Filters.Search,
                    filterValue: e.target.value,
                  },
                });
                setSearchData([]);
                setShowOutputModal(false);
                navigate('/products');
              }
            }}
          />
          {showSearchOutputModal ? (
            <div className='nav-search-output-container brd-rd-semi-sq'>
              {searchData.length === 0 ? (
                <p className='text-align-center'>No item to show</p>
              ) : (
                searchData.map((el) => {
                  return (
                    <div
                      onClick={() => navigate(`product/${el._id}`)}
                      className='nav-search-output-item brd-rd-semi-sq'
                    >
                      <img
                        className='nav-output-smaller-img brd-rd-semi-sq'
                        src={el.image}
                        alt='nav search img'
                      />
                      <div className='nav-search-output-item-details'>
                        <div className='nav-search-output-item-upper nav-search-output-item-upper-smaller'>
                          <p className='text-lg font-wt-semibold'>{el.title}</p>

                          <p className='font-wt-md'>₹ {el.price}</p>
                        </div>
                        <div className='nav-search-output-item-desc'></div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};
