import React, { useState, useEffect } from 'react';
import '../../css/screens/_questionary.scss';

function Questionary() {
  const [questions, setQuestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    fetch('/questions.json') // Path to the questions JSON file
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
    fetch('/submit-answers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(questions),
    }).then(() => alert('Your answers have been submitted successfully!'));
  };

  return (
    <div className="questionary-container">
      {questions.length > 0 && (
        <>
          <div className="question-box">
            <h2>{questions[currentStep].question}</h2>
          </div>
          <div className="answer-box">
            <textarea
              value={questions[currentStep].answer || ''}
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
            <button
              className="prev-button"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              &lt;- Previous
            </button>
            {currentStep < questions.length - 1 ? (
              <button className="next-button" onClick={handleNext}>
                Next -&gt;
              </button>
            ) : (
              <button className="submit-button" onClick={handleSubmit}>
                Submit
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Questionary;
