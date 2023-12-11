import React from "react";
import BannerImage from "../assets/gameMenu.png";
import "../styles/Result.css";
function Result() {
  return (
    <div className="result">
      <div
        className="resultTop"
        style={{ backgroundImage: `url(${BannerImage})` }}
      ></div>
      <div className="resultBottom">
        <h1>RESULT</h1>
        <p>Main screenshot - Example of a game situation</p>
      </div>
    </div>
  );
}

export default Result;
