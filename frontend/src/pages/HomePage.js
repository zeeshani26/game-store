import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Load from "../components/Load";
import Message from "../components/Message";
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

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
      {!query ? (
        <>
          <h1>Essental Buys...</h1>
          <ProductCarousel />
        </>
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      {loading ? (
        <Load />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row className="mt-5">
            {products.map((el) => (
              <Col key={el._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={el} />
              </Col>
            ))}
          </Row>
          <div className="pagination">
            <Paginate pages={pages} page={page} keyword={query ? query : ""} />
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
