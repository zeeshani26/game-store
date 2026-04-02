import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { USER_DETAILS_RESET } from "../constants/userConstants";

const OrderSummaryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  if (!cart.shippingAddress.address) {
    navigate("/shipping");
  } else if (!cart.paymentMethod) {
    navigate("/payment");
  }

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 500 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [navigate, success, dispatch, order]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <h1 className="section-heading mb-4">Review your order</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush" className="content-panel">
            <ListGroup.Item>
              <h2 className="section-subheading">Shipping</h2>
              <p className="mb-0 text-muted">
                <strong className="text-dark">Address:</strong>{" "}
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.pin}, {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 className="section-subheading">Payment</h2>
              <p className="mb-0">
                <strong className="text-dark">Method:</strong>{" "}
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 className="section-subheading">Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush" className="border-0">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index} className="px-0 border-bottom">
                      <Row className="align-items-center">
                        <Col xs={3} md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col xs={12} md={4} className="text-md-end mt-2 mt-md-0">
                          {item.qty} × ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm rounded-4 order-summary-sidebar cart-summary-card mt-4 mt-md-0">
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-transparent border-0 pt-4 px-4">
                <h2 className="section-subheading mb-3">Order summary</h2>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0 px-4">
                <Row className="text-muted">
                  <Col>Items</Col>
                  <Col className="text-end fw-semibold text-dark">
                    ${cart.itemsPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0 px-4">
                <Row className="text-muted">
                  <Col>Shipping</Col>
                  <Col className="text-end fw-semibold text-dark">
                    ${cart.shippingPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0 px-4">
                <Row className="text-muted">
                  <Col>Tax</Col>
                  <Col className="text-end fw-semibold text-dark">
                    ${cart.taxPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0 px-4">
                <Row>
                  <Col className="fw-bold text-dark">Total</Col>
                  <Col
                    className="text-end fw-bold fs-5"
                    style={{ color: "var(--gs-orange)" }}
                  >
                    ${cart.totalPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0 px-4">
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0 px-4 pb-4">
                <Button
                  type="button"
                  className="btn-store-primary w-100 py-2"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderSummaryPage;
