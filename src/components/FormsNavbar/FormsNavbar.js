import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/SharpTechLogo.png';
import menu_icon from '../../assets/menu-icon.png';
import './FormsNavbar.css'; // Create a CSS file for FormsNavbar if needed
import Login from '../../implements/Login/Login';


const FormsNavbar = () => {
    const [sticky, setSticky] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            window.scrollY > 50 ? setSticky(true) : setSticky(false);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setMobileMenu(!mobileMenu);
    };

    return (
        <nav className={`container ${sticky ? 'dark-nav' : ''}`}>
            <Link to='/'> {/* Link the logo to the homepage */}
                <img src={logo} alt="" className={`logo ${sticky ? 'sticky-logo' : ''}`} />
            </Link>
            <ul className={mobileMenu ? '' : 'hide-mobile-menu'}>
                <li>
                    <Link to='/'>Home</Link>
                </li>
              
                
                <li>
                    <Link to='/Register'>Register</Link>
                </li>
                <li>
                    <Link to='/EmployeeSearch'>EmployeeSearch</Link>
                </li>
                <li>
                    <Link to='/DisplayAll'>DisplayAll</Link>
                </li>
            </ul>
            <img src={menu_icon} alt="" className='menu-icon' onClick={toggleMenu} />
        </nav>
    );
};

export default FormsNavbar;
