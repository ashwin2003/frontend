import React from "react";
import "./HeroButton.css";
import { FaFileContract, FaEnvelopeOpen, FaFileMedical } from "react-icons/fa";

const HeroButton = ({ details, handleClick }) => {
  return (
    <div
      className="hero-button-container"
      style={{
        backgroundColor: details.color,
        boxShadow: `10px 10px 20px ${details.color}`,
      }}
      onClick={handleClick}
    >
      {details.btnNo === 1 && <FaFileMedical size="2em" color="white" />}
      {details.btnNo === 2 && <FaFileContract size="2em" color="white" />}
      {details.btnNo === 3 && <FaEnvelopeOpen size="2em" color="white" />}

      <div className="labelContainer">
        <p style={{ color: details.color }}>{details.label}</p>
      </div>
    </div>
  );
};

export default HeroButton;
