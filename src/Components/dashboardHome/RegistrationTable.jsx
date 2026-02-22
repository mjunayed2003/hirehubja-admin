import React, { useState } from "react";

const initialData = [
  { id: 1, type: "Job Seeker", name: "Sowrove Bepary", email: "sowrove@gmail.com", date: "20.10.2026", category: "Education", status: "Pending" },
  { id: 2, type: "Company", name: "Tech Solutions Ltd", email: "hr@techsol.com", date: "21.10.2026", category: "IT Service", status: "Pending" },
  { id: 3, type: "Employee", name: "Rahim Ahmed", email: "rahim@work.com", date: "22.10.2026", category: "Management", status: "Pending" },
  { id: 4, type: "Job Seeker", name: "John Doe", email: "john@gmail.com", date: "23.10.2026", category: "Design", status: "Pending" },
  { id: 5, type: "Company", name: "Grameenphone", email: "info@gp.com", date: "24.10.2026", category: "Telecom", status: "Pending" },
  { id: 6, type: "Employee", name: "Karim Uddin", email: "karim@shop.com", date: "25.10.2026", category: "Sales", status: "Pending" },
  { id: 7, type: "Job Seeker", name: "Sowrove Bepary", email: "sowrove@gmail.com", date: "20.10.2026", category: "Education", status: "Pending" },
  { id: 8, type: "Company", name: "Tech Solutions Ltd", email: "hr@techsol.com", date: "21.10.2026", category: "IT Service", status: "Pending" },
  { id: 9, type: "Employee", name: "Rahim Ahmed", email: "rahim@work.com", date: "22.10.2026", category: "Management", status: "Pending" },
  { id: 10, type: "Job Seeker", name: "John Doe", email: "john@gmail.com", date: "23.10.2026", category: "Design", status: "Pending" },
  { id: 11, type: "Company", name: "Grameenphone", email: "info@gp.com", date: "24.10.2026", category: "Telecom", status: "Pending" },
  { id: 12, type: "Employee", name: "Karim Uddin", email: "karim@shop.com", date: "25.10.2026", category: "Sales", status: "Pending" },
  { id: 13, type: "Job Seeker", name: "Sowrove Bepary", email: "sowrove@gmail.com", date: "20.10.2026", category: "Education", status: "Pending" },
  { id: 14, type: "Company", name: "Tech Solutions Ltd", email: "hr@techsol.com", date: "21.10.2026", category: "IT Service", status: "Pending" },
  { id: 15, type: "Employee", name: "Rahim Ahmed", email: "rahim@work.com", date: "22.10.2026", category: "Management", status: "Pending" },
  { id: 16, type: "Job Seeker", name: "John Doe", email: "john@gmail.com", date: "23.10.2026", category: "Design", status: "Pending" },
  { id: 17, type: "Company", name: "Grameenphone", email: "info@gp.com", date: "24.10.2026", category: "Telecom", status: "Pending" },
  { id: 18, type: "Employee", name: "Karim Uddin", email: "karim@shop.com", date: "25.10.2026", category: "Sales", status: "Pending" },
];

const RegistrationApprovalRequests = ({ onView }) => {

  const [requests, setRequests] = useState(initialData);
  const [filterType, setFilterType] = useState("Job Seeker");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredRequests = filterType === "All" 
    ? requests 
    : requests.filter((req) => req.type === filterType);

  //  Approve 
  const handleApprove = (id) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "Approved" } : req
      )
    );
  };

  // Decline 
  const handleDecline = (id) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "Declined" } : req
      )
    );
  };

  const handleFilterSelect = (type) => {
    setFilterType(type);
    setShowDropdown(false);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 min-h-[500px]">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 border-b border-dashed border-gray-200 pb-4">
        <h3 className="text-lg font-bold text-[#1A1A1A]">
          Requests ({filterType === "All" ? "All" : filterType})
        </h3>
        
        <div className="flex gap-3 relative">
          {/* See All Button */}
          <button 
            onClick={() => handleFilterSelect("All")}
            className={`px-4 py-1.5 border rounded text-sm font-medium transition ${filterType === "All" ? "bg-gray-100 border-gray-400 text-black" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
          >
            See all
          </button>

          {/* Filter Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="px-4 py-1.5 border border-gray-200 rounded text-sm font-medium text-gray-600 flex items-center hover:bg-gray-50 transition bg-white min-w-[140px] justify-between"
            >
              {filterType === "All" ? "Select Type" : filterType} 
              <span className="ml-2 text-[10px]">▼</span>
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 top-10 w-40 bg-white border border-gray-100 shadow-lg rounded-lg z-10 py-2">
                {["Job Seeker", "Employee", "Company"].map((type) => (
                  <button
                    key={type}
                    onClick={() => handleFilterSelect(type)}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${filterType === type ? "text-green-600 font-bold bg-green-50" : "text-gray-700"}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs text-gray-500 border-b border-dashed border-gray-200">
              <th className="font-medium py-3 px-2">Type</th>
              <th className="font-medium py-3 px-2">Name</th>
              <th className="font-medium py-3 px-2">Email</th>
              <th className="font-medium py-3 px-2">Date</th>
              <th className="font-medium py-3 px-2 text-center">Status</th>
              <th className="font-medium py-3 px-2 text-center">Details</th>
              <th className="font-medium py-3 px-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((row) => (
                <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="py-4 px-2 text-xs font-semibold text-gray-500">{row.type}</td>
                  <td className="py-4 px-2 font-medium">{row.name}</td>
                  <td className="py-4 px-2">{row.email}</td>
                  <td className="py-4 px-2">{row.date}</td>
                  
                  {/* Status Badge Logic */}
                  <td className="py-4 px-2 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-medium inline-block min-w-[80px]
                      ${row.status === 'Pending' ? 'bg-[#FFF4E3] text-[#F39C12]' : ''}
                      ${row.status === 'Approved' ? 'bg-[#E7F8EE] text-[#00B074]' : ''}
                      ${row.status === 'Declined' ? 'bg-[#FFEEEE] text-[#FF5B5B]' : ''}
                    `}>
                      {row.status}
                    </span>
                  </td>

                  <td className="py-4 px-2 text-center">
                    <button
                      onClick={() => onView && onView(row)}
                      className="bg-[#EAEAEA] text-[#4B5563] px-6 py-1.5 rounded text-xs font-bold hover:bg-gray-300 transition"
                    >
                      View
                    </button>
                  </td>

                  {/* Action Buttons Logic */}
                  <td className="py-4 px-2 text-center">
                    {row.status === "Pending" ? (
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => handleApprove(row.id)}
                          className="bg-[#E7F8EE] text-[#00B074] px-4 py-1.5 rounded-full text-xs font-bold hover:bg-green-600 hover:text-white transition shadow-sm"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleDecline(row.id)}
                          className="bg-[#FFEEEE] text-[#FF5B5B] px-4 py-1.5 rounded-full text-xs font-bold hover:bg-red-500 hover:text-white transition shadow-sm"
                        >
                          Decline
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 italic">Action Taken</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-8 text-center text-gray-400">
                  No requests found for {filterType}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegistrationApprovalRequests;