// components/JobSeekerApprovals.jsx
import React, { useState } from "react";
import RegistrationDetails from "../../../Components/dashboardHome/RegistrationDetails"; // Import the shared component

const JobSeekerApprovals = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const [users, setUsers] = useState([
    { id: 1, name: "Sowrove Bepary", email: "sowrove@gmail.com", date: "20.10.2026", category: "Education", status: "Pending" },
    { id: 2, name: "John Doe", email: "john@gmail.com", date: "22.10.2026", category: "Software", status: "Pending" },
    { id: 3, name: "Jane Smith", email: "jane@gmail.com", date: "23.10.2026", category: "Design", status: "Pending" },
    { id: 4, name: "Sowrove Bepary", email: "sowrove@gmail.com", date: "20.10.2026", category: "Education", status: "Pending" },
    { id: 5, name: "John Doe", email: "john@gmail.com", date: "22.10.2026", category: "Software", status: "Pending" },
    { id: 6, name: "Jane Smith", email: "jane@gmail.com", date: "23.10.2026", category: "Design", status: "Pending" },
    { id: 7, name: "Sowrove Bepary", email: "sowrove@gmail.com", date: "20.10.2026", category: "Education", status: "Pending" },
    { id: 8, name: "John Doe", email: "john@gmail.com", date: "22.10.2026", category: "Software", status: "Pending" },
    { id: 9, name: "Jane Smith", email: "jane@gmail.com", date: "23.10.2026", category: "Design", status: "Pending" },
    { id: 10, name: "Sowrove Bepary", email: "sowrove@gmail.com", date: "20.10.2026", category: "Education", status: "Pending" },
    { id: 11, name: "John Doe", email: "john@gmail.com", date: "22.10.2026", category: "Software", status: "Pending" },
    { id: 12, name: "Jane Smith", email: "jane@gmail.com", date: "23.10.2026", category: "Design", status: "Pending" },
    { id: 13, name: "Sowrove Bepary", email: "sowrove@gmail.com", date: "20.10.2026", category: "Education", status: "Pending" },
    { id: 14, name: "John Doe", email: "john@gmail.com", date: "22.10.2026", category: "Software", status: "Pending" },
    { id: 15, name: "Jane Smith", email: "jane@gmail.com", date: "23.10.2026", category: "Design", status: "Pending" },
    { id: 16, name: "Sowrove Bepary", email: "sowrove@gmail.com", date: "20.10.2026", category: "Education", status: "Pending" },
    { id: 17, name: "John Doe", email: "john@gmail.com", date: "22.10.2026", category: "Software", status:"Pending" },
    { id: 18, name: "Jane Smith", email: "jane@gmail.com", date: "23.10.2026", category: "Design", status: "Pending" },
  ]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleStatus = (id, newStatus) => {
    setUsers(users.map(user => user.id === id ? { ...user, status: newStatus } : user));
  };

  if (selectedUser) {
    return <RegistrationDetails user={selectedUser} onBack={() => setSelectedUser(null)} />;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px] flex flex-col justify-between">
      <div>
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Job Seeker Registration Requests</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white text-gray-500 text-xs border-b border-gray-200">
              <tr>
                <th className="py-4 px-6 font-medium">Name</th>
                <th className="py-4 px-6 font-medium">Email</th>
                <th className="py-4 px-6 font-medium">Registration Date</th>
                <th className="py-4 px-6 font-medium">Category</th>
                <th className="py-4 px-6 font-medium text-center">Status</th>
                <th className="py-4 px-6 font-medium text-center">View Details</th>
                <th className="py-4 px-6 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700 divide-y divide-gray-50">
              {currentItems.map((row) => (
                <tr key={row.id} className="hover:bg-[#FAFAFA] transition">
                  <td className="py-4 px-6 font-medium">{row.name}</td>
                  <td className="py-4 px-6 text-gray-600">{row.email}</td>
                  <td className="py-4 px-6 text-gray-600">{row.date}</td>
                  <td className="py-4 px-6 text-gray-600">{row.category}</td>
                  <td className="py-4 px-6 text-center">
                    <span className={`px-4 py-1 rounded-full text-xs font-semibold ${
                      row.status === 'Pending' ? 'bg-[#FFF4E3] text-[#F39C12]' : 
                      row.status === 'Approved' ? 'bg-[#E7F8EE] text-[#00B074]' : 'bg-[#FFEEEE] text-[#FF5B5B]'
                    }`}>{row.status}</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button onClick={() => setSelectedUser(row)} className="bg-[#EAEAEA] text-[#4B5563] px-6 py-1.5 rounded text-xs font-bold hover:bg-gray-300">View</button>
                  </td>
                  <td className="py-4 px-6 text-center">
                    {row.status === 'Pending' ? (
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleStatus(row.id, 'Approved')} className="bg-[#E7F8EE] text-[#00B074] px-4 py-1.5 rounded text-xs font-bold hover:bg-green-600 hover:text-white">Approve</button>
                        <button onClick={() => handleStatus(row.id, 'Declined')} className="bg-[#FFEEEE] text-[#FF5B5B] px-4 py-1.5 rounded text-xs font-bold hover:bg-red-500 hover:text-white">Decline</button>
                      </div>
                    ) : <span className="text-xs text-gray-400">Completed</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-gray-100 flex items-center justify-center  gap-12 bg-white">
        
        {/* Previous Button */}
        <button 
          onClick={handlePrev} 
          disabled={currentPage === 1}
          className="flex items-center gap-2 px-6 py-2 bg-[#E7F8EE] text-gray-600 text-sm font-medium rounded hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <span>←</span> Previous
        </button>

        {/* Page Numbers */}
        <div className="flex gap-4 text-sm font-medium text-gray-500">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`${
                currentPage === number ? "text-[#43B948] font-bold" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {number < 10 ? `0${number}` : number}
            </button>
          ))}
        </div>

        {/* Next Page Button */}
        <button 
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2 px-6 py-2 bg-[#43B948] text-white text-sm font-medium rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
        >
          Next Page <span>→</span>
        </button>
      </div>

    </div>
  );
};

export default JobSeekerApprovals;