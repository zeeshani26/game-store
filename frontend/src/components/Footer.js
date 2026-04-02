import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const PORTFOLIO_URL = "https://zeeshani26.github.io/";

const Footer = () => {
  return (
    <footer className="store-footer py-5 mt-5">
      <Container>
        <Row className="g-4">
          <Col md={4}>
            <img
              src={`${process.env.PUBLIC_URL}/gamestore-logo.png`}
              alt=""
              className="footer-logo"
              width="56"
              height="56"
            />
            <div className="footer-brand mb-2">The Game Store</div>
            <p className="small mb-0" style={{ maxWidth: "280px" }}>
              Curated titles, fair prices, and a checkout built for gamers.
              Thanks for shopping with us.
            </p>
          </Col>
          <Col md={2} sm={6}>
            <div className="footer-heading">Shop</div>
            <ul className="list-unstyled small mb-0">
              <li className="mb-2">
                <Link to="/">All games</Link>
              </li>
              <li className="mb-2">
                <Link to="/cart">Cart</Link>
              </li>
            </ul>
          </Col>
          <Col md={2} sm={6}>
            <div className="footer-heading">Account</div>
            <ul className="list-unstyled small mb-0">
              <li className="mb-2">
                <Link to="/login">Sign in</Link>
              </li>
              <li className="mb-2">
                <Link to="/register">Create account</Link>
              </li>
              <li className="mb-2">
                <Link to="/profile">Your profile</Link>
              </li>
            </ul>
          </Col>
          <Col md={2} sm={6}>
            <div className="footer-heading">Developer</div>
            <p className="small mb-2">
              Site by{" "}
              <a
                href={PORTFOLIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-portfolio-link"
              >
                Zeeshan Ilahi
              </a>
            </p>
            <a
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-portfolio-link small d-inline-block"
            >
              View portfolio →
            </a>
          </Col>
          <Col md={2} sm={6}>
            <div className="footer-heading">Help</div>
            <p className="small mb-0">
              Secure checkout with PayPal. For support, use your account email
              after sign-in.
            </p>
          </Col>
        </Row>
        <hr
          className="my-4"
          style={{ borderColor: "rgba(250,250,249,0.12)" }}
        />
        <Row>
          <Col className="text-center small">
            © {new Date().getFullYear()} The Game Store.{" "}
            <span className="d-none d-sm-inline mx-1" style={{ opacity: 0.4 }}>
              |
            </span>{" "}
            <a
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-portfolio-link"
            >
              zeeshani26.github.io
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
