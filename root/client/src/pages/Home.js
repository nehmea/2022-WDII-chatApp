import React, { useState, useEffect, useContext } from "react";
import ChannelsList from "../components/ChannelsList/ChannelsList";
import NewChannelForm from "../components/newChannelForm";
import { Container } from "react-bootstrap";
import axios from "axios";
import { fetchChannels } from "../helpers/Utils";
// import { AuthContext } from "../helpers/AuthContext";

function Home() {
  const [channelsData, setChannelsData] = useState([]);
  // const { authState } = useContext(AuthContext);

  useEffect(() => {
    fetchChannels({ setChannelsData });
  }, []);

  return (
    <Container>
      <NewChannelForm
        setChannelsData={setChannelsData}
        // fetchChannels={fetchChannels}
      />
      <ChannelsList channelsData={channelsData} />
    </Container>
  );
}

export default Home;
