import React, { useContext, useState } from 'react'
import { Button, Col } from 'react-bootstrap'
import ChannelItem from '../components/ChannelsList/ChannelItem';
import { AuthContext } from '../helpers/AuthContext';
import { joinChannel } from '../helpers/Utils';

function AllChannels(props) {
  const { authState } = useContext(AuthContext);
  const { channelsData, joinedChannels } = props;
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  return (
    <Col xs={12} md={9} className="d-flex flex-column p-0">
      All Channels
      <div>
        {channelsData.map(
          (channel, index) => {
            console.log(channel);
            return (
              <ChannelItem key={index}>
                <span
                  className="mx-2"
                // onClick={() => {
                //   setActiveChannel(channel.id);
                // }}
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
          }
          // joinedChannels.includes(channel.id) && (

        )
        }
      </div>

    </Col >
  )
}

export default AllChannels
