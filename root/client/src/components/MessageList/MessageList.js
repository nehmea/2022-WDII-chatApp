//import React from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Message from "./Message";
import React, { useState, useEffect, useContext } from "react";
import "./Message.css";

function MessageList({ listOfMessages }) {
  // let { channelId } = useParams();
  // const [listOfMessages, setListOfMessages] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_SERVER_URL}/messages/byChannel/${1}`)
  //     .then((response) => {
  //       setListOfMessages(response.data);
  //     });
  // }, []);

  return (
    <div className="d-flex flex-column messages-area">
      {listOfMessages.map((message, key) => {
        return (
          <Message
            key={message.id}
            messageId={message.id}
            username={message.user.username}
            createdAt={message.createdAt}
            body={message.body}
            avatar={message.user.avatarUrl}
            isDeleted={message.isDeleted}
            userId={message.user.id}
          />
        );
      })}
    </div>
  );
}

export default MessageList;
