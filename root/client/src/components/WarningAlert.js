import React from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteUser } from "../helpers/Utils";

function WarningAlert({ text, show, onHide, handleClose }) {
  return (
    <div>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{text}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={onHide}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default WarningAlert;
