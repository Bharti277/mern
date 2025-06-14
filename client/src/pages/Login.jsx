import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Register.css";
import { useAuth } from "../store/auth";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { storeTokenInLocalStorage } = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const res_data = await response.json();
        // localStorage.setItem("token", res_data?.token);
        storeTokenInLocalStorage(res_data?.token);

        setUser({
          email: "",
          password: "",
        });
        navigate("/");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.log("Error in login:", error);
    }
  };
  return (
    <div>
      <div className="form">
        <div className="heading">LOGIN</div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">EMail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter you email"
              value={user.email}
              onChange={handleInput}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={handleInput}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        <p className="login-link">
          Don't have an account ? <NavLink to="/register"> Signup </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
