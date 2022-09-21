import axios from "axios";
import { useEffect, useState } from "react";
import ChannelItem from "./ChannelItem"

function ChannelsList() {
  const [channelsData, setChannelsData] = useState([])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/channels/`)
      .then((response) => {
        if (response.status === 200) {
          setChannelsData(response.data)
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }, [])

  return (
    <div>
      <h2>ChannelsList</h2>
      <div>
        {channelsData.map(channel => (
          <ChannelItem key={channel.id}>{channel.title}</ChannelItem>
        ))}
      </div>
    </div>
  )
}

export default ChannelsList
