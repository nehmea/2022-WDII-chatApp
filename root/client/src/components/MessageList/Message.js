//import React from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import React, { useState, useEffect, useContext } from "react";
import { format, parseISO } from "date-fns";
import "./Message.css";
import { deleteMessage } from "../../helpers/Utils";

function Message({
  messageId,
  username,
  createdAt,
  body,
  avatar,
  isDeleted,
  userId,
}) {
  const formattedDate = format(parseISO(createdAt), "MMM dd yyyy hh:mmaa");

  const [likes, setLikes] = useState([]);
  const { authState } = useContext(AuthContext);

  const [deleted, setDeleted] = useState(isDeleted);

  useEffect(() => {
    // axios.get(`http://localhost:3001/likes/${id}`).then((response) => {
    //     setLikes(response.data);
    // });
  }, []);

  return (
    <div className="my-1 message">
      <div className="d-flex p-2">
        <img
          alt="user avatar"
          src={avatar}
          width="50"
          height="50"
          className="rounded-circle avatar mx-3"
        />
        <div className="d-flex flex-column me-3">
          <div className="d-flex align-items-center">
            <p className="me-2 mb-1 username-bold">
              {deleted === 0 ? username : ""}
            </p>
            <p className="mb-1 date-small">
              {deleted === 0 ? formattedDate : ""}
            </p>
          </div>
          <div>
            <p className="mb-2 message-body">
              {deleted === 0 ? body : "Deleted Message"}
            </p>
          </div>
          <div className="row">
            {deleted === 0 && (
              <div className="message-likes rounded p-1 col">
                <span>👍</span>
                <span className="ms-1">2</span>
              </div>
            )}
            {userId === authState.id && (
              <div className="col">
                <button
                  onClick={() =>
                    deleteMessage({ messageId, deleted, setDeleted })
                  }
                >
                  {deleted === 0 ? "Delete" : "Undo"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
