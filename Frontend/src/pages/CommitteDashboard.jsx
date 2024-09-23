import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';

const formatDate = (date) => {
  const complaintDate = new Date(date);
  const day = String(complaintDate.getDate()).padStart(2, '0');
  const month = String(complaintDate.getMonth() + 1).padStart(2, '0');
  const year = complaintDate.getFullYear();
  let hours = complaintDate.getHours();
  const minutes = String(complaintDate.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? String(hours).padStart(2, '0') : '12';

  return `${day}-${month}-${year} Time: ${hours}:${minutes}${ampm}`;
};

const Modal = ({ isOpen, onClose, complaint }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center  justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 ml-4 mr-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold">Complaint</h2>
        <hr className="border-t-4" style={{ borderColor: "#FEDE00" }} />
        <p style={{ fontSize: "13px" }} class="mt-2"><strong>Token Number: </strong>
        <span className="font-semibold bg-gray-300 rounded" style={{ color: "blue", fontSize: "13px" }}>
          {complaint._id}
        </span>
        </p>
        <p style={{ fontSize: "13px",textAlign: "justify" }}><strong>Details: </strong> {complaint.complaint}</p>
        <p style={{ fontSize: "13px" }} class="mt-3"><strong>Date: </strong>{formatDate(complaint.date)}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white font-semibold py-1 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const ChairmanDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const deptname = "CSE";

  useEffect(() => {
    setLoading(true);
    fetch(`/complaint/${deptname}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setComplaints(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [deptname]);


  const openModal = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const closeModal = () => {
    setSelectedComplaint(null);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100 text-black">
        <Navbar />
        <div className="container-fluid ml-4 mr-4 max-w-7xl mt-4 mb-4 mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl text-center font-bold mb-1">Committe Dashboard</h1>
          <p style={{ fontSize: "13px" }} className="mb-1 text-left font-bold">Complaints for "<span className="text-green-500">{deptname}</span>" Department</p>
          <hr className="border-t-4" style={{ borderColor: "#FEDE00" }} />
          {loading && <p>Loading complaints...</p>}
          {error && <p className="text-red-500">{error.message}</p>}
          {!loading && !error && (
            <table className="table-fixed w-full text-sm mt-4 text-center">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-0 py-2">Token Number</th>
                  <th className="px-0 py-2">Mark Solve</th>
                  <th className="px-0 py-2">Details</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint) => (
                  <tr key={complaint._id}>
                    <td className="border px-0 py-2 mb-0">
                      <span className="font-semibold bg-gray-300 rounded" style={{ color: "blue", fontSize: "8px" }}>
                        {complaint._id}
                      </span>
                      <br />
                      <span style={{ fontSize: "8px" }}>
                        <i className="fa-solid fa-calendar-days"></i> {formatDate(complaint.date)}
                      </span>
                    </td>
                    <td className="border px-0 py-2">
                      <button style={{ fontSize: "10px" }} className="bg-green-400 hover:bg-yellow-300 text-dark font-semibold py-1 px-2 rounded">
                        Mark Solve
                      </button>
                    </td>
                    <td className="border px-0 py-2">
                      <button style={{ fontSize: "10px" }} onClick={() => openModal(complaint)} className="button text-dark font-semibold py-1 mt-2 px-2 rounded">
                        See Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Modal isOpen={!!selectedComplaint} onClose={closeModal} complaint={selectedComplaint} />
    </>
  );
};

export default ChairmanDashboard;
