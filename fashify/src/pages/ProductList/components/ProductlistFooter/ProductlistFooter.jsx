import './ProductlistFooter.css';

export const ProductlistFooter = ({ setOpen }) => {
  return (
    <div className='productlist-footer-container' onClick={() => setOpen(true)}>
      <i className='fas fa-angle-up'></i>
      <p className='font-wt-semibold filters'>Filters</p>
    </div>
  );
};
