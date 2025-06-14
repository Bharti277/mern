import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const Logout = () => {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();

  useEffect(() => {
    logoutUser();
  }, [logoutUser]);
  return navigate("/login");
};

export default Logout;
