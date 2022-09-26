import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";
import { Dropdown } from "react-bootstrap";
import EditChannelModal from "../EditChannelModal/EditChannelModal";
import Message from "./Message";
import "./Message.css";

function MessageList({ listOfMessages, channelTitle, setChannelsData, setListOfMessages, activeChannel }) {
  const [showEditChannelModal, setShowEditChannelModal] = useState(false);

  const { authState } = useContext(AuthContext);

  const likeMessage = (messageId) => {
    axios.post(
          `${process.env.REACT_APP_SERVER_URL}/likes/`,
          { messageId: messageId, userId: authState.id, channelId: activeChannel },
          { headers: { accessToken: localStorage.getItem("accessToken") } }
        )
        .then((response) => {
          setListOfMessages(response.data);
        })
  }

  const handleClose = () => setShowEditChannelModal(false);
  return (
    <div className="d-flex flex-column messages-area">
      {/* Header */}
      <div className='message-list-header p-2'>


        <Dropdown>
          <Dropdown.Toggle variant="" id="dropdown-basic" className="channel-title-heading-wrapper d-flex ">
            <h2 className="channel-title-heading me-2">#{channelTitle}</h2>
          </Dropdown.Toggle>

          <Dropdown.Menu align="end" variant="dark">
            <Dropdown.Item onClick={() => { console.log("Invite people") }}>Invite people</Dropdown.Item>
            <Dropdown.Item onClick={() => {
              setShowEditChannelModal(true)
            }}>
              Edit channel
            </Dropdown.Item>
            <Dropdown.Item >Delete channel</Dropdown.Item>
            <Dropdown.Item >Leave channel</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <EditChannelModal show={showEditChannelModal} handleClose={handleClose} setChannelsData={setChannelsData} channelTitle={channelTitle} channelId={activeChannel} />


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
