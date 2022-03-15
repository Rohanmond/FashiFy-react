import "./Home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div class="home-container">
        <div class="home-subheader">
          <div class="home-subheader-item">
            <a
              class="btn btn-link-secondary outlined-secondary brd-rd-semi-sq"
              href="./pages/productionlist/productList.html"
            >
              MEN
            </a>
          </div>
          <div class="home-subheader-item">
            <a
              class="btn btn-link-secondary outlined-secondary brd-rd-semi-sq"
              href="./pages/productionlist/productList.html"
            >
              WOMEN
            </a>
          </div>
          <div class="home-subheader-item">
            <a
              class="btn btn-link-secondary outlined-secondary brd-rd-semi-sq"
              href="./pages/productionlist/productList.html"
            >
              KIDS
            </a>
          </div>
          <div class="home-subheader-item">
            <a
              class="btn btn-link-secondary outlined-secondary brd-rd-semi-sq"
              href="./pages/productionlist/productList.html"
            >
              HOME & LIVING
            </a>
          </div>
          <div class="home-subheader-item">
            <a
              class="btn btn-link-secondary outlined-secondary brd-rd-semi-sq"
              href="./pages/productionlist/productList.html"
            >
              BEAUTY
            </a>
          </div>
        </div>

        <div class="home-hero-img-container">
          <img
            onClick={() => navigate("/products")}
            class="img-responsive home-hero-img"
            src="https://res.cloudinary.com/donqbxlnc/image/upload/v1647264442/heroimage_vrvxcz.gif"
            alt="home-image"
          />
        </div>

        <div class="home-subheading-text text-align-center">
          <h2>DEALS OF THE DAY</h2>
        </div>
        <div class="home-cards">
          <div class="card-container card-container-hz home-card-container card-container-shadow brd-rd-semi-sq">
            <div class="card-img-container-hz home-card-img-container">
              <img
                class="card-img index-card-img brd-rd-semi-sq"
                src="https://res.cloudinary.com/donqbxlnc/image/upload/v1647264510/myntra_photo1_hcu9qe.webp"
                alt="card image"
              />
            </div>
            <div class="card-content">
              <div class="card-text">
                <div>NEW ARRIVAL</div>
              </div>
              <div class="card-footer-elements">
                <div class="card-footer-elements">
                  <div class="home-card-footer-title">
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
          <div class="card-container card-container-hz home-card-container card-container-shadow brd-rd-semi-sq">
            <div class="card-img-container-hz home-card-img-container">
              <img
                class="card-img index-card-img brd-rd-semi-sq"
                src="https://res.cloudinary.com/donqbxlnc/image/upload/v1647264549/myntra_photo_2_rtagrf.webp"
                alt="card image"
              />
            </div>
            <div class="card-content">
              <div class="card-text">
                <div>NEW ARRIVAL</div>
              </div>
              <div class="card-footer-elements">
                <div class="home-card-footer-title">
                  <h3>Winter Collection</h3>
                </div>
                <p>
                  Check out our best winter collection to stay warm in style
                  this season
                </p>
              </div>
            </div>
          </div>
          <div class="card-container card-container-hz home-card-container card-container-shadow brd-rd-semi-sq">
            <div class="card-img-container-hz home-card-img-container">
              <img
                class="card-img index-card-img brd-rd-semi-sq"
                src="https://res.cloudinary.com/donqbxlnc/image/upload/v1647264610/myntra_photo_3_xms4by.webp"
                alt="card image"
              />
            </div>
            <div class="card-content">
              <div class="card-text">
                <div>NEW ARRIVAL</div>
              </div>
              <div class="card-footer-elements">
                <div class="card-footer-elements">
                  <div class="home-card-footer-title">
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
