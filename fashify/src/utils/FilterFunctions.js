import { SortBy } from "../DataReducer/constants";

const union = (...arr) => {
  const uni = arr.reduce((acc, curr) => {
    return acc.concat(
      curr.filter((el) => !acc.some((ele) => ele.id === el.id))
    );
  }, []);

  return uni;
};
const categoryFilter = (productData, category) => {
  let newData = [];
  let flag = false;
  for (const cat in category) {
    if (category[cat]) {
      flag = true;
      newData = union(
        newData,
        productData.filter((el) => el.category === cat)
      );
    }
  }
  if (flag) return newData;
  return productData;
};
const sizeFilter = (productData, sizes) => {
  let flag = false;
  let newData = [];
  for (const size in sizes) {
    if (sizes[size]) {
      flag = true;
      newData = union(
        newData,
        productData.filter((el) => el.size === size)
      );
    }
  }
  if (flag) return newData;
  return productData;
};
const ratingFilter = (data, rating) => {
  if (rating === "") return data;
  const rate = Number(rating);
  return data.filter((el) => Number(el.rating) >= rate);
};
const sortByPrice = (data, sortCat) => {
  if (sortCat === "") return data;
  if (sortCat === SortBy.HighToLow)
    return [...data].sort((a, b) => b.price - a.price);
  else if (sortCat === SortBy.LowToHigh)
    return [...data].sort((a, b) => a.price - b.price);
};
const priceRangeFilter = (data, maxValue) => {
  return data.filter((el) => Number(el.price) <= maxValue);
};

export {
  categoryFilter,
  sizeFilter,
  ratingFilter,
  sortByPrice,
  priceRangeFilter,
};
