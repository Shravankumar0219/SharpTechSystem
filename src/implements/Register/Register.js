import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Footer from "../../components/Footer/Footer";
import FormsNavbar from "../../components/FormsNavbar/FormsNavbar";
import UserService from "../UserService/UserService";
import Navbar from "../../components/Navbar/Navbar";

function Register() {
  const navigate = useNavigate();
  const getMaxDate = () => {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0]; // Returns current date in string format (YYYY-MM-DD)
  };
  const [user, setUser] = useState({
    empId: "",
    phoneNumber: "",
    firstName: "",
    middleName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    address: "",
    joiningDate: "",
    designation: "",
    salary: "",
    qualification: "",
    aadhaarNumber: "",
    panNumber: "",
    releavingDate: "",
    role: "",
    remark: ""
  });

  const [empIdExists, setEmpIdExists] = useState(false);
  const [empIdInvalid, setEmpIdInvalid] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false); 
  const [panInvalid, setPanInvalid] = useState(false);


  const onInputChange = (e) => {
    const { name, value } = e.target;

    const getMaxDate = () => {
      const currentDate = new Date();
      return currentDate.toISOString().split('T')[0]; // Returns current date in string format (YYYY-MM-DD)
    };
  
    if (name === 'dateOfBirth') {
      const dob = new Date(value);
      const eighteenYearsAgo = new Date();
      eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
      if (dob > eighteenYearsAgo) {
        
        alert("You must be at least 18 years old to register.");
      }
    }

    
    if (name === 'panNumber') {
      const panPattern = /^[A-Za-z]{5}\d{4}[A-Za-z]$/;

      if (value === '' || panPattern.test(value)) {
        const formattedValue = value.toUpperCase(); // Convert input value to uppercase if it matches the PAN pattern
        setUser({ ...user, [name]: formattedValue }); // Set formatted value to state
        setPanInvalid(false); // Reset error state when format is correct or input is empty
      } else {
        // Invalid PAN format
        setUser({ ...user, [name]: value }); // Set value to state (to preserve user input)
        setPanInvalid(true); // Set error state when format is invalid
      }
      return;
    }
  

    const getMinDate = () => {
      const currentDate = new Date();
      const minDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
      return minDate.toISOString().split('T')[0]; // Converts the date to string format (YYYY-MM-DD)
    };

    if (name === 'phoneNumber') {
      const sanitizedValue = value.replace(/\D/g, '').slice(0, 10);
      setUser({ ...user, [name]: sanitizedValue });
      return;
    }

    if (name === 'empId') {
      const empIdPattern = /^[A-Z0-9]+$/;
      setEmpIdInvalid(value !== "" && !empIdPattern.test(value));
    }

    if (name === 'email') {
      const emailPattern = /^[a-z0-9.@]+$/;
      setEmailInvalid(value !== "" && !emailPattern.test(value));
    }

    setUser({ ...user, [name]: value });

    if (name === 'empId') setEmpIdExists(false);
    if (name === 'email') setEmailExists(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await UserService.register(user, token);
      console.log(response);

      if (response.statusCode === 400) {
        if (response.message.includes('empId')) {
          setEmpIdExists(true);
        }
        if (response.message.includes('email')) {
          setEmailExists(true);
        }
        return;
      }

      setUser({
        empId: "",
        phoneNumber: "",
        firstName: "",
        middleName: "",
        lastName: "",
        fatherName: "",
        motherName: "",
        email: "",
        password: "",
        dateOfBirth: "",
        address: "",
        joiningDate: "",
        designation: "",
        salary: "",
        qualification: "",
        aadhaarNumber: "",
        panNumber: "", 
        releavingDate: "",
        role: "",
        remark: ""
      });
      alert(`${user.firstName} ${user.lastName} ${response.message}`);
    } catch (error) {
      console.error('Error registering user', error);
      alert('An error occurred while registering user');
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div>
      <Navbar />
      <div className="register-container">
        <div className="register-form">
          <h4>Employee Register</h4>
          <form onSubmit={onSubmit}>
            <div className="form-row">
              {/* <div className="form-group col">
                <label htmlFor="empId">Employee Id</label>
                <input type="text" className="form-control" placeholder="Enter your employee id" name="empId" value={user.empId} onChange={onInputChange} required />
                {empIdInvalid && <span className="error-message-return">Invalid Employee ID format</span>}
                {empIdExists && <span className="error-message-return">Employee ID already exists</span>}
              </div> */}
             
            </div>
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="empFirstName">First Name</label><b className="register-reqired-field"> &nbsp;*</b>
                <input type="text" className="form-control" placeholder="Enter your first name" name="firstName" value={user.firstName} onChange={onInputChange} required />
              </div>
              <div className="form-group col">
                <label htmlFor="empMiddleName">Middle Name</label>
                <input type="text" className="form-control" placeholder="Enter your middle name" name="middleName" value={user.middleName} onChange={onInputChange} />
              </div>
              <div className="form-group col">
                <label htmlFor="empLastName">Last Name</label>
                <input type="text" className="form-control" placeholder="Enter your last name" name="lastName" value={user.lastName} onChange={onInputChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="empFatherName">Father's Name</label><b className="register-reqired-field"> &nbsp;*</b>
                <input type="text" className="form-control" placeholder="Enter your father's name" name="fatherName" value={user.fatherName} onChange={onInputChange} required/>
              </div>
              <div className="form-group col">
                <label htmlFor="empMotherName">Mother's Name</label><b className="register-reqired-field"> &nbsp;*</b>
                <input type="text" className="form-control" placeholder="Enter your mother's name" name="motherName" value={user.motherName} onChange={onInputChange} required />
              </div>
              <div className="form-group col">
                <label htmlFor="empDateOfBirth">Date of Birth</label><b className="register-reqired-field"> &nbsp;*</b>
                <input  type="date" className="form-control"  placeholder="Enter your date of birth"  name="dateOfBirth" value={user.dateOfBirth} onChange={onInputChange} max={getMaxDate()} required />   
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="empEmail">Email</label><b className="register-reqired-field"> &nbsp;*</b>
                <input type="email" className="form-control" placeholder="email@gmail.com" name="email" value={user.email} onChange={onInputChange} required />
                {emailExists && <span className="error-message-return">Email address is already exists use different email</span>}
                {emailInvalid && <span className="error-message-return">Invalid email format</span>}

              </div>
              <div className="form-group col">
                <label htmlFor="empPassword">Password</label><b className="register-reqired-field"> &nbsp;*</b>
                <input type="password" className="form-control" placeholder="Enter your password" name="password" value={user.password} onChange={onInputChange} required />
              </div>
              <div className="form-group col">
                <label htmlFor="phoneNumber">Phone Number</label><b className="register-reqired-field"> &nbsp;*</b>
                <input type="tel" className="form-control" placeholder="Enter your phone number" name="phoneNumber" value={user.phoneNumber} onChange={onInputChange} pattern="\d{10}" required />
              </div>
              
            </div>
            <div className="form-row">
            <div className="form-group col">
                <label htmlFor="empJoiningDate">Joining Date</label>
                <input type="date" className="form-control" placeholder="Enter your joining date" name="joiningDate" value={user.joiningDate} onChange={onInputChange}  />
              </div>
              <div className="form-group col">
                <label htmlFor="empDesignation">Designation</label>
                <input type="text" className="form-control" placeholder="Enter your designation" name="designation" value={user.designation} onChange={onInputChange} />
              </div>
              <div className="form-group col">
                <label htmlFor="empSalary">Salary</label>
                <input type="tel" className="form-control" placeholder="Enter your salary" name="salary" value={user.salary} maxLength="9" onChange={onInputChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="Qualification">Qualification</label><b className="register-reqired-field"> &nbsp;*</b>
                <input type="text" className="form-control" placeholder="Enter your qualification" name="qualification" value={user.qualification} onChange={onInputChange} required />
              </div>

              <div className="form-group col">
                <label htmlFor="empAadhaarNumber">Aadhaar Number</label>
                <input type="tel" className="form-control" placeholder="Enter your Aadhaar Number" name="aadhaarNumber" value={user.aadhaarNumber} maxLength="12" onChange={onInputChange} />
              </div>
              <div className="form-group col">
                <label htmlFor="panNumber">Pan Number</label>
                <input type="text" className="form-control" placeholder="Enter your PAN number" name="panNumber" value={user.panNumber} maxLength="10" onChange={onInputChange} />
                {panInvalid && <span className="error-message-return">Invalid PAN format</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="role">Role</label><b className="register-reqired-field"> &nbsp;*</b>
                <select className="form-control" name="role" value={user.role} onChange={onInputChange} required>
                  <option value="" disabled>Select the role</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="USER">USER</option>
                </select>
              </div>
              <div className="form-group col">
                <label htmlFor="empReleavingDate">Releaving Date</label>
                <input type="date" className="form-control" placeholder="Enter releaving date" name="releavingDate" value={user.releavingDate} onChange={onInputChange} />
              </div>
             
              <div className="form-group col">
                <label htmlFor="empRemarks">Remarks</label>
                <input type="text" className="form-control" placeholder="Enter employee remarks" name="remark" value={user.remark} onChange={onInputChange} />
              </div>
            </div>

            <div className="form-group col">
              <label htmlFor="empAddress">Address</label>
              <input type="text" className="form-control" placeholder="Enter your address" name="address" value={user.address} onChange={onInputChange} />
            </div>

            <div className="button-container">
              <button type="submit">Submit</button>
              <button type="button" onClick={handleCancel}>Cancel</button>
            </div>

          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}


export default Register;
