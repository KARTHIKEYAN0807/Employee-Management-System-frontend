import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import EmployeeForm from './EmployeeForm'; // Assuming EmployeeForm is in a separate file
import { useNavigate } from 'react-router-dom'; // Assuming react-router-dom is being used

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null); // Add error state
    const navigate = useNavigate(); // Hook for navigation

    // Fetch employees from the backend when component mounts
    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('User is not authenticated');
                navigate('/register'); // Redirect to register if token is missing
                return;
            }

            const response = await axios.get('http://localhost:5000/api/employees', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setEmployees(response.data.employees);
        } catch (error) {
            console.error('Error fetching employees:', error);
            if (error.response?.data?.message === "Invalid token.") {
                setError('Invalid token. Please register again.');
                localStorage.removeItem('token'); // Clear invalid token
                navigate('/register'); // Redirect to register
            } else {
                setError(error.response?.data?.message || 'Error fetching employees'); // Set error message
                console.log('Error details:', error.response?.data); // Log detailed error response
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token
        navigate('/register'); // Redirect to register
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('User is not authenticated');
                navigate('/register'); // Redirect to register if token is missing
                return;
            }

            await axios.delete(`http://localhost:5000/api/employees/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // Remove the deleted employee from the state
            setEmployees(employees.filter(employee => employee._id !== id));
        } catch (error) {
            console.error('Error deleting employee:', error);
            setError(error.response?.data?.message || 'Error deleting employee'); // Set error message
        }
    };

    const handleEdit = (employee) => {
        setIsEditing(true);
        setCurrentEmployee(employee);
        setIsModalOpen(true);
    };

    const handleSave = async (employee, imageFile) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('User is not authenticated');
            navigate('/register'); // Redirect to register if token is missing
            return;
        }

        // Create FormData to handle file upload and other fields
        const formData = new FormData();
        Object.keys(employee).forEach(key => {
            formData.append(key, employee[key]);
        });

        if (imageFile) {
            formData.append('image', imageFile); // Append the image file to the formData
        }

        if (isEditing) {
            // Update employee in the backend
            try {
                await axios.put(`http://localhost:5000/api/employees/${employee._id}`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                // Update the employee in the state
                fetchEmployees(); // Refresh the employee list
            } catch (error) {
                console.error('Error updating employee:', error);
                setError(error.response?.data?.message || 'Error updating employee'); // Set error message
                console.log('Error details:', error.response?.data); // Log detailed error response
            }
        } else {
            // Create a new employee in the backend
            try {
                const response = await axios.post('http://localhost:5000/api/employees', formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                // Add the new employee to the state
                setEmployees([...employees, response.data.employee]);
            } catch (error) {
                console.error('Error creating employee:', error);
                setError(error.response?.data?.message || 'Error creating employee'); // Set error message
                console.log('Error details:', error.response?.data); // Log detailed error response
            }
        }

        setIsModalOpen(false);
        setIsEditing(false);
        setCurrentEmployee(null);
    };

    const handleCreate = () => {
        setIsEditing(false);
        setCurrentEmployee({ name: '', email: '', mobile: '', designation: '', gender: '', course: [], image: '' });
        setIsModalOpen(true);
    };

    return (
        <div>
            {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
            <div className="d-flex justify-content-between mb-3">
                <div>Total Count: {employees.length}</div>
                <button className="btn btn-primary" onClick={handleCreate}>Create Employee</button>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button> {/* Logout button */}
            </div>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Enter Search Keyword" />
                <button className="btn btn-outline-secondary">Search</button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Unique Id</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Create date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee._id}</td>
                            <td>{employee.image ? <img src={employee.image} alt="Profile" style={{ width: '50px', height: '50px' }} /> : "N/A"}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.mobile}</td>
                            <td>{employee.designation}</td>
                            <td>{employee.gender}</td>
                            <td>{employee.course.join(', ')}</td>
                            <td>{new Date(employee.createdAt).toLocaleDateString()}</td>
                            <td>
                                <button className="btn btn-link" onClick={() => handleEdit(employee)}>Edit</button> - 
                                <button className="btn btn-link text-danger" onClick={() => handleDelete(employee._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isModalOpen && (
                <EmployeeForm
                    employee={currentEmployee}
                    onSave={handleSave}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default EmployeeList;
