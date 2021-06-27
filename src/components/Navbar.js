import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SiDrone, } from 'react-icons/si'
import { GiBlackBook, GiFishingNet, GiSwapBag } from 'react-icons/gi'

import { FaBars, FaTimes } from 'react-icons/fa'
import { Button } from './general/Button.js'
import '../styles/Navbar.css'
import { IconContext } from 'react-icons/lib'

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }

    }

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (<>
        <IconContext.Provider value={{ color: '#fff' }}>
            <div className="navbar">
                <div className="navbar-container container">
                    <Link to='/' className="navbar-logo" onClick={closeMobileMenu}>
                        <SiDrone className='navbar-icon' />
                        POQUE
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        {click ? <FaTimes /> : <FaBars />}
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className="nav-item">
                            <Link to='/' className="nav-links" onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/Poquedex' className="nav-links" onClick={closeMobileMenu}>
                                <GiBlackBook className='navbar-icon' />
                                POQUEDEX
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={{pathname: '/Poquet'}} className="nav-links" onClick={closeMobileMenu}>
                                <GiSwapBag className='navbar-icon'/>
                                PO-QUET
                            </Link>
                        </li>
                        <li className="nav-btn">
                            {button ? (
                                <Link to={'/Poqatch'} className="btn-link">
                                    <Button buttonStyle='btn--outline'>
                                        <GiFishingNet className='navbar-icon' />PO-QATCH
                                    </Button>
                                </Link>
                            ) : (
                                <Link to={'/Poqatch'} className="btn-link" onClick={closeMobileMenu}>
                                    <Button buttonStyle='btn--outline' buttonSize='btn--mobile'>
                                        <GiFishingNet className='navbar-icon' />PO-QATCH
                                    </Button>
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </IconContext.Provider>
    </>)
}

export default Navbar
