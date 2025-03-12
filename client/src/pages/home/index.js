import React from "react";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import ChatArea from "./components/chat";
import { useSelector } from "react-redux";

export default function Home() {
  const { selectedChat } = useSelector((state) => state.userReducer);
  return (
    <div className="home-page">
      <Header />
      <div className="main-content">
        <Sidebar />
        {selectedChat && <ChatArea />}
      </div>
    </div>
  );
}
