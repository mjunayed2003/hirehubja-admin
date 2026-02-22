import React, { useState } from "react";
import Picture from "../../assets/image/profile.png";

// Mock Data
const userData = {
  id: 1,
  name: "Sowrove Bepary",
  email: "sowrovebepary@gmail.com",
  phone: "+1 (876) 555-3421",
  dob: "08.08.2003",
  gender: "Male",
  location: "Lorem ipsum dolor sit amet,",
  preferredJob: "Lorem ipsum dolor sit amet,",
  employmentType: "Lorem ipsum dolor sit amet,",
  overview: "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,",
  image: Picture, // Profile Picture Placeholder
  
  // Education
  qualification: "Diploma",
  institution: "HEART Trust / NTA",
  eduStart: "2022",
  eduEnd: "2026",

  // Experience
  designation: "Customer Service Representative",
  company: "Digicel Jamaica",
  expStart: "2022",
  expEnd: "2026",
  level: "Mid Level Experiences",
  
  skills: ["Python", "C++", "Java"],

  // Resume File (Change this to a PDF URL to test PDF view)
  resumeUrl: "https://marketplace.canva.com/EAFRuCp3DcY/1/0/1131w/canva-black-white-minimalist-cv-resume-f5JNR-K5jjw.jpg", 
  resumeType: "image", // Options: 'image' or 'pdf'
};

