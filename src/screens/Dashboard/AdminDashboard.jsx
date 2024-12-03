import React from "react";
import Button from "../../components/CustomButton/Button";
import ResultsButton from "../../components/CustomButton/ResultsButton";
import "../../css/screens/_adminDashboard.scss";
import LogoutButton from "../../components/LogoutButton";
import { HiOutlinePencil } from "react-icons/hi";
import { HiOutlineUsers } from "react-icons/hi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import imgPlaceholder from "../../images/pinkBow.jpg";

const AdminDashboard = () => {
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
                icon={HiOutlinePencil}
                text="Manage Studios"
                type="primary"
                link="/"
            />
            <Button
                icon={HiOutlineUsers}
                text="Student list"
                type="secondary"
                link="/"
            />
        </div>
        <div className="second-button-line-section">
        <ResultsButton
                icon={HiOutlineDocumentReport}
                text="Results"
                link="/"
            />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
