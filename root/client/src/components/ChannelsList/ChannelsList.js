import axios from "axios";
import { useEffect, useState, useContext } from "react";
import ChannelItem from "./ChannelItem";
import { Button } from "react-bootstrap";
import { AuthContext } from "../../helpers/AuthContext";
import { joinChannel } from "../../helpers/Utils";

function ChannelsList({ channelsData, joinedChannels }) {
  const { authState } = useContext(AuthContext);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  return (
    <div>
      <h2>Channels List</h2>
      <p className={msgType}>{msg}</p>
      <div>
        {channelsData.map((channel, index) => (
          <ChannelItem key={index}>
            <span className="mx-2">{channel.title}</span>
            <Button
              variant="primary"
              onClick={() =>
                joinChannel({ channel, authState, setMsg, setMsgType })
              }
            >
              {joinedChannels.includes(channel.id) ? " Joined " : " Join "}
            </Button>
          </ChannelItem>
        ))}
      </div>
    </div>
  );
}

export default ChannelsList;
