import { useData } from '../../../../../../contexts/data-context';

import './AddressList.css';
import { Address } from './components/Address';

export const AddressList = () => {
  const { state } = useData();

  return (
    <>
      {state.addressList.length === 0 ? (
        <div className='addresslist-empty-placeholder'>
          <h3>No address to display</h3>
        </div>
      ) : (
        <ul className='list-stacked address-list brd-rd-semi-sq'>
          {state.addressList.map((el) => {
            return <Address addressItem={el} key={el.id} />;
          })}
        </ul>
      )}
    </>
  );
};
