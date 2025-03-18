import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const Homepage = () => {
  return (
    <div>
      <h1>Welcome to the Skills Assessment App</h1>
      <p>Test your skills and discover areas to grow!</p>
      <Link to="/assessment">
        <button>Start Assessment</button>
      </Link>
    </div>
  );
};

export default Homepage;
