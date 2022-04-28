import { useState } from 'react';
import { useData } from '../../../../contexts/data-context';
import './Addresses.css';
import { AddressForm } from './components/AddressForm/AddressForm';
import { AddressList } from './components/AddressList/AddressList';

export const Addresses = () => {
  const [openAddressForm, setOpenAddressForm] = useState(false);
  const { state } = useData();

  return (
    <div className='address-outer-container'>
      {state.addressList.length === 0 ? (
        <div className='header'>
          <h3>No address to display</h3>
        </div>
      ) : null}
      <div className='address-container'>
        <AddressForm
          openAddressForm={openAddressForm}
          setOpenAddressForm={setOpenAddressForm}
        />
        <AddressList />
      </div>
    </div>
  );
};
