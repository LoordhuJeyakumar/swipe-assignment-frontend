import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BiPlus, BiTrash } from "react-icons/bi";
import EditableField from "./EditableField";
import { ButtonGroup, Form } from "react-bootstrap";

const InvoiceItem = (props) => {
  const {
    onItemizedItemEdit,
    currency,
    onRowDel,
    items,
    onRowAdd,
    products,
    errors,
    setErrors,
    handleGoToProductForm,
  } = props;

  const itemTable = items.map((item) => {
    return (
      <ItemRow
        onItemizedItemEdit={onItemizedItemEdit}
        onDelEvent={onRowDel}
        item={item}
        currency={currency}
        key={item.itemId}
        products={products}
        errors={errors}
        setErrors={setErrors}
        handleGoToProductForm={handleGoToProductForm}
      />
    );
  });

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>QTY</th>
            <th>PRICE/RATE</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>{itemTable}</tbody>
      </Table>
      <Button className="fw-bold" onClick={onRowAdd}>
        Add Item
      </Button>
    </div>
  );
};

const ItemRow = (props) => {
  const {
    item,
    products,
    onItemizedItemEdit,
    errors,
    setErrors,
    handleGoToProductForm,
  } = props;

  const onDelEvent = () => {
    props.onDelEvent(item);
  };

  const validateFields = () => {
    const errors = {};

    if (item.itemName.trim() === "") {
      errors.itemName = "Item name is required.";
    }

    if (isNaN(item.itemQuantity) || item.itemQuantity <= 0) {
      errors.itemQuantity = "Item quantity must be greater than 0.";
    }

    if (isNaN(item.itemPrice) || item.itemPrice <= 0) {
      errors.itemPrice = "Item price must be greater than 0.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleItemEdit = (e) => {
    const { name, value } = e.target;
    const error = validateFields(name, value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [`${name}_${item.itemId}`]: error,
    }));

    onItemizedItemEdit(e, item.itemId);
  };

  const handleProductSelect = (e) => {
    const selectedProductName = e.target.value;
    const selectedProduct = products.find(
      (product) => product.productName === selectedProductName
    );

    if (selectedProduct) {
      // Update all necessary fields in a single call
      onItemizedItemEdit(
        {
          target: {
            name: "itemData",
            value: {
              itemName: selectedProduct.productName,
              itemPrice: selectedProduct.price,
              itemDescription: selectedProduct.productDescription || "",
              itemQuantity: 1,
              category: selectedProduct.category,
              categoryId: selectedProduct.categoryId,
            },
          },
        },
        item.itemId
      );

      // Clear any existing errors for this item
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[`itemName_${item.itemId}`];
        delete newErrors[`itemPrice_${item.itemId}`];
        delete newErrors[`itemQuantity_${item.itemId}`];
        return newErrors;
      });
    } else {
      console.log("Product not found");
    }
  };

  return (
    <>
      <tr>
        <td className="d-flex">
          <Form.Select
            onChange={handleProductSelect}
            name="itemName"
            value={item.itemName}
          >
            <option value="">Select a product</option>
            {products.length > 0 &&
              products.map((product) => (
                <option key={product.id} value={product.productName}>
                  {product.productName}
                </option>
              ))}
          </Form.Select>
          {/* Add product button icon */}
          <ButtonGroup>
            <Button
              onClick={handleGoToProductForm}
              variant="outline-primary p-2"
              size="sm"
            >
              <BiPlus />
            </Button>
          </ButtonGroup>
        </td>
        <td></td>
      </tr>
      <tr>
        <td style={{ width: "100%" }}>
          <EditableField
            onItemizedItemEdit={handleItemEdit}
            cellData={{
              type: "text",
              name: "itemName",
              placeholder: "Item name",
              value: item.itemName,
              id: item.itemId,
            }}
            error={errors[`itemName_${item.itemId}`]}
          />

          {/*  {errors[`itemName_${item.itemId}`] && (
            <Form.Text className="text-danger">
              {errors[`itemName_${item.itemId}`]}
            </Form.Text>
          )} */}

          <EditableField
            onItemizedItemEdit={handleItemEdit}
            cellData={{
              type: "text",
              name: "itemDescription",
              placeholder: "Item description",
              value: item.itemDescription,
              id: item.itemId,
            }}
          />
        </td>
        <td style={{ minWidth: "70px" }}>
          <EditableField
            onItemizedItemEdit={handleItemEdit}
            cellData={{
              type: "number",
              name: "itemQuantity",
              min: 1,
              step: "1",
              value: item.itemQuantity,
              id: item.itemId,
            }}
            error={errors[`itemQuantity_${item.itemId}`]}
          />
          {/* {errors[`itemQuantity_${item.itemId}`] && (
            <Form.Text className="text-danger">
              {errors[`itemQuantity_${item.itemId}`]}
            </Form.Text>
          )} */}
        </td>
        <td style={{ minWidth: "130px" }}>
          <EditableField
            onItemizedItemEdit={handleItemEdit}
            cellData={{
              leading: props.currency,
              type: "number",
              name: "itemPrice",
              min: 1,
              step: "0.01",
              presicion: 2,
              textAlign: "text-end",
              value: item.itemPrice,
              id: item.itemId,
            }}
            error={errors[`itemPrice_${item.itemId}`]}
          />
          {/* {errors[`itemPrice_${item.itemId}`] && (
            <Form.Text className="text-danger">
              {errors[`itemPrice_${item.itemId}`]}
            </Form.Text>
          )} */}
        </td>
        <td className="text-center" style={{ minWidth: "50px" }}>
          <BiTrash
            onClick={onDelEvent}
            style={{ height: "33px", width: "33px", padding: "7.5px" }}
            className="text-white mt-1 btn btn-danger"
          />
        </td>
      </tr>
    </>
  );
};

export default InvoiceItem;
