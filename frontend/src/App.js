//import client socket.io
import io from "socket.io-client";

import React, { useState } from "react";
import Chat from "./component/Chat";

// connection between server and client
const socket = io.connect("http://localhost:3001");

function App() {
  // using usestate
  const [user, setUser] = useState("");
  const [chatId, setChatId] = useState("");

  // for show live chat
  const [showChat, setShowChat] = useState(false);

  // for handlerButton
  const handlerButton = () => {
    if (user !== "" && chatId !== "") {
      socket.emit("join_chat", chatId);
      setShowChat(true);
    } else {
      alert("Please fill the all Field");
    }
  }

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinchat-section">
          <h2>Join Chat App</h2>
          <input
            type="text"
            placeholder="Enter Your Name"
            required
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="text"
            required
            placeholder="Enter Your Chat Id"
            onChange={(e) => setChatId(e.target.value)}
          />
          <button onClick={handlerButton}>Join Chat</button>
        </div>
      ) : (
        <Chat socket={socket} user={user} chatId={chatId} />
      )}
    </div>
  );
}

export default App;
