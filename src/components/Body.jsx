import React from "react";
import Navbar from "./NavBar";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* Children components of body will render here */}
    </div>
  );
};

export default Body;
