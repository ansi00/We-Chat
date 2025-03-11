import React from "react";
import { useSelector } from "react-redux";

export default function Header() {
  const { user } = useSelector((state) => state.userReducer);
  function getFullName() {
    let fname = user?.firstname.toUpperCase();
    let lname = user?.lastname.toUpperCase();
    return fname + " " + lname;
  }

  function getInitials() {
    let fChar = user?.firstname.toUpperCase()[0];
    let lChar = user?.lastname.toUpperCase()[0];
    return fChar + lChar;
  }
  return (
    <div className="app-header">
      <div className="app-logo">
        <i className="fa fa-comments" aria-hidden="true"></i>
        We Chat
      </div>
      <div className="app-user-profile">
        <div className="logged-user-name">{getFullName()}</div>
        <div className="logged-user-profile-pic">{getInitials()}</div>
      </div>
    </div>
  );
}
