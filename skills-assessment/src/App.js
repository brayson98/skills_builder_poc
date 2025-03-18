import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import AssessmentPage from "./components/AssessmentPage"; // Assuming you have this file
import ResultsPage from "./components/ResultsPage"; // Assuming you have this file

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/assessment" element={<AssessmentPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
