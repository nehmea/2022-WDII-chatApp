import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, Container, FloatingLabel } from "react-bootstrap";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AuthLayout from "./AuthLayout/AuthLayout";
import { useNavigate } from "react-router-dom";
// functions from Utils.js

function UpdatePasswordForm() {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(6)
      .max(16)
      .required("old password is required"),
    newPassword: Yup.string()
      .min(6)
      .max(16)
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Password confirmation is required"),
  });

  const onSubmit = (data) => {
    setErrorMsg("");
    axios
      .patch(
        `${process.env.REACT_APP_SERVER_URL}/users/password/edit`,
        { oldPassword: data.oldPassword, newPassword: data.newPassword },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
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
                  name="oldPassword"
                  component="p"
                  className="text-danger text-start"
                />
                <FloatingLabel label="Old Password" className="mb-3">
                  <Field
                    type="password"
                    name="oldPassword"
                    placeholder="Old password"
                    className="form-control col-auto"
                  />
                </FloatingLabel>
              </div>
              <div className="my-3">
                <ErrorMessage
                  name="newPassword"
                  component="p"
                  className="text-danger text-start"
                />
                <FloatingLabel label="New Password" className="mb-3">
                  <Field
                    type="password"
                    name="newPassword"
                    placeholder="New password"
                    className="form-control col-auto"
                  />
                </FloatingLabel>
              </div>
              <div className="my-3">
                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className="text-danger text-start"
                />
                <FloatingLabel label="Confirm Password" className="mb-3">
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    className="form-control col-auto"
                  />
                </FloatingLabel>
              </div>
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

export default UpdatePasswordForm;
