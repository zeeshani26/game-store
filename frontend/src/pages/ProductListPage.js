import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Load from "../components/Load";
import { listProducts, deleteProduct } from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productContants";
import { useNavigate } from "react-router-dom";

const ProductListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.productDelete);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login");
    }

    dispatch(listProducts("", 1, "", "", { adminList: true }));
  }, [dispatch, navigate, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    navigate("/admin/product/new/edit");
  };

  return (
    <>
      <Row className="align-items-center admin-page-toolbar flex-wrap gap-3">
        <Col xs={12} md="auto" className="me-auto">
          <h1 className="section-heading mb-2 mb-md-0">Products</h1>
          <p className="text-muted small mb-0">
            Admin: edit catalog, pricing, and stock.
          </p>
        </Col>
        <Col xs={12} md="auto">
          <Button
            className="btn-store-primary px-4"
            onClick={createProductHandler}
          >
            <i className="fas fa-plus me-2" aria-hidden />
            Create product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Load />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Load />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="table-responsive rounded-3 shadow-sm border bg-white">
          <Table
            striped
            bordered
            hover
            responsive
            className="store-table table-sm table-responsive-sm mb-0"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Publisher</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="text-break small">{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.publisher}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="btn-outline-store me-1"
                      >
                        <i className="fas fa-edit" aria-hidden />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => deleteHandler(product._id)}
                      aria-label="Delete product"
                    >
                      <i className="fas fa-trash" aria-hidden />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default ProductListPage;
