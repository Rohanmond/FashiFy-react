import { useEffect, useRef } from 'react';
import { Footer } from '../../../../components';
import { useData } from '../../../../contexts';
import { useFilterHook } from '../../../../Hooks/FilterHook';
import { usePagination } from '../../../../Hooks/Pagination';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductListMain.css';

export const ProductListMain = () => {
  const { state } = useData();
  const { filteredData } = useFilterHook();
  const gridRef = useRef();
  const { setThreshold, totalPages, setCurrPage, pagedData, currPage } =
    usePagination(filteredData);

  const getThresholdValue = () => {
    return (
      Math.ceil(
        8 /
          window
            .getComputedStyle(gridRef.current)
            .getPropertyValue('grid-template-columns')
            .split(' ').length
      ) *
      window
        .getComputedStyle(gridRef.current)
        .getPropertyValue('grid-template-columns')
        .split(' ').length
    );
  };
  useEffect(() => {
    if (gridRef.current) {
      const val = getThresholdValue();

      console.log(val);
      setThreshold(val);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (gridRef.current) {
        const val = getThresholdValue();

        console.log(val);
        setThreshold(val);
      }
    });
    return () => window.removeEventListener('resize');
  }, [gridRef]);
  return (
    <main className='productlist-main'>
      <div className='productlist-main-header'>
        <p className='font-wt-bold'>Showing All Products</p>
      </div>
      <div ref={gridRef} className='productlist-main-card-container'>
        {pagedData.length === 0 ? (
          <p className='font-weight-bold text-lg'>No product to display!</p>
        ) : null}
        {pagedData.map((el) => {
          return <ProductCard product={el} key={el._id} />;
        })}
      </div>
      <div className='pagination-container'>
        {Array.apply(0, Array(totalPages)).map((el, i) => {
          return (
            <div
              key={i}
              className={`pagination-item ${
                currPage === i && 'pagination-active'
              }`}
              onClick={() => setCurrPage(i)}
            >
              <p>{i + 1}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
};
