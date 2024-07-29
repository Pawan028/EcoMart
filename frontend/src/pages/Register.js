import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import './signup.css'; // Ensure you import the CSS file

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    address: Yup.array().of(
        Yup.object().shape({
            street: Yup.string().required('Street is required'),
            city: Yup.string().required('City is required'),
            state: Yup.string().required('State is required'),
            zip: Yup.string().required('Zip is required'),
            country: Yup.string().required('Country is required')
        })
    )
});

const Register = () => {
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await axios.post('/api/users/register', values);
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                navigate('/login');
            }, 2000); // Adjust the duration as needed
        } catch (error) {
            console.error('Error registering user:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="register">
            <h1>Register</h1>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    address: [{ street: '', city: '', state: '', zip: '', country: '' }]
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, values }) => (
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <Field type="text" name="name" className="form-control" />
                            <ErrorMessage name="name" component="div" className="form-error" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <Field type="email" name="email" className="form-control" />
                            <ErrorMessage name="email" component="div" className="form-error" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <Field type="password" name="password" className="form-control" />
                            <ErrorMessage name="password" component="div" className="form-error" />
                        </div>
                        <FieldArray name="address">
                            {({ push, remove }) => (
                                <>
                                    {values.address.map((addr, index) => (
                                        <div key={index}>
                                            <div className="mb-3">
                                                <label htmlFor={`address.${index}.street`} className="form-label">Street</label>
                                                <Field type="text" name={`address.${index}.street`} className="form-control" />
                                                <ErrorMessage name={`address.${index}.street`} component="div" className="form-error" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor={`address.${index}.city`} className="form-label">City</label>
                                                <Field type="text" name={`address.${index}.city`} className="form-control" />
                                                <ErrorMessage name={`address.${index}.city`} component="div" className="form-error" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor={`address.${index}.state`} className="form-label">State</label>
                                                <Field type="text" name={`address.${index}.state`} className="form-control" />
                                                <ErrorMessage name={`address.${index}.state`} component="div" className="form-error" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor={`address.${index}.zip`} className="form-label">Zip</label>
                                                <Field type="text" name={`address.${index}.zip`} className="form-control" />
                                                <ErrorMessage name={`address.${index}.zip`} component="div" className="form-error" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor={`address.${index}.country`} className="form-label">Country</label>
                                                <Field type="text" name={`address.${index}.country`} className="form-control" />
                                                <ErrorMessage name={`address.${index}.country`} component="div" className="form-error" />
                                            </div>
                                            <button type="button" onClick={() => remove(index)} className="btn btn-danger">Remove Address</button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => push({ street: '', city: '', state: '', zip: '', country: '' })} className="btn btn-primary full-width">Add Address</button>
                                </>
                            )}
                        </FieldArray>
                        <button type="submit" className="btn btn-primary full-width" disabled={isSubmitting}>
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </button>
                    </Form>
                )}
            </Formik>
            <p className="account-link">
                Already have an account? <Link to="/login">Login</Link>
            </p>
            {showToast && (
                <div className="toast show">
                    <p>Registration successful!</p>
                </div>
            )}
        </div>
    );
};

export default Register;
