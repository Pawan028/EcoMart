import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [address, setAddress] = useState([{ street: '', city: '', state: '', zip: '', country: '' }]);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const { data } = await axios.get('/api/users/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(data);
                setName(data.name);
                setAddress(data.address);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUser();
    }, []);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put('/api/users/profile', { name, address }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put('/api/users/change-password', { oldPassword, newPassword }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Password changed successfully');
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };

    const handleAddressChange = (index, field, value) => {
        const newAddress = [...address];
        newAddress[index][field] = value;
        setAddress(newAddress);
    };

    return (
        <div className="profile">
            <h1>Profile</h1>
            {user ? (
                <>
                    <form onSubmit={handleProfileUpdate}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        {address.map((addr, index) => (
                            <div key={index}>
                                <div className="mb-3">
                                    <label htmlFor="street" className="form-label">Street</label>
                                    <input type="text" className="form-control" id="street" value={addr.street} onChange={(e) => handleAddressChange(index, 'street', e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <input type="text" className="form-control" id="city" value={addr.city} onChange={(e) => handleAddressChange(index, 'city', e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="state" className="form-label">State</label>
                                    <input type="text" className="form-control" id="state" value={addr.state} onChange={(e) => handleAddressChange(index, 'state', e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="zip" className="form-label">Zip</label>
                                    <input type="text" className="form-control" id="zip" value={addr.zip} onChange={(e) => handleAddressChange(index, 'zip', e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <input type="text" className="form-control" id="country" value={addr.country} onChange={(e) => handleAddressChange(index, 'country', e.target.value)} required />
                                </div>
                            </div>
                        ))}
                        <button type="submit" className="btn btn-primary">Update Profile</button>
                    </form>
                    <form onSubmit={handleChangePassword}>
                        <div className="mb-3">
                            <label htmlFor="oldPassword" className="form-label">Old Password</label>
                            <input type="password" className="form-control" id="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="newPassword" className="form-label">New Password</label>
                            <input type="password" className="form-control" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Change Password</button>
                    </form>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
