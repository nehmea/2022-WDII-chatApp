import React, { useState, useEffect, cloneElement } from "react";
import ChannelsList from "../../components/ChannelsList/ChannelsList";
import { Button, Col, Container, Row } from "react-bootstrap";
import { fetchChannelsByUser } from "../../helpers/Utils";
import { SocketContext, socket } from "../../helpers/SocketContext";
import './Home.css'
import NewChannelButton from "../../components/NewChannelButton/NewChannelButton";
import { useNavigate } from "react-router-dom";
import HomeNav from "../HomeNav/HomeNav";

// Wrapper element
function HomeLayout({ children }) {
  const [channelsData, setChannelsData] = useState([]);
  const [joinedChannels, setJoinedChannels] = useState([]);
  const [activeChannel, setActiveChannel] = useState(null);
  const currentChannelTitle = channelsData.find((chan => chan.id === activeChannel))?.title
  const navigate = useNavigate()

  useEffect(() => {
    fetchChannelsByUser({ setChannelsData, setJoinedChannels });
  }, [channelsData.length]);

  useEffect(() => {
    navigate('/home')
  }, [activeChannel])

  useEffect(() => {
    // Make sure joinedChannels[0] is not undefined & activeChannel is not null
    if (joinedChannels[0] && typeof activeChannel !== "number") {
      setActiveChannel(joinedChannels[0]);
    }
  }, [joinedChannels.length]);

  return (
    <SocketContext.Provider value={socket}>
      <Container fluid className="home-container">
        <Row className="home-content-area">
          {/* Channels area */}
          <Col xs={12} md={3} className="d-flex flex-column p-0">
            <NewChannelButton setChannelsData={setChannelsData} />
            {/* <AllChannelsButton /> */}
            <Button onClick={() => navigate('/channels')} variant="outline-light" className="m-2"><i className="bi bi-search-heart"></i> All channels</Button>

            <ChannelsList
              channelsData={channelsData}
              joinedChannels={joinedChannels}
              setActiveChannel={setActiveChannel}
            />
          </Col>
          {React.cloneElement(children, { activeChannel, currentChannelTitle, channelsData, joinedChannels })}
        </Row>
      </Container>
    </SocketContext.Provider >
  );
}

export default HomeLayout;
