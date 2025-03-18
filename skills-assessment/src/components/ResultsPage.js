import React from "react";
import { useLocation } from "react-router-dom";
import "./ResultsPage.css";

const ResultsPage = () => {
  const location = useLocation();
  const userAnswers = location.state?.answers || {}; // User's submitted answers
  
  // Hard-coded key for question categories (to match backend structure)
  const questions = [
    { id: "1", category: "Curiosity" },
    { id: "2", category: "Curiosity" },
    { id: "3", category: "Curiosity" },
    { id: "4", category: "Curiosity" },
    { id: "5", category: "Curiosity" },
    { id: "6", category: "Resilience" },
    { id: "7", category: "Resilience" },
    { id: "8", category: "Resilience" },
    { id: "9", category: "Resilience" },
    { id: "10", category: "Resilience" },
    { id: "11", category: "Problem-Solving" },
    { id: "12", category: "Problem-Solving" },
    { id: "13", category: "Problem-Solving" },
    { id: "14", category: "Problem-Solving" },
    { id: "15", category: "Problem-Solving" },
    { id: "16", category: "Communication" },
    { id: "17", category: "Communication" },
    { id: "18", category: "Communication" },
    { id: "19", category: "Communication" },
    { id: "20", category: "Communication" },
    { id: "21", category: "Adaptability" },
    { id: "22", category: "Adaptability" },
    { id: "23", category: "Adaptability" },
    { id: "24", category: "Adaptability" },
    { id: "25", category: "Adaptability" },
  ];

  // Function to calculate average score for each category
  const calculateScores = () => {
    const scores = {};
    questions.forEach((q) => {
      const userAnswer = Number(userAnswers[q.id]) || 0; // Default to 0 if not answered
      if (!scores[q.category]) {
        scores[q.category] = { total: 0, count: 0 };
      }
      scores[q.category].total += userAnswer;
      scores[q.category].count += 1;
    });

    const averages = {};
    for (const category in scores) {
      averages[category] = scores[category].total / scores[category].count;
    }
    return averages;
  };

  const feedbackMessages = {
    Curiosity: {
      low: "Consider exploring more topics and seeking out new knowledge to enhance your curiosity.",
      medium: "You're curious, but there's room for even more exploration and growth!",
      high: "Great job! Your curiosity is a strong point—keep nurturing it.",
    },
    Resilience: {
      low: "Work on building strategies to bounce back from challenges more effectively.",
      medium: "You're resilient, but you can continue strengthening your coping mechanisms.",
      high: "Fantastic resilience! You excel at handling challenges and setbacks.",
    },
    "Problem-Solving": {
      low: "Focus on honing your analytical and problem-solving skills.",
      medium: "You're a good problem-solver, but there's always room for more creativity and strategy.",
      high: "Impressive problem-solving skills! You excel in tackling challenges.",
    },
    Communication: {
      low: "Consider developing your communication skills to express yourself more clearly.",
      medium: "You're a solid communicator, but there's still room for refinement.",
      high: "Excellent communication skills! You connect with others effectively.",
    },
    Adaptability: {
      low: "Work on embracing change and adapting to new situations.",
      medium: "You're fairly adaptable, but there's more room to grow in flexibility.",
      high: "Outstanding adaptability! You thrive in changing environments.",
    },
  };

  const averages = calculateScores();

  return (
    <div>
      <h1>Your Results</h1>
      {Object.entries(averages).map(([category, average]) => {
        let feedback;
        if (average < 2) {
          feedback = feedbackMessages[category].low;
        } else if (average < 4) {
          feedback = feedbackMessages[category].medium;
        } else {
          feedback = feedbackMessages[category].high;
        }

        return (
          <div key={category}>
            <h2>{category}</h2>
            <p>Average Score: {average.toFixed(1)} / 5</p>
            <p>{feedback}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ResultsPage;
