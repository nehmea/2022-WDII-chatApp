import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { getChannelUsers } from "../helpers/Utils";
import MessageList from "../components/MessageList/MessageList";
import TextBox from "../components/TextBox";
import { SocketContext, socket } from "../helpers/SocketContext";
import ActiveChannelUsers from "../components/ActiveChannelUsers/ActiveChannelUsers";
import { getChannelMessages } from "../helpers/Utils";
// import { socket } from "../components/HomeLayout/HomeLayout";

function Home({ activeChannel, currentChannelTitle, socketConnected }) {
  var activeChannelCompare;

  const [notifications, setNotifications] = useState([]);

  const [listOfMessages, setListOfMessages] = useState([]);
  const [activeChannelUsers, setActiveChannelUsers] = useState([]);

  useEffect(() => {
    if (activeChannel !== null) {
      getChannelMessages({ activeChannel, setListOfMessages });
      socket.emit("join_channel", activeChannel);
      activeChannelCompare = activeChannel;
    }
  }, [activeChannel]);

  useEffect(() => {
    socket.on("receive_message", (messages) => {
      const newMessageRecieved = messages[messages.length - 1];
      if (
        !activeChannelCompare ||
        activeChannelCompare !== newMessageRecieved.channelId
      ) {
        console.log(newMessageRecieved);
        if (!notifications.includes(newMessageRecieved)) {
          setNotifications([newMessageRecieved, ...notifications]);
          console.log(notifications);
        }
      } else {
        setListOfMessages(messages);
      }
    });
  });

  // activeChannelUSers includes id, username, bio, and avatarUrl for each user
  useEffect(() => {
    if (activeChannel !== null) {
      getChannelUsers({ activeChannel, setActiveChannelUsers });
    }
  }, [activeChannel]);

  return (
    <>
      <SocketContext.Provider value={socket}>
        {/* Chat area */}
        <Col
          xs={12}
          md={6}
          className="chat-area d-flex flex-column justify-content-between p-0"
        >
          <MessageList
            channelTitle={currentChannelTitle}
            listOfMessages={listOfMessages}
            setListOfMessages={setListOfMessages}
          />
          <TextBox
            activeChannel={activeChannel}
            listOfMessages={listOfMessages}
            setListOfMessages={setListOfMessages}
            socketConnected={socketConnected}
          />
        </Col>
        {/* Users area */}
        <Col xs={3} md={3} className="d-flex flex-column p-0">
          <ActiveChannelUsers activeChannelUsers={activeChannelUsers} />
        </Col>
      </SocketContext.Provider>
    </>
  );
}

export default Home;
