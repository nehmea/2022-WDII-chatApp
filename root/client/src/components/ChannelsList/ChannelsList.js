import axios from "axios";
import { useEffect, useState, useContext } from "react";
import ChannelItem from "./ChannelItem";
import { Button } from "react-bootstrap";
import { AuthContext } from "../../helpers/AuthContext";

function ChannelsList({ channelsData }) {
  const { authState } = useContext(AuthContext);
  const joinChannel = (channelId) => {
    if (!!authState && authState.roles === "user") {
      console.log(channelId);
    }
  };
  return (
    <div>
      <h2>Channels List</h2>
      <div>
        {channelsData.map((channel, index) => (
          <ChannelItem key={index}>
            <span className="mx-2">{channel.title}</span>
            <Button variant="primary" onClick={() => joinChannel(channel.id)}>
              Join
            </Button>
          </ChannelItem>
        ))}
      </div>
    </div>
  );
}

export default ChannelsList;
