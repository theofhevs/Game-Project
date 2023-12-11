import React from "react";
import BannerImage from "../assets/gameMenu.png";
import "../styles/Intro.css";
function Introduction() {
  return (
    <div className="intro">
      <div
        className="introTop"
        style={{ backgroundImage: `url(${BannerImage})` }}
      ></div>
      <div className="IntroBottom">
        <h1>INTRODUCTION</h1>
        <h2>Game description</h2>
        <p>
          {" "}
          The Tremendous Journey is a platform game, that is play in italian
          landscapes
        </p>
        <h2>Goal of the game</h2>
        <p>
          {" "}
          The play have to go threw different levels beat ennemy or escape them,
          in order to collect an items and go to the next level to collect
          another item, agter collecting all the items, the player will have to
          beat the final boss in order to make the perfect pizza
        </p>
        <h2>Character</h2>
        <p> The main character is a slide of pizza call Giuseppe</p>
        <h2>Rules of the game</h2>
        <p>
          {" "}
          The only rule is to have fun and finish the game as fast as possible
          to be display on the wall of fame
        </p>
      </div>
    </div>
  );
}

export default Introduction;
