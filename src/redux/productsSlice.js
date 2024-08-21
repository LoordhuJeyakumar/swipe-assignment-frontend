import { createSlice } from "@reduxjs/toolkit";
import { productsDetailArray } from "../utils/productDetails";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: productsDetailArray || [],
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const { id, name, price, categoryId } = action.payload;
      const product = state.products.find((product) => product.id === id);
      if (product) {
        product.name = name;
        product.price = price;
        product.categoryId = categoryId;
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
