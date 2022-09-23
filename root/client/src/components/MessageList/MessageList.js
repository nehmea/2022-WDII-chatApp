//import React from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Message from "./Message";
import React, { useState, useEffect, useContext } from "react";
import './Message.css'

function MessageList() {

  let { channelId } = useParams();
  const [listOfMessages, setListOfMessages] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/messages/byChannel/${1}`).then((response) => {
      setListOfMessages(response.data);
    });

  }, []);

  return (
    <div className="d-flex flex-column messages-area">
      {listOfMessages.map((value, key) => {
        return (
          <Message key={key}
            username={value.user.username}
            createdAt={value.createdAt}
            body={value.body}
            avatar={value.user.avatarUrl}
          />
        );
      })}
    </div>
  )
}

export default MessageList
