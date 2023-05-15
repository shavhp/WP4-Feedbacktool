import React, { useState } from 'react';
import axios from 'axios';
import { Col, Container } from "reactstrap";
import { API_URL_LOGIN } from "../constants";

function LoginPage() {
  const [username, setUsername] = useState("Mustafa");
  const [password, setPassword] = useState("123");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post(API_URL_LOGIN, { username, password })
      .then(response => {
        if (response.data.success) {
          // Store username in local storage
          localStorage.setItem('username', response.data.username);
          // Redirect to homepage
          window.location.href = '/home';
        } else {
          setError(response.data.error);
        }
      })
      .catch(error => {
        console.log(error);
        setError("An error occurred while logging in. Please try again.");
      });
  };


  return (
    <Container>
      <Col md={{ span: 6, offset: 3 }} className="mt-5">
        <h1>Login Page</h1>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input type="text" className="form-control" value={username} onChange={handleUsernameChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input type="password" className="form-control" value={password} onChange={handlePasswordChange} />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </Col>
    </Container>
  );
}

export default LoginPage;
