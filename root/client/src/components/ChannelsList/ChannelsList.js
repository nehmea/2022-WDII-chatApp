import axios from "axios";
import { useEffect, useState, useContext } from "react";
import ChannelItem from "./ChannelItem";
import { Button } from "react-bootstrap";
import { AuthContext } from "../../helpers/AuthContext";
import { joinChannel } from "../../helpers/Utils";

function ChannelsList({ channelsData, joinedChannels, setActiveChannel }) {
  const { authState } = useContext(AuthContext);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  console.log('in the list', channelsData)
  return (
    <div>
      <h2>Channels List</h2>
      <p className="text-success">{msg}</p>
      <div>
        {channelsData.map(
          (channel, index) =>
            joinedChannels.includes(channel.id) && (
              <ChannelItem key={index}>
                <span
                  className="mx-2"
                  onClick={() => {
                    setActiveChannel(channel.id);
                  }}
                >
                  {channel.title}
                </span>
                <Button
                  variant={
                    joinedChannels.includes(channel.id)
                      ? "outline-secondary"
                      : "outline-primary"
                  }
                  onClick={() =>
                    joinChannel({
                      channel,
                      authState,
                      setMsg,
                      setMsgType,
                      joinedChannels,
                    })
                  }
                >
                  {joinedChannels.includes(channel.id) ? " Leave " : " Join "}
                </Button>
              </ChannelItem>
            )
        )}
      </div>
    </div>
  );
}

export default ChannelsList;
