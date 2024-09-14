import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';

function App() {
    const [registeredUser, setRegisteredUser] = useState(() => {
        const savedUser = localStorage.getItem('registeredUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [loggedInUser, setLoggedInUser] = useState(() => localStorage.getItem('loggedInUser'));

    useEffect(() => {
        if (registeredUser) {
            localStorage.setItem('registeredUser', JSON.stringify(registeredUser));
        }
    }, [registeredUser]);

    useEffect(() => {
        if (loggedInUser) {
            localStorage.setItem('loggedInUser', loggedInUser);
        } else {
            localStorage.removeItem('loggedInUser');
        }
    }, [loggedInUser]);

    const handleRegister = (username, password) => {
        setRegisteredUser({ username, password });
    };

    const handleLogin = (username) => {
        setLoggedInUser(username);
    };

    const handleLogout = () => {
        setLoggedInUser(null);
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
