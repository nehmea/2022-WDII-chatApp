import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Message from "./Message";
import "./Message.css";
import { AuthContext } from "../../helpers/AuthContext";

function MessageList({ listOfMessages, channelTitle, setListOfMessages }) {

  const { authState } = useContext(AuthContext);

  const likeMessage = (messageId) => {
    axios.post(
          `${process.env.REACT_APP_SERVER_URL}/likes/`,
          { messageId: messageId, userId: authState.id },
          //{ headers: { accessToken: localStorage.getItem("accessToken") } }
        )
        .then((response) => {
          setListOfMessages(response.data);
        })
  }

  return (
    <div className="d-flex flex-column messages-area">
      <div className='message-list-header p-2'>
        <h2 className="channel-title-heading">#{channelTitle} </h2>
      </div>

      {listOfMessages.map((message) => {
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
            likes={message.likes}
            likeMessage={likeMessage}
          />
        );
      })}
    </div>
  );
}

export default MessageList;
