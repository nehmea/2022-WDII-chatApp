import React, { useState, useEffect, useContext } from "react";
import ChannelsList from "../components/ChannelsList/ChannelsList";
import NewChannelForm from "../components/newChannelForm";
import { Col, Container, Row } from "react-bootstrap";
import { fetchChannelsByUser, getChannelUsers } from "../helpers/Utils";
// import { AuthContext } from "../helpers/AuthContext";
import MessageList from "../components/MessageList/MessageList";
import TextBox from "../components/TextBox";
import { SocketContext, socket } from "../helpers/SocketContext";
import ActiveChannelUsers from "../components/ActiveChannelUsers/ActiveChannelUsers";
import './Home.css'
import HomeLogo from "../components/HomeLogo/HomeLogo";

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

  console.log("activeChannelUsers", activeChannelUsers)

  return (

    <SocketContext.Provider value={socket}>
      <Container fluid className="home-container">
        <Row className="home-content-area">
          {/* Channels area */}
          <Col xs={3} md={3} className="d-flex flex-column p-0">
            <HomeLogo />
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
          <Col xs={3} md={3} className="d-flex flex-column p-0">
            <ActiveChannelUsers activeChannelUsers={activeChannelUsers} />
          </Col>
        </Row>
      </Container>
    </SocketContext.Provider>
  );
}

export default Home;
