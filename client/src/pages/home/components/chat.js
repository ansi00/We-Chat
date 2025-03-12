import { useSelector } from "react-redux";

export default function ChatArea() {
  const { selectedChat, user } = useSelector((state) => state.userReducer);
  const selectedUser = selectedChat.members.find((u) => u._id !== user._id);
  return (
    <>
      {selectedChat && (
        <div class="app-chat-area">
          <div class="app-chat-area-header">
            {selectedUser.firstname + " " + selectedUser.lastname}
          </div>
          <div>
            {/* <!--Chat Area--> */}
            CHAT AREA
          </div>
          <div>
            {/* <!--SEND MESSAGE--> */}
            SEND MESSAGE
          </div>
        </div>
      )}
    </>
  );
}
