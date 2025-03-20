import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  function getFullName() {
    let fname =
      user?.firstname.at(0).toUpperCase() +
      user?.firstname.slice(1).toLowerCase();
    let lname =
      user?.lastname.at(0).toUpperCase() +
      user?.lastname.slice(1).toLowerCase();
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
        <div
          className="logged-user-profile-pic"
          onClick={() => navigate("/profile")}
        >
          {getInitials()}
        </div>
      </div>
    </div>
  );
}
