
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/SharpTechLogo.png';
import menu_icon from '../../assets/menu-icon.png';
import Dropdown from '../Dropdown/Dropdown';

import { Link as RouterLink } from 'react-router-dom';


const LoginNavbar = () => {
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
                {/* <li ><Dropdown/></li>  */}
                {/* 
                    <li><RouterLink to='/Tempservice'>Tempservice</RouterLink></li>
                    <li><RouterLink to='/Pagination'>Tables</RouterLink></li>
                */}

                {/* 
                <li>
                    <Link to='/EmployeeSearch'>EmployeeSearch</Link>
                </li>
                <li>
                    <Link to='/DisplayAll'>DisplayAll</Link>
                </li>
               <li>
                    <Link to='/Register'>Register</Link>
                </li> */}



            </ul>
            <img src={menu_icon} alt="" className='menu-icon' onClick={toggleMenu} />
        </nav>
    );
};

export default LoginNavbar
