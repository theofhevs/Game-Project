import React from "react";
import BannerImage from "../assets/gameMenu.png";
import "../styles/Links.css";
function Links() {
  return (
    <div className="links">
      <div
        className="linksTop"
        style={{ backgroundImage: `url(${BannerImage})` }}
      ></div>
      <div className="linksBottom">
        <h1>LINKS</h1>
        <p>
          <a
            href="https://github.com/theofhevs/Game-Project"
            target="_blank"
            rel="noreferrer"
          >
            github of the project
          </a>
        </p>
        <p>
          {" "}
          <a
            href="https://github.com/theofhevs/Game-Project"
            target="_blank"
            rel="noreferrer"
          >
            Link to the game demo
          </a>
        </p>
      </div>
    </div>
  );
}

export default Links;
