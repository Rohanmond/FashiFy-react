import './ProductlistDrawar.css';

import { useData } from '../../../../contexts/data-context';
import { ActionType, SortBy } from '../../../../DataReducer/constants';
import { Filters } from '../../../../DataReducer/constants';

const Rating = ['4', '3', '2', '1'];

export const ProductListDrawar = ({ open, setOpen }) => {
  const { state, dispatch } = useData();
  const maxValue = state.products.reduce(
    (acc, curr) => (Number(curr.price) > acc ? Number(curr.price) : acc),
    0
  );

  return (
    <div
      className={`product-list-drawar ${open && 'product-list-drawar-active'}`}
    >
      <i
        onClick={() => setOpen(false)}
        className='fas fa-angle-down text-lg'
      ></i>

      <div className='productlist-aside-header'>
        <p className='font-wt-bold'>Filters</p>
        <p
          style={{ cursor: 'pointer' }}
          onClick={() => {
            dispatch({ type: ActionType.ClearFilter });
          }}
        >
          Clear
        </p>
      </div>
      <div className='productlist-aside-item'>
        <p className='font-wt-bold'>Price</p>
        <div className='productlist-slider-label'>
          <p className='text-secondary-color'>0</p>
          <p className='text-secondary-color'>{maxValue / 2}</p>
          <p className='text-secondary-color'>{maxValue}</p>
        </div>
        <div className='productlist-input-container'>
          <input
            type='range'
            name='rangeInput'
            className='slider'
            min='0'
            max={maxValue}
            value={state.filters.priceRange}
            onChange={(e) => {
              dispatch({
                type: ActionType.ChangeFilter,
                payload: {
                  filterType: Filters.PriceRange,
                  filterValue: e.target.value,
                },
              });
            }}
          />
        </div>
      </div>
      <div className='productlist-aside-item'>
        <p className='font-wt-bold'>Categories</p>
        <div className='productlist-input-container'>
          {Object.keys(state.filters.categories).map((cat) => {
            return (
              <div className='productlist-input-item-hz' key={cat}>
                <input
                  type='checkbox'
                  name='category-checkbox'
                  id={`${cat}-checkbox`}
                  checked={state.filters.categories[cat]}
                  onChange={() =>
                    dispatch({
                      type: ActionType.ChangeFilter,
                      payload: {
                        filterType: Filters.Categories,
                        filterValue: {
                          ...state.filters.categories,
                          [cat]: !state.filters.categories[cat],
                        },
                      },
                    })
                  }
                />
                <label htmlFor={`${cat}-checkbox`}>{cat}</label>
              </div>
            );
          })}
        </div>
      </div>
      <div className='productlist-aside-item'>
        <p className='font-wt-bold'>Sizes</p>
        <div className='productlist-input-container'>
          {Object.keys(state.filters.sizes).map((size) => {
            return (
              <div className='productlist-input-item-hz' key={size}>
                <input
                  type='checkbox'
                  name='category-checkbox'
                  id={`${size}-checkbox`}
                  checked={state.filters.sizes[size]}
                  onChange={() =>
                    dispatch({
                      type: ActionType.ChangeFilter,
                      payload: {
                        filterType: Filters.Sizes,
                        filterValue: {
                          ...state.filters.sizes,
                          [size]: !state.filters.sizes[size],
                        },
                      },
                    })
                  }
                />
                <label htmlFor={`${size}-checkbox`}>{size}</label>
              </div>
            );
          })}
        </div>
      </div>

      <div className='productlist-aside-item'>
        <p className='font-wt-bold'>Rating</p>
        <div className='productlist-input-container'>
          {Rating.map((el) => {
            return (
              <div className='productlist-input-item-hz' key={el}>
                <input
                  type='radio'
                  name='rating-radio-aside'
                  id={`${el}-star-radio`}
                  value={el}
                  checked={state.filters.rating === el ? true : false}
                  onChange={() =>
                    dispatch({
                      type: ActionType.ChangeFilter,
                      payload: { filterType: Filters.Rating, filterValue: el },
                    })
                  }
                />
                <label htmlFor={`${el}-star-radio`}>
                  {el} stars {'&'} above
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div className='productlist-aside-item'>
        <p className='font-wt-bold'>Sort by Price</p>
        <div className='productlist-input-container'>
          {Object.values(SortBy).map((el) => {
            return (
              <div className='productlist-input-item-hz' key={el}>
                <input
                  type='radio'
                  name='sortby-radio-aside'
                  id={`${el}radio`}
                  value={el}
                  checked={state.filters.sortBy === el ? true : false}
                  onChange={() =>
                    dispatch({
                      type: ActionType.ChangeFilter,
                      payload: { filterType: Filters.SortBy, filterValue: el },
                    })
                  }
                />
                <label htmlFor={`${el}radio`}>price - {el}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
