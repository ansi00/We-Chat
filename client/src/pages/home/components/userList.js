import React from "react";
import { useSelector } from "react-redux";

export default function UserList({ searchKey }) {
  const { allUsers } = useSelector((state) => state.userReducer);
  return allUsers
    .filter((user) => {
      return (
        (user.firstname?.toLowerCase().includes(searchKey.toLowerCase()) ||
          user.lastname?.toLowerCase().includes(searchKey.toLowerCase())) &&
        searchKey
      );
    })
    .map((user) => {
      return (
        <div class="user-search-filter">
          <div class="filtered-user">
            <div class="filter-user-display">
              {user.profilePic && (
                <img
                  src={user.profilePic}
                  alt="Profile Pic"
                  class="user-profile-image"
                />
              )}
              {!user.profilePic && (
                <div class="user-default-profile-pic">
                  {user.firstname.charAt(0).toUpperCase() +
                    user.lastname.charAt(0).toUpperCase()}
                </div>
              )}
              <div class="filter-user-details">
                <div class="user-display-name">
                  {user.firstname + " " + user.lastname}
                </div>
                <div class="user-display-email">{user.email}</div>
              </div>
              <div class="user-start-chat">
                <button class="user-start-chat-btn">Start Chat</button>
              </div>
            </div>
          </div>
        </div>
      );
    });
}
