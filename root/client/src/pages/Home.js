import React, { useState, useEffect } from "react";
import ChannelsList from "../components/ChannelsList/ChannelsList";
import NewChannelForm from "../components/newChannelForm";
import { Col, Container, Row } from "react-bootstrap";
import { fetchChannelsByUser } from "../helpers/Utils";
// import { AuthContext } from "../helpers/AuthContext";
import MessageList from "../components/MessageList/MessageList";
import TextBox from "../components/TextBox";

function Home() {
  const [channelsData, setChannelsData] = useState([]);
  const [joinedChannels, setJoinedChannels] = useState([]);

  useEffect(() => {
    fetchChannelsByUser({ setChannelsData, setJoinedChannels });
  }, []);

  return (
    <Container fluid>
      <Row>
        {/* Left side */}
        <Col xs={6} md={4} className="d-flex flex-column">
          <NewChannelForm setChannelsData={setChannelsData} />
          <ChannelsList
            channelsData={channelsData}
            joinedChannels={joinedChannels}
          />
        </Col>
        {/* Right side */}
        <Col
          xs={12}
          md={8}
          className="d-flex flex-column justify-content-between"
        >
          <MessageList />
          <TextBox />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
