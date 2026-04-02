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
import { pushRecentProductId } from "../utils/recentlyViewed";
import { normalizeCategoryLabelForDisplay } from "../utils/categoryOptions";

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

  useEffect(() => {
    if (id) pushRecentProductId(id);
  }, [id]);

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
        <Button variant="outline-secondary" className="btn-outline-store my-3">
          ← Back to store
        </Button>
      </Link>
      {loading ? (
        <Load />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row className="justify-content-around g-4">
            <Col md={6} lg={5}>
              <div className="product-detail-image p-2 bg-white rounded-4 shadow-sm">
                <Image src={product.image} alt={product.name} fluid rounded />
              </div>
            </Col>
            <Col md={6} lg={6} xl={5} className="mt-sm-4 mt-md-0">
              <ListGroup variant="flush" className="content-panel">
                <ListGroup.Item>
                  <h1 className="section-heading h4 mb-2">{product.name}</h1>
                  <p className="text-muted small mb-0">
                    {product.publisher} ·{" "}
                    {normalizeCategoryLabelForDisplay(product.category)}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="price-tag d-block">₹{product.price}</span>
                </ListGroup.Item>
                <ListGroup.Item className="product-description text-muted">
                  {product.description}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong className="text-dark">Availability: </strong>
                  <span
                    className={
                      product.countInStock > 0 ? "text-success" : "text-danger"
                    }
                  >
                    {product.countInStock > 0
                      ? `${product.countInStock} in stock`
                      : "Out of stock"}
                  </span>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row className="text-dark">
                      <Col className="fw-semibold">Qty</Col>
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
                  <Link to={"/cart"} className="text-decoration-none">
                    <Button
                      className="btn-block btn-store-primary"
                      type="button"
                      disabled={product.countInStock <= 0}
                      onClick={addToCartHandler}
                    >
                      Add to cart
                    </Button>
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col lg={8}>
              <h2 className="section-heading">Reviews</h2>
              {product.reviews.length === 0 && (
                <Message>No reviews yet — be the first.</Message>
              )}
              <ListGroup variant="flush" className="content-panel mt-3">
                {product.reviews.map((el) => (
                  <ListGroup.Item key={el._id}>
                    <strong>{el.name}</strong>
                    <Rating value={el.rating} />
                    <p>{el.createdAt.substring(0, 10)}</p>
                    <p>{el.comment}</p>
                  </ListGroup.Item>
                ))}
                {!product.reviews.some((rev) => rev.user === userInfo?._id) && (
                  <ListGroup.Item className="border-top">
                    <h3 className="h5 fw-bold mb-3 text-dark">
                      Write a review
                    </h3>
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
                            rows={3}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button
                          disabled={loadingReview}
                          type="submit"
                          className="mt-2 btn-store-primary"
                        >
                          Submit review
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
