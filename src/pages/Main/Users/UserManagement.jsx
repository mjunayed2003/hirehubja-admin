import React, { useState } from "react";

// --- MOCK DATA ---
const mockUsers = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: i === 0 ? "Sowrove Bepary" : "Bepary",
  email: "bepary@gmail.com",
  date: "20.20.2026",
  category: "Educations,",
  verificationStatus: "Verified",
  isBlocked: i % 4 === 0, // Simulating some users are blocked
  phone: "47928682462973",
  experienceLevel: "Senior level",
  location: "Dhaka, Bangladesh",
  overview: "Experienced and results-driven professional with a strong background in customer engagement, sales operations, and relationship management.",
  skills: [
    "Sales & Negotiation",
    "Customer Relationship Management (CRM)",
    "Communication & Presentation",
    "Lead Generation",
    "Market Research",
    "Time Management"
  ],
  education: {
    degree: "Bachelor of Business Administration (BBA)",
    uni: "University of Dhaka",
    year: "2014 - 2018"
  },
  image: "https://i.pravatar.cc/150?img=11"
}));

// --- RESUME MODAL COMPONENT ---
const ResumeModal = ({ onClose }) => (
  <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
    <div className="bg-white w-full max-w-4xl h-[85vh] rounded-xl flex flex-col shadow-2xl relative">
      <div className="px-6 py-4 border-b flex justify-between items-center bg-white">
         <h3 className="text-xl font-bold">Resume</h3>
         <button onClick={onClose} className="text-2xl text-gray-400 hover:text-red-500">&times;</button>
      </div>
      <div className="flex-1 overflow-auto bg-gray-100 p-6 flex justify-center">
          <img 
              src="https://marketplace.canva.com/EAFRuCp3DcY/1/0/1131w/canva-black-white-minimalist-cv-resume-f5JNR-K5jjw.jpg" 
              alt="Resume" 
              className="shadow-lg max-w-full h-auto object-contain" 
          />
      </div>
    </div>
  </div>
);

// --- USER PROFILE DETAILS COMPONENT ---
const UserProfile = ({ user, onBack }) => {
  const [showResume, setShowResume] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 w-full p-8 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 border-b border-dashed border-gray-200 pb-4">
        <button onClick={onBack} className="w-10 h-10 rounded-full border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
        </button>
        <h2 className="text-xl font-bold text-gray-800">Profile Details</h2>
        <div className="ml-auto">
             <span className="px-4 py-1.5 border border-gray-200 rounded text-sm text-gray-600 bg-white">Job seeker</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Personal Info & Experience */}
        <div className="lg:col-span-7 space-y-8 border-r border-gray-100 pr-8">
          
          {/* Header Info */}
          <div className="flex gap-6 items-start">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm">
                <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-1">
                <h3 className="text-2xl font-bold text-gray-800">{user.name}</h3>
                <p className="text-gray-600 text-sm">Phone Number: {user.phone}</p>
                <p className="text-gray-600 text-sm">Experience level: <span className="font-semibold text-gray-800">{user.experienceLevel}</span></p>
                <p className="text-gray-600 text-sm">Location: <span className="font-semibold text-gray-800">{user.location}</span></p>
                
                <div className="flex gap-2 mt-3">
                    <span className="bg-blue-50 text-blue-500 text-xs px-3 py-1 rounded-full flex items-center gap-1 font-medium">
                        ✓ Id Verified
                    </span>
                    <span className="bg-blue-50 text-blue-500 text-xs px-3 py-1 rounded-full flex items-center gap-1 font-medium">
                         🛡 Face Verified
                    </span>
                </div>
            </div>
          </div>

          {/* Overview */}
          <div>
            <h4 className="font-bold text-gray-800 mb-2">Overview</h4>
            <p className="text-sm text-gray-500 leading-relaxed text-justify">
                {user.overview}
            </p>
          </div>

          {/* Experience Timeline */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4">Experience</h4>
            <div className="space-y-6 relative border-l-2 border-gray-200 ml-2 pl-6">
                <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 bg-gray-300 rounded-full border-2 border-white"></div>
                    <h5 className="font-bold text-gray-800 text-sm">Senior Sales Executive</h5>
                    <p className="text-xs text-gray-500">ABC Solutions Ltd.</p>
                    <p className="text-xs text-gray-400 mt-1">Jan 2021 – Present</p>
                </div>
                <div className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 bg-gray-300 rounded-full border-2 border-white"></div>
                    <h5 className="font-bold text-gray-800 text-sm">Sales Executive</h5>
                    <p className="text-xs text-gray-500">XYZ Corporation</p>
                    <p className="text-xs text-gray-400 mt-1">Jun 2018 – Dec 2020</p>
                </div>
            </div>
          </div>

          {/* Additional Info */}
          <div>
             <h4 className="font-bold text-gray-800 mb-2">Preferred Job Categories</h4>
             <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>qwpodfuhwpefpie</li>
                <li>wifehgbbqehf</li>
                <li>iwudhp</li>
             </ul>
          </div>
          <div>
             <h4 className="font-bold text-gray-800 mb-2">Employment Type</h4>
             <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Part-time</li>
             </ul>
          </div>

        </div>

        {/* Right Column: Skills & Education */}
        <div className="lg:col-span-5 space-y-8">
            {/* Resume Button */}
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Upload CV / Resume:</span>
                <button 
                    onClick={() => setShowResume(true)}
                    className="px-6 py-2 border border-gray-200 rounded bg-white text-sm font-medium hover:bg-gray-50 transition shadow-sm"
                >
                    View Resume
                </button>
            </div>

            {/* Skills */}
            <div>
                <h4 className="font-bold text-gray-800 mb-3">Skills</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {user.skills.map((skill, idx) => (
                        <li key={idx}>{skill}</li>
                    ))}
                </ul>
            </div>

            {/* Education */}
            <div>
                <h4 className="font-bold text-gray-800 mb-3">Educations</h4>
                <div>
                    <h5 className="font-bold text-gray-800 text-sm">{user.education.degree}</h5>
                    <p className="text-xs text-gray-500">{user.education.uni}</p>
                    <p className="text-xs text-gray-400 mt-1">{user.education.year}</p>
                </div>
            </div>
        </div>
      </div>
      
      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
    </div>
  );
};

