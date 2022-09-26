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
    if (e.target.value === '\n') return
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
    if (event.key === "Enter" && newMessage) {
      sendMessage();
    }
  };

  const sendMessage = () => {
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
    setNewMessage("");
  };

  return (
    <div className="textBoxContainer mx-3 mb-4">
      {/* <p className="text-danger">{EditorMsg}</p> */}
      {/* <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    handleBeforeInput={handleBeforeInput}
                    editorStyle={{ border: "1px solid", borderStyle: "groove" }}
                /> */}
      {isTyping ? <TiMessageTyping /> : <></>}
      <div className="d-flex position-relative">
        <Form.Control
          className="shadow-none border-0 pe-5"
          onKeyDown={handleEnter}
          as="textarea"
          value={newMessage}
          onChange={typingHandler}
        />
        <Button
          variant="light"
          className="position-absolute end-0 h-100"
          onClick={sendMessage}
          placeholder="Enter a message.."
        >
          <i className="bi bi-send" style={{ color: "#4470cc" }}></i>
        </Button>
      </div>
    </div>
  );
}

export default TextBox;
