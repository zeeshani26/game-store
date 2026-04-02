import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingPage = () => {
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [pin, setPin] = useState(shippingAddress.pin);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, pin, country }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1 className="section-heading mb-3">Shipping</h1>
      <p className="text-muted small mb-4">
        Where should we send your order confirmation and delivery updates?
      </p>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="address" className="mb-3">
          <FormLabel>Street address</FormLabel>
          <FormControl
            type="text"
            value={address}
            placeholder="Address line"
            required
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="city" className="mb-3">
          <FormLabel>City</FormLabel>
          <FormControl
            type="text"
            value={city}
            placeholder="City"
            required
            onChange={(e) => setCity(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="pin" className="mb-3">
          <FormLabel>PIN / postal code</FormLabel>
          <FormControl
            type="text"
            value={pin}
            placeholder="PIN code"
            required
            onChange={(e) => setPin(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="country" className="mb-3">
          <FormLabel>Country</FormLabel>
          <FormControl
            type="text"
            value={country}
            placeholder="Country"
            required
            onChange={(e) => setCountry(e.target.value)}
          />
        </FormGroup>
        <Button
          type="submit"
          className="btn-store-primary w-100 mt-2 py-2"
        >
          Continue to payment
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
