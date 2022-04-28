import { ActionType, Filters } from './constants';

export const initialState = {
  filters: {
    sortBy: '',
    categories: {},
    rating: '',
    sizes: {},
    search: '',
    priceRange: 0,
  },
  products: [],
  wishlist: [],
  cartlist: [],
  cartPriceDetails: {},
  showNav: true,
  addressList: [
    {
      address: '8505 Christina Ridges',
      alternatemobile: 4878794411,
      city: 'West Cooper',
      id: '2364c34d-7645-49cb-8b74-4bc5cb09711d',
      mobile: 1293452481,
      name: 'Vicki McDermott',
      pincode: '820598',
      state: 'Arunachal Pradesh',
    },
  ],
  orderList: [],
};

export const DataReducer = (state, action) => {
  switch (action.type) {
    case ActionType.InitialDataFetch: {
      if (action.payload.products) {
        const maxValue = action.payload.products.reduce(
          (acc, curr) => (Number(curr.price) > acc ? Number(curr.price) : acc),
          0
        );
        return {
          ...state,
          products: action.payload.products.map((el) => {
            return { ...el, wished: false, carted: false, qty: 0 };
          }),
          filters: { ...state.filters, priceRange: maxValue },
        };
      }
      if (action.payload.categories) {
        return {
          ...state,
          filters: {
            ...state.filters,
            categories: action.payload.categories.reduce(
              (acc, curr) => ({ ...acc, [curr.categoryName]: false }),
              {}
            ),
          },
        };
      }
      if (action.payload.sizes) {
        return {
          ...state,
          filters: {
            ...state.filters,
            sizes: action.payload.sizes.reduce(
              (acc, curr) => ({ ...acc, [curr.size]: false }),
              {}
            ),
          },
        };
      }
    }
    case ActionType.ToggleNav: {
      return { ...state, showNav: action.payload };
    }
    case ActionType.ChangeFilter: {
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.filterType]: action.payload.filterValue,
        },
      };
    }
    case ActionType.ClearFilter: {
      const maxValue = state.products.reduce(
        (acc, curr) => (Number(curr.price) > acc ? Number(curr.price) : acc),
        0
      );
      return {
        ...state,
        filters: {
          ...initialState.filters,
          categories: Object.keys(state.filters.categories).reduce(
            (acc, curr) => ({ ...acc, [curr]: false }),
            {}
          ),
          sizes: Object.keys(state.filters.sizes).reduce(
            (acc, curr) => ({ ...acc, [curr]: false }),
            {}
          ),
          [Filters.PriceRange]: maxValue,
        },
      };
    }
    case ActionType.SetWishList: {
      return {
        ...state,
        wishlist: [...action.payload.wishlist],
        products: state.products.map((el) => {
          return {
            ...el,
            wished: action.payload.wishlist.some((item) => item._id === el._id),
          };
        }),
      };
    }
    case ActionType.SetCartList: {
      return {
        ...state,
        cartlist: [...action.payload.cartlist],
        products: state.products.map((el) => {
          const product = action.payload.cartlist.find(
            (item) => item._id === el._id
          );
          return {
            ...el,
            carted: product ? true : false,
            qty: product ? product.qty : 0,
          };
        }),
      };
    }
    case ActionType.SetCartPriceDetails: {
      return {
        ...state,
        cartPriceDetails: { ...action.payload.cartPriceDetails },
      };
    }
    case ActionType.ResetCartPriceDetails: {
      return {
        ...state,
        cartPriceDetails: {},
      };
    }
    case ActionType.ClearCart: {
      return {
        ...state,
        cartlist: [],
        products: state.products.map((el) => {
          return { ...el, carted: false, qty: 0 };
        }),
      };
    }
    case ActionType.AddAddress: {
      return {
        ...state,
        addressList: [...state.addressList, action.payload.address],
      };
    }
    case ActionType.EditAddress: {
      return {
        ...state,
        addressList: state.addressList.map((el) => {
          return el.id === action.payload.address.id
            ? action.payload.address
            : el;
        }),
      };
    }
    case ActionType.DeleteAddress: {
      return {
        ...state,
        addressList: state.addressList.filter(
          (el) => el.id !== action.payload.id
        ),
      };
    }
    case ActionType.ADD_ORDER: {
      return {
        ...state,
        orderList: state.orderList.concat(action.payload.order),
      };
    }
    default:
      return state;
  }
};
