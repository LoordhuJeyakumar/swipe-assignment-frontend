// hooks/useProducts.js
import { useSelector, useDispatch } from "react-redux";
import {
  addProduct,
  updateProduct,
  deleteProduct,
} from "../redux/productsSlice";
import {
  addCategory,
  updateCategory,
  deleteCategory,
} from "../redux/categoriesSlice";

export const useProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories);

  const addNewProduct = (product) => {
    dispatch(addProduct(product));
  };

  const modifyProduct = (updatedProduct) => {
    dispatch(updateProduct(updatedProduct));
  };

  const removeProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const addNewCategory = (category) => {
    dispatch(addCategory(category));
  };

  const modifyCategory = (updatedCategory) => {
    dispatch(updateCategory(updatedCategory));
  };

  const removeCategory = (categoryId) => {
    dispatch(deleteCategory(categoryId));
  };

  return {
    products,
    categories,
    addNewProduct,
    modifyProduct,
    removeProduct,
    addNewCategory,
    modifyCategory,
    removeCategory,
  };
};
