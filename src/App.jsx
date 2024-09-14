import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import axios from 'axios';

function App() {
    const navigate = useNavigate(); // Use navigate directly in the App component
    const [registeredUser, setRegisteredUser] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(() => localStorage.getItem('loggedInUser'));

    useEffect(() => {
        if (loggedInUser) {
            localStorage.setItem('loggedInUser', loggedInUser);
        } else {
            localStorage.removeItem('loggedInUser');
        }
    }, [loggedInUser]);

    const handleRegister = async (username, password) => {
        try {
            const response = await axios.post('https://employee-management-system-backend-39a4.onrender.com/api/register', {
                username,
                password,
            });
            if (response.status === 201) {
                alert('Registration successful! You can now log in.');
                navigate('/login'); // Redirect to login page
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed. Please try again.');
        }
    };

    const handleLogin = (username) => {
        setLoggedInUser(username);
        navigate('/dashboard'); // Redirect to dashboard after login
    };

    const handleLogout = () => {
        setLoggedInUser(null);
        navigate('/'); // Redirect to register page after logout
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Register onRegister={handleRegister} />} />
                    <Route path="/login" element={<Login registeredUser={registeredUser} onLogin={handleLogin} />} />
                    <Route path="/dashboard" element={<Dashboard username={loggedInUser} onLogout={handleLogout} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
