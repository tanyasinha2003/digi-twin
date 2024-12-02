import React, { useState, useEffect } from "react";
import logo from "../assets/images/logo.png";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [modelPath, setModelPath] = useState(""); // State to store model path

  useEffect(() => {
    if (messages.length === 0) {
      setMessages(() => ["Hello! How can I assist you today?"]);
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      // Add the user query to the messages
      setMessages((prevMessages) => [...prevMessages, `You: ${input}`]);

      // Send the question to the backend
      try {
        const response = await fetch("http://localhost:5000/ask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: input }),
        });

        if (response.ok) {
          const result = await response.json();
          // Append the answer from the backend to the messages
          setMessages((prevMessages) => [
            ...prevMessages,
            `Bot: ${result.answer}`,
          ]);

          // Check if the response contains a selected_model_path and set it
          if (result.selected_model_path) {
            setModelPath(result.selected_model_path);
          } else {
            setModelPath(""); // Reset if no model path is returned
          }
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            "Bot: Sorry, I couldn't get an answer for you.",
          ]);
        }
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          "Bot: There was an error with the request.",
        ]);
      }

      setInput(""); // Clear the input field
    }
  };

  return (
    <>
      {/* Heading with icon */}
      <div className="absolute right-[1rem] top-[10rem] w-[27rem] h-[40rem] ">
      <div className="bg-[#31363F] opacity-80 rounded-lg right-[2rem] w-[27rem] h-[40rem]  flex items-start p-4 text-white absolute">
        <img
          src={logo} // You can replace this with your own chatbot icon URL
          alt="Chatbot Icon"
          className="w-[6rem] mr-3 mt-1"
        />
        <h2 className="text-xl font-semibold mt-[1rem]">AI Companion</h2>
      </div>
      <div className="absolute right-[3rem] top-[3rem] flex flex-col w-[25rem] mt-[3rem] h-[27rem] max-w-md mx-auto bg-[#ececec] border rounded-lg shadow-lg">
        {/* Chat window with messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="flex flex-col space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg ${
                  msg.startsWith("You:")
                    ? "bg-[#31363F] text-white self-end"
                    : "bg-[#00adef] text-white self-start"
                }`}
              >
                {msg}
                {/* Add the link below the response message if modelPath is available */}
                {index === messages.length - 1 && modelPath && (
                  <a
                    href={`model-viewer.html?model=${encodeURIComponent(
                      modelPath
                    )}`} // Pass model path via query parameter
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline mt-2 block"
                  >
                    Visualise
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-[25rem] bg-[#ececec] rounded-lg absolute right-[3rem] bottom-[1rem]">
        {/* Input and send button */}
        <form onSubmit={handleSend} className="flex p-4 ">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className=" flex-1 px-2 py-3  border-b-[2px] bg-[#ececec]  rounded-sm border-[#bdbcbd]  focus:outline-none focus:border-blue-500 placeholder-[#bdbcbd]"
            placeholder="Enter your query..."
          />
          <button
            type="submit"
            className="ml-2 bg-[#00adef] text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </form>
      </div>
      </div>
     
    </>
  );
};

export default ChatWindow;
