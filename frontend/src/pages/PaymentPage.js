import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
// import { savePaymentMethod } from "../actions/cartActions";
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
    navigate("/summary");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h2>Payment Method</h2>
      <Form onSubmit={submitHandler} className="mt-3">
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Debit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
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
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-2">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
