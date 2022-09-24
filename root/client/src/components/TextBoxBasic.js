import React from "react";
import { Socket } from "socket.io-client";

function TextBoxBasic() {
  const sendMessage = (data) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/messages`, data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        //navigate(`/login`);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <div className="textBoxContainer">
      <input type="text" name="messageText" />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default TextBoxBasic;
