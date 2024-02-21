import { useState, useEffect } from "react";
import io from "socket.io-client";
import "./app.css"; // Import your CSS file for styling

// Connect to the server using Socket.IO
const socket = io("http://localhost:3000");

// App component
const App = () => {
  // State for storing messages
  const [messages, setMessages] = useState([]);
  // State for storing the current message input
  const [messageInput, setMessageInput] = useState("");

  // Effect hook to handle incoming messages
  useEffect(() => {
    // Event listener for incoming "message" events from the server
    socket.on("message", (message) => {
      // Update the messages state with the new message
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up by removing the event listener when component unmounts
    return () => {
      socket.off("message");
    };
  }, [messages]); // Dependency array is empty to ensure the effect runs only once

  // Function to send a message
  const sendMessage = () => {
    // Emit a "message" event to the server with the current message input
    socket.emit("message", messageInput);
    // Clear the message input field after sending
    setMessageInput("");
  };

  // Render the component
  return (
    <div className="app-container">
      <div className="chat-container">
        <div className="chat-header">Chat Happily</div>
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className="message">
              {message}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={messageInput}
            placeholder="Type Your Message"
            onChange={(e) => setMessageInput(e.target.value)}
            className="input-field"
          />
          <button onClick={sendMessage} className="send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
