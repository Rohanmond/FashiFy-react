import { useAuth } from '../../../../contexts';
import './Details.css';

export const Details = () => {
  const { currUser: user } = useAuth();
  console.log(user);
  return (
    <div className='profile-details-container'>
      <div className='profile-details-item'>
        <p className='profile-details-item-label'>Name</p>
        <p>{user.name}</p>
      </div>
      <div className='profile-details-item'>
        <p className='profile-details-item-label'>Email</p>
        <p>{user.email}</p>
      </div>
      <div className='profile-details-footer'>
        <button className='btn btn-primary background-danger brd-rd-semi-sq'>
          Logout
        </button>
      </div>
    </div>
  );
};
