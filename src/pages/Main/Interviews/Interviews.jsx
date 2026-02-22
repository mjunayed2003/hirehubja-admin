import React, { useState } from "react";

// --- MOCK DATA ---
const initialData = Array.from({ length: 15 }, (_, i) => {
  const statuses = ["Interview Scheduled", "Completed", "Not Selected"];
  // cycling through statuses for demo
  const status = statuses[i % 3]; 
  
  return {
    id: i + 1,
    jobTitle: "Senior sales executives",
    employer: "Bepary industries",
    jobSeeker: "Sowrove",
    dateTime: "12:00 PM 12.02.2026",
    status: status,
  };
});

// --- DETAILS MODAL COMPONENT ---
const InterviewDetailsModal = ({ data, onClose }) => {
  if (!data) return null;

  // Helper to color the status inside modal
  const getStatusColor = (status) => {
    switch (status) {
      case "Interview Scheduled": return "bg-[#FFF4E3] text-[#F39C12]";
      case "Completed": return "bg-[#E7F8EE] text-[#00B074]";
      case "Not Selected": return "bg-[#FFEEEE] text-[#FF5B5B]";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden relative">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-bold text-gray-800">Interview Details</h3>
          <button onClick={onClose} className="text-2xl text-gray-400 hover:text-red-500 transition">&times;</button>
        </div>
        
        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs text-gray-500 uppercase font-semibold">Job Title</label>
            <p className="text-gray-800 font-medium">{data.jobTitle}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="text-xs text-gray-500 uppercase font-semibold">Employer</label>
                <p className="text-gray-800">{data.employer}</p>
             </div>
             <div>
                <label className="text-xs text-gray-500 uppercase font-semibold">Job Seeker</label>
                <p className="text-gray-800">{data.jobSeeker}</p>
             </div>
          </div>
          <div>
            <label className="text-xs text-gray-500 uppercase font-semibold">Date & Time</label>
            <p className="text-gray-800">{data.dateTime}</p>
          </div>
          <div>
            <label className="text-xs text-gray-500 uppercase font-semibold">Current Status</label>
            <div className="mt-1">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${getStatusColor(data.status)}`}>
                    {data.status}
                </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
          <button 
            onClick={onClose} 
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-300 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const Interviews = () => {
  const [interviews] = useState(initialData);
  const [selectedInterview, setSelectedInterview] = useState(null); // For Modal
  const [filterType, setFilterType] = useState("Employer");

  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = interviews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(interviews.length / itemsPerPage);

  // --- HANDLERS ---
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const formatPageNumber = (num) => (num < 10 ? `0${num}` : num);

  // Helper function for status colors (Table)
  const getStatusColor = (status) => {
    switch (status) {
      case "Interview Scheduled": return "bg-[#FFF4E3] text-[#F39C12]";
      case "Completed": return "bg-[#E7F8EE] text-[#00B074]";
      case "Not Selected": return "bg-[#FFEEEE] text-[#FF5B5B]";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden w-full min-h-[700px] flex flex-col justify-between p-6">
      
      {/* --- HEADER --- */}
      <div>
        <div className="flex justify-between items-center mb-6 border-b border-dashed border-gray-200 pb-4">
          <h2 className="text-xl font-bold text-gray-800 uppercase">INTERVIEW</h2>
          
          {/* Dropdown */}
          <div className="relative group">
            <button className="px-4 py-1.5 border border-gray-200 rounded text-sm text-gray-600 flex items-center bg-white hover:bg-gray-50 transition min-w-[120px] justify-between">
               {filterType} <span className="ml-2 text-[10px] text-green-600">▼</span>
            </button>
            <div className="absolute right-0 top-full mt-1 w-full bg-white border border-gray-100 shadow-lg rounded hidden group-hover:block z-10">
                {["Employer", "Candidate", "Date"].map(type => (
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

        {/* --- TABLE --- */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white text-gray-500 text-xs border-b border-gray-200">
              <tr>
                <th className="py-4 px-4 font-medium">Job Title</th>
                <th className="py-4 px-4 font-medium">Employer</th>
                <th className="py-4 px-4 font-medium">Job Seeker</th>
                <th className="py-4 px-4 font-medium">Interview date & time</th>
                <th className="py-4 px-4 font-medium text-center">Status</th>
                <th className="py-4 px-4 font-medium text-center">View Details</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700 divide-y divide-gray-50">
              {currentItems.map((row) => (
                <tr key={row.id} className="hover:bg-[#FAFAFA] transition">
                  <td className="py-4 px-4 text-gray-700">{row.jobTitle}</td>
                  <td className="py-4 px-4 text-gray-700">{row.employer}</td>
                  <td className="py-4 px-4 text-gray-700">{row.jobSeeker}</td>
                  <td className="py-4 px-4 text-gray-600">{row.dateTime}</td>
                  
                  {/* Status Badge */}
                  <td className="py-4 px-4 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold ${getStatusColor(row.status)}`}>
                      {row.status}
                    </span>
                  </td>

                  {/* View Button */}
                  <td className="py-4 px-4 text-center">
                    <button 
                        onClick={() => setSelectedInterview(row)}
                        className="bg-[#EAEAEA] text-[#4B5563] px-6 py-1.5 rounded-full text-xs font-bold hover:bg-gray-300 transition shadow-sm"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- PAGINATION --- */}
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
                        ? "text-[#43B948] font-bold" 
                        : "text-gray-500 hover:text-gray-700"
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

      {/* --- MODAL --- */}
      {selectedInterview && (
        <InterviewDetailsModal 
            data={selectedInterview} 
            onClose={() => setSelectedInterview(null)} 
        />
      )}

    </div>
  );
};

export default Interviews;