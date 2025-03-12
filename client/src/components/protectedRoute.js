import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedUser, getAllUsers } from "../apiCalls/users";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../redux/loaderSlice";
import { toast } from "react-hot-toast";
import { setAllChats, setAllUsers, setUser } from "../redux/userSlice";
import { getAllChats } from "../apiCalls/chat";

export default function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getLoggedInUser = async () => {
    let response = null;
    try {
      dispatch(showLoader());
      response = await getLoggedUser();
      dispatch(hideLoader());
      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        toast.error(response.message);
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoader());
      navigate("/login");
    }
  };

  const getAllUsersFromDB = async () => {
    let response = null;
    try {
      dispatch(showLoader());
      response = await getAllUsers();
      dispatch(hideLoader());
      if (response.success) {
        dispatch(setAllUsers(response.data));
      } else {
        toast.error(response.message);
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoader());
      navigate("/login");
    }
  };

  const getCurrentUserChats = async () => {
    let response = null;
    try {
      dispatch(showLoader());
      response = await getAllChats();
      dispatch(hideLoader());
      if (response.success) {
        dispatch(setAllChats(response.data));
      } else {
        toast.error(response.message);
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoader());
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getLoggedInUser();
      getAllUsersFromDB();
      getCurrentUserChats();
    } else {
      navigate("/login");
    }
  }, []);
  return <div>{children}</div>;
}
