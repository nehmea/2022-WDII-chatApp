import React, { useState, useContext } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { AuthContext } from "../helpers/AuthContext";

function TextBox() {

    let { channelId } = useParams();
    const { authState } = useContext(AuthContext);
    let { authorId } = authState.id;


    const [errorMsg, setErrorMsg] = useState("");
    const [EditorMsg, setEditorMsg] = useState("");
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    console.log(authState);

    const initialValues = {
        body: "",
        isDeleted: 0,
        channelId: channelId,
        authorId: authorId,
      };
    
      const validationSchema = Yup.object().shape({
        body: Yup.string().required().min(1).max(2000),
        isDeleted: Yup.number().required().min(0).max(1),
        channelId: Yup.number().required(),
        authorId: Yup.number().required(),
      });

    const handleBeforeInput = (input) => {
        const textLength = draftToHtml(
          convertToRaw(editorState.getCurrentContent())
        ).length;
        if (textLength < 1) {
            setEditorMsg("Compose a message");
            return "handled";
        }
        else if (textLength >= 2000) {
          setEditorMsg("You can enter a maximum of 2000 characters");
          return "handled";
        } else {
          setEditorMsg("");
        }
    };

    const onSubmit = (data) => {
        setErrorMsg("");
        data.body = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/messages/`, data)
            .then((response) => {
            //navigate(`/login`);
            })
            .catch((error) => {
            if (error.response) {
                setErrorMsg(error.response.data.error);
            }
            });
    };

  return (
    <div className='textBoxContainer'>
        <p className="text-danger">{errorMsg}</p>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>
                <p className="text-danger">{EditorMsg}</p>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    handleBeforeInput={handleBeforeInput}
                    editorStyle={{ border: "1px solid", borderStyle: "groove" }}
                />
                <button type="submit" className="btn btn-primary">Send</button>
            </Form>
        </Formik>
    </div>
  )
}

export default TextBox
