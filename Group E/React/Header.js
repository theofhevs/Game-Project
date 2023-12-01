// Header.js
import React from 'react';

const Header = () => {
    return (
        <header>
            <h1>HES-SO Vs - 64-31 - HTML/CSS/JavaScript</h1>
            <nav>
                <ul>
                    <li class="hamburger">
                        <img src="ressources/images/hamburger_icon.svg" />
                    </li>
                    <li>
                        <a href="introduction.html">Introduction</a>
                    </li>
                    <li>
                        <a href="links.html">Links</a>
                    </li>
                    <li class="active">
                        <a href="result.html">Result</a>
                    </li>
                    <li>
                        <a href="DetailedGame.html">Detailed game description</a>
                    </li>
                    <li>
                        <a href="logbook.html">Logbook</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;