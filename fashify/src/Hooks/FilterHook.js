import { useData } from '../contexts/data-context';
import {
  categoryFilter,
  priceRangeFilter,
  ratingFilter,
  searchFilter,
  sizeFilter,
  sortByPrice,
} from '../utils/utils';

export const useFilterHook = () => {
  const { state } = useData();

  const { filters, products } = state;

  const applyFilters = (products, filters) => {
    const { sortBy, categories, rating, sizes, priceRange, search } = filters;
    let newData = [...products];
    newData = searchFilter(newData, search);

    newData = priceRangeFilter(newData, priceRange);
    newData = categoryFilter(newData, categories);
    newData = sizeFilter(newData, sizes);
    newData = ratingFilter(newData, rating);
    newData = sortByPrice(newData, sortBy);
    return newData;
  };

  const newData = applyFilters(products, filters);
  return { filteredData: newData };
};
