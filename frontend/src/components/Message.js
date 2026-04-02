import React from "react";
import { Alert } from "react-bootstrap";

const Message = ({ variant = "info", children }) => {
  return (
    <div className="store-message-wrap">
      <Alert variant={variant} className={`store-alert store-alert-${variant}`}>
        {children}
      </Alert>
    </div>
  );
};

export default Message;
