import { useData } from '../../../../contexts';
import './Orders.css';

export const Orders = () => {
  const { state } = useData();

  console.log(state);
  return <div>Orders</div>;
};
