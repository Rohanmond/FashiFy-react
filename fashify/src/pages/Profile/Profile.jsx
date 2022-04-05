import './Profile.css';
import { NavLink, Outlet } from 'react-router-dom';

export const Profile = () => {
  return (
    <div className='profile-outer-container'>
      <div className='profile-container'>
        <div className='profile-nav'>
          <NavLink to={'/profile/details'}>Profile Information</NavLink>
          <NavLink to={'/profile/addresses'}>Addresses</NavLink>
          <NavLink to={'/profile/orders'}>Order History</NavLink>
        </div>
        <div className='profile-details'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
