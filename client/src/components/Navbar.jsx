import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  return (
    <div className="navbar-container">
      <div>Mern</div>
      <ul className="navbar">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/service">Service</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        {isLoggedIn ? (
          <li>
            <NavLink to="/logout">Logout</NavLink>
          </li>
        ) : (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Signup</NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
