import { useState, useEffect } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

const categories = [
  "Electronics",
  "Clothing",
  "Books",
  "Home & Kitchen",
  "Toys",
  "Sports",
  "Beauty",
  "Automotive",
  "Health",
  "Garden",
];

function ProductsForm({ initialData, onSubmit }) {
  const [product, setProduct] = useState({
    id: "",
    productName: "",
    productDescription: "",
    price: 0,
    quantity: 0,
    category: "",
    categoryId: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setProduct(initialData);
    } else {
      handleProductReset();
    }
  }, [initialData]);

  const handleProductValidation = () => {
    let errors = {};
    if (!product.productName) {
      errors.productName = "Product name is required";
    }
    if (!product.price || product.price <= 0) {
      errors.price = "Product price must be greater than 0";
    }
    if (!product.quantity || product.quantity <= 0) {
      errors.quantity = "Product quantity must be greater than 0";
    }
    if (!product.category) {
      errors.category = "Product category is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProductReset = () => {
    setProduct({
      id: "",
      productName: "",
      productDescription: "",
      price: 0,
      quantity: 0,
      category: "",
    });
  };

  const handleProductInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleProductFormSubmit = (event) => {
    event.preventDefault();
    if (handleProductValidation()) {
      onSubmit(product);
      handleProductReset();
    }
  };

  return (
    <div>
      <h4 className="m-3 text-center">Add New Product</h4>
      <Form onSubmit={handleProductFormSubmit}>
        <Row>
          <Col>
            <Card className="p-3">
              <Card.Title>Product Details</Card.Title>
              <Card.Body>
                <Form.Group controlId="productName">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter product name"
                    name="productName"
                    value={product.productName}
                    onChange={handleProductInputChange}
                    isInvalid={!!errors.productName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.productName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="productDescription">
                  <Form.Label>Product Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter product description"
                    name="productDescription"
                    value={product.productDescription}
                    onChange={handleProductInputChange}
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="productPrice">
                      <Form.Label>Product Price</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter product price"
                        name="price"
                        value={product.price}
                        onChange={handleProductInputChange}
                        isInvalid={!!errors.price}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.price}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="productQuantity">
                      <Form.Label>Product Quantity</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter product quantity"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleProductInputChange}
                        isInvalid={!!errors.quantity}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.quantity}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="productCategory">
                  <Form.Label>Product Category</Form.Label>
                  <Form.Control
                    as="select"
                    name="category"
                    value={product.category}
                    onChange={handleProductInputChange}
                    isInvalid={!!errors.category}
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.category}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" className="mt-3">
                  {initialData ? "Update Product" : "Add Product"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default ProductsForm;
