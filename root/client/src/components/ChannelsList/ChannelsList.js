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
          console.log(response.data)
          setChannelsData(response.data)
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }, [])

  console.log(channelsData)

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