const RegistrationDetails = ({ onBack }) => {
  const [showResumeModal, setShowResumeModal] = useState(false);

  // --- Resume Modal Component ---
  const ResumeModal = () => (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity">
      <div className="bg-white w-full max-w-5xl h-[90vh] rounded-xl flex flex-col shadow-2xl overflow-hidden animate-scale-in">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-white">
           <h3 className="text-xl font-bold text-gray-800">Resume</h3>
           <button onClick={() => setShowResumeModal(false)} className="text-gray-400 hover:text-red-500 text-3xl leading-none">&times;</button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto bg-gray-100 flex justify-center p-6">
            <div className="shadow-lg w-full max-w-4xl bg-white">
                {userData.resumeType === 'pdf' ? (
                    // PDF Viewer
                    <iframe 
                        src={userData.resumeUrl} 
                        className="w-full h-full min-h-[800px]" 
                        title="User Resume"
                    />
                ) : (
                    // Image Viewer
                    <img 
                        src={userData.resumeUrl} 
                        alt="Resume" 
                        className="w-full h-auto object-contain"
                    />
                )}
            </div>
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-4 border-t border-gray-200 flex justify-end gap-4 bg-white">
           <button 
             onClick={() => setShowResumeModal(false)} 
             className="px-8 py-2.5 bg-gray-200 text-gray-600 rounded-full font-semibold hover:bg-gray-300 transition"
           >
             Cancel
           </button>
           <button 
             onClick={() => setShowResumeModal(false)} 
             className="px-8 py-2.5 bg-[#43B948] text-white rounded-full font-semibold hover:bg-green-600 transition shadow-md"
           >
             Save & Continue
           </button>
        </div>
      </div>
    </div>
  );

  // --- Main Page Component ---
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 font-sans w-full max-w-[1400px] mx-auto my-8">
      
      {/* Top Header */}
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-dashed border-gray-200">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition text-gray-600">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
          </button>
          <h3 className="text-xl font-bold text-gray-800">New Registration Approval Requests</h3>
        </div>
        <span className="px-4 py-1.5 border border-gray-200 rounded text-sm text-gray-600 bg-white shadow-sm">Job seeker</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Column 1: Profile Information (approx 30%) */}
        <div className="lg:col-span-4 space-y-6 lg:border-r border-gray-200 lg:pr-8 border-dashed">
          <h4 className="font-bold text-gray-800 mb-4 text-sm">• Profile Information</h4>
          
          <div className="mb-6">
            <p className="text-xs text-gray-500 mb-2">Profile Picture</p>
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-50 shadow-sm">
                <img src={userData.image} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <InfoRow label="Full Name" value={userData.name} />
            <InfoRow label="Email" value={userData.email} />
            <InfoRow label="Phone Number" value={userData.phone} />
            <InfoRow label="Date Of Birth" value={userData.dob} />
            <InfoRow label="Gender" value={userData.gender} />
            <InfoRow label="Location" value={userData.location} />
            <InfoRow label="Preferred Job Categories" value={userData.preferredJob} />
            <InfoRow label="Employment Type" value={userData.employmentType} />
            
            <div className="pt-2">
                <span className="text-gray-400 block text-xs mb-1">Overview:</span>
                <p className="text-gray-700 leading-relaxed">{userData.overview}</p>
            </div>
          </div>
        </div>

        {/* Column 2: Educational & Professional (approx 35%) */}
        <div className="lg:col-span-4 space-y-8 lg:border-r border-gray-200 lg:pr-8 border-dashed">
          
          {/* Educational Details */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4 text-sm">• Educational Details</h4>
            <div className="space-y-3 text-sm">
              <InfoRow label="Qualification" value={userData.qualification} />
              <InfoRow label="Institution" value={userData.institution} />
              <InfoRow label="Started Year" value={userData.eduStart} />
              <InfoRow label="Completion Year" value={userData.eduEnd} />
            </div>
          </div>

          {/* Professional Details */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4 text-sm">• Professional Details (Mandatory)</h4>
            
            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 mb-6 shadow-sm">
               <span className="text-xs text-gray-500 font-medium">Upload CV / Resume:</span>
               <button 
                 onClick={() => setShowResumeModal(true)} 
                 className="px-5 py-1.5 bg-white border border-gray-200 rounded text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
               >
                 View Resume
               </button>
            </div>

            <div className="mb-2">
                <h5 className="text-sm text-gray-600 font-semibold mb-3">Experience</h5>
                <div className="space-y-3 text-sm">
                    <InfoRow label="Designation" value={userData.designation} />
                    <InfoRow label="Company Name" value={userData.company} />
                    <InfoRow label="Started Year" value={userData.expStart} />
                    <InfoRow label="Completion Year" value={userData.expEnd} />
                    <InfoRow label="Experience Level" value={userData.level} />
                </div>
            </div>

            <div className="mt-6">
                <p className="text-sm text-gray-800 font-medium mb-3">Skills</p>
                <div className="flex flex-wrap gap-3">
                   {userData.skills.map((skill, i) => (
                     <span key={i} className="bg-[#F3F4F6] text-gray-600 px-6 py-2 rounded-md text-xs font-medium">{skill}</span>
                   ))}
                </div>
            </div>
          </div>
        </div>

        {/* Column 3: Verification (approx 35%) */}
        <div className="lg:col-span-4 flex flex-col h-full">
          <h4 className="font-bold text-gray-800 mb-4 text-sm">• Verification</h4>
          
          <div className="space-y-5 flex-1">
            <VerificationItem label="Government Id card(Front) :" />
            <VerificationItem label="Government Id card(Back) :" btnText="View Back" />
            <VerificationItem label="Captured selfie :" btnText="View Selfie" />
          </div>

          <div className="flex justify-end gap-4 mt-12 pt-8">
             <button className="bg-[#E6F6EC] text-[#28C76F] px-8 py-2.5 rounded-full text-sm font-bold hover:bg-green-100 transition">
                Approve
             </button>
             <button className="bg-[#FFEEEE] text-[#FF5B5B] px-8 py-2.5 rounded-full text-sm font-bold hover:bg-red-100 transition">
                Decline
             </button>
          </div>
        </div>

      </div>

      {/* Render Modal if state is true */}
      {showResumeModal && <ResumeModal />}
    </div>
  );
};

// Helper Component for Text Rows
const InfoRow = ({ label, value }) => (
    <p className="text-gray-800">
        <span className="text-gray-400 block text-xs mb-0.5">{label}:</span> 
        {value}
    </p>
);

// Helper Component for Verification Items
const VerificationItem = ({ label, btnText = "View Front" }) => (
    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition">
       <span className="text-xs text-gray-500 font-medium">{label}</span>
       <button className="px-4 py-1.5 border border-gray-200 bg-white rounded text-xs font-medium text-gray-700 hover:bg-gray-50">
          {btnText}
       </button>
    </div>
);

export default RegistrationDetails;