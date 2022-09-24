import Message from "./Message";
import "./Message.css";

function MessageList({ listOfMessages }) {

  return (
    <div className="d-flex flex-column messages-area">
      {listOfMessages.map((message, key) => {
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
