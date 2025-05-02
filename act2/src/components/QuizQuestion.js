import React from 'react';

function QuizQuestion({ question, selectedOption, handleOptionSelect, answered }) {
  return (
    <div className="quiz-question">
      <div className="question-header">
        <span className="question-icon">
          <i className="bi bi-question-circle-fill"></i>
        </span>
        <h3 className="mb-4 question-text">{question.question}</h3>
      </div>
      <div className="options-container">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrect = index === question.correctAnswer;
          const showCorrect = answered && isCorrect;
          const showIncorrect = answered && isSelected && !isCorrect;
          
          return (
            <div 
              key={index} 
              className="mb-3 option-wrapper"
            >
              <button
                className={`btn btn-lg btn-block text-start w-100 position-relative option-button ${
                  showCorrect ? "btn-success" : 
                  showIncorrect ? "btn-danger" : 
                  isSelected ? "btn-primary" : 
                  "btn-outline-primary"
                }`}
                onClick={() => handleOptionSelect(index)}
                disabled={answered}
              >
                <div className="d-flex align-items-center">
                  <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                  <span className="option-text">{option}</span>
                  {showCorrect && (
                    <span className="option-icon correct ms-auto">
                      <i className="bi bi-check-circle-fill"></i>
                    </span>
                  )}
                  {showIncorrect && (
                    <span className="option-icon incorrect ms-auto">
                      <i className="bi bi-x-circle-fill"></i>
                    </span>
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </div>
      {answered && (
        <div className="answer-feedback mt-4">
          {selectedOption === question.correctAnswer ? (
            <div className="alert alert-success d-flex align-items-center">
              <i className="bi bi-check-circle-fill me-2 fs-4"></i>
              <div>
                <strong>Correct Answer!</strong>
                <p className="mb-0 mt-1">Great job! You've got this one right.</p>
              </div>
            </div>
          ) : (
            <div className="alert alert-danger d-flex align-items-center">
              <i className="bi bi-x-circle-fill me-2 fs-4"></i>
              <div>
                <strong>Incorrect!</strong>
                <p className="mb-0 mt-1">The correct answer is: <span className="fw-bold">{question.options[question.correctAnswer]}</span></p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default QuizQuestion;