import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../config";
import { getRecentProductIds } from "../utils/recentlyViewed";
import Image from "react-bootstrap/Image";

const RecentlyViewed = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const ids = getRecentProductIds();
    if (!ids.length) return;
    let cancelled = false;
    axios
      .post(`${API_BASE}/products/lookup`, { ids })
      .then(({ data }) => {
        if (!cancelled) setProducts(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (!products.length) return null;

  return (
    <section className="mt-5 mb-4">
      <h2 className="section-heading">Recently viewed</h2>
      <p className="text-muted small mb-3">
        Pick up where you left off — stored on this device only.
      </p>
      <Row className="g-3">
        {products.map((p) => (
          <Col key={p._id} xs={6} sm={4} md={3} lg={2}>
            <Link
              to={`/product/${p._id}`}
              className="text-decoration-none d-block text-center"
            >
              <div className="bg-white rounded-3 p-2 shadow-sm border h-100">
                <Image
                  src={p.image}
                  alt=""
                  fluid
                  rounded
                  className="mb-2"
                  style={{ maxHeight: "100px", objectFit: "contain" }}
                />
                <div
                  className="small fw-semibold text-dark text-truncate"
                  title={p.name}
                >
                  {p.name}
                </div>
                <div className="small" style={{ color: "var(--gs-orange)" }}>
                  ₹{p.price}
                </div>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default RecentlyViewed;
