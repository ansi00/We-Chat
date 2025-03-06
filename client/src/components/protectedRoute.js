import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedUser } from "../apiCalls/users";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getLoggedInUser = async () => {
    let response = null;
    try {
      response = await getLoggedUser();
      if (response.success) {
        setUser(response.data);
      } else {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getLoggedInUser();
    } else {
      navigate("/login");
    }
  });
  return (
    <div>
      <p>Name : {user?.firstname + "" + user?.lastname}</p>
      <p>Email : {user?.email}</p>
      <br />
      <br />
      {children}
    </div>
  );
}
