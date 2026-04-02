import React from "react";
import { Col, Container, Row } from "react-bootstrap";

/** @param {{ children: React.ReactNode, wide?: boolean }} props */
const FormContainer = ({ children, wide = false }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={wide ? 10 : 8} lg={wide ? 8 : 6}>
          <div className="form-card">{children}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
