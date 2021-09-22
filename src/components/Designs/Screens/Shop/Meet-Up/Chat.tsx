import React from 'react';
import Message from './Message';
import MessageInput from './MessageInput';

const Chat = ({ messages }) => {
  return (
    <div>
      <div className="chat-header"></div>
      {messages.map(message => (
        <Message
          isOwner={message.isOwner}
          SenderImage={message.senderImage}
          text={message.text}
          sentAt={message.sentAt}
          isSeen={message.isSeen}
        />
      ))}
      <div className="input">
        <MessageInput />
      </div>
    </div>
  );
};

export default Chat;
