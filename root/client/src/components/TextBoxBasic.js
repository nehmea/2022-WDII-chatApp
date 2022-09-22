import React from 'react';
import { Socket } from 'socket.io-client';


function TextBoxBasic() {

    const sendMessage = (data) => {
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/messages`, data)
            .then((response) => {
            //navigate(`/login`);
            })
            .catch((error) => {
            if (error.response) {
                setErrorMsg(error.response.data.error);
            }
            });
    };

  return (
    <div className='textBoxContainer'>
        <input type="text" name="messageText" />
        <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default TextBoxBasic
