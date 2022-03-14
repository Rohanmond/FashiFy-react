import "./Nav.css";
import logo from "../../logos/hero-logo.png";
import { Link } from "react-router-dom";
export const Nav = () => {
  return (
    <nav className="navigation home-nav">
      <div className="nav-mobile-up">
        <div className="nav-left">
          <div className="nav-logo-container">
            <Link to="/" className="nav-logo-link">
              <img class="hero-logo" src={logo} alt="nav logo" />
              <small>FashiFy</small>
            </Link>
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
              <a
                className="btn btn-link-secondary outlined-primary brd-rd-semi-sq"
                href="./pages/authentication/login.html"
              >
                Login
              </a>
            </li>
            <li className="nav-link-item">
              <a href="./pages/wishlist/wishlist.html">
                <div className="badge-container">
                  <div className="badge-icon">
                    <span className="material-icons-outlined">
                      favorite_border
                    </span>
                  </div>
                  <div className="badge-number background-online">12</div>
                </div>
              </a>
            </li>
            <li className="nav-link-item">
              <a href="./pages/cart_mngmt/cart_mngmt.html">
                <div className="badge-container">
                  <div className="badge-icon">
                    <span className="material-icons-outlined">
                      shopping_cart
                    </span>
                  </div>
                  <div className="badge-number background-online">12</div>
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
