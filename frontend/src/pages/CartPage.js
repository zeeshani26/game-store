import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
  Modal,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import Message from "../components/Message";

const CartPage = () => {
  //   const { id } = useParams();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    if (userInfo) {
      navigate("/shipping");
    }
    setShowModal(true);
  };

  return (
    <div className="py-3">
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please login to continue!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>
        <Col md={8}>
          <h1 className="section-heading">Shopping cart</h1>
          <p className="text-muted small mb-4">
            Review items and quantities before checkout. Shipping and tax are
            calculated on the next steps.
          </p>
          {cartItems.length === 0 ? (
            <Message>
              Your Cart is Empty,
              <Link to="/"> Go back to products </Link>
            </Message>
          ) : (
            <ListGroup
              variant="flush"
              className="rounded-4 overflow-hidden shadow-sm border bg-white"
            >
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row className="text">
                    <Col
                      md={2}
                      className="mt-sm-3 mt-md-0 d-flex justify-content-center align-items-center"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                        className="mx-auto img-fluid rounded"
                      />
                    </Col>
                    <Col
                      md={4}
                      className="mt-sm-3 mt-md-0 mt-sm-3 mt-md-0 d-flex justify-content-center align-items-center"
                    >
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col
                      md={2}
                      className="mt-sm-3 mt-md-0 mt-sm-3 mt-md-0 d-flex justify-content-center align-items-center"
                    >
                      {item.price}
                    </Col>

                    {/* CHANGE THE QUANTITY OF SELECTED PRODUCT */}
                    <Col
                      md={2}
                      className="mt-sm-3 mt-md-0 d-flex justify-content-center align-items-center"
                    >
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) => {
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          );
                        }}
                        className="mt-sm-3 mt-md-0 centered-options"
                      >
                        {[...Array(item.countInStock)].map((x, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>

                    <Col
                      md={2}
                      className="mt-sm-3 mt-md-0 d-flex justify-content-center align-items-center"
                    >
                      <Button
                        type="button"
                        variant="light"
                        onClick={(e) => removeFromCartHandler(item.product)}
                        className="mt-sm-3 mt-md-0"
                      >
                        X
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col md={4}>
          <Card className="my-5 border-0 shadow-sm rounded-4 cart-summary-card">
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-transparent border-0 pt-4 px-4">
                <h4 className="h5 fw-bold text-dark">
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h4>
                <p className="mb-0 fs-4 fw-bold" style={{ color: "var(--gs-orange)" }}>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.price * item.qty, 0)
                    .toFixed(2)}
                </p>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0 px-4 pb-4">
                <Button
                  type="button"
                  className="btn-block btn-store-primary py-2"
                  disabled={!cartItems.length}
                  onClick={checkoutHandler}
                >
                  Proceed to checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
