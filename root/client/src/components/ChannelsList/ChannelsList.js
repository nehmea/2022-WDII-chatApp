import axios from "axios";
import { useEffect, useState } from "react";
import ChannelItem from "./ChannelItem";

function ChannelsList({ channelsData }) {
  return (
    <div>
      <h2>ChannelsList</h2>
      <div>
        {channelsData.map((channel, index) => (
          <ChannelItem key={index}>{channel.title}</ChannelItem>
        ))}
      </div>
    </div>
  );
}

export default ChannelsList;
