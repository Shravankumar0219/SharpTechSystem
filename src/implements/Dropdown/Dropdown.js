import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { RiArrowDropDownLine } from 'react-icons/ri'; // Importing the dropdown icon from React Icons
import './Dropdown.css'; // Import your CSS styles

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSecondOpen, setIsSecondOpen] = useState(false);

  const handleMouseEnter = (setOpen) => () => {
    setOpen(true);
  };

  const handleMouseLeave = (setOpen) => () => {
    setOpen(false);
  };

  return (
    <>
      <div
        className="dropdown-component"
        onMouseEnter={handleMouseEnter(setIsOpen)}
        onMouseLeave={handleMouseLeave(setIsOpen)}
      >
        <button className="dropdown-button-component">
        DAS Report
          <RiArrowDropDownLine className="dropdown-icon" />
        </button>

        {isOpen && (
          <ul className="dropdown-menu">
           
           <li className="dropdown-item">
              <RouterLink to="/DasReport" className="dropdown-link-component">DAS Report</RouterLink>
            </li>
            <li className="dropdown-item">
              <RouterLink to="/DasOrderSearch" className="dropdown-link-component">DAS Order Search</RouterLink>
            </li>
           
            <li className="dropdown-item">
              <RouterLink to="/DasAddressSearch" className="dropdown-link-component">DAS Address Search</RouterLink>
            </li>
            
          </ul>
        )}
      </div>

      <div
        className="dropdown-component"
        onMouseEnter={handleMouseEnter(setIsSecondOpen)}
        onMouseLeave={handleMouseLeave(setIsSecondOpen)}
      >
        <button className="dropdown-button-component">
          ET Services 
          <RiArrowDropDownLine className="dropdown-icon" />
        </button>

        {isSecondOpen && (
          <ul className="dropdown-menu">
           <li className="dropdown-item">
              <RouterLink to="/EtServices" className="dropdown-link-component">ET Services</RouterLink>
            </li>
            <li className="dropdown-item">
              <RouterLink to="/EtOrderSearch" className="dropdown-link-component">ET Order Search</RouterLink>
            </li>
            <li className="dropdown-item">
              <RouterLink to="/EtSearchAddress" className="dropdown-link-component">ET Search Address</RouterLink>
            </li>
            
          </ul>
        )}
      </div>
    </>
  );
};

export default Dropdown;