// --- MAIN TABLE COMPONENT ---
const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  // Toggle Block/Unlock
  const toggleBlockStatus = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, isBlocked: !user.isBlocked } : user
    ));
  };

  // If a user is selected, show Profile
  if (selectedUser) {
    return <UserProfile user={selectedUser} onBack={() => setSelectedUser(null)} />;
  }

  // Otherwise, show Table
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[700px] flex flex-col justify-between">
      
      {/* Header */}
      <div>
        <div className="p-6 border-b border-dashed border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">Job Seeker</h2>
          <div className="relative">
             <button className="px-4 py-1.5 border border-gray-200 rounded text-sm text-gray-600 flex items-center bg-white">
                Job seeker <span className="ml-2 text-[10px]">▼</span>
             </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white text-gray-500 text-xs border-b border-gray-200">
              <tr>
                <th className="py-4 px-6 font-medium">Name</th>
                <th className="py-4 px-6 font-medium">Email</th>
                <th className="py-4 px-6 font-medium">Registration Date</th>
                <th className="py-4 px-6 font-medium">Category</th>
                <th className="py-4 px-6 font-medium text-center">Verification Status</th>
                <th className="py-4 px-6 font-medium text-center">View Details</th>
                <th className="py-4 px-6 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700 divide-y divide-gray-50">
              {currentItems.map((user) => (
                <tr key={user.id} className="hover:bg-[#FAFAFA] transition">
                  <td className="py-4 px-6 font-medium">{user.name}</td>
                  <td className="py-4 px-6 text-gray-600">{user.email}</td>
                  <td className="py-4 px-6 text-gray-600">{user.date}</td>
                  <td className="py-4 px-6 text-gray-600">{user.category}</td>
                  <td className="py-4 px-6 text-center">
                    <span className="bg-[#E7F8EE] text-[#00B074] px-4 py-1 rounded-full text-xs font-semibold">
                      {user.verificationStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button 
                        onClick={() => setSelectedUser(user)}
                        className="bg-[#EAEAEA] text-[#4B5563] px-6 py-1.5 rounded-full text-xs font-bold hover:bg-gray-300 transition"
                    >
                        View
                    </button>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button 
                        onClick={() => toggleBlockStatus(user.id)}
                        className={`px-6 py-1.5 rounded-full text-xs font-bold transition min-w-[80px] ${
                            user.isBlocked 
                            ? "bg-[#EAEAEA] text-[#4B5563] hover:bg-gray-300" // Unlock Style
                            : "bg-[#FFEEEE] text-[#FF5B5B] hover:bg-red-200" // Block Style
                        }`}
                    >
                        {user.isBlocked ? "Unlock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-gray-100 flex items-center justify-center gap-8 bg-white">
        <button 
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-6 py-2 bg-[#E7F8EE] text-gray-600 text-sm font-medium rounded hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
            <span>←</span> Previous
        </button>

        <div className="flex gap-4 text-sm font-medium">
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
                    {number < 10 ? `0${number}` : number}
                </button>
            ))}
        </div>

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

export default UserManagement;