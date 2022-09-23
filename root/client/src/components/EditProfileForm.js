import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, Container, FloatingLabel } from "react-bootstrap";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AuthLayout from "./AuthLayout/AuthLayout";
// functions from Utils.js
import { getCurrentUserInfo } from "../helpers/Utils";

function EditProfileFrom() {
  const [userInfo, setUserInfo] = useState("");
  useEffect(() => {
    getCurrentUserInfo({ setUserInfo });
  }, []);

  const [errorMsg, setErrorMsg] = useState("");
  const [EditorMsg, setEditorMsg] = useState("");
  const navigate = useNavigate();

  const [editorState, setEditorState] = useState(() => {
    EditorState.createEmpty();
  });

  const handleBeforeInput = (input) => {
    const textLength = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    ).length;
    if (textLength >= 1500) {
      setEditorMsg("You can enter a maximum of 1500 characters");
      return "handled";
    } else {
      setEditorMsg("");
    }
  };

  const initialValues = {
    avatarUrl: userInfo.avatarUrl,
    password: "",
  };

  const validationSchema = Yup.object().shape({
    avatarUrl: Yup.string().url(),
    password: Yup.string().required(),
  });

  const onSubmit = (data) => {
    setErrorMsg("");
    data.bio = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    axios
      .patch(`${process.env.REACT_APP_SERVER_URL}/users/profile/edit`, data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        navigate(`/profile`);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          setErrorMsg(error.response.data.message);
        }
      });
  };

  return (
    <AuthLayout>
      <div className="d-flex align-items-center" style={{ height: "100%" }}>
        <Container className="auth-forms rounded p-4">
          <h2>Edit Profile</h2>
          <p className="text-danger">{errorMsg}</p>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            enableReinitialize
          >
            <Form className="m-3">
              <div className="my-3">
                <ErrorMessage
                  name="avatarUrl"
                  component="p"
                  className="text-danger text-start"
                />
                <FloatingLabel label="Avatar URL" className="mb-3">
                  <Field
                    name="avatarUrl"
                    placeholder="Avatar URL"
                    className="form-control col-auto"
                  />
                </FloatingLabel>
              </div>
              <div className="mb-3">
                <p className="text-danger">{EditorMsg}</p>
                <p className="h5 text-start my-3">Write a brief bio</p>
                <Editor
                  editorState={editorState}
                  onEditorStateChange={setEditorState}
                  handleBeforeInput={handleBeforeInput}
                  editorStyle={{
                    border: "1px solid",
                    borderStyle: "groove",
                    color: "white",
                  }}
                />
              </div>
              <ErrorMessage
                name="password"
                component="p"
                className="text-danger text-start"
              />
              <FloatingLabel label="Password" className="mb-2">
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="form-control"
                />
              </FloatingLabel>
              <div className="d-grid gap-2">
                <Button type="submit" variant="outline-light" size="lg">
                  Submit
                </Button>
              </div>
            </Form>
          </Formik>
        </Container>
      </div>
    </AuthLayout>
  );
}

export default EditProfileFrom;
