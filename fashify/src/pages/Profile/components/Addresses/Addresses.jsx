import './Addresses.css';
import { AddressForm } from './components/AddressForm/AddressForm';

export const Addresses = () => {
  return (
    <div className='address-outer-container'>
      <div className='address-container'>
        <div className='header'>
          <h3>Manage your addresses</h3>
        </div>
        <AddressForm />
      </div>
    </div>
  );
};
