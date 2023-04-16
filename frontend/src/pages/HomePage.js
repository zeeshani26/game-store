import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Load from "../components/Load";
import Message from "../components/Message";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  return (
    <>
      <h1>Most Bought...</h1>
      {loading ? (
        <Load />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((el) => (
            <Col key={el._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={el} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomePage;
