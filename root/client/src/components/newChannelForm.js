import React, { useState, useContext } from "react";
import { Form, FloatingLabel, Button, Col, Row } from "react-bootstrap";
import { AuthContext } from "../helpers/AuthContext";
import { createChannel } from "../helpers/Utils";

function NewChannelForm({ setChannelsData }) {
  const [channelName, setChannelName] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const { authState } = useContext(AuthContext);

  return (
    <>
      <div>
        <p className={msgType}>{msg}</p>
      </div>
      <Row>
        <Col xs sm="6">
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
        </Col>
        <Col xs sm="3" lg="2">
          <p></p>
          <Button
            variant="primary"
            onClick={() => {
              createChannel({
                authState,
                channelName,
                setMsg,
                setMsgType,
                setChannelsData,
              });
            }}
          >
            Create Channel
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default NewChannelForm;
