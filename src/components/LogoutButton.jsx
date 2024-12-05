import React from "react";
import "./../css/components/_logoutButton.scss";
import { HiLogout } from "react-icons/hi";

const LogoutButton = ({ onLogout }) => {
  return (
    <button onClick={onLogout} className="logout-button-container">
      <HiLogout className="hiLogout" /> Logout
    </button>
  );
};

export default LogoutButton;
