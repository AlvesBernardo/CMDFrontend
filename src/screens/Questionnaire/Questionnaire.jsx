import React, { useState, useEffect } from "react";
import Button from "../../components/button";
import "../../css/screens/_questionnaire.scss";
import { useNavigate } from "react-router-dom";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { CiGrid42 } from "react-icons/ci";


function Questionnaire() {
  const [questions, setQuestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/questions.json")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAnswerChange = (e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentStep].answer = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = () => {
    fetch("/submit-answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(questions),
    }).then(() => alert("Your answers have been submitted successfully!"));
  };

  return (
    <div className="questionnaire-container" style={{ position: "relative" }}>
      {/* Dashboard Button */}
      <Button
      text="Dashboard"
      onClick={() => navigate("/dashboard")}
      type="secondary"
      icon={CiGrid42} // Pass the icon
      iconPosition="left" // Position the icon on the left
      className="dashboard-button"
    />


      {questions.length > 0 && (
        <>
          <div className="question-box">
            <h2>{questions[currentStep].question}</h2>
          </div>
          <div className="answer-box">
            <textarea
              value={questions[currentStep].answer || ""}
              onChange={handleAnswerChange}
              placeholder="Enter your answer here"
            ></textarea>
          </div>
          <div className="step-indicator-box">
            <p>
              Step {currentStep + 1} out of {questions.length}
            </p>
          </div>
          <div className="navigation-buttons">
            <Button
              text="Previous"
              onClick={handlePrevious}
              type="secondary"
              disabled={currentStep === 0}
              icon={GoArrowLeft}
              iconPosition="left"
            />
            {currentStep < questions.length - 1 ? (
              <Button
                text="Next"
                onClick={handleNext}
                type="primary"
                icon={GoArrowRight}
                iconPosition="right"
                className="large-next-button"
              />
            ) : (
              <Button
                text="Submit"
                onClick={handleSubmit}
                type="primary"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Questionnaire;
