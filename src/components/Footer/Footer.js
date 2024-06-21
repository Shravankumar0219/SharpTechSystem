import React from 'react'
import './Footer.css'
import { FaLinkedin, FaInstagram, FaEnvelope,  } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md'; // Importing MdEmail icon
import { MdOutlineMarkEmailUnread } from "react-icons/md";





const Footer = () => {
  return (
    <div className='footer'>
      <p>© 2024 Sharp Tech Systems Pvt Ltd. All rights reserved.</p>

      <ul>
        <li><a className="linkedin" href="https://www.linkedin.com/company/sharp-tech-systems-private-limited/?originalSubdomain=in"><FaLinkedin /></a></li>
        
        <li><a className="facebook" href="https://www.facebook.com/sharptechsystems/"><FaFacebook /></a></li> 
        <li><a className="email" href="mailto:your@email.com"><MdEmail /></a></li> {/* Using MdEmail icon */}
        <li><a className="instagram" href="sharptech"> <FaInstagram /></a></li>
        <li><a href="http://sharptechsystems.in/" target='_blank'>Terms of Services</a></li>
        <li><a href="http://sharptechsystems.in/" target='_blank'>Privacy Policy</a></li>


        {/* <li> <a className="email" href="mailto:your@email.com"><FaEnvelope /> </a></li> */}
          {/*<li><a className="email" href="mailto:your@email.com"><MdOutlineMarkEmailUnread /></a></li>  Using MdEmail icon */}
      </ul>
    </div>
  )
}

export default Footer
