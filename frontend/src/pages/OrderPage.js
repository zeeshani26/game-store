import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Load from "../components/Load";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
  cancelOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVERED_RESET,
} from "../constants/orderConstants";

const OrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDelivered = useSelector((state) => state.orderDelivered);
  const { loading: loadingDelivered, success: successDelivered } =
    orderDelivered;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderOwnerId = order?.user?._id || order?.user;
  const isOrderOwner =
    userInfo &&
    orderOwnerId &&
    String(orderOwnerId) === String(userInfo._id);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const displayItemsPrice =
    order && Array.isArray(order.orderItems)
      ? addDecimals(
          order.orderItems.reduce(
            (acc, item) => acc + item.price * item.qty,
            0
          )
        )
      : "0.00";

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || order._id !== id || successPay || successDelivered) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVERED_RESET });
      dispatch(getOrderDetails(id));
    } else if (!order.isPaid && !order.isCancelled) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, id, order, navigate, userInfo, successPay, successDelivered]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
  };

  const handleDelivered = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Load />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1 className="section-heading mb-1">Order</h1>
      <p className="text-muted small font-monospace mb-2">{order._id}</p>
      {order.isCancelled && (
        <div className="mb-4">
          <Message variant="warning">
            This order was cancelled. Inventory has been released back to the
            catalog.
          </Message>
        </div>
      )}
      <Row>
        <Col md={8}>
          <ListGroup variant="flush" className="content-panel">
            <ListGroup.Item>
              <h2 className="section-subheading">Shipping</h2>
              <p className="mb-1">
                <strong className="text-dark">Name:</strong> {order.user.name}
              </p>
              <p className="mb-1">
                <strong className="text-dark">Email:</strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p className="mb-3">
                <strong className="text-dark">Address:</strong>{" "}
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode || order.shippingAddress.pin},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="warning">Not delivered yet</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 className="section-subheading">Payment</h2>
              <p className="mb-3">
                <strong className="text-dark">Method:</strong>{" "}
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="warning">Awaiting payment</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 className="section-subheading">Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush" className="border-0">
                  {order.orderItems.map((item, index) => (
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
                          {item.qty} × ₹{item.price} = ₹{item.qty * item.price}
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
          <Card className="border-0 shadow-sm rounded-4 cart-summary-card mt-4 mt-md-0 order-summary-sidebar">
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-transparent border-0 pt-4 px-4">
                <h2 className="section-subheading mb-3">Order summary</h2>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0 px-4">
                <Row className="text-muted">
                  <Col>Items</Col>
                  <Col className="text-end fw-semibold text-dark">
                    ₹{displayItemsPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0 px-4">
                <Row className="text-muted">
                  <Col>Shipping</Col>
                  <Col className="text-end fw-semibold text-dark">
                    ₹{order.shippingPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="bg-transparent border-0 px-4">
                <Row className="text-muted">
                  <Col>Tax</Col>
                  <Col className="text-end fw-semibold text-dark">
                    ₹{order.taxPrice}
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
                    ₹{order.totalPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              {isOrderOwner && !order.isPaid && !order.isCancelled && (
                <ListGroup.Item className="bg-transparent border-0 px-4">
                  <Button
                    variant="outline-danger"
                    className="w-100 mb-3"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Cancel this unpaid order? Stock will be returned for other customers."
                        )
                      ) {
                        dispatch(cancelOrder(order._id));
                      }
                    }}
                  >
                    Cancel order
                  </Button>
                </ListGroup.Item>
              )}
              {!order.isPaid && !order.isCancelled && (
                <ListGroup.Item className="bg-transparent border-0 px-4">
                  {loadingPay && <Load />}
                  {!sdkReady ? (
                    <Load />
                  ) : (
                    <div className="paypal-wrap py-2">
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    </div>
                  )}
                </ListGroup.Item>
              )}
              {loadingDelivered && <Load />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item className="bg-transparent border-0 px-4 pb-4">
                    <Button
                      type="button"
                      className="btn-store-primary w-100 py-2"
                      onClick={handleDelivered}
                    >
                      Mark as delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
