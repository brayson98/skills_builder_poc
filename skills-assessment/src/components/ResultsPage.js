import React from "react";

const ResultsPage = () => {
  const questions = JSON.parse(sessionStorage.getItem("questions") || "[]"); // Retrieve questions from sessionStorage
  const answers = JSON.parse(sessionStorage.getItem("answers") || "{}"); // Retrieve answers from sessionStorage

  // Function to calculate average scores
  const calculateAverages = () => {
    const categoryScores = {};

    questions.forEach((q) => {
      const answer = answers[q._id];
      if (answer !== undefined) {
        if (!categoryScores[q.category]) {
          categoryScores[q.category] = { total: 0, count: 0 };
        }
        categoryScores[q.category].total += parseInt(answer, 10);
        categoryScores[q.category].count += 1;
      }
    });

    const categoryAverages = {};
    for (const category in categoryScores) {
      categoryAverages[category] =
        categoryScores[category].total / categoryScores[category].count || 0;
    }
    return categoryAverages;
  };

  const averages = calculateAverages();

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
    

  return (
    <div>
      <h1>Your Results</h1>
      {Object.entries(averages).map(([category, average]) => {
        let feedback;
        if (average < 2) {
          feedback = feedbackMessages[category]?.low || "Keep working on this skill.";
        } else if (average < 4) {
          feedback = feedbackMessages[category]?.medium || "Good progress in this skill.";
        } else {
          feedback = feedbackMessages[category]?.high || "Excellent work in this skill.";
        }

        return (
          <div className="container" key={category}>
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
