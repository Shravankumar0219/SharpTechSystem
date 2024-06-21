import React, { useState, useEffect } from 'react';
import UserService from '../UserService/UserService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './Pagination.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

export default function Pagination() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [first, setFirst] = useState(0);
    const [error, setError] = useState(null);
    const [rows, setRows] = useState(5);
    const [globalFilter, setGlobalFilter] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate


    const handleViewClick = (rowData) => {
        navigate('/EmployeeDetail', { state: { id: rowData.id } });
    };


    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await UserService.getAllUsers(token);
            console.log(response);
            setUsers(response.employeeList || []);
        } catch (error) {
            console.error('Error fetching users', error);
            setError('Error fetching users');
        } finally {
            setLoading(false);
        }
    };

    const onPage = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const header = (
        <TextField
            type="text"
            className="pagination-search-field"
            placeholder="Search employee by Id, name, email, role...."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            variant="outlined"
        />
    );

    const deleteUser = async (userId) => {
        try {
            const confirmDelete = window.confirm('Are you sure you want to delete this user');
            const token = localStorage.getItem('token');  // Retrieve the token from localStorage
            if (confirmDelete) {
                await UserService.deleteUser(userId, token);
                loadUsers();
            }
        } catch (error) {
            console.error('Error deleting user', error);
        }
    };

    const filteredUsers = users.filter((user) =>
        Object.values(user).some((value) =>
            String(value).toLowerCase().includes(globalFilter.toLowerCase())
        )
    );

    return (
        <div>
            <Navbar/>
            <div className="pagination-datatable-demo">
                <div className="pagination-card">
                    <h1 className="Pagination-main-heading">Employee Information</h1>
                    <div className="pagination-datatable-wrapper">
                        <DataTable
                            value={filteredUsers}
                            paginator
                            rows={rows}
                            first={first}
                            onPage={onPage}
                            totalRecords={users.length}
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            rowsPerPageOptions={[5, 10, 20, 30, 40]}
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries &nbsp; &nbsp;"
                            header={header}
                            globalFilter={globalFilter}
                            className="pagination-datatable" >
                            <Column field="empId" header="Employee ID" sortable className="heading-pagination-column" />
                            <Column field="firstName" header="First Name" className="heading-pagination-column" />
                            <Column field="middleName" header="Middle Name" className="heading-pagination-column" />
                            <Column field="lastName" header="Last Name" className="heading-pagination-column" />
                            <Column field="role" header="Role" className="heading-pagination-column" />
                            <Column field="email" header="Email" className="heading-pagination-column" />
                            <Column field="designation" header="Designation" className="heading-pagination-column" />
                            <Column field="phoneNumber" header="Phone Number" className="heading-pagination-column" />
                            <Column field="remark" header="Remark" className="heading-pagination-column" />                        
                            <Column field="fatherName" header="Father's Name" className="heading-pagination-column" />
                            <Column field="motherName" header="Mother's Name" className="heading-pagination-column" />
                            <Column field="dateOfBirth" header="Date of Birth" className="heading-pagination-column" />
                            <Column field="address" header="Address" className="heading-pagination-column" />
                            <Column field="joiningDate" header="Joining Date" className="heading-pagination-column" />
                            <Column field="salary" header="Salary" className="heading-pagination-column" />
                            <Column field="qualification" header="Qualification" className="heading-pagination-column" />
                            <Column field="releavingDate" header="Releaving Date" className="heading-pagination-column" />
                            <Column field="aadhaarNumber" header="Aadhaar Number" className="heading-pagination-column" />
                            <Column field="panNumber" header="Pan Number" className="heading-pagination-column" />
                            <Column field="remark" header="Remark" className="heading-pagination-column" />
                            <Column
                                header="Actions"
                                body={(rowData) => (
                                    <div>
                                        {/* <Button icon="pi pi-user-plus" label="View" className="p-button-rounded p-button-info" /> */}
                                        <Button icon="pi pi-pen-to-square" label="&nbsp;View&nbsp;&nbsp;" className="p-button-rounded p-button-custom-warning" onClick={() => handleViewClick(rowData)} />
                                        {/* <Button icon="pi pi-search" className="p-button-rounded p-button-warning" />
                                        <Button icon="pi pi-trash" label="Delete" className="p-button-rounded p-button-danger" onClick={() => deleteUser(rowData.empId)} />
                                        <Button icon="pi pi-info-circle" className="p-button-rounded p-button-info" />
                                        <Button icon={<ArrowForwardIcon />} className="p-button-rounded p-button-info" /> */}
                                    </div>
                                )}
                            />
                        </DataTable>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
