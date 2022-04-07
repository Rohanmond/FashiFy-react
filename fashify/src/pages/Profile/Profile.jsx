import './Profile.css';
import { NavLink, Outlet } from 'react-router-dom';

export const Profile = () => {
  return (
    <div className='profile-outer-container'>
      <div className='profile-container'>
        <div className='profile-nav'>
          <NavLink to={'/profile/details'} className='profile-nav-item'>
            Profile Information
          </NavLink>
          {/*address management and order management will be added later on*/}
          {/* <NavLink to={'/profile/addresses'} className='profile-nav-item'>
            Addresses
          </NavLink>
          <NavLink to={'/profile/orders'} className='profile-nav-item'>
            Order History
          </NavLink> */}
        </div>
        <div className='profile-details'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
