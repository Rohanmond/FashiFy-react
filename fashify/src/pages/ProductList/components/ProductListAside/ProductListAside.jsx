import { useData } from "../../../../contexts/data-context";
import "./ProductListAside.css";
export const ProductListAside = () => {
  const { state, dispatch } = useData();
  return (
    <aside className="productlist-aside nav-desktop">
      <div className="productlist-aside-header">
        <p className="font-wt-bold">Filters</p>
        <p
          style={{ cursor: "pointer" }}
          //   onClick={() => {
          //     dispatch({ type: "clearFilter" });
          //   }}
        >
          Clear
        </p>
      </div>
      <div className="productlist-aside-item">
        <p className="font-wt-bold">Price</p>
        <div className="productlist-slider-label">
          <p className="text-secondary-color">0</p>
          <p className="text-secondary-color">500</p>
          <p className="text-secondary-color">1000</p>
        </div>
        <div className="productlist-input-container">
          <input
            type="range"
            name="rangeInput"
            className="slider"
            min="0"
            max="999"
            // value={state.filter.maxPrice}
            // onChange={(e) => {
            //   dispatch({
            //     type: "filter",
            //     payload: ["maxPrice", e.target.value],
            //   });
            //   console.log(e.target.value);
            // }}
          />
        </div>
      </div>
      <div className="productlist-aside-item">
        <p className="font-wt-bold">Categories</p>
        <div className="productlist-input-container">
          {state.filters.categories &&
            Object.keys(state.filters.categories).map((cat) => {
              return (
                <div className="productlist-input-item-hz">
                  <input
                    type="checkbox"
                    name="category-checkbox"
                    id={`${cat}-checkbox`}
                    //   checked={state.filter.category.men}
                    //   onChange={() =>
                    //     dispatch({
                    //       type: "filter",
                    //       payload: [
                    //         "category",
                    //         {
                    //           ...state.filter.category,
                    //           men: !state.filter.category.men,
                    //         },
                    //       ],
                    //     })
                    //   }
                  />
                  <label for={`${cat}-checkbox`}>{cat}</label>
                </div>
              );
            })}
        </div>
      </div>
      <div className="productlist-aside-item">
        <p className="font-wt-bold">Sizes</p>
        <div className="productlist-input-container">
          {state.filters.sizes &&
            Object.keys(state.filters.sizes).map((size) => {
              return (
                <div className="productlist-input-item-hz">
                  <input
                    type="checkbox"
                    name="category-checkbox"
                    id={`${size}-checkbox`}
                    //   checked={state.filter.category.men}
                    //   onChange={() =>
                    //     dispatch({
                    //       type: "filter",
                    //       payload: [
                    //         "category",
                    //         {
                    //           ...state.filter.category,
                    //           men: !state.filter.category.men,
                    //         },
                    //       ],
                    //     })
                    //   }
                  />
                  <label for={`${size}-checkbox`}>{size}</label>
                </div>
              );
            })}
        </div>
      </div>

      <div className="productlist-aside-item">
        <p className="font-wt-bold">Rating</p>
        <div className="productlist-input-container">
          <div className="productlist-input-item-hz">
            <input
              type="radio"
              name="rating-radio"
              id="4star-radio"
              value="4star"
              //   checked={state.filter.rating === "4-star" ? true : false}
              //   onChange={() =>
              //     dispatch({
              //       type: "filter",
              //       payload: ["rating", "4-star"],
              //     })
              //   }
            />
            <label for="4star-radio">4 stars &#38; above</label>
          </div>
          <div className="productlist-input-item-hz">
            <input
              type="radio"
              name="rating-radio"
              id="3star-radio"
              value="3star"
              //   checked={state.filter.rating === "3-star" ? true : false}
              //   onChange={() =>
              //     dispatch({
              //       type: "filter",
              //       payload: ["rating", "3-star"],
              //     })
              //   }
            />
            <label for="3star-radio">3 stars &#38; above</label>
          </div>
          <div className="productlist-input-item-hz">
            <input
              type="radio"
              name="rating-radio"
              id="2star-radio"
              value="2star"
              //   checked={state.filter.rating === "2-star" ? true : false}
              //   onChange={() =>
              //     dispatch({
              //       type: "filter",
              //       payload: ["rating", "2-star"],
              //     })
              //   }
            />
            <label for="2star-radio">2 stars &#38; above</label>
          </div>
          <div className="productlist-input-item-hz">
            <input
              type="radio"
              name="rating-radio"
              id="1star-radio"
              value="1star"
              //   checked={state.filter.rating === "1-star" ? true : false}
              //   onChange={() =>
              //     dispatch({
              //       type: "filter",
              //       payload: ["rating", "1-star"],
              //     })
              //   }
            />
            <label for="1star-radio">1 stars &#38; above</label>
          </div>
        </div>
      </div>
      <div className="productlist-aside-item">
        <p className="font-wt-bold">Sort by Price</p>
        <div className="productlist-input-container">
          <div className="productlist-input-item-hz">
            <input
              type="radio"
              name="sortby-radio"
              id="lowtohigh-radio"
              value="lowtohigh"
              //   checked={
              //     state.filter.sortByPrice === "low-to-high" ? true : false
              //   }
              //   onChange={() =>
              //     dispatch({
              //       type: "filter",
              //       payload: ["sortByPrice", "low-to-high"],
              //     })
              //   }
            />
            <label for="lowtohigh-radio">price - Low to High</label>
          </div>
          <div className="productlist-input-item-hz">
            <input
              type="radio"
              name="sortby-radio"
              id="hightolow-radio"
              value="hightolow"
              //   checked={
              //     state.filter.sortByPrice === "high-to-low" ? true : false
              //   }
              //   onChange={() =>
              //     dispatch({
              //       type: "filter",
              //       payload: ["sortByPrice", "high-to-low"],
              //     })
              //   }
            />
            <label for="hightolow-radio">price - High to Low</label>
          </div>
        </div>
      </div>
    </aside>
  );
};
