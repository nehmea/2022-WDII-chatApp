import axios from "axios";
import React, { useState } from "react";
import { Form, FloatingLabel, Button, Col, Row } from "react-bootstrap";

function NewChannelForm({ fetchChannels, setChannelsData }) {
  const [channelName, setChannelName] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  const createChannel = () => {
    setMsg("");
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/channels/new`,
          {
            title: channelName,
          },
          { headers: { accessToken: accessToken } }
        )
        .then((response) => {
          setMsg(response.data.message);
          setMsgType("text-success");
          //   setChannelsData([...channelsData, response.data.newChannel]);
          fetchChannels();
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            setMsgType("text-danger");
            setMsg(error.response.data.message);
          }
        });
    } else {
      setMsgType("text-danger");
      setMsg("Please login to create a channel");
    }
  };

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
          <Button variant="primary" onClick={createChannel}>
            Create Channel
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default NewChannelForm;
