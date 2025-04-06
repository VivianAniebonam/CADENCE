import React from "react";
import "../styles/ChatMain.css";

const ChatMain = ({
  selectedConversation,
  messages,
  newMessage,
  setNewMessage,
  handleSend,
  user,
}) => {
  return (
    <div className="chat-main">
      {selectedConversation ? (
        <>
          <div className="chat-header">
            <strong>
              Chat with{" "}
              {selectedConversation?.participantUsernames
                ?.filter((name) => name !== user?.username)
                .join(", ") || "Unknown"}
            </strong>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message-bubble ${msg.fromSelf ? "sent" : "received"}`}
              >
                <div>{msg.text}</div>
                <span className="timestamp">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </>
      ) : (
        <div className="no-conversation">No conversation selected.</div>
      )}
    </div>
  );
};

export default ChatMain;
