import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AssessmentPage.css"; 

const AssessmentPage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:5000/questions");
        const data = await response.json();
        setQuestions(data);
        sessionStorage.setItem("questions", JSON.stringify(data));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerChange = (value) => {
    const updatedAnswers = {
      ...answers,
      [currentQuestion._id]: value,
    };
    setAnswers(updatedAnswers);
    sessionStorage.setItem("answers", JSON.stringify(updatedAnswers));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate("/results");
    }
  };

  if (loading) {
    return <div>Loading questions...</div>;
  }

  if (questions.length === 0) {
    return <div>No questions available. Please try again later.</div>;
  }

  return (
    <div className="container">
      <h1>Assessment</h1>
      <p><strong>Category:</strong> {currentQuestion.category}</p>
      <p><strong>Question {currentQuestionIndex + 1}:</strong> {currentQuestion.question}</p>
      <div className="radio-container">
        {[1, 2, 3, 4, 5].map((value) => (
          <label key={value}>
            <input
              type="radio"
              name={`question-${currentQuestion._id}`}
              value={value}
              checked={answers[currentQuestion._id] === value}
              onChange={() => handleAnswerChange(value)}
            />
            {value}
          </label>
        ))}
      </div>
      <button onClick={handleNext} disabled={!answers[currentQuestion._id]}>
        {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
      </button>
    </div>
  );
};

export default AssessmentPage;
