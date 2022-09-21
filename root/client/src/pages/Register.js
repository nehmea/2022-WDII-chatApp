import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FloatingLabel } from "react-bootstrap";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { useNavigate } from "react-router-dom";
// import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AuthLayout from "../components/AuthLayout/AuthLayout";

const HOST = "http://localhost:3001/users";

function Register() {
  const [errorMsg, setErrorMsg] = useState("");
  const [EditorMsg, setEditorMsg] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const navigate = useNavigate();

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
    username: "",
    password: "",
    avatarUrl: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required().min(3).max(20),
    password: Yup.string().required().min(6).max(16),
    avatarUrl: Yup.string().url(),
  });

  const onSubmit = (data) => {
    setErrorMsg("");
    data.bio = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    axios
      .post(`${HOST}/register`, data)
      .then((response) => {
        navigate(`/login`);
      })
      .catch((error) => {
        if (error.response) {
          setErrorMsg(error.response.data.error);
        }
      });
  };

  return (
    <AuthLayout>
      <div className="container m-3">
        <p className="h3">Register</p>
        <p className="text-danger">{errorMsg}</p>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="border border-primary border-3 p-2">
            <div className="mt-3">
              <ErrorMessage
                name="username"
                component="p"
                className="text-danger text-start"
              />
              <FloatingLabel label="Username" className="mb-3">
                <Field
                  name="username"
                  placeholder="Username"
                  className="form-control col-auto"
                />
              </FloatingLabel>
            </div>
            <div className="my-3">
              <ErrorMessage
                name="password"
                component="p"
                className="text-danger text-start"
              />
              <FloatingLabel label="Password" className="mb-3">
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="form-control"
                />
              </FloatingLabel>
            </div>
            <p className="text-danger">{EditorMsg}</p>
            <p className="h5 text-start my-3">Bio</p>
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              handleBeforeInput={handleBeforeInput}
              editorStyle={{ border: "1px solid", borderStyle: "groove" }}
            />
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
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </Form>
        </Formik>
      </div>
    </AuthLayout>
  );
}

export default Register;
