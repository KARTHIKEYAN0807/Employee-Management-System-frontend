import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ onRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(username, password);
        alert('Registration successful! You can now log in.');
        navigate('/login'); // Navigate to the login page after registration
    };

    return (
        <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-white" style={{ minWidth: '300px', maxWidth: '400px' }}>
                <h2 className="text-center mb-4">Register</h2>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
                <div className="text-center mt-3">
                    <p>Already have an account?</p>
                    <button type="button" className="btn btn-link" onClick={() => navigate('/login')}>
                        Go to Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
