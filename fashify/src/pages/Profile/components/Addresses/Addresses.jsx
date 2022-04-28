import { useState } from 'react';
import { useData } from '../../../../contexts/data-context';
import './Addresses.css';
import { AddressForm } from './components/AddressForm/AddressForm';
import { AddressList } from './components/AddressList/AddressList';

export const Addresses = () => {
  const [openAddressForm, setOpenAddressForm] = useState(false);
  const { state } = useData();
  console.log(state);
  return (
    <div className='address-outer-container'>
      <div className='address-container'>
        <div className='header'>
          <h3>Manage your addresses</h3>
        </div>
        <AddressForm
          openAddressForm={openAddressForm}
          setOpenAddressForm={setOpenAddressForm}
        />
        <AddressList />
      </div>
    </div>
  );
};
