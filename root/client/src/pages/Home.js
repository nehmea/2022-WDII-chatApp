import React, {
  useState,
  useEffect,
  useContext,
  useInsertionEffect,
} from "react";

import ChannelsList from "../components/ChannelsList/ChannelsList";
import { Button, Col, Container, Row } from "react-bootstrap";
import { fetchChannelsByUser, getChannelUsers } from "../helpers/Utils";
import MessageList from "../components/MessageList/MessageList";
import TextBox from "../components/TextBox";

// import { SocketContext, socket } from "../helpers/SocketContext";
import ActiveChannelUsers from "../components/ActiveChannelUsers";
import "./Home.css";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import HomeLogo from "../components/HomeLogo/HomeLogo";
import NewChannelButton from "../components/NewChannelButton/NewChannelButton";
import { getChannelMessages } from "../helpers/Utils";

import { io } from "socket.io-client";

var socket, activeChannelCompare;

function Home() {
  const { authState } = useContext(AuthContext);

  const [channelsData, setChannelsData] = useState([]);
  const [joinedChannels, setJoinedChannels] = useState([]);

  useEffect(() => {
    fetchChannelsByUser({ setChannelsData, setJoinedChannels });
  //}, []);
  // console.log(joinedChannels);
  }, [channelsData.length]);

  const [activeChannel, setActiveChannel] = useState(null);
  useEffect(() => {
    setActiveChannel(joinedChannels[0]);
  }, []);

  const [socketConnected, setsocketConnected] = useState(false);
  useEffect(() => {
    socket = io(`${process.env.REACT_APP_SERVER_URL}`);
    socket.emit("setup", authState);
    socket.on("connected", () => setsocketConnected(true));
  }, []);

  const [listOfMessages, setListOfMessages] = useState([]);
  useEffect(() => {
    getChannelMessages({ activeChannel, setListOfMessages });
    socket.emit("join_channel", activeChannel);
    activeChannelCompare = activeChannel;
  }, [activeChannel]);

  useEffect(() => {
    socket.on("receive_message", (message) => {
      if (!activeChannel || activeChannel !== message.channelId) {
        // notification
      } else {
        setListOfMessages([...listOfMessages, message]);
      }
    });
  });

  // activeChannelUSers includes id, username, bio, and avatarUrl for each user
  const [activeChannelUsers, setActiveChannelUsers] = useState([]);
  useEffect(() => {
    getChannelUsers({ activeChannel, setActiveChannelUsers });
  }, [activeChannel]);

  return (
    //<SocketContext.Provider value={socket}>
      <Container fluid className="home-container">
        <Row className="home-content-area">
          {/* Channels area */}
          <Col xs={3} md={3} className="d-flex flex-column p-0">
            <HomeLogo />
            <NewChannelButton setChannelsData={setChannelsData} />
            <Button variant="outline-light" className="m-2"><i className="bi bi-search-heart"></i> All channels</Button>
            {/* <NewChannelForm setChannelsData={setChannelsData} /> */}
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
            <MessageList listOfMessages={listOfMessages} />
            <TextBox
            activeChannel={activeChannel}
            listOfMessages={listOfMessages}
            setListOfMessages={setListOfMessages}
            socket={socket}
            socketConnected={socketConnected}
          />
          </Col>
          {/* Users area */}
          <Col xs={3} md={3} className="d-flex flex-column p-0">
            <ActiveChannelUsers activeChannelUsers={activeChannelUsers} />
          </Col>
        </Row>
      </Container>
    //</SocketContext.Provider>
  );
}

export default Home;
