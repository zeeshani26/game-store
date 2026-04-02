import React from "react";
import { Spinner } from "react-bootstrap";

const Load = () => {
  return (
    <div className="py-5 text-center">
      <Spinner
        animation="border"
        role="status"
        className="store-spinner"
        aria-label="Loading"
      />
    </div>
  );
};

export default Load;
