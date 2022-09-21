/**
 * A list of utility functions to be used on multiple occassions in the project
 */
import axios from "axios";

/**
 *  a function that fetches all channels from database and update the list of channels on the page accordingly
 * @param {setChannelsData} a setState function passed to fetchChannels
 */
export const fetchChannels = ({ setChannelsData }) => {
  axios
    .get(`${process.env.REACT_APP_SERVER_URL}/channels/`)
    .then((response) => {
      if (response.status === 200) {
        setChannelsData(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * A function that allows a user to create a new channel, then update the list of channels on the database automatically
 * @param {*} param0
 */
export const createChannel = ({
  authState,
  channelName,
  setMsg,
  setMsgType,
  setChannelsData,
}) => {
  setMsg("");
  const accessToken = localStorage.getItem("accessToken");
  if (!!authState && authState.roles === "user") {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/channels/new`,
        {
          title: channelName,
        },
        { headers: { accessToken: accessToken } }
      )
      .then((response) => {
        setMsg(response.data.message);
        setMsgType("text-success");
        //   setChannelsData([...channelsData, response.data.newChannel]);
        fetchChannels({ setChannelsData });
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          setMsgType("text-danger");
          setMsg(error.response.data.message);
        }
      });
  } else {
    setMsgType("text-danger");
    setMsg("Please login to create a channel");
  }
};
