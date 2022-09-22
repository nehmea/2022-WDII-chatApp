import React from 'react'

function TextBoxBasic() {
  return (
    <div className='textBoxContainer'>
      <form>
        <input type="text" name="messageText" />
        <button type='submit'>Send</button>
      </form>
    </div>
  )
}

export default TextBoxBasic
