import React, {
  useState,
  useEffect,
} from "react";
import { Col } from "react-bootstrap";
import { getChannelUsers } from "../helpers/Utils";
import MessageList from "../components/MessageList/MessageList";
import TextBox from "../components/TextBox";
// import { SocketContext, socket } from "../helpers/SocketContext";
import ActiveChannelUsers from "../components/ActiveChannelUsers/ActiveChannelUsers";
import { getChannelMessages } from "../helpers/Utils";
import { socket } from "../components/HomeLayout/HomeLayout";

var activeChannelCompare;

function Home({ activeChannel, currentChannelTitle, socketConnected }) {
  const [listOfMessages, setListOfMessages] = useState([]);
  const [activeChannelUsers, setActiveChannelUsers] = useState([]);

  useEffect(() => {
    getChannelMessages({ activeChannel, setListOfMessages });
    socket.emit("join_channel", activeChannel);
    activeChannelCompare = activeChannel;
  }, [activeChannel]);

  useEffect(() => {
    socket.on("receive_message", (messages) => {
      if (!activeChannel || activeChannel !== messages[0].channelId) {
        // notification
      } else {
        setListOfMessages(messages);
      }
    });
  });

  // activeChannelUSers includes id, username, bio, and avatarUrl for each user
  useEffect(() => {
    getChannelUsers({ activeChannel, setActiveChannelUsers });
  }, [activeChannel]);

  return (
    <>
      {/* Chat area */}
      <Col
        xs={12}
        md={6}
        className="chat-area d-flex flex-column justify-content-between p-0"
      >
        <MessageList channelTitle={currentChannelTitle} listOfMessages={listOfMessages} />
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
    </>
  );
}

export default Home;
