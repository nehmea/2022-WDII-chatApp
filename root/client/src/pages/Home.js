import React, { useState, useEffect } from "react";
import ChannelsList from "../components/ChannelsList/ChannelsList";
import NewChannelForm from "../components/newChannelForm";
import { Container } from "react-bootstrap";
import axios from "axios";

function Home() {
  const [channelsData, setChannelsData] = useState([]);

  const fetchChannels = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/channels/`)
      .then((response) => {
        if (response.status === 200) {
          // console.log(response.data)
          setChannelsData(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // axios
    //   .get(`${process.env.REACT_APP_SERVER_URL}/channels/`)
    //   .then((response) => {
    //     if (response.status === 200) {
    //       // console.log(response.data)
    //       setChannelsData(response.data);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    fetchChannels();
  }, []);

  return (
    <Container>
      <NewChannelForm
        setChannelsData={setChannelsData}
        fetchChannels={fetchChannels}
      />
      <ChannelsList channelsData={channelsData} />
    </Container>
  );
}

export default Home;
