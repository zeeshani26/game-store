import React from "react";
import { Col, Row } from "react-bootstrap";
import products from "../product";
import Product from "../components/Product";

const HomePage = () => {
  return (
    <>
      <h1>Most Bought...</h1>
      <Row>
        {products.map((el) => (
          <Col key={el._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={el} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;
