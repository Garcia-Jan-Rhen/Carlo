import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import QuizQuestion from './components/QuizQuestion';
import ScoreSection from './components/ScoreSection';
import './App.css';

function App() {
  // Quiz questions data
  const questions = [
    {
      id: 1,
      question: "What is React?",
      options: [
        "A JavaScript library for building user interfaces",
        "A programming language",
        "A database management system",
        "A backend framework"
      ],
      correctAnswer: 0
    },
    {
      id: 2,
      question: "Which hook is used to manage state in functional components?",
      options: [
        "useEffect",
        "useState",
        "useContext",
        "useReducer"
      ],
      correctAnswer: 1
    },
    {
      id: 3,
      question: "What does JSX stand for?",
      options: [
        "JavaScript XML",
        "JavaScript Extension",
        "JavaScript Syntax",
        "JavaScript eXecution"
      ],
      correctAnswer: 0
    },
    {
      id: 4,
      question: "Which of the following is NOT a React Hook?",
      options: [
        "useEffect",
        "useState",
        "useHistory",
        "useComponent"
      ],
      correctAnswer: 3
    },
    {
      id: 5,
      question: "What is a Virtual DOM in React?",
      options: [
        "A physical document object model",
        "A lightweight copy of the actual DOM",
        "A DOM created virtually for testing",
        "A DOM that only exists on servers"
      ],
      correctAnswer: 1
    }
  ];

  // State management
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answered, setAnswered] = useState(false);

  // Handle option selection
  const handleOptionSelect = (optionIndex) => {
    if (!answered) {
      setSelectedOption(optionIndex);
      setAnswered(true);
      
      if (optionIndex === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  // Handle next question
  const handleNextQuestion = () => {
    setSelectedOption(null);
    setAnswered(false);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  // Restart the quiz
  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setQuizCompleted(false);
    setAnswered(false);
  };

  return (
    <div className="quiz-container">
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="card main-card shadow-lg">
              <div className="card-header bg-gradient text-white text-center">
                <h2 className="mb-0 app-title">React Quiz Challenge</h2>
                <p className="mb-0 app-subtitle">Test your React knowledge</p>
              </div>
              <div className="card-body">
                {!quizCompleted ? (
                  <>
                    <div className="quiz-progress mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="progress-text">Question {currentQuestion + 1} of {questions.length}</span>
                        <span className="progress-percent">{Math.round(((currentQuestion) / questions.length) * 100)}% completed</span>
                      </div>
                      <div className="progress progress-custom">
                        <div 
                          className="progress-bar progress-bar-animated progress-bar-striped" 
                          role="progressbar" 
                          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                          aria-valuenow={((currentQuestion + 1) / questions.length) * 100}
                          aria-valuemin="0" 
                          aria-valuemax="100"
                        />
                      </div>
                    </div>
                    <div className="question-container">
                      <QuizQuestion 
                        question={questions[currentQuestion]}
                        selectedOption={selectedOption}
                        handleOptionSelect={handleOptionSelect}
                        answered={answered}
                      />
                      {answered && (
                        <div className="text-center mt-4 next-button-container">
                          <button 
                            className="btn btn-primary btn-lg btn-next px-5 py-2"
                            onClick={handleNextQuestion}
                          >
                            {currentQuestion < questions.length - 1 ? (
                              <>Next Question <i className="bi bi-arrow-right ms-2"></i></>
                            ) : (
                              <>Show Results <i className="bi bi-trophy ms-2"></i></>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <ScoreSection 
                    score={score} 
                    totalQuestions={questions.length}
                    handleRestartQuiz={handleRestartQuiz}
                  />
                )}
              </div>
              <div className="card-footer text-center py-3">
                <small className="text-muted">Created with React and Bootstrap</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;