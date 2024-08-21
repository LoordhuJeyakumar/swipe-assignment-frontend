import { combineReducers } from "@reduxjs/toolkit";
import invoicesReducer from "./invoicesSlice"; // Import your other reducers
import productsReducer from "./productsSlice";
import categoriesReducer from "./categoriesSlice";

const rootReducer = combineReducers({
  invoices: invoicesReducer,
  products: productsReducer,
  categories: categoriesReducer,
});

export default rootReducer;
