import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ProductsForm from "../components/ProductsForm";
import { useProducts } from "../redux/useProducts";
import ProductList from "../components/ProductList";
import { addProduct, updateProduct } from "../redux/productsSlice";
import generateRandomId from "../utils/generateRandomId";

function Products() {
  const { products } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const [editProductData, setEditProductData] = useState(null);
  const productsPerPage = 5;
  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (product) => {
    setEditProductData(product);
  };

  const handleFormSubmit = (product) => {
    if (editProductData) {
      dispatch(updateProduct(product));
      setEditProductData(null);
    } else {
      // handle add new product
      dispatch(addProduct({ ...product, id: generateRandomId() }));
    }
  };

  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="100-vh">
      <ProductsForm initialData={editProductData} onSubmit={handleFormSubmit} />
      <ProductList
        products={currentProducts}
        currentPage={currentPage}
        totalPages={Math.ceil(products.length / productsPerPage)}
        onPageChange={handlePageChange}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default Products;
