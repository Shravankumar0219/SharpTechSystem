
import React, { useState } from "react";
import axios from "axios";
import "./EmployeeSearch.css"
import Footer from "../../components/Footer/Footer"
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import FormsNavbar from "../../components/FormsNavbar/FormsNavbar";
import UserService from "../UserService/UserService";
import Navbar from "../../components/Navbar/Navbar";


function EmployeeSearch() {
    const [empId, setEmpId] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setEmpId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await UserService.getUserByempId(empId, token);
            if (response.statusCode === 200) {
                setUser(response.employee);
                setError(null); // Clear previous error if any
            } else {
                setUser(null);
                setError(response.message);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Error fetching users');
            setUser(null);
        }finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* <FormsNavbar /> */}
            <Navbar/>
            <div className="employeesearch-container">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="empId" > Employee ID:</label>
                        <input type="text" id="empId" placeholder="Enter Your Id" value={empId} onChange={handleChange} />
                    </div>
                    <button type="submit"> Search</button> 
                </form>
            </div>
            {loading && <div>Loading...</div>}
            {error && <div className="employee-search-error-message">{error}</div>}
            {user && !loading && (
                <div className="employeessearch-table">
                    <table employeesearch-tables>
                        <thead>
                            <tr>
                                <th scope="col">EmployeeID</th>

                                <th scope="col">FirstName</th>
                                <th scope="col">MiddleName</th>
                                <th scope="col">LastName</th>

                                <th scope="col">Fathes's Name</th>
                                <th scope="col">Mothers's Name</th>
                                

                                <th scope="col">Email</th>
                                {/* <th scope="col">Password</th> */}
                                <th scope="col">DateOfBirth</th>

                                <th scope="col">Address</th>

                                <th scope="col">JoiningDate</th>
                                <th scope="col">Salary</th>

                                <th scope="col">Qualification</th>
                                <th scope="col">ReleavingDate</th>

                                <th scope="col">AadhaarNumber</th>
                                <th scope="col">PanNumber</th>
                                <th scope="col">Remarks</th>
                                {/* <th className="mx-2" scope="col">Action</th>*/}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th >{user.empId}</th>

                                <td >{user.firstName}</td>
                                <td >{user.middleName}</td>
                                <td>{user.lastName}</td>

                                <td >{user.fatherName}</td>
                                <td >{user.motherName}</td>

                                <td>{user.email}</td>
                                {/* <td>{user.password}</td> */}
                                <td>{user.dateOfBirth}</td>

                                <td>{user.address}</td>

                                <td>{user.joiningDate}</td>
                                <td>{user.salary}</td>

                                <td>{user.qualification}</td>
                                <td>{user.releavingDate}</td>

                                <td>{user.aadhaarNumber}</td>
                                <td>{user.panNumber}</td>
                                <td>{user.remark}</td>
                                {/* <td><button className="btn btn-primary">View</button></td>
                            <td><button className="btn btn-outline-primary mx-2">Edit</button></td>
                            <td><button className="btn btn-danger mx-2">Delete</button></td>*/}
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}


            <Footer />
        </div>
    );
}

export default EmployeeSearch;