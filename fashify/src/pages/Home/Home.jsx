import "./Home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="home-container">
        <div className="home-subheader">
          <div className="home-subheader-item">
            <button
              className="btn btn-secondary outlined-secondary brd-rd-semi-sq"
              onClick={() => navigate("/products")}
            >
              MEN
            </button>
          </div>
          <div className="home-subheader-item">
            <button
              className="btn btn-link-secondary outlined-secondary brd-rd-semi-sq"
              onClick={() => navigate("/products")}
            >
              WOMEN
            </button>
          </div>
          <div className="home-subheader-item">
            <button
              className="btn btn-link-secondary outlined-secondary brd-rd-semi-sq"
              onClick={() => navigate("/products")}
            >
              KIDS
            </button>
          </div>
          <div className="home-subheader-item">
            <button
              className="btn btn-secondary outlined-secondary brd-rd-semi-sq"
              onClick={() => navigate("/products")}
            >
              HOME & LIVING
            </button>
          </div>
          <div className="home-subheader-item">
            <button
              className="btn btn-secondary outlined-secondary brd-rd-semi-sq"
              onClick={() => navigate("/products")}
            >
              BEAUTY
            </button>
          </div>
        </div>

        <div className="home-hero-img-container">
          <img
            onClick={() => navigate("/products")}
            className="img-responsive home-hero-img"
            src="https://res.cloudinary.com/donqbxlnc/image/upload/v1647264442/heroimage_vrvxcz.gif"
            alt="home-image"
          />
        </div>

        <div className="home-subheading-text text-align-center">
          <h2>DEALS OF THE DAY</h2>
        </div>
        <div className="home-cards">
          <div className="card-container card-container-hz home-card-container card-container-shadow brd-rd-semi-sq">
            <div className="card-img-container-hz home-card-img-container">
              <img
                className="card-img index-card-img brd-rd-semi-sq"
                src="https://res.cloudinary.com/donqbxlnc/image/upload/v1647264510/myntra_photo1_hcu9qe.webp"
                alt="card image"
              />
            </div>
            <div className="card-content">
              <div className="card-text">
                <div>NEW ARRIVAL</div>
              </div>
              <div className="card-footer-elements">
                <div className="card-footer-elements">
                  <div className="home-card-footer-title">
                    <h3>Winter Collection</h3>
                  </div>
                  <p>
                    Check out our best winter collection to stay warm in style
                    this season
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="card-container card-container-hz home-card-container card-container-shadow brd-rd-semi-sq">
            <div className="card-img-container-hz home-card-img-container">
              <img
                className="card-img index-card-img brd-rd-semi-sq"
                src="https://res.cloudinary.com/donqbxlnc/image/upload/v1647264549/myntra_photo_2_rtagrf.webp"
                alt="card image"
              />
            </div>
            <div className="card-content">
              <div className="card-text">
                <div>NEW ARRIVAL</div>
              </div>
              <div className="card-footer-elements">
                <div className="home-card-footer-title">
                  <h3>Winter Collection</h3>
                </div>
                <p>
                  Check out our best winter collection to stay warm in style
                  this season
                </p>
              </div>
            </div>
          </div>
          <div className="card-container card-container-hz home-card-container card-container-shadow brd-rd-semi-sq">
            <div className="card-img-container-hz home-card-img-container">
              <img
                className="card-img index-card-img brd-rd-semi-sq"
                src="https://res.cloudinary.com/donqbxlnc/image/upload/v1647264610/myntra_photo_3_xms4by.webp"
                alt="card image"
              />
            </div>
            <div className="card-content">
              <div className="card-text">
                <div>NEW ARRIVAL</div>
              </div>
              <div className="card-footer-elements">
                <div className="card-footer-elements">
                  <div className="home-card-footer-title">
                    <h3>Winter Collection</h3>
                  </div>
                  <p>
                    Check out our best winter collection to stay warm in style
                    this season
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
