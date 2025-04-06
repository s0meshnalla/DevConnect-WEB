import React, { useEffect } from "react";
import Navbar from "./NavBar";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux"; // Missing this import

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Checking is userData is present in redux-store
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const user = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(user.data));
      console.log(user.data);
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <Navbar />
      <Outlet /> {/* Children components of body will render here */}
      <Footer />
    </div>
  );
};

export default Body;
