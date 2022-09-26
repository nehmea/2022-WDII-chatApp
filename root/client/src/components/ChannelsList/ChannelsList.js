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

  return (
    <div className="m-2">
      <h2>My Channels</h2>
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
                {/*  TODO remove will be handled in all channels componenent*/}
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
