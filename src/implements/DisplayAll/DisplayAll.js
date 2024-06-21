import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './DisplayAll.css'; // Import CSS file for styling
import FormsNavbar from "../../components/FormsNavbar/FormsNavbar";
import Footer from "../../components/Footer/Footer";
import UserService from "../UserService/UserService";
import Navbar from "../../components/Navbar/Navbar";

function DisplayAll() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state
  const [visibleUsersCount, setVisibleUsersCount] = useState(3); // Add a state to manage the number of visible users

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const response = await UserService.getAllUsers(token);
      console.log(response);
      setUsers(response.employeeList || []); // Assuming the list of users is under the key 'ourUsersList'
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this user?');
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      if (confirmDelete) {
        await UserService.deleteUser(userId, token);
        loadUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleLoadMore = () => {
    setVisibleUsersCount((prevCount) => prevCount + 3); // Increase the visible user count by 5
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="displayall-error-message">{error}</div>;

  return (
    <div>
      {/* <FormsNavbar /> */}
      <Navbar/>
      <div className='display-all-container'>
        <center>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Phone Number</th>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Last Name</th>
                <th>Father's Name</th>
                <th>Mother's Name</th>
                <th>Email</th>
                <th>Designation</th>
                <th>Date of Birth</th>
                <th>Address</th>
                <th>Joining Date</th>
                <th>Salary</th>
                <th>Qualification</th>
                <th>Releaving Date</th>
                <th>Aadhaar Number</th>
                <th>Pan Number</th>
                <th>Role</th>
                <th>Remarks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, visibleUsersCount).map((user) => ( // Slice the users array to only show visibleUsersCount items
                <tr key={user.id}>
                  <td>{user.empId}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.firstName}</td>
                  <td>{user.middleName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.fatherName}</td>
                  <td>{user.motherName}</td>
                  <td>{user.email}</td>
                  <td>{user.designation}</td>
                  <td>{user.dateOfBirth}</td>
                  <td>{user.address}</td>
                  <td>{user.joiningDate}</td>
                  <td>{user.salary}</td>
                  <td>{user.qualification}</td>
                  <td>{user.releavingDate}</td>
                  <td>{user.aadhaarNumber}</td>
                  <td>{user.panNumber}</td>
                  <td>{user.role}</td>
                  <td>{user.remark}</td>
                  <td>
                    <button className='delete-button' onClick={() => deleteUser(user.id)}>Delete</button>
                    <button className='update-button'>
                      <Link to={`/update-user/${user.id}`} className='update-link'>Update</Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {visibleUsersCount < users.length && ( // Show the Load More button only if there are more users to load
            <button className='load-more-button' onClick={handleLoadMore}>Load More</button>
          )}
        </center>
      </div>
      <Footer />
    </div>
  );
}

export default DisplayAll;
