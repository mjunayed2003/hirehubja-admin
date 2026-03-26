import React, { useState } from "react";
import { useGetUserByIdQuery, useApproveUserMutation, useRejectUserMutation } from "../../redux/features/users/UsersApi.js";
import defaultPic from "../../assets/images/profile.png";
import toast from "react-hot-toast";

// ─── Image/File Modal ─────────────────────────────────────────────────
const FileModal = ({ url, title, onClose }) => (
  <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    {/* max-h-[90vh] added to prevent the modal from exceeding the screen height */}
    <div className="bg-white w-full max-w-3xl rounded-xl flex flex-col shadow-2xl overflow-hidden max-h-[90vh]">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center shrink-0">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-red-500 text-3xl leading-none">&times;</button>
      </div>
      
      {/* overflow-y-auto added here for scrollability if the image is too tall */}
      <div className="flex-1 overflow-y-auto bg-gray-100 flex justify-center p-6">
        {url?.toLowerCase().endsWith(".pdf") ? (
          <iframe src={url} className="w-full min-h-[60vh]" title={title} />
        ) : (
          // max-h-[70vh] limits the image height to 70% of the viewport height
          <img src={url} alt={title} className="max-w-full h-auto max-h-[70vh] object-contain shadow-lg" />
        )}
      </div>
      
      <div className="px-6 py-4 border-t border-gray-200 flex justify-end shrink-0">
        <button onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-600 rounded-full font-semibold hover:bg-gray-300 transition">
          Close
        </button>
      </div>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────
const RegistrationDetails = ({ user: rowData, onBack, onActionDone }) => {
  const [modalData, setModalData] = useState(null);
  const baseUrl = import.meta.env.VITE_SERVER_URL?.replace(/\/$/, "");

  const userId = rowData?.userId || rowData?.id;
  const { data, isLoading } = useGetUserByIdQuery(userId, { skip: !userId });
  const [approveUser, { isLoading: isApproving }] = useApproveUserMutation();
  const [rejectUser,  { isLoading: isRejecting  }] = useRejectUserMutation();

  const user    = data?.data || {};
  const profile = user?.jobSeekerProfile || user?.employerProfile || {};

  const isJobSeeker = user?.role === "JOB_SEEKER";
  const isEmployer  = user?.role === "EMPLOYER";
  const isCompany   = user?.role === "COMPANY";

  const imgUrl = (path) =>
    path && !path.includes("undefined") ? `${baseUrl}${path}` : null;

  const profilePic = imgUrl(profile?.profilePic) || defaultPic;

  const handleApprove = async () => {
    try {
      await approveUser(userId).unwrap();
      toast.success("User approved!");
      onBack();
      onActionDone?.();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to approve");
    }
  };

  const handleDecline = async () => {
    try {
      await rejectUser(userId).unwrap();
      toast.success("User rejected!");
      onBack();
      onActionDone?.();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to reject");
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 min-h-[400px] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 font-sans w-full max-w-[1400px] mx-auto my-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-dashed border-gray-200">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition text-gray-600">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
          </button>
          <h3 className="text-xl font-bold text-gray-800">New Registration Approval Requests</h3>
        </div>
        <span className="px-4 py-1.5 border border-gray-200 rounded text-sm text-gray-600 bg-white shadow-sm capitalize">
          {user?.role?.replace("_", " ") || "User"}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* ── Column 1: Profile Info ── */}
        <div className="lg:col-span-4 space-y-5 lg:border-r border-dashed border-gray-200 lg:pr-8">
          <h4 className="font-bold text-gray-800 text-sm">• Profile Information</h4>

          <div>
            <p className="text-xs text-gray-500 mb-2">Profile Picture</p>
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-50 shadow-sm">
              <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <InfoRow label="Full Name" value={profile?.fullName} />
            <InfoRow label="Email"     value={user?.email} />
            <InfoRow label="Phone"     value={profile?.phone} />
            <InfoRow label="Location"  value={profile?.location} />

            {/* Job Seeker specific */}
            {isJobSeeker && (
              <>
                <InfoRow label="Date of Birth"   value={profile?.dob ? new Date(profile.dob).toLocaleDateString() : null} />
                <InfoRow label="Gender"          value={profile?.gender} />
                <InfoRow label="Experience Level" value={profile?.experienceLevel} />
                <InfoRow label="Preferred Categories" value={profile?.preferredJobCategories?.map(c => c.name).join(", ")} />
              </>
            )}

            {/* Employer specific */}
            {isEmployer && (
              <>
                <InfoRow label="Company Name" value={profile?.companyName} />
                <InfoRow label="Website"      value={profile?.website} />
              </>
            )}

            {/* Company specific */}
            {isCompany && (
              <>
                <InfoRow label="Company Name"         value={profile?.companyName} />
                <InfoRow label="Website"              value={profile?.website} />
                <InfoRow label="Business Reg Cert ID" value={profile?.businessRegCertId} />
                <InfoRow label="Tax ID"               value={profile?.taxId} />
                <InfoRow label="Authorized Rep ID"    value={profile?.authorizedRepId} />
              </>
            )}

            {/* About text for all roles if it exists */}
            {profile?.about && (
              <div className="pt-1">
                <span className="text-gray-400 block text-xs mb-1">About:</span>
                <p className="text-gray-700 leading-relaxed">{profile.about}</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Column 2: Professional / Education / Experience / About ── */}
        <div className="lg:col-span-4 space-y-6 lg:border-r border-dashed border-gray-200 lg:pr-8">

          {/* Job Seeker */}
          {isJobSeeker && (
            <>
              {profile?.education?.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-800 mb-3 text-sm">• Educational Details</h4>
                  {profile.education.map((edu, i) => (
                    <div key={i} className="space-y-2 text-sm mb-4 pb-4 border-b border-gray-100 last:border-0">
                      <InfoRow label="Qualification"   value={edu.degreeName} />
                      <InfoRow label="Institution"     value={edu.institution} />
                      <InfoRow label="Started Year"    value={edu.startDate    ? new Date(edu.startDate).getFullYear()    : null} />
                      <InfoRow label="Completion Year" value={edu.completionYear ? new Date(edu.completionYear).getFullYear() : null} />
                    </div>
                  ))}
                </div>
              )}

              <div>
                <h4 className="font-bold text-gray-800 mb-3 text-sm">• Professional Details</h4>

                {profile?.resumeUrl && (
                  <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 mb-4 shadow-sm">
                    <span className="text-xs text-gray-500 font-medium">CV / Resume:</span>
                    <button
                      onClick={() => setModalData({ url: imgUrl(profile.resumeUrl), title: "Resume" })}
                      className="px-5 py-1.5 bg-white border border-gray-200 rounded text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
                    >
                      View Resume
                    </button>
                  </div>
                )}

                {profile?.experience?.length > 0 && (
                  <>
                    <p className="text-sm text-gray-700 font-semibold mb-2">Experience</p>
                    {profile.experience.map((exp, i) => (
                      <div key={i} className="space-y-2 text-sm mb-4 pb-4 border-b border-gray-100 last:border-0">
                        <InfoRow label="Designation"    value={exp.designation} />
                        <InfoRow label="Company"        value={exp.companyName} />
                        <InfoRow label="Started"        value={exp.startDate ? new Date(exp.startDate).getFullYear() : null} />
                        <InfoRow label="Ended"          value={exp.isCurrent ? "Present" : exp.endDate ? new Date(exp.endDate).getFullYear() : null} />
                      </div>
                    ))}
                  </>
                )}

                {profile?.skills?.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-700 font-semibold mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, i) => (
                        <span key={i} className="bg-[#F3F4F6] text-gray-600 px-4 py-1.5 rounded-md text-xs font-medium">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Employer / Company (If you want to show anything else in column 2, like expanded About or other details. Kept simple based on your design) */}
          {(isEmployer || isCompany) && (
             <div>
                <h4 className="font-bold text-gray-800 mb-3 text-sm">• Additional Details</h4>
                <p className="text-sm text-gray-500">
                  {isCompany ? "Company information is listed in the profile section." : "Employer information is listed in the profile section."}
                </p>
             </div>
          )}
        </div>

        {/* ── Column 3: Verification ── */}
        <div className="lg:col-span-4 flex flex-col">
          <h4 className="font-bold text-gray-800 mb-4 text-sm">• Verification</h4>

          <div className="space-y-4 flex-1">

            {/* Job Seeker verification docs */}
            {isJobSeeker && (
              <>
                <VerificationItem label="Government ID (Front):" btnText="View Front"  url={imgUrl(profile?.idCardFront)} onView={(url) => setModalData({ url, title: "ID Card Front" })} />
                <VerificationItem label="Government ID (Back):"  btnText="View Back"   url={imgUrl(profile?.idCardBack)}  onView={(url) => setModalData({ url, title: "ID Card Back" })} />
                <VerificationItem label="Captured Selfie:"       btnText="View Selfie" url={imgUrl(profile?.selfieImage)} onView={(url) => setModalData({ url, title: "Selfie" })} />
              </>
            )}

            {/* Employer verification docs */}
            {isEmployer && (
              <>
                <VerificationItem label="Government ID (Front):" btnText="View Front"  url={imgUrl(profile?.idCardFront)} onView={(url) => setModalData({ url, title: "ID Card Front" })} />
                <VerificationItem label="Government ID (Back):"  btnText="View Back"   url={imgUrl(profile?.idCardBack)}  onView={(url) => setModalData({ url, title: "ID Card Back" })} />
                <VerificationItem label="Selfie Image:"          btnText="View Selfie" url={imgUrl(profile?.selfieImage)} onView={(url) => setModalData({ url, title: "Selfie" })} />
              </>
            )}

            {/* Company verification docs */}
            {isCompany && (
              <>
                <VerificationItem label="License File:" btnText="View License" url={imgUrl(profile?.licenseFile)} onView={(url) => setModalData({ url, title: "License File" })} />
              </>
            )}
          </div>

          {/* Approve / Decline buttons */}
          {user?.status === "PENDING" && (
            <div className="flex justify-end gap-4 mt-10 pt-6 border-t border-dashed border-gray-200">
              <button onClick={handleApprove} disabled={isApproving}
                className="bg-[#E6F6EC] text-[#28C76F] px-8 py-2.5 rounded-full text-sm font-bold hover:bg-green-100 transition disabled:opacity-60">
                {isApproving ? "Approving..." : "Approve"}
              </button>
              <button onClick={handleDecline} disabled={isRejecting}
                className="bg-[#FFEEEE] text-[#FF5B5B] px-8 py-2.5 rounded-full text-sm font-bold hover:bg-red-100 transition disabled:opacity-60">
                {isRejecting ? "Declining..." : "Decline"}
              </button>
            </div>
          )}

          {user?.status && user.status !== "PENDING" && (
            <div className="flex justify-end mt-10 pt-6 border-t border-dashed border-gray-200">
              <span className={`px-6 py-2 rounded-full text-sm font-bold ${
                user.status === "ACTIVE" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"
              }`}>
                {user.status}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* File/Image Modal */}
      {modalData && (
        <FileModal url={modalData.url} title={modalData.title} onClose={() => setModalData(null)} />
      )}
    </div>
  );
};

// ─── Helper Components ────────────────────────────────────────────
const InfoRow = ({ label, value }) => (
  <p className="text-gray-800">
    <span className="text-gray-400 block text-xs mb-0.5">{label}:</span>
    {value || <span className="text-gray-300 italic text-xs">Not provided</span>}
  </p>
);

const VerificationItem = ({ label, btnText, url, onView }) => (
  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition">
    <span className="text-xs text-gray-500 font-medium">{label}</span>
    {url ? (
      <button onClick={() => onView(url)}
        className="px-4 py-1.5 border border-gray-200 bg-white rounded text-xs font-medium text-gray-700 hover:bg-gray-50 transition">
        {btnText}
      </button>
    ) : (
      <span className="text-xs text-gray-300 italic">Not uploaded</span>
    )}
  </div>
);

export default RegistrationDetails;