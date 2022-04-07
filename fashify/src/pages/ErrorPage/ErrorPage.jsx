import { useNavigate } from 'react-router-dom';
import './ErrorPage.css';

export const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className='error-page-container'>
      <div className='error-page-image-container'>
        <img
          className='img-responsive'
          src='https://res.cloudinary.com/donqbxlnc/image/upload/v1649229364/Saly-44_ulssjz.png'
          alt=''
        />
      </div>

      <div className='error-page-text'>
        <div className='error-page-heading'>
          <h1>We looked everywhere</h1>
        </div>
        <div className='error-page-subheading'>
          Looks like this page is missing
        </div>
        <div>
          <button
            onClick={() => navigate('/')}
            className='btn btn-primary background-primary brd-rd-semi-sq error-page-button'
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};
