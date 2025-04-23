import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://chatback-gamma.vercel.app/"); // Backend URL

const ChatRoom = ({ roomId }) => {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (roomId) {
      console.log("[Frontend] Emitting join-room with ID:", roomId);
      socket.emit("join-room", roomId);
    }

    socket.on("receive-message", (data) => {
      console.log("[Frontend] Received message:", data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      console.log("[Frontend] Cleaning up socket listener");
      socket.off("receive-message");
    };
  }, [roomId]);

  const sendMessage = () => {
    if (msg.trim()) {
      console.log("[Frontend] Sending message:", msg);
      socket.emit("send-message", msg);
      setMsg("");
    } else {
      console.log("[Frontend] Empty message, not sent");
    }
  };

  return (
    <div>
      <h2>Room: {roomId}</h2>
      <div style={{ height: "200px", border: "1px solid gray", overflowY: "scroll", padding: "10px" }}>
        {messages.map((m, i) => (
          <div key={i}><strong>{m.sender}</strong>: {m.message}</div>
        ))}
      </div>
      <input
        type="text"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;