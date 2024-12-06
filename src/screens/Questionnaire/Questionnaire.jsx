import React, { useState, useEffect, useRef } from "react";
import Button from "../../components/questionnaireButton";
import "../../css/screens/_questionnaire.scss";
import { useNavigate } from "react-router-dom";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { CiGrid42 } from "react-icons/ci";

function DraggableItem({ text, onDragStart, isDropped }) {
  const itemRef = useRef(null);

  const adjustFontSize = () => {
    const element = itemRef.current;
    if (!element) return;

    const parentWidth = element.offsetWidth; // Width of the container
    const textWidth = element.scrollWidth; // Actual width of the text content
    const padding = 20; // 10px padding on each side

    if (textWidth > parentWidth - padding) {
      const scaleFactor = (parentWidth - padding) / textWidth;
      element.style.fontSize = `${parseFloat(window.getComputedStyle(element).fontSize) * scaleFactor}px`;
    } else {
      element.style.fontSize = ""; // Reset font size if it fits
    }
  };

  useEffect(() => {
    adjustFontSize();
    window.addEventListener("resize", adjustFontSize); // Recalculate on window resize
    return () => window.removeEventListener("resize", adjustFontSize);
  }, [text]);

  return (
    <div
      ref={itemRef}
      className={`draggable-item ${isDropped ? "dropped-item" : ""}`}
      draggable={!isDropped} // Disable dragging if it's in a choice
      onDragStart={!isDropped ? onDragStart : undefined}
    >
      {text}
    </div>
  );
}

function Questionnaire() {
  const [questions, setQuestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [user, setUser] = useState({ name: "", email: "" });
  const [draggedItem, setDraggedItem] = useState(null);
  const [choices, setChoices] = useState({ first: null, second: null, third: null });
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/questions.json")
      .then((response) => response.json())
      .then((data) => setQuestions(data));

    fetch("/user.json")
      .then((response) => response.json())
      .then((data) => setUser(data));

    fetch("/courses.json")
      .then((response) => response.json())
      .then((data) => setCourses(data));
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

  const handleSubmit = () => {
    const answers = questions.map((q) => {
      if (q.type === "multiple-choice") {
        return { id: q.id, question: q.question, answer: choices };
      }
      return { id: q.id, question: q.question, answer: q.answer || "" };
    });

    fetch("/submit-answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    }).then(() => alert("Your answers have been submitted successfully!"));
  };

  const onDragStart = (item) => {
    setDraggedItem(item);
  };

  const onDrop = (choice) => {
    setChoices((prev) => ({ ...prev, [choice]: draggedItem }));
    setDraggedItem(null);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const handleClearChoice = (choice) => {
    setChoices((prev) => ({ ...prev, [choice]: null }));
  };

  const renderAvailableOptions = () => {
    const usedChoices = Object.values(choices);
    return courses
      .filter((course) => !usedChoices.includes(course.name))
      .map((course) => (
        <DraggableItem
          key={course.id}
          text={course.name}
          onDragStart={() => onDragStart(course.name)}
        />
      ));
  };

  const renderDropZones = () => {
    return ["first", "second", "third"].map((choice) => (
      <div
        key={choice}
        onDrop={() => onDrop(choice)}
        onDragOver={onDragOver}
        className={`drop-zone ${choices[choice] ? "filled" : ""}`}
      >
        {choices[choice] ? (
          <div className="dropped-item">
            <DraggableItem
              text={choices[choice]}
              isDropped={true} // Mark it as dropped
            />
            <button
              className="clear-choice"
              onClick={() => handleClearChoice(choice)}
            >
              X
            </button>
          </div>
        ) : (
          `${choice.charAt(0).toUpperCase() + choice.slice(1)} Choice`
        )}
      </div>
    ));
  };

  return (
    <div className="questionnaire-container" style={{ position: "relative" }}>
      {/* User Info */}
      <div className="user-info">
        <div className="user-initials">
          {user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()}
        </div>
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

      {questions.length > 0 && (
        <>
          <div className="question-box">
            <h2>{questions[currentStep].question}</h2>
          </div>

          {questions[currentStep].type === "multiple-choice" ? (
            <div className="drag-and-drop-container">
              <div className="options">
                <h3>Available Options</h3>
                {renderAvailableOptions()}
              </div>
              <div className="choices">
                <h3>Your Choices</h3>
                {renderDropZones()}
              </div>
            </div>
          ) : (
            <div className="answer-box">
              <textarea
                value={questions[currentStep].answer || ""}
                onChange={(e) =>
                  setQuestions((prev) =>
                    prev.map((q, i) =>
                      i === currentStep ? { ...q, answer: e.target.value } : q
                    )
                  )
                }
                placeholder="Enter your answer here"
              ></textarea>
            </div>
          )}

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
              <Button text="Submit" onClick={handleSubmit} type="primary" />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Questionnaire;
