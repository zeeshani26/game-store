import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("api/products");
      setProducts(data);
    };
    fetchProducts();
  }, []);

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
