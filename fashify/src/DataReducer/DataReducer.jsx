import { ActionType } from "./constants";

export const initialState = {
  filters: {
    sortBy: "",
    priceRange: "",
    categories: {},
    rating: "",
    sizes: {},
  },
  products: [],
  showNav: true,
};
export const DataReducer = (state, action) => {
  switch (action.type) {
    case ActionType.InitialDataFetch: {
      if (action.payload.products) {
        return { ...state, products: [...action.payload.products] };
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
    default:
      return state;
  }
};
