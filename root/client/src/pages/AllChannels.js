import React, { useContext, useState } from 'react'
import { Button, Col } from 'react-bootstrap'
import ChannelItem from '../components/ChannelsList/ChannelItem';
import { AuthContext } from '../helpers/AuthContext';
import { joinChannel } from '../helpers/Utils';

function AllChannels(props) {
  const { authState } = useContext(AuthContext);
  const { channelsData, joinedChannels, setChannelsData } = props;
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  return (
    <Col xs={12} md={9} className="d-flex flex-column p-0">
      All Channels
      <div>
        {channelsData.map(
          (channel, index) => (
            <ChannelItem key={index}>
              <span className="mx-2">
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
                    setChannelsData
                  })
                }
              >
                {joinedChannels.includes(channel.id) ? " Leave " : " Join "}
              </Button>
            </ChannelItem>
          )
        )
        }
      </div>
    </Col >
  )
}

export default AllChannels
