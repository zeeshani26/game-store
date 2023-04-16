import React from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import Message from "../components/Message";

const CartPage = () => {
  //   const { id } = useParams();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    console.log("checkout");
  };

  return (
    <div className="py-3">
      <Row>
        <Col md={8}>
          <h2>Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <Message>
              Your Cart is Empty,
              <Link to="/"> Go back to products </Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
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
          <Card className="my-5">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h4>
                ₹
                {cartItems
                  .reduce((acc, item) => acc + item.price * item.qty, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={!cartItems.length}
                  onClick={checkoutHandler}
                >
                  Check Out
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
