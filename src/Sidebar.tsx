import React from "react";
import "./Sidebar.css";

export default function Sidebar({
  me,
  clients,
  setTarget,
}: {
  me: string;
  clients: string[];
  setTarget: (target: string) => void;
}) {
  const defaultImagePath = 'User_Avatar/User Avatar.png';

  const getImagePath = (nickname: string) => {
    const imagePath = `User_Avatar/${nickname}.jpg`;
    try {
      const img = new Image();
      img.src = imagePath;
      return img.complete ? imagePath : defaultImagePath;
    } catch (error) {
      return defaultImagePath;
    }
  };

  return (
    <>
      <div className="flex-none border-r-2 border-gray-200 md:w-64 sidebar-main">
        <div className="flex sm:items-center justify-between py-10 px-5">
          <div className="flex items-center space-x-2">
            <img
              src={getImagePath(me)}
              alt=""
              className="w-8 rounded-full"
            />
            <div className="text-2xl invisible md:visible">
              <span className="text-gray-700 mr-3 font-bold"> {me}'s Chat</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-2">
          <div className="flex flex-col">
            {clients.map((client, key) => (
              <div key={key} className="sidebar-chat">
                <button
                  className="flex items-center p-3 rounded-xl"
                  onClick={() => setTarget(client)}
                >
                  <img
                    src={getImagePath(client)}
                    alt=""
                    className="w-4 sm:w-8 h-10 sm:h-8 rounded-full"
                  />
                  <div className="flex items-center">
                    <span className="mr-3 ml-2">{client}</span>
                    <span className="text-green-500">
                      <svg width="10" height="10">
                        <circle
                          cx="5"
                          cy="5"
                          r="5"
                          fill="currentColor"
                        ></circle>
                      </svg>
                    </span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
