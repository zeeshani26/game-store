import React, { useEffect, useState } from "react";
import Rating from "../components/Rating";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  FormControl,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Message from "../components/Message";
import Load from "../components/Load";
import { addToCart } from "../actions/cartActions";

const SingleProduct = () => {
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);
  const addToCartHandler = () => {
    dispatch(addToCart(id, qty));
  };

  return (
    <>
      {loading ? (
        <Load />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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
                <ListGroup.Item>
                  Description : {product.description}
                </ListGroup.Item>
                <ListGroup.Item>
                  Status:{" "}
                  <strong>
                    {product.countInStock > 0 ? "In stock" : "Out of stock"}
                  </strong>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <FormControl
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </FormControl>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Link to={"/cart"}>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock <= 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default SingleProduct;
