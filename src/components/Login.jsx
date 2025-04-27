import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("seb@gmail.com");
  const [password, setPassword] = useState("madhavi");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handling the user login credentials
  const handleLogin = async () => {
    try {
      console.log("Sending login request...");
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (err) {
      // ✅ Extract error message safely from backend response
      setError(err?.response?.data?.error || "Something went wrong");
      console.log("Error:", err);
    }
  };

  const handleSignup = async () => {
    try {
      if (!firstname || !emailId || !password) {
        setError("Please fill in all required fields");
        return;
      }

      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName: firstname,
          lastName: lastname,
          emailId,
          password,
        },
        { withCredentials: true }
      );

      if (res.data.message) {
        setError("");
        setIsLoginForm(true);
        setFirstname("");
        setLastname("");
        setEmailId("");
        setPassword("");
      }
    } catch (err) {
      setError(
        err?.response?.data?.error || "Something went wrong during signup"
      );
      console.log("Error:", err);
    }
  };
  return (
    <div className="flex justify-center my-40">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title ">{isLoginForm ? "Login" : "Signup"}</h2>
          <div>
            {!isLoginForm && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Firstname</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstname}
                    onChange={(e) => {
                      setFirstname(e.target.value);
                    }}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Lastname</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastname}
                    onChange={(e) => {
                      setLastname(e.target.value);
                    }}
                  />
                </fieldset>
              </>
            )}
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

          {/* ✅ Only render error message if it's a non-empty string */}
          {error && <p className="text-red-500">{error}</p>}

          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignup}
            >
              {isLoginForm ? "Login" : "Signup"}
            </button>
          </div>
          <h3
            className="m-auto cursor-pointer py-2"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? Singup here"
              : "Exisisting User? Login here"}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
