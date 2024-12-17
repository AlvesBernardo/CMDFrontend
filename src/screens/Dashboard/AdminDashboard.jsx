import React, { useEffect, useState } from "react";
import "../../css/screens/_adminDashboard.scss";
import {HiLogout} from "react-icons/hi";
import imgPlaceholder from "../../images/pinkBow.jpg";
import CustomButton from "../../components/CustomButton/CustomButton.jsx";
import { SiReasonstudios } from "react-icons/si";
import { PiStudent } from "react-icons/pi";
import {MdOutlineQuestionAnswer} from "react-icons/md";
import TokenManager from "../../helpers/TokenManager.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const AdminDashboard = () => {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = 1; // will replace once we have the token
        const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${userId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.statusText}`);
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.message);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    TokenManager.clearTokens();
    toast.error("You just logged out!");
    navigate('/')
  }

  return (
    <div className="dashboard-container">
      <div className="logout-section">
        <CustomButton onClick={handleLogout} text={"Logout"} color={"error"}>
          <HiLogout className="hiLogout" />
        </CustomButton>
      </div>
      <div className="dashboard-section">
        {error ? (
          <div className="error-message">
            <p>Failed to load profile. Please try again later.</p>
          </div>
        ) : (
          <div className="profile-section">
            <div className="profile-avatar">
              <img src={imgPlaceholder} alt="Profile Avatar" />
            </div>
            <h2 className="profile-name">{profile.name}</h2>
            <p className="profile-email">{profile.email}</p>
          </div>
        )}
        <div className="buttons-section">
          <CustomButton text={"Manage Studios"}>
            <SiReasonstudios size={20}/>
          </CustomButton>

          <CustomButton text={"Student list"} color={"secondary"}>
            <PiStudent size={20}/>
          </CustomButton>
        </div>
        <div className="second-button-line-section">
          <CustomButton text={"Results"} color={"secondary"}>
            <MdOutlineQuestionAnswer size={20}/>
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
