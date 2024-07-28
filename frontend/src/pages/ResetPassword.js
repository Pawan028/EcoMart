import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/users/reset-password', { email, otp, newPassword });
            alert('Password reset successfully');
        } catch (error) {
            console.error('Error resetting password:', error);
        }
    };

    return (
        <div className="reset-password">
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="otp" className="form-label">OTP</label>
                    <input type="text" className="form-control" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">New Password</label>
                    <input type="password" className="form-control" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
