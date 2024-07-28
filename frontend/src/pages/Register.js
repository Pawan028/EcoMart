import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState([{ street: '', city: '', state: '', zip: '', country: '' }]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/users/register', { name, email, password, address });
            alert('User registered successfully');
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    const handleAddressChange = (index, field, value) => {
        const newAddress = [...address];
        newAddress[index][field] = value;
        setAddress(newAddress);
    };

    return (
        <div className="register">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
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
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default Register;
