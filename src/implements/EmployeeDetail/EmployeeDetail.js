import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useLocation  } from 'react-router-dom';
import Footer from "../../components/Footer/Footer";
// import "./DisplayLogin.css";
import EmpNavbar from '../EmpNavbar/EmpNavbar';
import FormsNavbar from "../../components/FormsNavbar/FormsNavbar";
import Navbar from '../../components/Navbar/Navbar';
import UserService from '../UserService/UserService';
import AuthContext from '../AuthContext/AuthContext';
import { Link } from "react-router-dom";
import { ClipLoader } from 'react-spinners'; // Import ClipLoader from react-spinners


function EmployeeDetail() {
  const [profileInfo, setProfileInfo] = useState(null);
  const {  isAdmin } = useContext(AuthContext); // Use the context
  const [loading, setLoading] = useState(true); // Add loading state


  

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const location = useLocation();
  const { id } = location.state || {}; // Retrieve the ID from state

  if (!id) {
    return <p>No employee ID provided. Please go back and select an employee.</p>;
  }
  

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const response = await UserService.getUserById(id, token);
      setProfileInfo(response.employee);
    } catch (error) {
      console.error('Error fetching profile information:', error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  return (
    <div>
      <Navbar />
      <div className="displaylogin-container">
        {loading ? ( // Show the loader while loading is true
          <div className="loader-container">
            <ClipLoader size={150} color={"#123abc"} loading={loading} />
          </div>
        ) : (
          profileInfo && (
            <div className="displaylogin-card">
              <h2 className="displaylogin-title">Employee Details</h2>
              <div className="displaylogin-grid">
                <div className="displaylogin-row">
                  <div className="displaylogin-label">Employee Id:</div>
                  <div className="displaylogin-value">{profileInfo.empId}</div>
                </div>
                <div className="displaylogin-row">
                  <div className="displaylogin-label">Phone Number:</div>
                  <div className="displaylogin-value">{profileInfo.phoneNumber}</div>
                </div>
                <div className="displaylogin-row">
                  <div className="displaylogin-label">First Name:</div>
                  <div className="displaylogin-value">{profileInfo.firstName}</div>
                </div>
                <div className="displaylogin-row">
                  <div className="displaylogin-label">Middle Name:</div>
                  <div className="displaylogin-value">{profileInfo.middleName}</div>
                </div>
                <div className="displaylogin-row">
                  <div className="displaylogin-label">Last Name:</div>
                  <div className="displaylogin-value">{profileInfo.lastName}</div>
                </div>
                <div className="displaylogin-row">
                  <div className="displaylogin-label">Father's Name:</div>
                  <div className="displaylogin-value">{profileInfo.fatherName}</div>
                </div>
                <div className="displaylogin-row">
                  <div className="displaylogin-label">Mother's Name:</div>
                  <div className="displaylogin-value">{profileInfo.motherName}</div>
                </div>
                <div className="displaylogin-row">
                  <div className="displaylogin-label">Email:</div>
                  <div className="displaylogin-value">{profileInfo.email}</div>
                </div>
                <div className="displaylogin-row">
                  <div className="displaylogin-label">Date Of Birth:</div>
                  <div className="displaylogin-value">{profileInfo.dateOfBirth}</div>
                </div>
                <div className="displaylogin-row">
                  <div className="displaylogin-label">Address:</div>
                  <div className="displaylogin-value">{profileInfo.address}</div>
                </div>
                <div className="displaylogin-row">
                  <div className="displaylogin-label">Joining Date:</div>
                  <div className="displaylogin-value">{profileInfo.joiningDate}</div>
                </div>
                <div className="displaylogin-row">
                  <div className="displaylogin-label">Designation:</div>
                  <div className="displaylogin-value">{profileInfo.designation}</div>
                </div>
                <div className="displaylogin-row">
                  <div className="displaylogin-label">Salary:</div>
                  <div className="displaylogin-value">{profileInfo.salary}</div>
                </div>
                <div className="displaylogin-row">
                  <div className="displaylogin-label">Qualification:</div>
                  <div className="displaylogin-value">{profileInfo.qualification}</div>
                </div>
                <div className="displaylogin-row">
                  <div className="displaylogin-label">Aadhaar Number:</div>
                  <div className="displaylogin-value">{profileInfo.aadhaarNumber}</div>
                </div>
                <div className="displaylogin-row">
                  <div className="displaylogin-label">Pan Number:</div>
                  <div className="displaylogin-value">{profileInfo.panNumber}</div>
                </div>
                <div className="displaylogin-row">
                  <div className="displaylogin-label">Releaving Date:</div>
                  <div className="displaylogin-value">{profileInfo.releavingDate}</div>
                </div>
                <div className="displaylogin-row">
                  <div className="displaylogin-label">Role:</div>
                  <div className="displaylogin-value">{profileInfo.role}</div>
                </div>
                <div className="displaylogin-row">
                  <div className="displaylogin-label">Remark:</div>
                  <div className="displaylogin-value">{profileInfo.remark}</div>
                </div>
                {isAdmin && (
                  <div className="displaylogin-card">
                    <button className='displaylogin-update-button'>
                      <Link to={`/update-user/${profileInfo.id}`}>Update</Link>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </div>
      <Footer />
    </div>
  );
}

export default EmployeeDetail;