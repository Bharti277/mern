import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Register.css";
import { useAuth } from "../store/auth.jsx";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
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
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log(response, "response");
      if (response.ok) {
        const res_data = await response.json();
        // localStorage.setItem("token", res_data?.token);
        storeTokenInLocalStorage(res_data?.token);
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        navigate("/login");
      }
    } catch (error) {
      console.log("Error in registration:", error);
    }
  };
  return (
    <div>
      <div className="wrapper signUp">
        <div className="form">
          <div className="heading">CREATE AN ACCOUNT</div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={user.username}
                onChange={handleInput}
              />
            </div>
            <div>
              <label htmlFor="email">EMail</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your mail"
                value={user.email}
                onChange={handleInput}
              />
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input
                type="phone"
                id="phone"
                name="phone"
                placeholder="Enter you phone"
                value={user.phone}
                onChange={handleInput}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter you password"
                value={user.password}
                onChange={handleInput}
              />
            </div>
            <button type="submit">Submit</button>
            <h2 align="center" className="or">
              OR
            </h2>
          </form>
          <p>
            Have an account ? <NavLink to="/login"> Login </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
