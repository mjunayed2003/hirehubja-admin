import React, { useState } from "react";

const PaymentsEscrow = () => {
  // --- MOCK DATA ---
  // Generating 50 items to enable pagination logic
  const initialData = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: "Bepary",
    email: "bepary@gmail.com",
    date: "20.20.2026",
    category: "Educations,",
    verificationStatus: "Verified",
    // Simulating Blocked vs Unlocked status based on index
    isBlocked: i % 3 === 0, 
  }));

  const [data, setData] = useState(initialData);
  const [filterType, setFilterType] = useState("Employer"); // Dropdown state

  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // --- HANDLERS ---

  // Toggle Block/Unlock
  const toggleBlockStatus = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, isBlocked: !item.isBlocked } : item
      )
    );
  };

  // Pagination Handlers
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Helper to format page number (e.g., 1 -> 01)
  const formatPageNumber = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  // View Details Handler (Placeholder)
  const handleViewDetails = (user) => {
    console.log("Viewing details for:", user.name);
    // You can add modal logic here if needed
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden w-full min-h-[700px] flex flex-col justify-between p-6">
      
      {/* --- HEADER SECTION --- */}
      <div>
        <div className="flex justify-between items-center mb-6 border-b border-dashed border-gray-200 pb-4">
          {/* Title as per screenshot */}
          <h2 className="text-xl font-bold text-gray-800">Payments & Escrow</h2>
          
          {/* Dropdown */}
          <div className="relative group">
            <button className="px-4 py-1.5 border border-gray-200 rounded text-sm text-gray-600 flex items-center bg-white hover:bg-gray-50 transition min-w-[120px] justify-between">
               {filterType} <span className="ml-2 text-[10px] text-green-600">▼</span>
            </button>
            {/* Dropdown Content */}
            <div className="absolute right-0 top-full mt-1 w-full bg-white border border-gray-100 shadow-lg rounded hidden group-hover:block z-10">
                {["Employer", "Agency", "Admin"].map(type => (
                    <div 
                        key={type} 
                        onClick={() => setFilterType(type)}
                        className="px-4 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-green-600 cursor-pointer"
                    >
                        {type}
                    </div>
                ))}
            </div>
          </div>
        </div>

        {/* --- TABLE SECTION --- */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white text-gray-500 text-xs border-b border-gray-200">
              <tr>
                <th className="py-4 px-4 font-medium">Name</th>
                <th className="py-4 px-4 font-medium">Email</th>
                <th className="py-4 px-4 font-medium">Registration Date</th>
                <th className="py-4 px-4 font-medium">Category</th>
                <th className="py-4 px-4 font-medium text-center">Verification Status</th>
                <th className="py-4 px-4 font-medium text-center">View Details</th>
                <th className="py-4 px-4 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700 divide-y divide-gray-50">
              {currentItems.map((row) => (
                <tr key={row.id} className="hover:bg-[#FAFAFA] transition">
                  <td className="py-4 px-4 font-medium text-gray-700">{row.name}</td>
                  <td className="py-4 px-4 text-gray-600">{row.email}</td>
                  <td className="py-4 px-4 text-gray-600">{row.date}</td>
                  <td className="py-4 px-4 text-gray-600">{row.category}</td>
                  
                  {/* Status Badge */}
                  <td className="py-4 px-4 text-center">
                    <span className="bg-[#E7F8EE] text-[#00B074] px-4 py-1.5 rounded-full text-xs font-semibold">
                      {row.verificationStatus}
                    </span>
                  </td>

                  {/* View Button */}
                  <td className="py-4 px-4 text-center">
                    <button 
                      onClick={() => handleViewDetails(row)}
                      className="bg-[#EAEAEA] text-[#4B5563] px-6 py-1.5 rounded-full text-xs font-bold hover:bg-gray-300 transition shadow-sm"
                    >
                      View
                    </button>
                  </td>

                  {/* Action Button (Block/Unlock) */}
                  <td className="py-4 px-4 text-center">
                    <button 
                        onClick={() => toggleBlockStatus(row.id)}
                        className={`px-6 py-1.5 rounded-full text-xs font-bold transition min-w-[80px] shadow-sm ${
                            row.isBlocked 
                            ? "bg-[#EAEAEA] text-[#4B5563] hover:bg-gray-300" // Unlock Style
                            : "bg-[#FFEEEE] text-[#FF5B5B] hover:bg-red-200" // Block Style
                        }`}
                    >
                        {row.isBlocked ? "Unlock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- PAGINATION SECTION --- */}
      <div className="pt-6 border-t border-gray-100 flex items-center justify-center gap-8 bg-white mt-4">
        
        {/* Previous Button */}
        <button 
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-6 py-2 bg-[#E7F8EE] text-gray-500 text-sm font-medium rounded hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
            <span>←</span> Previous
        </button>

        {/* Page Numbers */}
        <div className="flex gap-5 text-sm font-medium">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`${
                        currentPage === number 
                        ? "text-[#43B948] font-bold" // Active
                        : "text-gray-500 hover:text-gray-700" // Inactive
                    }`}
                >
                    {formatPageNumber(number)}
                </button>
            ))}
        </div>

        {/* Next Button */}
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

export default PaymentsEscrow;