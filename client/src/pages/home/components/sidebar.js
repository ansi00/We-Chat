import React, { useState } from "react";
import Search from "./search";
import UserList from "./userList";

export default function Sidebar() {
  const [searchKey, setSearchKey] = useState("");
  return (
    <div className="app-sidebar">
      <Search searcKey={searchKey} setSearchKey={setSearchKey} />
      <UserList searchKey={searchKey} />
    </div>
  );
}
