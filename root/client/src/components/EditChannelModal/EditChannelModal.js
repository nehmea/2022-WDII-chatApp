import React, { useContext, useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal, Toast, ToastContainer } from 'react-bootstrap';
import { AuthContext } from '../../helpers/AuthContext';
import { editChannel } from '../../helpers/Utils';

function EditChannelModal({ show, handleClose, setChannelsData, channelTitle, channelId }) {
  const [channelName, setChannelName] = useState("");

  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [toastIsVisible, setToastIsVisible] = useState(false);

  const { authState } = useContext(AuthContext);

  useEffect(() => {
    if (msgType === "light" || (msgType === "warning")) {
      setToastIsVisible(true);
    }
  }, [msgType])


  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="header-font">Change your channel's name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Change happens. Choose another name that better suits your channel's topic.</p>
          <Form.Text className="text-muted">
            Channel title should not exceed 120 characters
          </Form.Text>
          <FloatingLabel label={channelTitle} className="mb-3">
            <Form.Control
              type="text"
              placeholder={channelTitle} // get current channel name
              onChange={(e) => {
                setChannelName(e.target.value);
              }}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="dark"
            onClick={() => {
              editChannel({
                authState,
                channelName,
                setMsg,
                setMsgType,
                setChannelsData,
                channelId
              });
              handleClose()
            }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer className="p-3" style={{ zIndex: "2000" }} position={"bottom-end"}>
        <Toast bg={msgType} delay={5000} autohide show={toastIsVisible} onClose={() => setToastIsVisible(false)}>
          <Toast.Header>
            <strong className="me-auto"><i className="bi bi-chat-heart-fill"></i> Chatap</strong>
          </Toast.Header>
          <Toast.Body style={{ color: "#313131" }}>{msg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  )
}

export default EditChannelModal
