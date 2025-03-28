import React, { useEffect, useState } from "react";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import ChatArea from "./components/chat";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

export default function Home() {
  const { selectedChat, user } = useSelector((state) => state.userReducer);
  const [onlineUser, setOnlineUser] = useState([]);

  useEffect(() => {
    if (user) {
      socket.emit("join-room", user._id);
      socket.emit("user-login", user._id);

      const handleOnlineUsers = (onlineusers) => {
        setOnlineUser([...onlineusers]);
      };

      socket.on("online-users", handleOnlineUsers);
      socket.on("online-users-updated", handleOnlineUsers);

      return () => {
        socket.off("online-users", handleOnlineUsers);
        socket.off("online-users-updated", handleOnlineUsers);
      };
    }
  }, [user]);

  return (
    <div className="home-page">
      <Header socket={socket} />
      <div className="main-content">
        <Sidebar socket={socket} onlineUser={onlineUser} />
        {selectedChat && <ChatArea socket={socket} />}
      </div>
    </div>
  );
}
