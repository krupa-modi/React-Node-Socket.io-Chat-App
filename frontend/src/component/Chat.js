import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, user, chatId }) => {
  // using useState
  const [currentmsg, setCurrentMsg] = useState("");

  // show all message
  const [msgList, setMsgList] = useState([]);

  //   create click function
  const handlerSendMsg = async () => {
    if (currentmsg !== "") {
      // create object
      const MsgData = {
        ChatId: chatId,
        author: user,
        message: currentmsg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_msg", MsgData);
      setMsgList((list) => [...list, MsgData]);
      setCurrentMsg("");
    }
  };

  //   using useEffect hook
  useEffect(() => {
    socket.on("receive_msg", (data) => {
      //   console.log(data);
      setMsgList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <>
      <div className="chat-section">
        <div className="chat-header">
          <h3>Live Chat</h3>
        </div>

        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {msgList.map((msg) => {
              return (
                <div
                  className="message"
                  id={user === msg.author ? "you" : "other"}
                  //   key={msg.ChatId}
                >
                  <div>
                    <div className="message-content">
                      <p>{msg.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{msg.time}</p>
                      <p id="author">{msg.author}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={currentmsg}
            placeholder="Message..."
            onChange={(e) => setCurrentMsg(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handlerSendMsg()}
          />
          <button onClick={handlerSendMsg}>&#9658;</button>
        </div>
      </div>
    </>
  );
};

export default Chat;
