import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { fetchChannelsByUser, getChannelUsers } from "../helpers/Utils";
import MessageList from "../components/MessageList/MessageList";
import TextBox from "../components/TextBox";
import ActiveChannelUsers from "../components/ActiveChannelUsers/ActiveChannelUsers";
import { getChannelMessages } from "../helpers/Utils";
import HomeLayout from "../components/HomeLayout/HomeLayout";
import HomeNav from "../components/HomeNav/HomeNav";

function Home({ activeChannel, currentChannelTitle }) {
  const [listOfMessages, setListOfMessages] = useState([]);
  const [activeChannelUsers, setActiveChannelUsers] = useState([]);



  useEffect(() => {
    if (activeChannel) {
      getChannelMessages({ activeChannel, setListOfMessages });
    }
  }, [activeChannel]);

  // activeChannelUSers includes id, username, bio, status and avatarUrl for each user
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
        <HomeNav title={currentChannelTitle} />
        <MessageList listOfMessages={listOfMessages} />
        <TextBox
          activeChannel={activeChannel}
          setListOfMessages={setListOfMessages}
        />
      </Col>
      {/* Users area */}
      <Col xs={3} md={3} className="d-flex flex-column p-0">
        <HomeNav />
        <ActiveChannelUsers activeChannelUsers={activeChannelUsers} />
      </Col>
    </>
  );
}

export default Home;
