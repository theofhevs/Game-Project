import React from "react";
import BannerImage from "../assets/gameMenu.png";
import Code1 from "../assets/code1.png";
import "../styles/GameDescription.css";
function GameDescription() {
  return (
    <div className="game">
      <div
        className="gameTop"
        style={{ backgroundImage: `url(${BannerImage})` }}
      ></div>
      <div className="gameBottom">
        <h1>GAME DESCRIPTION</h1>
        <article>
          <table>
            <thead>
              <tr>
                <th>Skills</th>
                <th>Mandatory project implementation</th>
                <th>Indicate file and line + screenshot</th>
              </tr>
            </thead>
            <tbody>
              {/*  ligne 1 */}
              <tr className="even">
                <td rowSpan="2">Forms HTML elements</td>
                <td>x (form with HTML input and validation see optional JS)</td>
                <td>
                  file.js <br></br>
                  <br></br>ligne: XXX
                </td>
              </tr>
              <tr className="even">
                <td colSpan="2">
                  <img src={Code1} alt="Code" />
                </td>
              </tr>
              {/* ligne 2 */}
              <tr className="odd">
                <td rowSpan="2">Medias & API</td>
                <td>
                  x (canvas AND audio or video eg: integrates a tutorial video
                  of the game or application)
                </td>
                <td>
                  file.js <br></br>
                  <br></br>ligne: XXX
                </td>
              </tr>
              <tr className="odd">
                <td colSpan="2">
                  <img src={Code1} alt="Code" />
                </td>
              </tr>
              {/*  ligne 3 */}
              <tr className="even">
                <td rowSpan="2">DOM handling functions</td>
                <td>x (min. getElementById())</td>
                <td>
                  file.js <br></br>
                  <br></br>ligne: XXX
                </td>
              </tr>
              <tr className="even">
                <td colSpan="2">
                  <img src={Code1} alt="Code" />
                </td>
              </tr>
              {/* ligne 4 */}
              <tr className="odd">
                <td rowSpan="2">Several variable scope in JS</td>
                <td>x (implicit)</td>
                <td>
                  file.js <br></br>
                  <br></br>ligne: XXX
                </td>
              </tr>
              <tr className="odd">
                <td colSpan="2">
                  <img src={Code1} alt="Code" />
                </td>
              </tr>
              {/*  ligne 5 */}
              <tr className="even">
                <td rowSpan="2">Natives Libraries</td>
                <td>x (min. Math)</td>
                <td>
                  file.js <br></br>
                  <br></br>ligne: XXX
                </td>
              </tr>
              <tr className="even">
                <td colSpan="2">
                  <img src={Code1} alt="Code" />
                </td>
              </tr>
              {/* ligne 6 */}
              <tr className="odd">
                <td rowSpan="2">Variable comparison operators</td>
                <td>x (implicit)</td>
                <td>
                  file.js <br></br>
                  <br></br>ligne: XXX
                </td>
              </tr>
              <tr className="odd">
                <td colSpan="2">
                  <img src={Code1} alt="Code" />
                </td>
              </tr>
              {/*  ligne 7 */}
              <tr className="even">
                <td rowSpan="2">Loop & iterators</td>
                <td>x (lopp on object)</td>
                <td>
                  file.js <br></br>
                  <br></br>ligne: XXX
                </td>
              </tr>
              <tr className="even">
                <td colSpan="2">
                  <img src={Code1} alt="Code" />
                </td>
              </tr>
              {/* ligne 8 */}
              <tr className="odd">
                <td rowSpan="2">
                  Types of functions : <br></br>- standard, <br></br>- anonymes
                </td>
                <td>x (standard function with parameters and method)</td>
                <td>
                  file.js <br></br>
                  <br></br>ligne: XXX
                </td>
              </tr>
              <tr className="odd">
                <td colSpan="2">
                  <img src={Code1} alt="Code" />
                </td>
              </tr>
              {/*  ligne 9 */}
              <tr className="even">
                <td rowSpan="2">Types of stockages (bonus)</td>
                <td>x (local storage)</td>
                <td>
                  file.js <br></br>
                  <br></br>ligne: XXX
                </td>
              </tr>
              <tr className="even">
                <td colSpan="2">
                  <img src={Code1} alt="Code" />
                </td>
              </tr>
              {/* ligne 10 */}
              <tr className="odd">
                <td rowSpan="2">Callback</td>
                <td>x (either by use of API or own construction)</td>
                <td>
                  file.js <br></br>
                  <br></br>ligne: XXX
                </td>
              </tr>
              <tr className="odd">
                <td colSpan="2">
                  <img src={Code1} alt="Code" />
                </td>
              </tr>
              {/*  ligne 11 */}
              <tr className="even">
                <td rowSpan="2">Drag'n Drop</td>
                <td>x (Building an avatar)</td>
                <td>
                  file.js <br></br>
                  <br></br>ligne: XXX
                </td>
              </tr>
              <tr className="even">
                <td colSpan="2">
                  <img src={Code1} alt="Code" />
                </td>
              </tr>
              {/* ligne 12 */}
              <tr className="odd">
                <td rowSpan="2">Ajax</td>
                <td>OPTIONAL(Game setup)</td>
                <td>
                  file.js <br></br>
                  <br></br>ligne: XXX
                </td>
              </tr>
              <tr className="odd">
                <td colSpan="2">
                  <img src={Code1} alt="Code" />
                </td>
              </tr>
              {/*  ligne 13 */}
              <tr className="even">
                <td rowSpan="2">JSON</td>
                <td>OPTION (Game setup et React JS website)</td>
                <td>
                  file.js <br></br>
                  <br></br>ligne: XXX
                </td>
              </tr>
              <tr className="even">
                <td colSpan="2">
                  <img src={Code1} alt="Code" />
                </td>
              </tr>
              {/* ligne 14 */}
              <tr className="odd">
                <td rowSpan="2">Geolocalisation</td>
                <td>x (Implicit)</td>
                <td>
                  file.js <br></br>
                  <br></br>ligne: XXX
                </td>
              </tr>
              <tr className="odd">
                <td colSpan="2">
                  <img src={Code1} alt="Code" />
                </td>
              </tr>
            </tbody>
          </table>
        </article>
      </div>
    </div>
  );
}

export default GameDescription;
