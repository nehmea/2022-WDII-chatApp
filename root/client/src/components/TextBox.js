import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
// import { AuthContext } from "../helpers/AuthContext";
import { Button } from "react-bootstrap";
import { SocketContext } from "../helpers/SocketContext";
import { getChannelMessages } from "../helpers/Utils";

function TextBox({ activeChannel, setListOfMessages }) {
  const socket = useContext(SocketContext);

  // let { channelId } = useParams();
  // let { authorId } = authState.id;
  // const { authState } = useContext(AuthContext);

  // const [EditorMsg, setEditorMsg] = useState("");
  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty()
  // );

  //console.log(authState);

  const initialValues = {
    body: "",
  };

  const validationSchema = Yup.object().shape({
    body: Yup.string().max(2000),
  });

  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(data.message);
    });
  }, [socket]);

  // const handleBeforeInput = (input) => {
  //     const textLength = draftToHtml(
  //       convertToRaw(editorState.getCurrentContent())
  //     ).length;
  //     if (textLength < 1) {
  //         setEditorMsg("Compose a message");
  //         return "handled";
  //     }
  //     else if (textLength >= 2000) {
  //       setEditorMsg("You can enter a maximum of 2000 characters");
  //       return "handled";
  //     } else {
  //       setEditorMsg("");
  //     }
  // };

  const sendMessage = (body) => {
    socket.emit("send_message", { message: body });
  };

  const onSubmit = (data) => {
    if (data.body !== "") {
      data.channelId = activeChannel;
      console.log(data);
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/messages`, data, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          console.log(response.data.message);
          // console.log(activeChannel);
          getChannelMessages({ activeChannel, setListOfMessages });
        })
        .catch((error) => {
          if (error.response) {
          }
        });
    }
  };

  return (
    <div className="textBoxContainer">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="d-flex">
          {/* <p className="text-danger">{EditorMsg}</p> */}
          {/* <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    handleBeforeInput={handleBeforeInput}
                    editorStyle={{ border: "1px solid", borderStyle: "groove" }}
                /> */}
          <ErrorMessage
            name="body"
            component="p"
            className="text-danger text-start"
          />

          <Field name="body" style={{ width: "100%" }} />
          <Button type="submit" variant="outline-light">
            Send
          </Button>
        </Form>
      </Formik>
    </div>
  );
}

export default TextBox;
