import { useState } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);

    setInput("");

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDFT6iTxJIFA9654N0W85_9UideA2zKwl0",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: input }] }], 
          }),
        }
      );

      const data = await response.json();
      const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't process that.";

      setMessages((prevMessages) => [...prevMessages, { text: botReply, sender: "bot" }]);
    } catch (error) {
      setMessages((prevMessages) => [...prevMessages, { text: "Error getting response.", sender: "bot" }]);
      console.log(error);
    }
  };

  return (
    <div className="chatbot-container">
      {!isOpen && <div className="chatbot-bubble" onClick={toggleChat}>💬</div>}

      {isOpen && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <span>Chat with Gemini</span>
            <button onClick={toggleChat} className="close-btn">✖</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
