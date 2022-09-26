import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";
import { Dropdown } from "react-bootstrap";
import EditChannelModal from "../EditChannelModal/EditChannelModal";
import Message from "./Message";
import "./Message.css";
import { joinChannel } from "../../helpers/Utils";

function MessageList({ listOfMessages, channelTitle, setChannelsData, setListOfMessages, activeChannel, joinedChannels }) {
  const [showEditChannelModal, setShowEditChannelModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const channel = { id: activeChannel, title: channelTitle }
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

  const handleLeaveChannel = () => {
    joinChannel({
      channel,
      authState,
      setMsg,
      setMsgType,
      joinedChannels,
      setChannelsData
    })
  }
  return (
    <div className="d-flex flex-column messages-area">
      {/* Header */}
      <div className='home-nav-header p-2'>


        <Dropdown>
          <Dropdown.Toggle variant="" id="dropdown-basic" className="channel-title-heading-wrapper d-flex ">
            <h2 className="channel-title-heading me-2">#{channelTitle}</h2>
          </Dropdown.Toggle>
          {/* Invite */}
          <Dropdown.Menu align="end" variant="light">
            <Dropdown.Item onClick={() => { console.log("Invite people") }}>Invite people</Dropdown.Item>
            {/* Edit */}
            <Dropdown.Item onClick={() => {
              setShowEditChannelModal(true)
            }}>
              Edit channel
            </Dropdown.Item>
            {/* Delete */}
            <Dropdown.Item onClick={() => { console.log("Delete") }}>Delete channel</Dropdown.Item>
            {/* Leave */}
            <Dropdown.Item onClick={handleLeaveChannel}>
              Leave channel
            </Dropdown.Item>
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
