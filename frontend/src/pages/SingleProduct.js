import React, { useEffect, useState } from "react";
import Rating from "../components/Rating";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  FormControl,
  Form,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import Message from "../components/Message";
import Load from "../components/Load";
import { addToCart } from "../actions/cartActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productContants";

const SingleProduct = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {
    loading: loadingReview,
    error: errorReview,
    success: successReview,
  } = productCreateReview;

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (successReview) {
      alert("Review Submitted Successfully");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(id));
  }, [dispatch, id, successReview]);

  const addToCartHandler = () => {
    dispatch(addToCart(id, qty));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link to="/">
        <Button className="btn-dark my-3 ">Go Back</Button>
      </Link>
      {loading ? (
        <Load />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
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
          <Row className="mt-3">
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((el) => (
                  <ListGroup.Item key={el._id}>
                    <strong>{el.name}</strong>
                    <Rating value={el.rating} />
                    <p>{el.createdAt.substring(0, 10)}</p>
                    <p>{el.comment}</p>
                  </ListGroup.Item>
                ))}
                {!product.reviews.some((rev) => rev.user === userInfo?._id) && (
                  <ListGroup.Item>
                    <h2>Write a Customer Review</h2>
                    {successReview && (
                      <Message variant="success">
                        Review submitted successfully
                      </Message>
                    )}
                    {loadingReview && <Load />}
                    {errorReview && (
                      <Message variant="danger">{errorReview}</Message>
                    )}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating" className="mt-2">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Awesome</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment" className="mt-2">
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as="textarea"
                            row="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button
                          disabled={loadingReview}
                          type="submit"
                          variant="primary"
                          className="mt-2"
                        >
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to="/login">Sign In</Link> to write a
                        review{" "}
                      </Message>
                    )}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default SingleProduct;
