import React from "react";
import Navbar from "./NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Body = () => {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* Children components of body will render here */}
      <Footer />
    </div>
  );
};

export default Body;
