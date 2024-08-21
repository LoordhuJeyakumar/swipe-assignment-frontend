import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

function ToastMessageSuccess({ show, onClose, message }) {
  return (
    /* React-bootstrap toast */
    <ToastContainer position="top-end" className="p-3">
      <Toast show={show} bg="success" delay={3000} autohide onClose={onClose}>
        <Toast.Header>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastMessageSuccess;
