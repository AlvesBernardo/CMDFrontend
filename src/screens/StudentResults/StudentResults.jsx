import React, { useEffect, useState } from "react";
import "../../css/screens/_results.scss";
import CustomHeader from "../../components/CustomHeader/CustomHeader.jsx";
import { useNavigate } from "react-router-dom";
import { CiGrid42 } from "react-icons/ci";

function StudentResults() {
  const [results, setResults] = useState([]);
  const [user, setUser] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/results.json")
      .then((response) => response.json())
      .then((data) => setResults(data));

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

  return (
    <div className="results-container">

      <CustomHeader/>

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

export default StudentResults;
