import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeList from './EmployeeList';

const Dashboard = ({ username, onLogout }) => {
    const [activeTab, setActiveTab] = useState('home');

    const renderContent = () => {
        if (activeTab === 'employeeList') {
            return <EmployeeList />;
        } else {
            return <h2>Welcome Admin Panel</h2>;
        }
    };

    return (
        <div className="dashboard-container vh-100 vw-100">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Employee Management System</a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <button className="btn btn-link nav-link" onClick={() => setActiveTab('home')}>Home</button>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-link nav-link" onClick={() => setActiveTab('employeeList')}>Employee List</button>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link">Welcome, {username}</span>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-outline-danger" onClick={onLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container mt-5">
                {renderContent()}
            </div>
        </div>
    );
};

export default Dashboard;
