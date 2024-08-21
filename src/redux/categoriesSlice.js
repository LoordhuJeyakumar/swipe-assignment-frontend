// redux/categoriesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: [
    { id: "1", name: "Electronics" },
    { id: "2", name: "Clothing" },
    { id: "3", name: "Books" },
    { id: "4", name: "Home & Kitchen" },
    { id: "5", name: "Toys" },
    { id: "6", name: "Sports" },
    { id: "7", name: "Beauty" },
    { id: "8", name: "Automotive" },
    { id: "9", name: "Health" },
    { id: "10", name: "Garden" },
    { id: "11", name: "Accessories" },
    { id: "12", name: "Wearables" },
    { id: "13", name: "Home" },
    { id: "14", name: "Cameras" },
  ],
  reducers: {
    addCategory: (state, action) => {
      state.push(action.payload);
    },
    updateCategory: (state, action) => {
      const { id, name } = action.payload;
      const category = state.find((cat) => cat.id === id);
      if (category) {
        category.name = name;
      }
    },
    deleteCategory: (state, action) => {
      return state.filter((cat) => cat.id !== action.payload);
    },
  },
});

export const { addCategory, updateCategory, deleteCategory } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;
