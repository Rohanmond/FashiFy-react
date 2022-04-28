import { useNavigate } from 'react-router-dom';
import { useData } from '../../../../contexts';
import './Orders.css';

export const Orders = () => {
  const { state } = useData();
  const navigate = useNavigate();

  return (
    <>
      {state.orderList.length === 0 ? (
        <div className='order-placeholder-container'>
          <h3 className='text-align-center'>No order to display</h3>
        </div>
      ) : (
        <div className='order-outer-container'>
          <div className='order-container'>
            {state.orderList.map((el) => {
              return (
                <div key={el.id} className='order-item-container'>
                  <div className='order-item-left'>
                    <p className='font-wt-semibold'>
                      payment id:{' '}
                      <span className='text-secondary-color'>{el.id}</span>
                    </p>
                    <p className='font-wt-semibold'>
                      Total amount:{' '}
                      <span className='text-secondary-color'>₹{el.amount}</span>
                    </p>
                    <p className='font-wt-semibold'>
                      Order date:{' '}
                      <span className='text-secondary-color'>
                        {el.date.toDateString()}
                      </span>
                    </p>
                    <p className='font-wt-semibold'>
                      Order will be delivered in{' '}
                      {el.cart.reduce((acc, curr) => {
                        if (Number(curr.delivery_time) > acc)
                          return curr.delivery_time;
                        return acc;
                      }, 0)}{' '}
                      days
                    </p>
                    <p className='font-wt-semibold'>Order address:</p>
                    <p className='font-wt-semibold text-secondary-color text-align-center'>
                      {el.address.address} {el.address.city} {el.address.state}
                    </p>
                    <p className='font-wt-semibold'>
                      Mobile:{' '}
                      <span className='text-secondary-color'>
                        {el.address.mobile}
                      </span>{' '}
                      pin:{' '}
                      <span className='text-secondary-color'>
                        {el.address.pincode}
                      </span>
                    </p>
                  </div>
                  <div className='order-item-right'>
                    {el.cart.map((item) => {
                      return (
                        <div
                          key={item._id}
                          className='card-container card-container-hz brd-rd-semi-sq cart-card-container'
                        >
                          <div className='card-img-container-hz cart-card-img-container'>
                            <img
                              className='card-img brd-rd-semi-sq'
                              src={item.image}
                              alt='card'
                              onClick={() => navigate(`/product/${item._id}`)}
                            />
                          </div>
                          <div className='card-content'>
                            <div className='cart_mngmt-card-container'>
                              <div className='cart_mngmt-card-item'>
                                <h4
                                  className='cursor-pointer'
                                  onClick={() =>
                                    navigate(`/product/${item._id}`)
                                  }
                                >
                                  {item.title}
                                </h4>
                              </div>
                              <div className='cart_mngmt-card-item'>
                                <p className='font-wt-semibold'>
                                  ₹ {item.price}
                                </p>
                                <p className='text-secondary-color'>
                                  <del>{item.original_price}</del>
                                </p>
                              </div>
                              <div className='cart_mngmt-card-item'>
                                <div className='text-secondary-color font-wt-bold'>
                                  {Math.floor(
                                    ((item.original_price - item.price) /
                                      item.original_price) *
                                      100
                                  )}
                                  % OFF
                                </div>
                              </div>
                              <div className='cart_mngmt-card-item'>
                                <p>Quantity: {item.qty}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
