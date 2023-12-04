import React, { useState } from 'react'
import Logo from "../assets/pizza.png"
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { IoReorderFour } from "react-icons/io5";
function Navbar() {


    const [openLinks, setOpenLinks] = useState(false);

    const toggleNavbar = () => {
        setOpenLinks(!openLinks);

    }
    return (
        <div className='navbar'>
            <div className='leftSide' id={openLinks ? "open" : "close"}>
                <img src={Logo} alt='Logo pour Trempendous Journey' />
                <div className='hiddenLinks'>
                    <Link to='/' className='link'>Home</Link>
                    <Link to='/gameDescription' className='link'>Game</Link>
                    <Link to='/introduction' className='link'>Introduction</Link>
                    <Link to='/result' className='link'>Result</Link>
                    <Link to='/logbook' className='link'>Logbook</Link>
                    <Link to='/links' className='link'>Links</Link>

                </div>
            </div>
            <div className='rightSide'>
                <Link to='/' className='link'>Home</Link>
                <Link to='/gameDescription' className='link'>Game</Link>
                <Link to='/introduction' className='link'>Introduction</Link>
                <Link to='/result' className='link'>Result</Link>
                <Link to='/logbook' className='link'>Logbook</Link>
                <Link to='/links' className='link'>Links</Link>

                <button onClick={toggleNavbar}>
                    <IoReorderFour />
                </button>

            </div>

        </div>
    )
}

export default Navbar
