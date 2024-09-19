import React from "react";
import Navbar from '../components/navbar'


const AdminDashboard = () => {
  return (
    <>
    <div className="flex flex-col min-h-screen bg-gray-100 text-black">
       <Navbar />
       <div className="container-fluid max-w-7xl mt-4 mb-4 ml-auto mr-auto mx-auto bg-white p-8 rounded-lg shadow-lg">
       <p className="text-2xl mb-3 font-bold">Complaints</p>
      <hr className="border-t-4" style={{ borderColor: "#FEDE00" }} />
      <table className="table-fixed w-full text-sm mt-4 text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-0 py-2">Token Number</th>
            <th className="px-0 py-2">Solve</th>
            <th className="px-0 py-2">Inactive</th>
            <th className="px-0 py-2">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-0 py-2">
              <span className="font-semibold bg-gray-300 rounded" style={{ color: "blue" }}>
                12af45bcO09
              </span>
              <br />
              <span style={{ fontSize: "13px" }}>
                <i className="fa-solid fa-calendar-days"></i> 19-09-2024
              </span>
            </td>
            <td className="border px-0 py-2">
              <button className="bg-green-400 hover:bg-yellow-300 text-dark font-semibold py-1 px-2 rounded">
                Solve
              </button>
            </td>
            <td className="border px-0 py-2">
              <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded">
                Inactive
              </button>
            </td>
            <td className="border px-0 py-2">
              <button className="button text-dark font-semibold py-1 mt-2 px-2 rounded">See Details</button>
            </td>
          </tr>
          <tr>
            <td className="border px-0 py-2">
              <span className="font-semibold bg-gray-300 rounded" style={{ color: "blue" }}>
                12af45bcO09
              </span>
              <br />
              <span style={{ fontSize: "13px" }}>
                <i className="fa-solid fa-calendar-days"></i> 19-09-2024
              </span>
            </td>
            <td className="border px-0 py-2">
              <button className="bg-green-400 hover:bg-yellow-300 text-dark font-semibold py-1 px-2 rounded">
                Solve
              </button>
            </td>
            <td className="border px-0 py-2">
              <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded">
                Inactive
              </button>
            </td>
            <td className="border px-0 py-2">
              <button className="button text-dark font-semibold py-1 mt-2 px-2 rounded">See Details</button>
            </td>
          </tr>
          <tr>
            <td className="border px-0 py-2">
              <span className="font-semibold bg-gray-300 rounded" style={{ color: "blue" }}>
                12af45bcO09
              </span>
              <br />
              <span style={{ fontSize: "13px" }}>
                <i className="fa-solid fa-calendar-days"></i> 19-09-2024
              </span>
            </td>
            <td className="border px-0 py-2">
              <button className="bg-green-400 hover:bg-yellow-300 text-dark font-semibold py-1 px-2 rounded">
                Solve
              </button>
            </td>
            <td className="border px-0 py-2">
              <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded">
                Inactive
              </button>
            </td>
            <td className="border px-0 py-2">
              <button className="button text-dark font-semibold py-1 mt-2 px-2 rounded">See Details</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
    </>
  );
};

export default AdminDashboard;
