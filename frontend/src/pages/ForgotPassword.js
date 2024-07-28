import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/users/request-password-reset', { email });
            alert('OTP sent to your email');
        } catch (error) {
            console.error('Error requesting password reset:', error);
        }
    };

    return (
        <div className="forgot-password">
            <h1>Forgot Password</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Request OTP</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
