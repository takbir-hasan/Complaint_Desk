import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const StudentProfile = () => {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ phone: '', profilePhoto: null });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        const studentId = localStorage.getItem('id'); // Get student ID from local storage
        const fetchStudentProfile = async () => {
            try {
                const response = await axios.get(`/student/api/getStudentByID/${studentId}`); // Use Axios to fetch data
                setStudent(response.data); // Set student data from response
            } catch (error) {
                console.error('Error fetching student profile:', error);
                toast.error('Failed to load student profile.');
                setError('Failed to load student profile.'); // Optional: Set error message
            } finally {
                setLoading(false); // Set loading to false in both success and error cases
            }
        };

        fetchStudentProfile();
    }, []);

   
    if (error) return <div>Error: {error}</div>;

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleLogoutRedirect = () => {
        // Implement your logout logic here
        toast.success('Logged out successfully.');
        localStorage.clear(); // Clear all items in local storage
        // navigate('/slogin'); // Redirect to login page after logout
        window.location.replace('/slogin');
    };

    const handleSubmit = async (e) => {
        const studentId = localStorage.getItem('id'); // Assuming this ID is hardcoded for demonstration
    
        e.preventDefault();
        setErrorMessage('');
    
        // Create a new FormData object to hold the form data
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('phone', formData.phone);
    
        // Check if the profile photo is provided
        if (formData.profilePhoto) {
            const reader = new FileReader();
    
            // Read the file as a data URL (Base64)
            reader.readAsDataURL(formData.profilePhoto);
    
            reader.onload = async () => {
                const base64String = reader.result; // This contains the Base64 encoded string
                formDataToSubmit.append('profilePhoto', base64String); // Append the Base64 string to FormData
    
                try {
                    const response = await fetch(`/student/api/updateStudentByID/${studentId}`, { // Use backticks here
                        method: 'PUT', // Changed to PUT
                        body: formDataToSubmit,
                    });
    
                    if (!response.ok) throw new Error('Failed to update profile');
    
                    const result = await response.json();
                    toast.success('Profile updated successfully.');
                    setStudent((prev) => ({ ...prev, phone: formData.phone, profilePhoto: base64String }));
                    setFormData({ phone: '', profilePhoto: null }); // Reset form data after successful update
                } catch (error) {
                    console.error('Error updating profile:', error);
                    setErrorMessage('Failed to update profile. Please try again.');
                }
            };
    
            reader.onerror = (error) => {
                console.error('Error reading file:', error);
                setErrorMessage('Failed to read profile photo. Please try again.');
            };
        } else {
            // If no profile photo is provided, just update the phone number
            try {
                const response = await fetch(`/student/api/updateStudentByID/${studentId}`, { // Use backticks here
                    method: 'PUT', // Changed to PUT
                    body: formDataToSubmit,
                });
    
                if (!response.ok) throw new Error('Failed to update profile');
    
                const result = await response.json();
                toast.success('Profile updated successfully.');
                setStudent((prev) => ({ ...prev, phone: formData.phone }));
                setFormData({ phone: '', profilePhoto: null }); // Reset form data after successful update
            } catch (error) {
                console.error('Error updating profile:', error);
                setErrorMessage('Failed to update profile. Please try again.');
            }
        }
    };
    
    

    return (
        <>
            <Helmet>
                <title>Profile | Student</title>
            </Helmet>

            <div className="flex flex-col min-h-screen overflow-x-hidden bg-gray-100 text-black">
                <Navbar />

                {/* Toast Notify */}
                <ToastContainer autoClose={3000} position="top-right" />

                <div className="container-fluid max-w-4xl mx-auto mt-4 mb-4 bg-white p-8 rounded-lg shadow-lg">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-3">
                        <p className="text-lg mb-3 font-bold">Student Profile</p>
                        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-3 sm:mt-0">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
                                onClick={handleLogoutRedirect}
                            >
                                <span className="flex items-center">
                                    <FaSignOutAlt className="mr-2" />
                                    Logout
                                </span>
                            </button>
                        </div>
                    </div>

                    <hr className="border-t-4" style={{ borderColor: '#FEDE00' }} />

                    {loading ? (
                        <div className="loader-verify"></div> // Display loader while loading
                    ) : student ? (
                        <>
                            <div className="p-4 text-center">
                                <img
                                    className="mx-auto rounded-full profile-image"
                                    src={student.profilePhoto || 'https://img.freepik.com/free-vector/mans-face-flat-style_90220-2877.jpg'}
                                    alt="Student"
                                />
                            </div>
                            <div className="text-center mb-3">
                                <span className="font-semibold">Department: </span> {student.dept}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                                <div className="bg-gray-200 p-4 text-center">
                                    <span className="font-semibold">Name: </span> {student.name}
                                </div>
                                <div className="bg-gray-200 p-4 text-center">
                                    <span className="font-semibold">Student Id: </span> {student.id}
                                </div>
                                <div className="bg-gray-200 p-4 text-center">
                                    <span className="font-semibold">Session: </span> {student.session}
                                </div>
                                <div className="bg-gray-200 p-4 text-center">
                                    <span className="font-semibold">Email: </span> {student.email}
                                </div>
                                <div className="bg-gray-200 p-4 text-center">
                                    <span className="font-semibold">Mobile: </span> {student.phone}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-center text-red-500">Student profile not found.</div>
                    )}

                    <hr className="border-t-4 mt-5" style={{ borderColor: '#FEDE00' }} />
                    <div className="text-center mb-3 mt-5">
                        <p className="text-lg mb-3 font-bold">Edit Profile</p>
                    </div>
                    <div className="w-full mx-auto bg-white p-8 rounded-lg">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Second Column: Other Fields */}
                            <div className="space-y-4">
                               
                                    <div>
                                        <label className="block text-gray-700 text-sm font-semibold mb-2">Mobile Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Enter mobile number"
                                            className="w-full px-3 bg-gray-100 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 text-sm font-semibold mb-2">Profile Photo (Max Size 2MB)</label>
                                        <div className="flex items-center space-x-5">
                                            <div className="shrink-0">
                                                <img
                                                    className="h-12 w-12 object-cover rounded-full"
                                                    src={formData.profilePhoto ? URL.createObjectURL(formData.profilePhoto) : 'https://img.freepik.com/free-vector/mans-face-flat-style_90220-2877.jpg'}
                                                    alt="Current profile"
                                                />
                                            </div>
                                            <label className="block">
                                                <input
                                                    type="file"
                                                    name="profilePhoto"
                                                    onChange={handleChange}
                                                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    
                            </div>

                            {/* Submit Button */}
                            <div className="md:col-span-2">
                                <button
                                    type="submit"
                                    className="button w-full py-2 px-4 text-dark font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    Update
                                    <i className="fa-solid fa-angle-right"></i>
                                </button>
                            </div>

                            {/* Error message display */}
                            {errorMessage && (
                                <div className="md:col-span-2 text-red-500 text-center mt-4">
                                    {errorMessage}
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Student Complaint List */}
                    <hr className="border-t-4 mt-5" style={{ borderColor: '#FEDE00' }} />
                    <div className="text-center mb-3 mt-3">
                        <p className="text-lg mb-3 font-bold">Your Complaints</p>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-center">Token Number</th>
                                    <th className="py-3 px-6 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700 text-sm font-dark">
                                <tr>
                                    <td colSpan="2" className="py-3 px-6 text-center">No complaints found</td>
                                 </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentProfile;
