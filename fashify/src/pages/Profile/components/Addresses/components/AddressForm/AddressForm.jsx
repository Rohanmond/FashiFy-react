import { useState } from 'react';

import { faker } from '@faker-js/faker';
import './AddressForm.css';
import { useData } from '../../../../../../contexts/data-context';
import { ActionType } from '../../../../../../DataReducer/constants';
import { v4 as uuid } from 'uuid';

export const AddressForm = ({
  openAddressForm,
  setOpenAddressForm,
  filledAddressForm,
}) => {
  const formInitialObj = {
    name: '',
    mobile: '',
    pincode: '',
    city: '',
    address: '',
    alternatemobile: '',
    state: '',
  };
  const [formData, setFormData] = useState(
    filledAddressForm ? filledAddressForm : formInitialObj
  );
  const { state, dispatch } = useData();
  const stateArr = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Delhi',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
  ];

  const formOnSubmitHandler = (e) => {
    e.preventDefault();
    if (!filledAddressForm) {
      dispatch({
        type: ActionType.AddAddress,
        payload: { address: { id: uuid(), ...formData } },
      });
    } else {
      dispatch({
        type: ActionType.EditAddress,
        payload: { address: formData },
      });
    }
    resetFormData();
    setOpenAddressForm(false);
  };

  const formOnChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetFormData = () => {
    setFormData(formInitialObj);
  };

  const generateRandomData = () => {
    setFormData({
      name: faker.name.findName(),
      mobile: faker.datatype.number({ min: 1000000000, max: 9999999999 }),
      pincode: faker.address.zipCode('######'),
      city: faker.address.city(),
      address: faker.address.streetAddress(),
      alternatemobile: faker.datatype.number({
        min: 1000000000,
        max: 9999999999,
      }),
      state: stateArr[Math.floor(Math.random() * (stateArr.length - 1))],
    });
  };

  return (
    <>
      {openAddressForm ? (
        <form className='form-input' onSubmit={formOnSubmitHandler}>
          <div className='form-row'>
            <div className='form-column'>
              <input
                className='form-input-field'
                placeholder='name'
                type='text'
                name='name'
                value={formData.name}
                onChange={formOnChangeHandler}
                required
              />
            </div>
            <div className='form-column'>
              <input
                className='form-input-field'
                placeholder='mobile no.'
                type='number'
                name='mobile'
                value={formData.mobile}
                onChange={formOnChangeHandler}
                required
              />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-column'>
              <input
                className='form-input-field'
                placeholder='pincode'
                type='number'
                name='pincode'
                value={formData.pincode}
                onChange={formOnChangeHandler}
                required
              />
            </div>
            <div className='form-column'>
              <input
                className='form-input-field'
                placeholder='city'
                name='city'
                value={formData.city}
                onChange={formOnChangeHandler}
                type='text'
                required
              />
            </div>
          </div>
          <div className='form-form-row'>
            <textarea
              className='form-input-field text-area'
              placeholder='address'
              name='address'
              type='text'
              rows='5'
              value={formData.address}
              onChange={formOnChangeHandler}
              required
            ></textarea>
          </div>
          <div className='form-row'>
            <div className='form-column'>
              <input
                className='form-input-field'
                placeholder='alternate ph(optional)'
                type='number'
                name='alternatemobile'
                value={formData.alternatemobile}
                onChange={formOnChangeHandler}
              />
            </div>
            <div className='form-column'>
              <select
                className='form-input-field'
                value={formData.state}
                name='state'
                onChange={formOnChangeHandler}
                required
              >
                <option value='' disabled>
                  choose state
                </option>
                {stateArr.map((el) => {
                  return (
                    <option key={el} value={el}>
                      {el}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className='form-row'>
            <div className='form-column'>
              <input
                className='form-input-field btn btn-primary background-primary'
                type='submit'
                value='Add'
              />
            </div>
            <div className='form-column'>
              <input
                className='form-input-field btn btn-secondary outlined-primary'
                type='Reset'
                onClick={resetFormData}
              />
            </div>
            <div className='form-column'>
              <input
                className='form-input-field btn btn-secondary outlined-primary'
                type='button'
                onClick={generateRandomData}
                value='Random data'
              />
            </div>
            <div className='form-column'>
              <input
                className='form-input-field btn btn-primary background-danger'
                type='button'
                onClick={() => setOpenAddressForm(false)}
                value='Cancel'
              />
            </div>
          </div>
        </form>
      ) : (
        <div
          className='controller-container'
          onClick={() => {
            setOpenAddressForm(true);
            resetFormData();
          }}
        >
          <button className='btn btn-primary background-primary brd-rd-semi-sq'>
            <i className='fas fa-plus'></i>
          </button>
          <p className='add-address-label'>Add new address</p>
        </div>
      )}
    </>
  );
};
