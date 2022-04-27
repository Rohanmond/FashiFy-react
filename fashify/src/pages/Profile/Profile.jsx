import './Profile.css';
import { NavLink, Outlet } from 'react-router-dom';

export const Profile = () => {
  const toggleActive = ({ isActive }) => {
    return isActive ? 'nav-link-active' : 'nav-link';
  };
  return (
    <div className='profile-outer-container'>
      <div className='profile-container'>
        <div className='profile-nav'>
          <NavLink
            to={'/profile/details'}
            className={`profile-nav-item ${toggleActive}`}
          >
            Profile Information
          </NavLink>
          {/*address management and order management will be added later on*/}
          <NavLink
            to={'/profile/addresses'}
            className={`profile-nav-item ${toggleActive}`}
          >
            Addresses
          </NavLink>
          <NavLink
            to={'/profile/orders'}
            className={`profile-nav-item ${toggleActive}`}
          >
            Order History
          </NavLink>
        </div>
        <div className='profile-details'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
