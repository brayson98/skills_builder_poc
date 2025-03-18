import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AssessmentPage.css";

const AssessmentPage = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]); // State to store fetched questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Tracks which question is displayed
  const [answers, setAnswers] = useState({}); // Stores the user's answers
  const [loading, setLoading] = useState(true); // State to track if questions are loading

  useEffect(() => {
    // Fetch questions from the backend
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:5000/questions");
        const data = await response.json();
        setQuestions(data);
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false); // Also stop loading in case of an error
      }
    };

    fetchQuestions();
  }, []);

  // Current question based on the index
  const currentQuestion = questions[currentQuestionIndex];

  // Handle selection of an answer
  const handleAnswerChange = (value) => {
    setAnswers({
      ...answers,
      [currentQuestion._id]: value, // Use the question ID as the key
    });
  };

  // Move to the next question
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate("/results", { state: { answers } }); // Navigate to the results page after the last question
    }
  };

  if (loading) {
    return <div>Loading questions...</div>; // Display a loading state
  }

  if (questions.length === 0) {
    return <div>No questions available. Please try again later.</div>; // Handle empty questions case
  }

  return (
    <div>
      <h1>Assessment</h1>
      <div>
        <p><strong>Category:</strong> {currentQuestion.category}</p>
        <p><strong>Question {currentQuestionIndex + 1}:</strong> {currentQuestion.question}</p>
        {/* Radio buttons for answers */}
        <div>
          {[1, 2, 3, 4, 5].map((value) => (
            <label key={value} style={{ display: "block", margin: "5px 0" }}>
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
      </div>
      <button onClick={handleNext} disabled={!answers[currentQuestion._id]}>
        {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
      </button>
    </div>
  );
};

export default AssessmentPage;
