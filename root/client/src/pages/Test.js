import React, { useState, useEffect, useContext } from "react";
import ChannelsList from "../components/ChannelsList/ChannelsList";
import NewChannelForm from "../components/newChannelForm";
import { Container } from "react-bootstrap";
import axios from "axios";
import { fetchChannelsByUser } from "../helpers/Utils";
// import { AuthContext } from "../helpers/AuthContext";

function Test() {
  const [channelsData, setChannelsData] = useState([]);
  const [joinedChannels, setJoinedChannels] = useState([]);

  useEffect(() => {
    fetchChannelsByUser({ setChannelsData, setJoinedChannels });
  }, []);

  return (
    <Container>
      <NewChannelForm
        setChannelsData={setChannelsData}
        // fetchChannels={fetchChannels}
      />
      <ChannelsList
        channelsData={channelsData}
        joinedChannels={joinedChannels}
      />
    </Container>
  );
}

export default Test;
