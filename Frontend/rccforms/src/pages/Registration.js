import React, { useState } from 'react';
import axios from 'axios';
import { API_URL_REGISTER } from "../constants";

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      username: username,
      email: email,
      password: password,
      role: role,
    };

    axios
      .post(API_URL_REGISTER, formData)
      .then((response) => {
        console.log(response.data);
        // Display success message or redirect to another page
      })
      .catch((error) => {
        console.error(error);
        // Display error message
      });
  };

  return (
    <form onSubmit={handleSubmit} className="needs-validation w-50">
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          className="form-control"
          required
        />
        <div className="invalid-feedback">Please provide a username.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          className="form-control"
          required
        />
        <div className="invalid-feedback">Please provide a valid email address.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className="form-control"
          required
        />
        <div className="invalid-feedback">Please provide a password.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="role" className="form-label">Role:</label>
        <input
          type="text"
          id="role"
          value={role}
          onChange={handleRoleChange}
          className="form-control"
          required
        />
        <div className="invalid-feedback">Please provide a role.</div>
      </div>
      <button type="submit" className="btn btn-primary">Register</button>
    </form>
  );
};

export default RegistrationForm;
