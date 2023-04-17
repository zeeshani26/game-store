import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";

const ShippingPage = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <FormContainer>
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
        <FormGroup controlId="address">
          <FormLabel>Postal Code</FormLabel>
          <FormControl
            type="text"
            value={postalCode}
            placeholder="Enter Postal Code"
            required
            onChange={(e) => setPostalCode(e.target.value)}
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
        <Button type="submit" variant="primary">
          Continue to Payment
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
