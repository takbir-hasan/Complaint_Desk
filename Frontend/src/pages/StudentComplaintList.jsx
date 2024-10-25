// ComplaintsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ComplaintsPage = () => {
    const [complaints, setComplaints] = useState([]);
    const [loadingComplaints, setLoadingComplaints] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // const studentId = "200103";
        const studentId = localStorage.getItem('id');
        const token = localStorage.getItem('token');
        const fetchComplaints = async () => {
            try {
                const response = await axios.get(`/complaint/complaintByStudentId/${studentId}`,{
                    headers: {
                        'Authorization': `Bearer ${token}`, // Add Authorization header
                    },
                });
                // console.log(response.data);
                if (Array.isArray(response.data)) {
                    const sortedComplaints = response.data.sort((a, b) => {
                        return b._id.localeCompare(a._id); // Use localeCompare for string sorting
                    });
                    setComplaints(sortedComplaints);
                   
                } else {
                    
                    setComplaints([response.data]);
                }

            } catch (error) {
                console.error('Error fetching complaints:', error);
            } finally {
                setLoadingComplaints(false);
            }
        };
        fetchComplaints();
    }, []);

    return (
        <div className="p-5">
            <hr className="border-t-4 mt-5" style={{ borderColor: '#FEDE00' }} />
            <div className="text-center mb-3 mt-3">
                <p className="text-lg mb-3 font-bold">Your Complaints</p>
            </div>
            
            {loadingComplaints ? (
                <div className="loader-verify"></div> // Display loader while loading complaints
            ) : error ? (
                <div className="text-red-500">{error}</div> // Display error message
            ) : (
                <div className="overflow-hidden">
                    <table className="table-auto min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                        <thead style={{ background: '#FEDE00' }}>
                            <tr>
                                <th scope="col" className="border border-gray-300 px-2 sm:px-3 py-3 text-center text-warp text-xs font-semibold text-black uppercase tracking-wider">Token Number</th>
                                <th scope="col" className="border border-gray-300 px-2 sm:px-3 py-3 text-center text-xs font-semibold text-black uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {complaints.length > 0 ? (
                                complaints.map((complaint) => (
                                    <tr key={complaint._id} className="hover:bg-gray-100 transition-colors duration-200">
                                        <td className="border border-gray-300 px-2 sm:px-3 py-4 whitespace-normal break-all text-sm text-gray-600 border-b text-center">{complaint._id}</td>
                                        <td className=" border border-gray-300 px-2 sm:px-3 py-4 whitespace-normal text-sm text-gray-600 border-b text-center">{complaint.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="px-6 py-4 whitespace-normal text-sm text-gray-500 text-center">No complaints found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ComplaintsPage;
