import { useState } from "react";
import "./AIChat.css";

function AIChat() {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    // ✅ Voice function (temporary)
    const startVoice = () => {
        alert("Voice feature coming soon 🎤");
    };

    const sendMessage = async () => {

        if (message.trim() === "") return;

        const userMessage = { sender: "user", text: message };

        // ✅ FIXED (important)
        setChat(prev => [...prev, userMessage]);

        try {
            const response = await fetch("http://localhost:8082/api/ai/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message })
            });

            const data = await response.text();

            const aiMessage = { sender: "ai", text: data };

            setChat(prev => [...prev, aiMessage]);

        } catch (error) {
            console.error("Error:", error);
            setChat(prev => [...prev, { sender: "ai", text: "Server error 😓" }]);
        }

        setMessage("");
    };

    return (

        <div>

            {/* Floating Button */}
            <div className="chat-icon" onClick={() => setOpen(!open)}>
                💧
            </div>

            {/* Chat Window */}
            {open && (

                <div className="chat-box">

                    <div className="chat-header">
                        JalSevak AI
                    </div>

                    <div className="chat-body">
                        {chat.map((msg, index) => (
                            <div 
                                key={index} 
                                className={msg.sender === "user" ? "user-msg" : "ai-msg"}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* ✅ SINGLE CLEAN INPUT */}
                    <div className="chat-input">

                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Ask about water diseases..."
                        />

                        <button onClick={startVoice}>🎤</button>

                        <button onClick={sendMessage}>Send</button>

                    </div>

                </div>

            )}

        </div>

    );
}

export default AIChat;