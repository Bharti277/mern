import React, { useState } from "react";

const Contact = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    message: "",
  });

  const handleInput = (e) => {
    console.log(e);
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!", user);
  };
  return (
    <div className="form">
      <div className="heading">LOGIN</div>
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
            type="email"
            id="email"
            name="email"
            placeholder="Enter you email"
            value={user.email}
            onChange={handleInput}
          />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            type="text"
            id="message"
            name="message"
            rows={12}
            cols={30}
            placeholder="Enter your message"
            value={user.message}
            onChange={handleInput}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
