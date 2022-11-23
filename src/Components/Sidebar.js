import React from "react";
import "./Sidebar.css";
import { FaHome, FaBell, FaPager, FaQuestion } from "react-icons/fa";

const SideBar = () => {
  return (
    <div className="sidebarContainer">
      <div className="tabContainer">
        {/* <div className="Home"> */}
        <FaHome size="1.5em" color="white" className="Home" />
        {/* </div> */}
        <FaBell size="1.5em" className="Bell" color="white" />
        <FaPager size="1.5em" className="Pager" color="white" />
        <FaQuestion size="1.5em" className="Question" color="white" />
      </div>
    </div>
  );
};

export default SideBar;
