import { useState } from "react";
import Home from "./components/Home.jsx";
import ChatRoom from "./components/ChatRoom.jsx";

function App() {
    const [roomId, setRoomId] = useState("");

    return roomId ? (
        <ChatRoom roomId={roomId} />
    ) : (
        <Home setRoomId={setRoomId} />
    );
}

export default App;
