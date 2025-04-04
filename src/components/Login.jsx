import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [emailId, setEmailId] = useState("dhoni@gmail.com");
  const [password, setPassword] = useState("madhavi");

  //Handling the user login credentials
  const handleLogin = async () => {
    try {
      console.log("Sending login request...");
      const res = await axios.post(
        "http://localhost:7777/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      console.log("Response:", res); // Log the response
    } catch (error) {
      console.log("Error:", error.message); // Log any error
    }
  };

  return (
    <div className="flex justify-center my-40">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title ">Login</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="text"
                className="input"
                value={emailId}
                onChange={(e) => {
                  setEmailId(e.target.value);
                }}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
