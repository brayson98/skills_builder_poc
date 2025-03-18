const mongoose = require("mongoose");
const Question = require("./models/Question");

mongoose.connect("mongodb://localhost:27017/skillsdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedQuestions = async () => {
  const questions = [
    // Curiosity
    { question: "What new skill have you recently tried to learn?", category: "Curiosity" },
    { question: "When was the last time you researched something out of curiosity?", category: "Curiosity" },
    { question: "What motivates you to explore new topics?", category: "Curiosity" },
    { question: "How do you approach learning about a subject you're unfamiliar with?", category: "Curiosity" },
    { question: "What is a topic you'd like to explore further?", category: "Curiosity" },

    // Resilience
    { question: "How do you handle challenges when things don't go as planned?", category: "Resilience" },
    { question: "Can you recall a time when you bounced back from failure?", category: "Resilience" },
    { question: "What strategies do you use to stay motivated during tough times?", category: "Resilience" },
    { question: "How do you handle criticism or setbacks?", category: "Resilience" },
    { question: "What keeps you going when faced with long-term obstacles?", category: "Resilience" },

    // Problem-Solving
    { question: "Describe a difficult problem you recently solved.", category: "Problem-Solving" },
    { question: "What steps do you take to analyze a complex situation?", category: "Problem-Solving" },
    { question: "How do you prioritize tasks when solving a problem?", category: "Problem-Solving" },
    { question: "Have you ever solved a problem in a creative way? Share an example.", category: "Problem-Solving" },
    { question: "What do you do when your initial solution doesn't work?", category: "Problem-Solving" },

    // Communication
    { question: "How do you ensure your message is understood by others?", category: "Communication" },
    { question: "Describe a time when you had to deliver a difficult message.", category: "Communication" },
    { question: "How do you adjust your communication style for different audiences?", category: "Communication" },
    { question: "What strategies do you use to actively listen in a conversation?", category: "Communication" },
    { question: "How do you give constructive feedback to others?", category: "Communication" },

    // Adaptability
    { question: "How do you handle unexpected changes in plans?", category: "Adaptability" },
    { question: "Describe a situation where you had to adapt to a new environment.", category: "Adaptability" },
    { question: "How do you learn new tools or processes quickly?", category: "Adaptability" },
    { question: "What do you do when faced with uncertainty or ambiguity?", category: "Adaptability" },
    { question: "How do you approach working with people who have different work styles?", category: "Adaptability" },
  ];

  try {
    await Question.insertMany(questions);
    console.log("Database seeded with questions!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};

seedQuestions();
