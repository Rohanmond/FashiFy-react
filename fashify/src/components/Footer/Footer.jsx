import { Link } from 'react-router-dom';
import './Footer.css';
export const Footer = () => {
  return (
    <footer className='main-footer'>
      <div className='footer-links'>
        <a
          target={'_blank'}
          href='https://twitter.com/RohanMo33437915'
          className='fab fa-twitter'
        ></a>
        <a
          target={'_blank'}
          href='https://github.com/Rohanmond'
          className='fab fa-github'
        ></a>
        <a
          target={'_blank'}
          href='https://www.linkedin.com/in/rohanmondal/'
          className='fab fa-linkedin'
        ></a>
      </div>
      <div className='footer-text'>© No Copyright, Feel free to replicate.</div>
    </footer>
  );
};
