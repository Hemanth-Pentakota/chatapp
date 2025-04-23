import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Home = ({ setRoomId }) => {
    const [input, setInput] = useState("");

    const createRoom = () => {
        const newRoom = uuidv4().slice(0, 6); // Short room ID
        setRoomId(newRoom);
    };

    const joinRoom = () => {
        if (input.trim()) setRoomId(input.trim());
    };

    return (
        <div>
            <h2>Welcome to Chat App</h2>
            <button onClick={createRoom}>Create Room</button>
            <input
                placeholder="Enter Room Code"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={joinRoom}>Join Room</button>
        </div>
    );
};

export default Home;
