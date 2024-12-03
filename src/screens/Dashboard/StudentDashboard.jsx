import React, { useEffect, useState } from "react";
import Button from "../../components/CustomButton/Button";
import "../../css/screens/_studentDashboard.scss";
import LogoutButton from "../../components/LogoutButton";
import { HiOutlineLightBulb } from "react-icons/hi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import imgPlaceholder from "../../images/pinkBow.jpg";

const StudentDashboard = () => {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = 1; //will replace later
        const response = await fetch(`${process.env.REACT_APP_API_URL}/students/${userId}`); //

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
    console.log("placeholder");
  };

  return (
    <div className="dashboard-container">
      <div className="logout-section">
        <LogoutButton onLogout={handleLogout} />
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
          <Button
            icon={HiOutlineLightBulb}
            text="Start Questionnaire"
            type="primary"
            link="/"
          />
          <Button
            icon={HiOutlineDocumentReport}
            text="Checkout Results"
            type="secondary"
            link="/"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
