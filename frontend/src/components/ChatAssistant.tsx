import React, { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { CohereClientV2 } from "cohere-ai";

function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", isBot: true },
  ]);

  const cohere = new CohereClientV2({
    token: "LpkazvdLUexqfQCPJOnOhkdUS1gt8xDAPynLLo7i", // Use env variable (safe practice)
  });

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { text: message, isBot: false };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setMessage("");
    try {
      const response = await cohere.chat({
        model: "command-r-plus",
        messages: [{ role: "user", content: message }],
      });
      const botReply = response?.message?.content[0].text|| "Sorry, I couldn't understand that.";

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botReply, isBot: true },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Oops! Something went wrong.", isBot: true },
      ]);
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50">
          <div className="p-4 bg-blue-600 text-white rounded-t-2xl flex justify-between items-center">
            <h3 className="font-semibold">School Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-700 p-1 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  msg.isBot ? "flex justify-start" : "flex justify-end"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[80%] ${
                    msg.isBot
                      ? "bg-gray-100 text-gray-800"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatAssistant;
