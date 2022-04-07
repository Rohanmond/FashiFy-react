import { Plane } from 'react-loader-spinner';
import './Loader.css';
export const Loader = () => {
  return (
    <div className='loader'>
      <Plane color={'var(--primary-color)'} />
    </div>
  );
};
