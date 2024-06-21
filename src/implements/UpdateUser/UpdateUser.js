
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from '../UserService/UserService';
import "./UpdateUser.css";
import Footer from '../../components/Footer/Footer';
import FormsNavbar from '../../components/FormsNavbar/FormsNavbar';

function UpdateUser() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [emailInvalid, setEmailInvalid] = useState(false); 
  const [dobInvalid, setDobInvalid] = useState(false);

  const [userData, setUserData] = useState({
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

  useEffect(() => {
    fetchUserDataById(userId); // Pass the userId to fetchUserDataById
  }, [userId]); // Whenever there is a change in userId, run this

  const fetchUserDataById = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await UserService.getUserById(userId, token); // Pass userId to getUserById
      const { empId, phoneNumber, firstName, middleName, lastName, fatherName, motherName, email, password, dateOfBirth, address, joiningDate, designation, salary, qualification, aadhaarNumber, panNumber, releavingDate, role, remark } = response.employee;
      setUserData({ empId, phoneNumber, firstName, middleName, lastName, fatherName, motherName, email, password, dateOfBirth, address, joiningDate, designation, salary, qualification, aadhaarNumber, panNumber, releavingDate, role, remark });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'dateOfBirth') {
      const dob = new Date(value);
      const eighteenYearsAgo = new Date();
      eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
      if (dob > eighteenYearsAgo) {
        setDobInvalid(true);
        return;
      } else {
        setDobInvalid(false);
      }
    }

    if (name === 'phoneNumber') {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }
    if (name === 'email') {
      const emailPattern = /^[a-z0-9.@]+$/;
      setEmailInvalid(value !== "" && !emailPattern.test(value));
    }
    
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dobInvalid) {
      alert("You must be at least 18 years old to register.");
      return;
    }
    try {
      const confirmUpdate = window.confirm('Are you sure you want to update this user?');
      if (confirmUpdate) {
        const token = localStorage.getItem('token');
        const res = await UserService.updateUser(userId, userData, token);
        console.log(res);
        // Redirect to profile page or display a success message
        navigate("/DisplayAll");
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      alert(error);
    }
  };

  return (
    <div>
      <FormsNavbar />
      <div className="register-container">
        <div className="register-form">
          <h4>Update Employee Details</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="empId">Employee Id</label>
                <input type="text" className="form-control" placeholder="Enter your employee id" name="empId" value={userData.empId} onChange={handleInputChange} readOnly />
                {<p>&nbsp;&nbsp;Employee Id Cant be Edit</p>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="empFirstName">First Name</label>
                <input type="text" className="form-control" placeholder="Enter your first name" name="firstName" value={userData.firstName} onChange={handleInputChange} />
              </div>

              <div className="form-group col">
                <label htmlFor="empMiddleName">Middle Name</label>
                <input type="text" className="form-control" placeholder="Enter your middle name" name="middleName" value={userData.middleName} onChange={handleInputChange} />
              </div>

              <div className="form-group col">
                <label htmlFor="empLastName">Last Name</label>
                <input type="text" className="form-control" placeholder="Enter your last name" name="lastName" value={userData.lastName} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="empFatherName">Father's Name</label>
                <input type="text" className="form-control" placeholder="Enter your father's name" name="fatherName" value={userData.fatherName} onChange={handleInputChange} />
              </div>
              <div className="form-group col">
                <label htmlFor="empMotherName">Mother's Name</label>
                <input type="text" className="form-control" placeholder="Enter your mother's name" name="motherName" value={userData.motherName} onChange={handleInputChange} />
              </div>
              <div className="form-group col">
                <label htmlFor="empDateOfBirth">Date of Birth</label>
                <input type="date" className="form-control" placeholder="Enter your date of birth" name="dateOfBirth" value={userData.dateOfBirth} onChange={handleInputChange} max={new Date().toISOString().split('T')[0]} />
                {/* {dobInvalid && <span className="error-message-return">You must be at least 18 years old.</span>} */}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="empEmail">Email</label>
                <input type="email" className="form-control" placeholder="Enter your email" name="email" value={userData.email} onChange={handleInputChange} readOnly/>
                {emailInvalid && <span className="error-message-return">Invalid email format</span>}
                {<p>&nbsp;&nbsp;Email can't be Edit</p>}
              </div>
              <div className="form-group col">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input type="tel" className="form-control" placeholder="Enter your phone number" name="phoneNumber" value={userData.phoneNumber} onChange={handleInputChange}  pattern="\d{10}" />
              </div>
              {/* <div className="form-group col">
                  <label htmlFor="empPassword">Password</label>
                  <input type="password" className="form-control" placeholder="Enter your password" name="password" value={userData.password} onChange={handleInputChange} />
                </div> */}
              <div className="form-group col">
                <label htmlFor="empJoiningDate">Joining Date</label>
                <input type="date" className="form-control" placeholder="Enter your joining date" name="joiningDate" value={userData.joiningDate} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="empReleavingDate">Releaving Date</label>
                <input type="date" className="form-control" placeholder="Enter releaving date" name="releavingDate" value={userData.releavingDate} onChange={handleInputChange} />
              </div>
              <div className="form-group col">
                <label htmlFor="empDesignation">Designation</label>
                <input type="text" className="form-control" placeholder="Enter your designation" name="designation" value={userData.designation} onChange={handleInputChange} />
              </div>
              <div className="form-group col">
                <label htmlFor="empSalary">Salary</label>
                <input type="tel" className="form-control" placeholder="Enter your salary" name="salary" value={userData.salary} onChange={handleInputChange}  maxLength="9" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="Qualification">Qualification</label>
                <input type="text" className="form-control" placeholder="Enter your qualification" name="qualification" value={userData.qualification} onChange={handleInputChange} />
              </div>

              <div className="form-group col">
                <label htmlFor="empAadhaarNumber">Aadhaar Number</label>
                <input type="number" className="form-control" placeholder="Enter your Aadhaar Number" name="aadhaarNumber" value={userData.aadhaarNumber} onChange={handleInputChange} />
              </div>
              <div className="form-group col">
                <label htmlFor="empPanNumber">Pan Number</label>
                <input type="text" className="form-control" placeholder="Enter your pan number" name="panNumber" value={userData.panNumber} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="empRole">Role</label>
                <select className="form-control" name="role" value={userData.role} onChange={handleInputChange} required>
                  <option value="" disabled>Select the role</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="USER">USER</option>
                </select>
              </div>
              
              <div className="form-group col">
                <label htmlFor="empRemarks">Remarks</label>
                <input type="text" className="form-control" placeholder="Enter employee remarks" name="remark" value={userData.remark} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group col">
              <label htmlFor="empAddress">Address</label>
              <input type="text" className="form-control" placeholder="Enter your address" name="address" value={userData.address} onChange={handleInputChange} />
            </div>

            <div className="button-container">
              <button type="submit">Submit</button>

            </div>


          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UpdateUser;
