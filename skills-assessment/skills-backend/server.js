const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Question = require("./models/Question");
require("dotenv").config()

const app = express();
app.use(bodyParser.json());
app.use(cors());




mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 30000,
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((err) => {
  console.error("Error connecting to MongoDB", err.message);
  process.exit(1);
});


app.get("/questions", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).send("Error fetching questions");
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
