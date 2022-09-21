import React from 'react';


function TextBoxBasic() {

    const sendMessage = () => {

    };

  return (
    <div className='textBoxContainer'>
        <input type="text" name="messageText" />
        <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default TextBoxBasic
