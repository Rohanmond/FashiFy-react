import { useData } from '../../contexts/data-context';
import { ProductCard } from '../ProductList/components';
import './WishList.css';
export const WishList = () => {
  const { state } = useData();
  const wishData = state.products.filter((el) => el.wished);
  return (
    <main className='wishlist-main-container'>
      <div className='wishlist-main-heading text-align-center'>
        {state.wishlist.length === 0 && (
          <h4>You don't have any product inside your wishlist</h4>
        )}
      </div>
      <div className='productlist-main-card-container'>
        {state.wishlist.length > 0 &&
          wishData.map((el) => {
            return <ProductCard product={el} key={el._id} />;
          })}
      </div>
    </main>
  );
};
