import React, { useEffect, useRef, useState } from "react";
import "./Conversation.css";
import { MessageItem } from "./MessageItem";

export default function Conversation({
  target,
  messages,
  sendMessage,
}: {
  target: string;
  messages: MessageItem[];
  sendMessage: (value: string) => void;
}) {
  const [message, setMessage] = useState<string>("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  });

  const messagesGroupedBySender = messages.reduce((prev, curr) => {
    if (prev.length > 0 && curr.sender === prev[prev.length - 1].sender) {
      prev[prev.length - 1].messages.push(curr.message);
      return prev;
    } else {
      return [
        ...prev,
        {
          sender: curr.sender,
          messages: [curr.message],
        },
      ];
    }
  }, [] as { sender: string; messages: string[] }[]);

  const submit = () => {
    setMessage("");
    sendMessage(message);
    scrollToBottom();
  };

  return (
    <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div className="flex items-center space-x-4">
          <img
            src={`User_Avatar/${target}.jpg`}
            alt=""
            className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
          />
          <div className="flex flex-col leading-tight">
            <div className="text-2xl mt-1 flex items-center">
              <span className="text-gray-700 mr-3">{target}</span>
              <span className="text-green-500">
                <svg width="10" height="10">
                  <circle cx="5" cy="5" r="5" fill="currentColor"></circle>
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div>
          {/* Video Call Button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="h-6 w-6 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.53,7.15a1,1,0,0,0-1,0L17,8.89A3,3,0,0,0,14,6H5A3,3,0,0,0,2,9v6a3,3,0,0,0,3,3h9a3,3,0,0,0,3-2.89l3.56,1.78A1,1,0,0,0,21,17a1,1,0,0,0,.53-.15A1,1,0,0,0,22,16V8A1,1,0,0,0,21.53,7.15ZM15,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V9A1,1,0,0,1,5,8h9a1,1,0,0,1,1,1Zm5-.62-3-1.5V11.12l3-1.5Z"
              ></path>
            </svg>
          </button>
          {/* Option Button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-gray-600"
            >
              <g id="Free-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g transform="translate(-1051.000000, -750.000000)" fill="#000000" id="Group">
                  <g transform="translate(1041.000000, 746.000000)" id="Shape">
                    <path d="M12,4 C10.8954305,4 10,4.8954305 10,6 C10,7.1045695 10.8954305,8 12,8 C13.1045695,8 14,7.1045695 14,6 C14,4.8954305 13.1045695,4 12,4 Z"></path>
                    <path d="M12,10 C10.8954305,10 10,10.8954305 10,12 C10,13.1045695 10.8954305,14 12,14 C13.1045695,14 14,13.1045695 14,12 C14,10.8954305 13.1045695,10 12,10 Z"></path>
                    <path d="M12,16 C10.8954305,16 10,16.8954305 10,18 C10,19.1045695 10.8954305,20 12,20 C13.1045695,20 14,19.1045695 14,18 C14,16.8954305 13.1045695,16 12,16 Z"></path>
                  </g>
                </g>
              </g>
            </svg>

          </button>
        </div>
      </div>
      <div
        id="messages"
        className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch h-screen"
      >
        {messages.length > 0 ? (
          <>
            {messagesGroupedBySender.map((group, key) => (
              <div key={key} className="chat-message">
                <div
                  className={`flex items-end${
                    group.sender === target ? "" : " justify-end"
                  }`}
                >
                  <div
                    className={`flex flex-col space-y-2 text-xs max-w-xs mx-2 ${
                      group.sender === target
                        ? "order-2 items-start"
                        : "order-1 items-end"
                    }`}
                  >
                    {group.messages.map((message, key) => (
                      <div key={key}>
                        <span
                          className={`px-4 py-2 rounded-lg inline-block ${
                            group.sender === target
                              ? "rounded-bl-none bg-gray-100 text-gray-600"
                              : "rounded-br-none right-chat text-white"
                          }`}
                        >
                          {message}
                        </span>
                      </div>
                    ))}
                  </div>
                  <img
                    src={`User_Avatar/${group.sender}.jpg`}
                    alt="My profile"
                    className={`w-6 h-6 rounded-full order-${
                      group.sender === target ? 1 : 2
                    }`}
                  />
                </div>
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </>
        ) : (
          <div className="chat-message no-message flex flex-col justify-center items-center h-screen">
            <img src={`User_Avatar/Sad Message Icon.png`} />
            <span className="px-4 pt-4 inline-block text-xl font-medium">No Messages Yet...</span>
            <span className="px-4 py-2 inline-block">Looks like you haven't initiated conversation.</span>
          </div>
        )}
      </div>
      <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
        <div className="relative flex">
          <span className="absolute inset-y-0 flex items-center">
            {/* MIC Button */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                ></path>
              </svg>
            </button>
          </span>
          <input
            type="text"
            placeholder="Write Something"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => (e.key === "Enter" ? submit() : null)}
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 py-3"
          />
          <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
            {/* Attachment Button */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                ></path>
              </svg>
            </button>
            {/* CAMERA Button */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </button>
            {/* Send Submit Button */}
            <button
              type="button"
              className="inline-flex items-center justify-center h-12 w-12 transition duration-500 ease-in-out text-white hover:bg-blue-400 focus:outline-none send-button"
              onClick={() => submit()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-6 w-6 transform rotate-90"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
