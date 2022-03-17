import { ActionType, Filters } from "./constants";

export const initialState = {
  filters: {
    sortBy: "",
    categories: {},
    rating: "",
    search: "",
    sizes: {},
    priceRange: 0,
  },
  products: [],
  wishlist: [],
  cartlist: [],
  showNav: true,
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
          products: [...action.payload.products],
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
        wishlist: action.payload.wishlist,
      };
    }
    case ActionType.SetCartList: {
      return {
        ...state,
        cartlist: action.payload.cartlist,
      };
    }
    default:
      return state;
  }
};
