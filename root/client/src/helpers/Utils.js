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
 *  a function that fetches all channels from database and update the list of channels on the page accordingly
 * @param {setChannelsData} a setState function passed to fetchChannels
 */
export const fetchChannelsByUser = ({ setChannelsData, setJoinedChannels }) => {
  axios
    .get(`${process.env.REACT_APP_SERVER_URL}/channels/user`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    })
    .then((response) => {
      if (response.status === 200) {
        setChannelsData(response.data.listOfChannels);
        setJoinedChannels(response.data.joinedChannels);
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
        fetchChannels({ setChannelsData });
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          setMsgType("text-danger");
          setMsg(error.response.data.message);
        }
      });
  }
};

/**
 * A function that adds a user to a channel (if not exist) by creating a new record in the users_channels table
 * @param {channel, authSate, setMsg, setMsgType} param0
 */
export const joinChannel = ({ channel, authState, setMsg, setMsgType }) => {
  if (!!authState && authState.roles === "user") {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/channels/join`,
        {
          channelId: channel.id,
        },
        { headers: { accessToken: accessToken } }
      )
      .then((response) => {
        setMsg(response.data.message);
        setMsgType("text-success");
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          setMsgType("text-danger");
          setMsg(error.response.data.message);
        }
      });
  }
};
