import './Home.css';
import { useNavigate } from 'react-router-dom';
import { ImageSlider } from './ImageSlider';

export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='home-container'>
        <div className='home-hero-img-container'>
          <img
            onClick={() => navigate('/products')}
            className='img-responsive home-hero-img'
            src='https://res.cloudinary.com/donqbxlnc/image/upload/v1648837512/fashify/01042022-D-Unisex-topbannercarousel-p3-brands-4090_bwk2pu.jpg'
            alt='home-image'
          />
        </div>

        <div className='home-subheading-image'>
          <img
            src='https://res.cloudinary.com/donqbxlnc/image/upload/v1648895557/fashify/0b21bba9-e1e2-4dd9-ac99-4a759abe68801648705771876-Shop-By-Category_w2adx7.webp'
            alt=''
          />
        </div>
        <div className='home-cards'>
          <div className='card-container card-container-hz home-card-container card-container-shadow brd-rd-semi-sq'>
            <div className='card-img-container-hz home-card-img-container'>
              <img
                className='card-img index-card-img brd-rd-semi-sq'
                src='https://res.cloudinary.com/donqbxlnc/image/upload/v1647264510/myntra_photo1_hcu9qe.webp'
                alt='card image'
              />
            </div>
            <div className='card-content'>
              <div className='card-text'>
                <div>NEW ARRIVAL</div>
              </div>
              <div className='card-footer-elements'>
                <div className='card-footer-elements'>
                  <div className='home-card-footer-title'>
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
          <div className='card-container card-container-hz home-card-container card-container-shadow brd-rd-semi-sq'>
            <div className='card-img-container-hz home-card-img-container'>
              <img
                className='card-img index-card-img brd-rd-semi-sq'
                src='https://res.cloudinary.com/donqbxlnc/image/upload/v1647264549/myntra_photo_2_rtagrf.webp'
                alt='card image'
              />
            </div>
            <div className='card-content'>
              <div className='card-text'>
                <div>NEW ARRIVAL</div>
              </div>
              <div className='card-footer-elements'>
                <div className='home-card-footer-title'>
                  <h3>Winter Collection</h3>
                </div>
                <p>
                  Check out our best winter collection to stay warm in style
                  this season
                </p>
              </div>
            </div>
          </div>
          <div className='card-container card-container-hz home-card-container card-container-shadow brd-rd-semi-sq'>
            <div className='card-img-container-hz home-card-img-container'>
              <img
                className='card-img index-card-img brd-rd-semi-sq'
                src='https://res.cloudinary.com/donqbxlnc/image/upload/v1647264610/myntra_photo_3_xms4by.webp'
                alt='card image'
              />
            </div>

            <div className='card-content'>
              <div className='card-text'>
                <div>NEW ARRIVAL</div>
              </div>
              <div className='card-footer-elements'>
                <div className='card-footer-elements'>
                  <div className='home-card-footer-title'>
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
