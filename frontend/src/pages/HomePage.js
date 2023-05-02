import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Load from "../components/Load";
import Message from "../components/Message";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";

const HomePage = () => {
  const { query, pageNumber = 1 } = useParams();
  // console.log(pageNumber);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(query, pageNumber));
  }, [dispatch, query, pageNumber]);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
  return (
    <>
      <h1>Most Bought...</h1>
      {loading ? (
        <Load />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((el) => (
              <Col key={el._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={el} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={query ? query : ""} />
        </>
      )}
    </>
  );
};

export default HomePage;
