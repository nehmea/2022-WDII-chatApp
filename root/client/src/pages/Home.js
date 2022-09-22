import React, { useState, useEffect } from "react";
import ChannelsList from "../components/ChannelsList/ChannelsList";
import NewChannelForm from "../components/newChannelForm";
import { Col, Container, Row } from "react-bootstrap";
import { fetchChannelsByUser, getChannelUsers } from "../helpers/Utils";
// import { AuthContext } from "../helpers/AuthContext";
import MessageList from "../components/MessageList/MessageList";
import TextBox from "../components/TextBox";
import ActiveChannelUsers from "../components/ActiveChannelUsers";

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

  return (
    <Container fluid>
      <Row>
        {/* Left side */}
        <Col xs={3} md={3} className="d-flex flex-column">
          <NewChannelForm setChannelsData={setChannelsData} />
          <ChannelsList
            channelsData={channelsData}
            joinedChannels={joinedChannels}
            setActiveChannel={setActiveChannel}
          />
        </Col>
        {/* Right side */}
        <Col
          xs={12}
          md={6}
          className="d-flex flex-column justify-content-between"
        >
          <MessageList />
          <TextBox />
        </Col>
        <Col xs={3} md={3} className="d-flex flex-column">
          <ActiveChannelUsers activeChannelUsers={activeChannelUsers} />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
