import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TokenManager from "../../helpers/TokenManager";
import {useNavigate} from "react-router-dom";
import {HiLogout} from "react-icons/hi";
import { BsQuestionSquare } from "react-icons/bs";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import CustomButton from "../../components/CustomButton/CustomButton.jsx";

const StudentDashboard = () => {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await TokenManager.getValidAccessToken();
        const response = await fetch(`http://localhost:8000/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.statusText}`);
        }

        const data = await response.json();
        setProfile(data);
        toast.success(`Welcome back, ${data.name}!`);
      } catch (err) {
        console.error(err);
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

  const toQuestionnaire = () => {
    navigate("/questionnaire")
  }

  const toResults = () => {
    navigate("/results")
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
            <p className={"text-red"}>Failed to load profile. Please try again later.</p>
          </div>
        ) : (
          <div className="profile-section">
            <div className="profile-avatar">
              <img src={"../images/pinkBow.jpg"} alt="Profile Avatar" />
            </div>
            <h2 className="profile-name">{profile.name}</h2>
            <p className="profile-email">{profile.email}</p>
          </div>
        )}
        <div className="buttons-section">
          <CustomButton text={"Start Questionnaire"} onClick={toQuestionnaire}>
            <BsQuestionSquare size={20}/>
          </CustomButton>

          <CustomButton text={"Checkout Results"} color={"secondary"} onClick={toResults}>
            <MdOutlineQuestionAnswer size={20}/>
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
