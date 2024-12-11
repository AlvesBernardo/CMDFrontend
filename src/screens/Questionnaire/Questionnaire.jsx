import React, { useState, useEffect, useRef } from "react";
import "../../css/screens/_questionnaire.scss";

import CustomButton from "../../components/CustomButton/CustomButton.jsx";
import {MdOutlineDashboard} from "react-icons/md";
import {FaLongArrowAltLeft, FaLongArrowAltRight} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

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
      element.style.fontSize = "";
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

  const toDashboard = () => {
    navigate("/studentDashboard")
  }

  return (
    <div className="questionnaire-container" style={{ position: "relative" }}>

      <div className="user-info">
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: 20}}>
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
        <CustomButton text={"Dashboard"} color={"secondary"} width={'200px'} onClick={toDashboard}>
          <MdOutlineDashboard/>
        </CustomButton>
      </div>


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
            <CustomButton text={"Previous"} color={"secondary"} width={'40%'}>
              <FaLongArrowAltLeft />
            </CustomButton>

            {currentStep < questions.length - 1 ? (
                <CustomButton text={"Next"} color={"primary"} >
                  <FaLongArrowAltRight />
                </CustomButton>
            ) : (
                <CustomButton text={"Submit"} color={"primary"} onClick={handleSubmit}/>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Questionnaire;
