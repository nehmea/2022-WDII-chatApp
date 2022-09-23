import React, { useState, useEffect } from "react";
import ChannelsList from "../components/ChannelsList/ChannelsList";
import NewChannelForm from "../components/newChannelForm";
import { Col, Container, Row } from "react-bootstrap";
import { fetchChannelsByUser, getChannelUsers } from "../helpers/Utils";
// import { AuthContext } from "../helpers/AuthContext";
import MessageList from "../components/MessageList/MessageList";
import TextBox from "../components/TextBox";
import ActiveChannelUsers from "../components/ActiveChannelUsers";
import './Home.css'

function Home() {
  const [channelsData, setChannelsData] = useState([]);
  const [joinedChannels, setJoinedChannels] = useState([]);

  useEffect(() => {
    fetchChannelsByUser({ setChannelsData, setJoinedChannels });
  }, []);

  const [activeChannel, setActiveChannel] = useState(null);
  useEffect(() => {
    setActiveChannel(joinedChannels[0]);
  }, []);

  // activeChannelUSers includes id, username, bio, and avatarUrl for each user
  const [activeChannelUsers, setActiveChannelUsers] = useState([]);
  useEffect(() => {
    getChannelUsers({ activeChannel, setActiveChannelUsers });
  }, [activeChannel]);

  console.log(channelsData)

  return (
    <Container fluid className="home-container">
      <Row className="home-content-area">
        {/* Channels area */}
        <Col xs={3} md={3} className="d-flex flex-column">
          <NewChannelForm setChannelsData={setChannelsData} />
          <ChannelsList
            channelsData={channelsData}
            joinedChannels={joinedChannels}
            setActiveChannel={setActiveChannel}
          />
        </Col>
        {/* Chat area */}
        <Col
          xs={12}
          md={6}
          className="chat-area d-flex flex-column justify-content-between p-0"
        >
          <MessageList />
          <TextBox />
        </Col>
        {/* Users area */}
        <Col xs={3} md={3} className="d-flex flex-column">
          <ActiveChannelUsers activeChannelUsers={activeChannelUsers} />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
