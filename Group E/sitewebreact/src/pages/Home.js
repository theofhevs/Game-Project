import React from 'react';
import { Link } from 'react-router-dom';
import BannerImage from '../assets/MainPicture.png';
import '../styles/Home.css';


function Home() {
    return (
        <div className='home' style={{ backgroundImage: `url(${BannerImage})` }}>
            <div className='headerContainer' >
                <h1>Trempendous Journey</h1>
                <p>Game of the year</p>

                <Link to="/gameDescription">
                    <button>VIEW NOW </button>

                </Link>
            </div>
        </div>
    )
}

export default Home
