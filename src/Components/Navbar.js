import React from "react";
import "./Navbar.css";
import { FaBars, FaSun, FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="container">
      <div className="left">
        <FaBars size="2em" />
        <h1>Ashwin</h1>
      </div>
      <div className="right">
        <FaSun size="2em" />
        <FaUser size="2em" />
      </div>
    </div>
  );
};

export default Navbar;
