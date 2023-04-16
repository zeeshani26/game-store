import React from "react";
import { Spinner } from "react-bootstrap";

const Load = () => {
  return (
    <div>
      <Spinner
        animation="border"
        role="status"
        style={{
          width: "100px",
          height: "100px",
          display: "block",
          margin: "auto",
        }}
      ></Spinner>
    </div>
  );
};

export default Load;
