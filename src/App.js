import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const socket = useRef(null);

  useEffect(() => {
    socket.current = new WebSocket('wss://otkgt40lhg.execute-api.us-east-1.amazonaws.com/production/');

    socket.current.onopen = () => {
      console.log('WebSocket connection established.');
    };

    socket.current.onmessage = (event) => {
      const receivedMessage = event.data;
      setMessages(prevMessages => [...prevMessages, receivedMessage]);
    };

    return () => {
      if (socket.current) {
        socket.current.close();
        console.log('WebSocket connection closed.');
      }
    };
  }, []);

  const sendMessage = () => {
    if (messageInput.trim() !== '') {
      const message = messageInput
      socket.current.send(message);
      setMessageInput('');
    }
  };

  return (
    <div className="App">
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className="message">
              {message}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
