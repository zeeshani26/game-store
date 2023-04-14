import React, { useEffect, useState } from "react";
import Rating from "../components/Rating";
import { Row, Col, ListGroup, Image, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  return (
    <>
      <Link to="/">
        <Button className="btn-dark my-3 ">Go Back</Button>
      </Link>
      <Row className="justify-content-around">
        <Col md={6} lg={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={6} lg={6} xl={5} className="mt-sm-4 mt-md-0">
          <ListGroup>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Price : ₹{product.price}</strong>
            </ListGroup.Item>
            <ListGroup.Item>Description : {product.description}</ListGroup.Item>
            <ListGroup.Item>
              Status:{" "}
              <strong>
                {product.countInStock > 0 ? "In stock" : "Out of stock"}
              </strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                className="btn-block"
                type="button"
                disabled={product.countInStock <= 0}
              >
                Add To Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default SingleProduct;
