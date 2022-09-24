import React, { useContext, useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal, Toast, ToastContainer } from 'react-bootstrap'
import { AuthContext } from '../../helpers/AuthContext';
import { createChannel } from '../../helpers/Utils';


function NewChannelButton({ setChannelsData }) {
  const [channelName, setChannelName] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [toastIsVisible, setToastIsVisible] = useState(false);
  const [show, setShow] = useState(false);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    if (msgType === "light" || (msgType === "warning")) {
      setToastIsVisible(true);
    }
  }, [msgType])


  const handleClose = () => setShow(false);
  const handleShow = () => {
    setMsg('')
    setMsgType('')
    setShow(true)
  }


  return (
    <>
      <Button variant="outline-light" className="m-2" onClick={handleShow}><i className="bi bi-pencil-square"></i> Create channel</Button>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="header-font">Create a new channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Channels are where your team communicates. They’re best when organized around a topic — #programming, for example.</p>
          <Form.Text className="text-muted">
            Channel title should not exceed 120 characters
          </Form.Text>
          <FloatingLabel label="Channel Name" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Channel Name"
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
              createChannel({
                authState,
                channelName,
                setMsg,
                setMsgType,
                setChannelsData,
              });
              handleClose()
            }}
          >
            Create Channel
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer className="p-3" position={"bottom-end"}>
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

export default NewChannelButton
