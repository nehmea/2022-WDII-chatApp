import React, { useState, useEffect } from "react";
import ChannelsList from "../components/ChannelsList/ChannelsList";
import NewChannelForm from "../components/newChannelForm";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import MessageList from "../components/MessageList/MessageList";
import TextBox from "../components/TextBox";


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
      <Row>
        <Col xs={6} md={4}>
          <NewChannelForm
            setChannelsData={setChannelsData}
            fetchChannels={fetchChannels}
          />
          <ChannelsList channelsData={channelsData} />
        </Col>
        <Col xs={12} md={8}>
          <MessageList />
          <TextBox />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
