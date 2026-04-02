import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions";

const PaymentPage = () => {
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);
  const navigate = useNavigate();
  if (!shippingAddress.address) {
    navigate("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/order");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1 className="section-heading mb-3">Payment method</h1>
      <p className="text-muted small mb-4">
        Choose how you would like to pay. PayPal supports cards where available.
      </p>
      <Form onSubmit={submitHandler} className="mt-1">
        <Form.Group>
          <Form.Label as="legend" className="fw-semibold">
            Select method
          </Form.Label>
          <Col className="mb-2">
            <Form.Check
              type="radio"
              label="PayPal or debit / credit card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Check
              type="radio"
              label="UPI"
              id="UPI"
              name="paymentMethod"
              value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Button type="submit" className="btn-store-primary w-100 mt-4 py-2">
          Continue to review
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
