import { SortBy } from '../DataReducer/constants';
import { toast } from 'react-toastify';

const union = (...arr) => {
  const uni = arr.reduce((acc, curr) => {
    return acc.concat(
      curr.filter((el) => !acc.some((ele) => ele._id === el._id))
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
  if (rating === '') return data;
  const rate = Number(rating);
  return data.filter((el) => Number(el.rating) >= rate);
};
const sortByPrice = (data, sortCat) => {
  if (sortCat === '') return data;
  if (sortCat === SortBy.HighToLow)
    return [...data].sort((a, b) => b.price - a.price);
  else if (sortCat === SortBy.LowToHigh)
    return [...data].sort((a, b) => a.price - b.price);
};
const priceRangeFilter = (data, maxValue) => {
  return data.filter((el) => Number(el.price) <= maxValue);
};
const searchFilter = (data, keyword) => {
  if (keyword === '') return data;
  return data.filter((el) =>
    el.title.toLowerCase().includes(keyword.toLowerCase())
  );
};
const validateMobileNo = (input) => {
  return /^[0-9]+$/.test(input);
};
const validatePinCode = (input) => {
  return /^[0-9]+$/.test(input) && input.length === 6;
};
const validateOnlyString = (input) => {
  return /^[a-z A-Z]+$/.test(input) || input.length === 0;
};
const validateEmail = (input) => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    input.toLowerCase()
  );
};
const validatePassword = (input) => {
  return /^(?=.{8,20}$)\D*\d/.test(input);
};
const ToastHandler = (type, message) => {
  if (type === 'error') {
    toast.error(message, {
      position: 'bottom-right',
      autoClose: 1000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else if (type === 'warn') {
    toast.warn(message, {
      position: 'bottom-right',
      autoClose: 1000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else if (type === 'success') {
    toast.success(message, {
      position: 'bottom-right',
      autoClose: 1000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else if (type === 'info') {
    toast.info(message, {
      position: 'bottom-right',
      autoClose: 1000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};
export {
  categoryFilter,
  sizeFilter,
  ratingFilter,
  sortByPrice,
  priceRangeFilter,
  searchFilter,
  validateMobileNo,
  validatePinCode,
  validateOnlyString,
  validateEmail,
  ToastHandler,
  validatePassword,
};
