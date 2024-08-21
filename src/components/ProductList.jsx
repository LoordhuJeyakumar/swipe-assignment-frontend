import { useDispatch } from "react-redux";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { Button, Table, Card, Pagination } from "react-bootstrap";
import { deleteProduct } from "../redux/productsSlice";

function ProductList({
  products,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
}) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <Card className="p-3 mt-3">
      <div>
        <h4 className="m-3 text-center">Product List</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.productName}</td>
                <td>{product.productDescription}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.category}</td>
                <td>
                  <Button variant="primary" onClick={() => onEdit(product)}>
                    <BiEditAlt />
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    <BiTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination>
          <Pagination.First onClick={() => onPageChange(1)} />
          <Pagination.Prev
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last onClick={() => onPageChange(totalPages)} />
        </Pagination>
      </div>
    </Card>
  );
}

export default ProductList;
