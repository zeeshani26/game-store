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
      <h2>Shipping</h2>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="address">
          <FormLabel>Address</FormLabel>
          <FormControl
            type="text"
            value={address}
            placeholder="Enter Address"
            required
            onChange={(e) => setAddress(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="city">
          <FormLabel>City</FormLabel>
          <FormControl
            type="text"
            value={city}
            placeholder="Enter city"
            required
            onChange={(e) => setCity(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="pin">
          <FormLabel>Pin Code</FormLabel>
          <FormControl
            type="text"
            value={pin}
            placeholder="Enter PIN Code"
            required
            onChange={(e) => setPin(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="country">
          <FormLabel>Country</FormLabel>
          <FormControl
            type="text"
            value={country}
            placeholder="Enter Country"
            required
            onChange={(e) => setCountry(e.target.value)}
          ></FormControl>
        </FormGroup>
        <Button type="submit" variant="primary" className="mt-3">
          Continue to Payment
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
