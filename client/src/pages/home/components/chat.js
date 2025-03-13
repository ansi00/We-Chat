import { useDispatch, useSelector } from "react-redux";
import { createNewMsg } from "../../../apiCalls/message";
import { hideLoader, showLoader } from "../../../redux/loaderSlice";
import { toast } from "react-hot-toast";
import { useState } from "react";

export default function ChatArea() {
  const dispatch = useDispatch();
  const { selectedChat, user } = useSelector((state) => state.userReducer);
  const selectedUser = selectedChat.members.find((u) => u._id !== user._id);
  const [message, setMessage] = useState("");
  const sendMessage = async () => {
    try {
      const newMessage = {
        chat: selectedChat._id,
        sender: user._id,
        text: message,
      };
      dispatch(showLoader());
      const response = await createNewMsg(newMessage);
      dispatch(hideLoader());
      if (response.success) {
        setMessage("");
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error.message);
    }
  };
  return (
    <>
      {selectedChat && (
        <div className="app-chat-area">
          <div className="app-chat-area-header">
            {selectedUser.firstname + " " + selectedUser.lastname}
          </div>
          <div className="main-chat-area">CHAT AREA</div>
          <div className="send-message-div">
            <input
              type="text"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              className="send-message-input"
              placeholder="Type a message"
            />
            <button
              className="fa fa-paper-plane send-message-btn"
              onClick={sendMessage}
              aria-hidden="true"
            ></button>
          </div>
        </div>
      )}
    </>
  );
}
