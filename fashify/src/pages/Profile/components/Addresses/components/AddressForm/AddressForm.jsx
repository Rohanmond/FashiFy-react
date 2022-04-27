import './AddressForm.css';

export const AddressForm = () => {
  const formOnSubmitHandler = () => {};
  const formData = {
    name: '',
    mobile: '',
    pincode: '',
    city: '',
    address: '',
    alternatemobile: '',
    state: '',
  };
  const formOnChangeHandler = () => {};
  const resetFormData = () => {};
  const generateRandomData = () => {};
  const toggle = () => {};
  return (
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
            <option value='Andhra Pradesh'>Andhra Pradesh</option>
            <option value='Arunachal Pradesh'>Arunachal Pradesh</option>
            <option value='Assam'>Assam</option>
            <option value='Bihar'>Bihar</option>
            <option value='Chhattisgarh'>Chhattisgarh</option>
            <option value='Delhi'>Delhi</option>
            <option value='Goa'>Goa</option>
            <option value='Gujarat'>Gujarat</option>
            <option value='Haryana'>Haryana</option>
            <option value='Himachal Pradesh'>Himachal Pradesh</option>
            <option value='Jharkhand'>Jharkhand</option>
            <option value='Karnataka'>Karnataka</option>
            <option value='Kerala'>Kerala</option>
            <option value='Madhya Pradesh'>Madhya Pradesh</option>
            <option value='Maharashtra'>Maharashtra</option>
            <option value='Manipur'>Manipur</option>
            <option value='Meghalaya'>Meghalaya</option>
            <option value='Mizoram'>Mizoram</option>
            <option value='Nagaland'>Nagaland</option>
            <option value='Odisha'>Odisha</option>
            <option value='Punjab'>Punjab</option>
            <option value='Rajasthan'>Rajasthan</option>
            <option value='Sikkim'>Sikkim</option>
            <option value='Tamil Nadu'>Tamil Nadu</option>
            <option value='Telangana'>Telangana</option>
            <option value='Tripura'>Tripura</option>
            <option value='Uttar Pradesh'>Uttar Pradesh</option>
            <option value='Uttarakhand'>Uttarakhand</option>
            <option value='West Bengal'>West Bengal</option>
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
            type='reset'
            onClick={resetFormData}
          />
        </div>
        <div className='form-column'>
          <input
            className='form-input-field btn btn-secondary outlined-primary'
            type='button'
            onClick={generateRandomData}
            value='random data'
          />
        </div>
        <div className='form-column'>
          <input
            className='form-input-field btn btn-primary background-danger'
            type='button'
            onClick={toggle}
            value='cancel'
          />
        </div>
      </div>
    </form>
  );
};
