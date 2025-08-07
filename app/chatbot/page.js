"use client";
import { useState, useRef, useEffect } from "react";
import { BsChatSquareText } from "react-icons/bs";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatHistory");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send user message to FastAPI
  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    // Store and clear input
    const userMessage = input;
    setInput("");

    try {
      // Call FastAPI backend
      const res = await fetch("http://localhost:8000/ask", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ question: userMessage }),
});


      const data = await res.json();
      const botReply = data.answer || "No relevant answer found.";

      // Add bot reply to chat
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error connecting to the server." },
      ]);
    }
  };

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem("chatHistory");
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100 border border-gray-200 shadow-xl overflow-hidden">
      {/* Sidebar */}
      <div className="w-40 bg-black flex flex-col justify-between items-center py-14">
        <div className="flex flex-col space-y-8 items-center">
          <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-lg text-2xl text-gray-700">
            👤
          </div>
          <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-lg text-2xl text-gray-700">
            <BsChatSquareText />
          </div>
          <div
            onClick={clearHistory}
            className="w-12 h-12 bg-red-500 flex items-center justify-center rounded-lg text-white cursor-pointer hover:bg-red-600 transition"
            title="Clear Chat History"
          >
            🗑
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white rounded-[30px] overflow-hidden m-0 shadow-lg">
        {/* Header */}
        <div className="bg-black text-white p-4 text-lg font-bold shadow-md rounded-t-[30px] flex justify-between items-center">
          Chatty Assistant 🤖
          <button
            onClick={clearHistory}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-sm"
          >
            Clear
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 flex flex-col">
          {messages.length === 0 && (
            <div className="flex flex-col items-center text-gray-600 mt-8 mb-4">
              <BsChatSquareText className="text-3xl mb-2" />
              <p className="font-semibold text-lg">Welcome to Chatty..</p>
              <div className="w-16 h-1 bg-gray-300 rounded-full mt-2"></div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl shadow-md text-base font-medium break-words inline-block max-w-xs sm:max-w-md ${
                msg.sender === "user"
                  ? "bg-black text-white self-end ml-auto rounded-br-3xl"
                  : "bg-gray-200 text-black rounded-bl-3xl"
              }`}
            >
              {msg.text}
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="flex items-center p-4 bg-white border-t border-gray-200 rounded-b-[30px]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 rounded-full bg-gray-100 text-black placeholder-gray-400 outline-none"
          />
          <button
            onClick={sendMessage}
            className="ml-3 w-10 h-10 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
