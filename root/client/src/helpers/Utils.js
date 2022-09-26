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
export const fetchChannelsByUser = async ({
  setChannelsData,
  setJoinedChannels,
}) => {
  await axios
    .get(`${process.env.REACT_APP_SERVER_URL}/channels/user`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    })
    .then((response) => {
      if (response.status === 200) {
        // Detailed info about joined channels
        setChannelsData(response.data.listOfChannels);
        // Only IDs of joined channels
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
        setMsgType("light");
        fetchChannels({ setChannelsData });
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          setMsgType("warning");
          setMsg(error.response.data.message);
        }
      });
  }
};

/**
 * A function that allows a channel owner to edit the name of their channel, then update the list of channels on the database automatically
 * @param {*} param0
 * @author Alina Gotcherian
 */
export const editChannel = ({
  authState,
  channelName,
  setMsg,
  setMsgType,
  setChannelsData,
  channelId,
}) => {
  setMsg("");
  const accessToken = localStorage.getItem("accessToken");
  if (!!authState && authState.roles === "user") {
    axios
      .patch(
        `${process.env.REACT_APP_SERVER_URL}/channels/${channelId}`,
        {
          title: channelName,
        },
        { headers: { accessToken: accessToken } }
      )
      .then((response) => {
        setMsg(response.data.message);
        setMsgType("light");
        fetchChannels({ setChannelsData });
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          setMsgType("warning");
          setMsg(error.response.data.message);
        }
      });
  }
};

/**
 * A function that adds a user to a channel (if not exist) by creating a new record in the users_channels table
 * @param {channel, authSate, setMsg, setMsgType} param0
 */
export const joinChannel = ({
  channel,
  authState,
  setMsg,
  setMsgType,
  joinedChannels,
  setChannelsData,
}) => {
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
        if (response.data === 1) {
          joinedChannels.push(channel.id);
          setMsg(`You are now a member of channel "${channel.title}"`);
        }
        if (response.data === -1) {
          const index = joinedChannels.indexOf(channel.id);
          if (index > -1) {
            // only splice array when item is found
            joinedChannels.splice(index, 1); // 2nd parameter means remove one item only
            setMsg(`You have left channel "${channel.title}"`);
          }
        }
        fetchChannels({ setChannelsData });
        // setMsg(response.data.message);
        // setMsgType("text-success");
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
 * fetches a list of all users in the database
 * @param {*} param0
 */
export const fetchAllUsers = ({ setListOfUsers }) => {
  axios
    .get(`${process.env.REACT_APP_SERVER_URL}/users/`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    })
    .then((response) => {
      if (response.status === 200) {
        setListOfUsers(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * delete a user by an admin
 * @param {*} param0
 */
export const deleteUser = ({ userId, setListOfUsers }) => {
  axios
    .delete(`${process.env.REACT_APP_SERVER_URL}/users/delete/user/${userId}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    })
    .then((response) => {
      if (response.status === 200) {
        fetchAllUsers({ setListOfUsers });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * A function that gets all users of a specific 9active) channel by id
 * @param {*} param0
 */
export const getChannelUsers = ({ activeChannel, setActiveChannelUsers }) => {
  axios
    .get(`${process.env.REACT_APP_SERVER_URL}/users/channel/${activeChannel}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    })
    .then((response) => {
      if (response.status === 200) {
        setActiveChannelUsers(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * gets user info by id
 * @param {*} param0
 */
export const getCurrentUserInfo = ({ setUserInfo }) => {
  axios
    .get(`${process.env.REACT_APP_SERVER_URL}/users/userInfo`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    })
    .then((response) => {
      if (response.status === 200) {
        // console.log(response.data);
        setUserInfo(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * FETCHES ALL MESSAGES based on channel Id, and updates list of messages on home
 */
export const getChannelMessages = ({ activeChannel, setListOfMessages }) => {
  if (!activeChannel) return;
  axios
    .get(
      `${process.env.REACT_APP_SERVER_URL}/messages/byChannel/${activeChannel}`
    )
    .then((response) => {
      setListOfMessages(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Delete message by ID
 *
 */
export const deleteMessage = ({ messageId, deleted, setDeleted }) => {
  axios
    .patch(
      `${process.env.REACT_APP_SERVER_URL}/messages/delete/message/${messageId}`,
      {
        isDeleted: deleted === 0 ? 1 : 0,
      },
      { headers: { accessToken: localStorage.getItem("accessToken") } }
    )
    .then((response) => {
      setDeleted(response.data.isDeleted);
    })
    .catch((error) => console.log(error));
};
