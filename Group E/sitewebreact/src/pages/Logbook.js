import React from "react";
import BannerImage from "../assets/gameMenu.png";
import "../styles/Logbook.css";
function Logbook() {
  return (
    <div className="logbook">
      <div
        className="logbookTop"
        style={{ backgroundImage: `url(${BannerImage})` }}
      ></div>
      <div className="logbookBottom">
        <h1>LOGBOOK</h1>
        <article>
          <table>
            <tr>
              <th>Date</th>
              <th>Task</th>
              <th>Author</th>
              <th>Duration</th>
            </tr>

            <tr>
              <td>25.09</td>
              <td>CSS for footer / Header</td>
              <td>Jonathan Araujo</td>
              <td>02:00</td>
            </tr>
            <tr>
              <td>28.09</td>
              <td>CSS for aside / article</td>
              <td>Thomas Biselx</td>
              <td>03:00</td>
            </tr>
            <tr>
              <td>29.09</td>
              <td>Creation of Git Project</td>
              <td>Théo Falcinelli</td>
              <td>00:30</td>
            </tr>
            <tr>
              <td>02.10</td>
              <td>CSS for navigation Bar</td>
              <td>Thomas Biselx</td>
              <td>01:00</td>
            </tr>
            <tr>
              <td>06.10</td>
              <td>Changes for Header / footer</td>
              <td>Thomas Biselx</td>
              <td>01:00</td>
            </tr>
            <tr>
              <td>10.10</td>
              <td>Creation of the player</td>
              <td>Théo Falcinelli</td>
              <td>04:00</td>
            </tr>
            <tr>
              <td>12.10</td>
              <td>Creation of the Plateform</td>
              <td>Lorenzo De Ieso</td>
              <td>05:00</td>
            </tr>
            <tr>
              <td>14.10</td>
              <td>Creation of the Ennemy</td>
              <td>Théo Falcinelli</td>
              <td>03:00</td>
            </tr>
            <tr>
              <td>17.10</td>
              <td>Creation of the Sprite for player</td>
              <td>Jonathan Araujo</td>
              <td>04:00</td>
            </tr>
            <tr>
              <td>19.10</td>
              <td>Creation of the backGround</td>
              <td>Jonathan Araujo</td>
              <td>02:00</td>
            </tr>
            <tr>
              <td>21.10</td>
              <td>Creation of the HitbOx</td>
              <td>Théo Falcinelli</td>
              <td>02:00</td>
            </tr>
            <tr>
              <td>24.10</td>
              <td>Creation of the diagram</td>
              <td>Thomas Biselx</td>
              <td>00:30</td>
            </tr>
            <tr>
              <td>25.10</td>
              <td>Creation of the Mockups</td>
              <td>Lorenzo De Ieso</td>
              <td>01:00</td>
            </tr>
            <tr>
              <td>25.10</td>
              <td>Creation of the Sketch</td>
              <td>Thomas Biselx</td>
              <td>00:30</td>
            </tr>
            <tr>
              <td>29.10</td>
              <td>Finalisation of the Website</td>
              <td>Thomas Biselx</td>
              <td>02:00</td>
            </tr>
          </table>

          <br></br>
          <br></br>

          <table>
            <tr>
              <th>Jonathan Araujo</th>
              <th>Lorenzo De Ieso</th>
              <th>Théo Falcinelli</th>
              <th>Thomas Biselx</th>
              <th>Total</th>
            </tr>

            <tr>
              <td>25:00</td>
              <td>25:00</td>
              <td>25:00</td>
              <td>25:00</td>
              <td>100:00</td>
            </tr>
          </table>
        </article>
      </div>
    </div>
  );
}

export default Logbook;
