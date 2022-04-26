import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../contexts';
import './Details.css';

export const Details = () => {
  const { currUser: user, logoutHandler } = useAuth();
  const navigate = useNavigate();
  const ProfileLogoutHandler = () => {
    logoutHandler();
    navigate('/logout');
  };

  return (
    <div className='profile-details-container'>
      <div className='profile-details-item'>
        <p className='profile-details-item-label'>Name</p>
        <p>{user?.name}</p>
      </div>
      <div className='profile-details-item'>
        <p className='profile-details-item-label'>Email</p>
        <p>{user?.email}</p>
      </div>
      <div className='profile-details-footer'>
        <button
          onClick={ProfileLogoutHandler}
          className='btn btn-primary background-danger brd-rd-semi-sq'
        >
          Logout
        </button>
      </div>
    </div>
  );
};
