import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import ComplaintsPage from './StudentComplaintList';

const StudentProfile = () => {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ phone: '', profilePhoto: null });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const studentId = localStorage.getItem('id'); 
        const token = localStorage.getItem('token');
        const fetchStudentProfile = async () => {
            try {
                const response = await axios.get(`/student/api/getStudentByID/${studentId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Add Authorization header
                    },
                }); // Use Axios to fetch data
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


     
    

    const handleLogoutRedirect = () => {
        // Implement your logout logic here
        toast.success('Logged out successfully.');
        localStorage.clear(); // Clear all items in local storage
        // navigate('/slogin'); // Redirect to login page after logout
        window.location.replace('/slogin');
    };


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profilePhoto') {
            setFormData({ ...formData, profilePhoto: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        const studentId = localStorage.getItem('id'); 
        e.preventDefault();
        setErrorMessage('');
    
        const id = localStorage.getItem('id');
        const token = localStorage.getItem('token');
        // Convert the image file to base64
        let base64ProfilePhoto = '';
        if (formData.profilePhoto) {
            const reader = new FileReader();
            reader.readAsDataURL(formData.profilePhoto);
            reader.onload = async () => {
                base64ProfilePhoto = reader.result;
    
                // Prepare the data to send
                const dataToSend = {
                    phone: formData.phone,
                    profilePhoto: base64ProfilePhoto,
                };
    
                try {
                    // const response = await axios.put(`/student/api/updateStudentByID/${id}`, dataToSend); // Correct usage of template literal
                    const response = await axios.put(`/student/api/updateStudentByID/${id}`, dataToSend, {
                        headers: {
                            'Authorization': `Bearer ${token}`, // Add Authorization header
                        },
                    });
                    toast.success('Profile updated successfully!');
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                } catch (error) {
                    setErrorMessage('Failed to update data.');
                    toast.error('Failed to update data.');
                    console.error('Error updating data:', error);
                }
            };
    
            reader.onerror = () => {
                setErrorMessage('Error reading file');
                toast.error('Error reading file');
            };
        } else {
            // If no image is selected, just send the phone number
            try {
                const response = await axios.put(`/student/api/updateStudentByID/${id}`, {
                    phone: formData.phone,
                    headers: {
                        'Authorization': `Bearer ${token}`, // Add Authorization header
                    },
                });
                toast.success('Profile updated successfully!');
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } catch (error) {
                setErrorMessage('Failed to update data.');
                console.error('Error updating data:', error);
                toast.error('Failed to update data.');
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

                <div className="container-fluid max-w-4xl w-full mx-auto mt-4 mb-4 bg-white p-4 sm:p-8 rounded-lg shadow-lg">
                    <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center mb-3">
                        <p className="text-lg sm:text-xl mb-3 sm:mb-0 font-bold">Student Profile</p>
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
                                            required
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
                                                    required
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

                    {/* Student Complaint List
                    <hr className="border-t-4 mt-5" style={{ borderColor: '#FEDE00' }} />
                    <div className="text-center mb-3 mt-3">
                        <p className="text-lg mb-3 font-bold">Your Complaints</p>
                    </div>
                    
                    {loadingComplaints ? (
                        <div className="loader-verify"></div> // Display loader while loading complaints
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complaint ID</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {complaints.length > 0 ? (
                                        complaints.map((complaint) => (
                                            <tr key={complaint._id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint._id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.status}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">No complaints found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )} */}

                    <ComplaintsPage/>
                </div>
            </div>
        </>
    );
};

export default StudentProfile;
