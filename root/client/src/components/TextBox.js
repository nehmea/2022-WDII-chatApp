import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
// import { AuthContext } from "../helpers/AuthContext";
import { Button, Form, Col, Row } from "react-bootstrap";
import { TiMessageTyping } from "react-icons/ti";
import { SocketContext } from "../helpers/SocketContext";
import { getChannelMessages } from "../helpers/Utils";
import { set } from "date-fns";

function TextBox({
  activeChannel,
  setListOfMessages,
  listOfMessages,
  socketConnected,
}) {
  const socket = useContext(SocketContext);

  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    socket.on("typing", () => setIsTyping(true));
    socket.on("stopTyping", () => setIsTyping(false));
  }, []);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", activeChannel);
    }
    var timerLength = 3000;
    setTimeout(() => {
      socket.emit("stopTyping", activeChannel);
      setTyping(false);
    }, timerLength);
  };

  const handleEnter = (event) => {
    setNewMessage("");
    if (event.key === "Enter" && newMessage) {
      sendMessage();
    }
  };

  const sendMessage = () => {
    setNewMessage("");
    socket.emit("stopTyping", activeChannel);
    const data = { body: newMessage, channelId: activeChannel };
    if (data.body !== "" && data.body.length <= 2000) {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/messages`, data, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfMessages(response.data);
          socket.emit("send_message", response.data);
        })
        .catch((error) => {
          if (error.response) {
          }
        });
    }
  };

  return (
    <div className="textBoxContainer">
      {/* <p className="text-danger">{EditorMsg}</p> */}
      {/* <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    handleBeforeInput={handleBeforeInput}
                    editorStyle={{ border: "1px solid", borderStyle: "groove" }}
                /> */}
      <Row>
        {isTyping ? <TiMessageTyping /> : <></>}
        <Col xs={8}>
          <Form.Control
            onKeyDown={handleEnter}
            type="text"
            name="body"
            onChange={typingHandler}
          />
        </Col>
        <Col>
          <Button
            type="submit"
            className="btn btn-primary col"
            onClick={sendMessage}
            placeholder="Enter a message.."
            value={newMessage}
          >
            Send
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default TextBox;
