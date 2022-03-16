import "./Nav.css";
import logo from "../../logos/hero-logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { useData } from "../../contexts/data-context";
export const Nav = () => {
  const { token } = useAuth();
  const { state } = useData();
  const navigate = useNavigate();
  return (
    <nav className="navigation home-nav">
      <div className="nav-mobile-up">
        <div className="nav-left">
          <div className="nav-logo-container">
            <div onClick={() => navigate("/")} className="nav-logo-link">
              <img className="hero-logo" src={logo} alt="nav logo" />
              <small>FashiFy</small>
            </div>
          </div>
        </div>
        <div className="nav-mid nav-desktop">
          <input
            placeholder="search"
            className="nav-search brd-rd-semi-sq nav-text-input"
            type="text"
          />
        </div>
        <div className="nav-right">
          <ul className="nav-links">
            <li className="nav-link-item nav-link-item-btn">
              {!token && (
                <button
                  onClick={() => navigate("/login")}
                  className="btn btn-secondary outlined-primary brd-rd-semi-sq"
                  to={"/login"}
                >
                  Login
                </button>
              )}
            </li>
            <li className="nav-link-item">
              <div
                className="badge-container"
                onClick={() => navigate("/wishlist")}
              >
                <div className="badge-icon">
                  <span className="material-icons-outlined">
                    favorite_border
                  </span>
                </div>
                {token && (
                  <div className="badge-number background-online">
                    {state.wishlist.length}
                  </div>
                )}
              </div>
            </li>
            <li className="nav-link-item">
              <a href="./pages/cart_mngmt/cart_mngmt.html">
                <div className="badge-container">
                  <div className="badge-icon">
                    <span className="material-icons-outlined">
                      shopping_cart
                    </span>
                  </div>
                  {token && (
                    <div className="badge-number background-online">12</div>
                  )}
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="nav-mobile-down nav-mobile">
        <input
          placeholder="search"
          className="nav-search brd-rd-semi-sq nav-text-input"
          type="text"
        />
      </div>
    </nav>
  );
};
