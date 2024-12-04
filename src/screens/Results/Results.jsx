import React, { useEffect, useState } from "react";
import "../../css/screens/_results.scss"; // Ensure this file is correctly placed
import Button from "../../components/questionnaireButton"; // Assuming you have this component
import { useNavigate } from "react-router-dom";
import { CiGrid42 } from "react-icons/ci";

function Results() {
  const [results, setResults] = useState([]);
  const [user, setUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch results data from a dummy JSON file
    fetch("/results.json")
      .then((response) => response.json())
      .then((data) => setResults(data));

    // Fetch user data
    fetch("/user.json")
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "status-pending";
      case "Accepted":
        return "status-accepted";
      case "Rejected":
        return "status-rejected";
      default:
        return "";
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="results-container">
      {/* User Info */}
      <div className="user-info">
        <div className="user-initials">{getInitials(user.name)}</div>
        <div className="user-details">
          <div className="fullname">{user.name}</div>
          <div className="email">{user.email}</div>
        </div>
      </div>

      {/* Dashboard Button */}
      <Button
        text="Dashboard"
        onClick={() => navigate("/dashboard")}
        type="secondary"
        icon={CiGrid42}
        iconPosition="left"
        className="dashboard-button"
      />

      {/* Results List */}
      <div className="results-list">
        {results.map((result, index) => (
          <div key={index} className="result-item">
            <div className="course-name">{result.course}</div>
            <div className="course-date">{result.date}</div>
            <div className={`status ${getStatusClass(result.status)}`}>
              {result.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Results;
