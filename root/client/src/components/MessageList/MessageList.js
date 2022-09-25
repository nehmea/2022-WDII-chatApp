import Message from "./Message";
import "./Message.css";

function MessageList({ listOfMessages, channelTitle }) {

  return (
    <div className="d-flex flex-column messages-area">
      <div className='message-list-header p-2'>
        <h2 className="channel-title-heading">#{channelTitle} </h2>
      </div>

      {listOfMessages.map((message) => {
        return (
          <Message
            key={message.id}
            messageId={message.id}
            username={message.user.username}
            createdAt={message.createdAt}
            body={message.body}
            avatar={message.user.avatarUrl}
            isDeleted={message.isDeleted}
            userId={message.user.id}
          />
        );
      })}
    </div>
  );
}

export default MessageList;
