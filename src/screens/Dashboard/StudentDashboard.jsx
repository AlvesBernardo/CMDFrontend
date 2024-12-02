import React from "react";
import Button from "../../components/CustomButton/Button";
import "../../css/screens/_studentDashboard.scss";
import LogoutButton from "../../components/LogoutButton";
import { HiOutlineLightBulb } from "react-icons/hi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import imgPlaceholder from "../../images/pinkBow.jpg";

const StudentDashboard = () => {
  const handleLogout = () => {

    console.log("placeholder");
  };

  return (
    <div className="dashboard-container">
        <div className="logout-section">
          <LogoutButton onLogout={handleLogout} />
        </div>
      <div className="dashboard-section">
        <div className="profile-section">
            <div className="profile-avatar">
                <img src={imgPlaceholder}/>
            </div>
          <h2 className="profile-name">Mehdi Sadeghi</h2>
          <p className="profile-email">mehdi.sadeghi@student.nhlstenden.com</p>
        </div>


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
