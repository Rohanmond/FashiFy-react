import './Home.css';
import { useNavigate } from 'react-router-dom';

import { categoryFilter } from '../../utils/utils';
import { useData } from '../../contexts/data-context';
import { ActionType, Filters } from '../../DataReducer/constants';
import { useEffect } from 'react';
import { Footer } from '../../components';

export const Home = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useData();

  useEffect(() => {
    dispatch({ type: ActionType.ClearFilter });
  }, []);
  const categoryFilter = (cat) => {
    dispatch({
      type: ActionType.ChangeFilter,
      payload: {
        filterType: Filters.Categories,
        filterValue: {
          ...Object.keys(state.filters.categories).reduce((acc, curr) => {
            return { ...acc, [curr]: false };
          }, {}),
          [cat]: true,
        },
      },
    });
    navigate('/products');
  };
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
          <div
            onClick={() => categoryFilter('Men')}
            className='card-container card-container-hz home-card-container card-container-shadow brd-rd-semi-sq'
          >
            <div className='card-img-container-hz home-card-img-container'>
              <img
                className='card-img index-card-img brd-rd-semi-sq'
                src='https://res.cloudinary.com/donqbxlnc/image/upload/v1648896074/fashify/e3220043-d4db-4c8a-9a5e-80459db0aae31648190230381-Roadster-_HL_fan7lo.webp'
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
                    <h3>Men Collection</h3>
                  </div>
                  <p>Check out our best men collection</p>
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={() => categoryFilter('Women')}
            className='card-container card-container-hz home-card-container card-container-shadow brd-rd-semi-sq'
          >
            <div className='card-img-container-hz home-card-img-container'>
              <img
                className='card-img index-card-img brd-rd-semi-sq'
                src='https://res.cloudinary.com/donqbxlnc/image/upload/v1648896554/fashify/4f54b81d-51ca-4526-bab3-04066d977f5a1648368745195-Levis_keqmez.webp'
                alt='card image'
              />
            </div>
            <div className='card-content'>
              <div className='card-text'>
                <div>NEW ARRIVAL</div>
              </div>
              <div className='card-footer-elements'>
                <div className='home-card-footer-title'>
                  <h3>Women Collection</h3>
                </div>
                <p>Check out our best women collection</p>
              </div>
            </div>
          </div>
          <div
            onClick={() => categoryFilter('Kids')}
            className='card-container card-container-hz home-card-container card-container-shadow brd-rd-semi-sq'
          >
            <div className='card-img-container-hz home-card-img-container'>
              <img
                className='card-img index-card-img brd-rd-semi-sq'
                src='https://res.cloudinary.com/donqbxlnc/image/upload/v1648516936/fashify/67b2f5d2-3064-4389-98e4-8ce05b4c354f1647513608806-Allen-Solly-Junior-Boys-Navy-Blue-Slim-Fit-Geometric-Print-P-1_ecyumj.webp'
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
                    <h3>Kids Collection</h3>
                  </div>
                  <p>Check out our best kids collection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
