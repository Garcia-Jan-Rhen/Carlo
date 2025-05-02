import React from 'react';

function ScoreSection({ score, totalQuestions, handleRestartQuiz }) {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  let message = "";
  let icon = "";
  let badgeClass = "";
  
  if (percentage >= 80) {
    message = "Excellent! You've mastered this content!";
    icon = "bi-trophy-fill";
    badgeClass = "badge-excellent";
  } else if (percentage >= 60) {
    message = "Good job! You're on the right track!";
    icon = "bi-award-fill";
    badgeClass = "badge-good";
  } else {
    message = "Keep practicing! You'll get better!";
    icon = "bi-book-fill";
    badgeClass = "badge-keep-going";
  }

  return (
    <div className="score-section text-center">
      <div className="results-header mb-4">
        <span className="results-badge"><i className="bi bi-flag-fill me-2"></i>Results</span>
        <h2 className="mt-3">Quiz Completed!</h2>
      </div>
      
      <div className="score-display mb-5">
        <div className={`score-circle mx-auto ${badgeClass}`}>
          <div className="score-icon">
            <i className={`bi ${icon}`}></i>
          </div>
          <div className="score-percentage">{percentage}%</div>
          <div className="score-fraction">
            <span className="correct-answers">{score}</span>
            <span className="divider">/</span>
            <span className="total-questions">{totalQuestions}</span>
          </div>
        </div>
      </div>
      
      <div className="score-message mb-5">
        <div className={`alert ${percentage >= 80 ? 'alert-success' : percentage >= 60 ? 'alert-info' : 'alert-warning'} d-flex align-items-center shadow-sm`}>
          <i className={`bi ${percentage >= 80 ? 'bi-emoji-smile-fill' : percentage >= 60 ? 'bi-emoji-neutral-fill' : 'bi-emoji-smile-upside-down-fill'} me-3 fs-3`}></i>
          <div>
            <strong>{message}</strong>
            <p className="mb-0 mt-1">
              {percentage >= 80 
                ? "You have an excellent understanding of React concepts!" 
                : percentage >= 60 
                  ? "You're making good progress with React fundamentals." 
                  : "With more practice, you'll improve your React knowledge."}
            </p>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button 
          className="btn btn-primary btn-lg px-5 py-3 shadow-sm"
          onClick={handleRestartQuiz}
        >
          <i className="bi bi-arrow-repeat me-2"></i> Try Again
        </button>
        
        <div className="mt-3">
          <button className="btn btn-outline-secondary mt-3 shadow-sm">
            <i className="bi bi-share-fill me-2"></i> Share Results
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScoreSection;