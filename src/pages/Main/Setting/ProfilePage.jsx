import React, { useState, useRef } from "react";
// React Icons
import { FaBell, FaCog, FaCamera, FaArrowLeft, FaEye, FaEyeSlash, FaLock, FaRegEnvelope } from "react-icons/fa";
import { MdEdit, MdCheck } from "react-icons/md";
import profile from "../../../assets/image/profile.png";

const UserProfileSettings = () => {
  // --- STATES ---
  const [isEditing, setIsEditing] = useState(false); // Toggle Edit Mode
  const [activeModal, setActiveModal] = useState(null); // Modal State

  // Image Upload State
  const [profileImage, setProfileImage] = useState(profile);
  const fileInputRef = useRef(null);

  // Form Data State
  const [formData, setFormData] = useState({
    fullName: "Samantha",
    email: "esteban_schiller@gmail.com",
    phone: "+1 234 567 890",
    location: "New York, USA"
  });

  // --- HANDLERS ---

  // 1. Handle Text Input Change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Handle Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // 3. Handle Save Changes
  const handleSaveChanges = () => {
    // Here you would typically send data to backend API
    console.log("Saving Data:", formData);
    setIsEditing(false); // Close edit mode after saving
    alert("Profile updated successfully!");
  };

  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 p-8">
      
      <div className="max-w-6xl mx-auto">

        {/* --- PROFILE CONTENT --- */}
        <div className="mt-4">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Profile</h2>
            
            {/* Dashed Separator */}
            <div className="border-b border-dashed border-gray-300 mb-10"></div>

            <div className="flex flex-col md:flex-row gap-10">
                
                {/* --- LEFT SIDE: IMAGE & BUTTONS --- */}
                <div className="w-full md:w-[350px] bg-[#F9FAFB] rounded-2xl p-8 flex flex-col items-center h-fit">
                    
                    {/* Image Container */}
                    <div className="relative mb-4 group">
                        <img 
                            src={profileImage} 
                            alt="Profile" 
                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-sm"
                        />
                        
                        {/* Hidden File Input */}
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleImageUpload} 
                            className="hidden" 
                            accept="image/*"
                        />

                        {/* Camera Button (Triggers File Input) */}
                        {isEditing && (
                             <button 
                                onClick={() => fileInputRef.current.click()}
                                className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow text-gray-500 hover:text-green-600 hover:scale-110 transition cursor-pointer"
                                title="Upload Photo"
                             >
                                <FaCamera size={14} />
                             </button>
                        )}
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900">{formData.fullName}</h3>
                    <p className="text-gray-400 text-sm mb-6">Administrator</p>

                    {/* Action Buttons */}
                    <div className="flex gap-3 w-full">
                        <button 
                            onClick={() => setActiveModal('changePass')}
                            className="flex-1 bg-[#43B948] hover:bg-green-600 text-white py-2.5 rounded-lg text-xs font-bold transition"
                        >
                            Change password
                        </button>
                        <button 
                            onClick={() => setIsEditing(!isEditing)}
                            className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition flex justify-center items-center gap-2 ${
                                isEditing 
                                ? "bg-red-50 text-red-500 border border-red-200" 
                                : "bg-[#EAEAEA] hover:bg-gray-300 text-gray-600"
                            }`}
                        >
                            {isEditing ? (
                                <>Cancel</>
                            ) : (
                                <><MdEdit size={14} /> Edit Profile</>
                            )}
                        </button>
                    </div>
                </div>

                {/* --- RIGHT SIDE: FORM FIELDS --- */}
                <div className="flex-1 space-y-6">
                    <ProfileInput 
                        label="Full Name" 
                        name="fullName" 
                        value={formData.fullName} 
                        isEditing={isEditing} 
                        onChange={handleInputChange}
                    />
                    <ProfileInput 
                        label="Email Address" 
                        name="email" 
                        value={formData.email} 
                        isEditing={isEditing} 
                        onChange={handleInputChange}
                    />
                    <ProfileInput 
                        label="Phone Number" 
                        name="phone" 
                        value={formData.phone} 
                        placeholder="Enter your phone number"
                        isEditing={isEditing} 
                        onChange={handleInputChange}
                    />
                    <ProfileInput 
                        label="Location" 
                        name="location" 
                        value={formData.location} 
                        placeholder="Enter your location"
                        isEditing={isEditing} 
                        onChange={handleInputChange}
                    />

                    {/* Save Button */}
                    <div className="pt-2">
                        {isEditing ? (
                            <button 
                                onClick={handleSaveChanges}
                                className="flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold text-white bg-[#43B948] hover:bg-green-600 transition shadow-lg shadow-green-100"
                            >
                                <MdCheck size={18} /> Save Changes
                            </button>
                        ) : (
                            // Disabled State (Hidden or transparent)
                            <button className="flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold text-white bg-[#43B948] opacity-0 cursor-default">
                                Placeholder
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* --- MODAL SYSTEM --- */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-[500px] rounded-2xl shadow-2xl p-8 relative">
                
                {/* 1. CHANGE PASSWORD */}
                {activeModal === 'changePass' && (
                    <>
                        <ModalHeader title="Change Password" onBack={closeModal} />
                        <p className="text-gray-500 text-sm mb-6">Your password must be 8-10 character long.</p>
                        <div className="space-y-4">
                            <PasswordInput label="Enter old password" placeholder="Enter old password" />
                            <PasswordInput label="Set new password" placeholder="Set new password" />
                            <PasswordInput label="Re-enter new password" placeholder="Re-enter new password" />
                        </div>
                        <div className="mt-4 mb-6 text-right">
                            <button onClick={() => setActiveModal('forgot')} className="text-[#43B948] text-sm hover:underline font-medium">Forget password?</button>
                        </div>
                        <ActionButton text="Update password" onClick={closeModal} />
                    </>
                )}

                {/* 2. FORGOT PASSWORD */}
                {activeModal === 'forgot' && (
                    <>
                        <ModalHeader title="Forgot Password" onBack={() => setActiveModal('changePass')} />
                        <p className="text-gray-500 text-sm mb-8">Please enter your email address to reset your password</p>
                        <div className="relative mb-8">
                            <FaRegEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
                            <input type="email" placeholder="Enter your Email" className="w-full pl-12 pr-4 py-3.5 bg-[#F9FAFB] rounded-lg text-sm outline-none border border-transparent focus:border-[#43B948] transition" />
                        </div>
                        <ActionButton text="Send OTP" onClick={() => setActiveModal('otp')} />
                    </>
                )}

                {/* 3. VERIFY OTP */}
                {activeModal === 'otp' && (
                    <>
                        <ModalHeader title="Verify Email" onBack={() => setActiveModal('forgot')} />
                        <p className="text-gray-500 text-sm mb-8">Please enter the OTP we have sent you in your email.</p>
                        <div className="flex justify-between gap-3 mb-8">
                            {['2', '5', '7', '3', '-', '-'].map((digit, i) => (
                                <div key={i} className="w-12 h-12 bg-[#F9FAFB] rounded-lg flex items-center justify-center text-lg font-bold text-gray-700">{digit}</div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center text-sm mb-8">
                            <span className="text-[#43B948]">Didn't receive the code?</span>
                            <button className="text-[#43B948] font-bold hover:underline">Resend</button>
                        </div>
                        <ActionButton text="Verify" onClick={() => setActiveModal('reset')} />
                    </>
                )}

                {/* 4. RESET PASSWORD */}
                {activeModal === 'reset' && (
                    <>
                        <ModalHeader title="Reset Password" onBack={() => setActiveModal('otp')} />
                        <p className="text-gray-500 text-sm mb-6">Your password must be 8-10 character long.</p>
                        <div className="space-y-6 mb-8">
                            <PasswordInput placeholder="Set your password" label="Set your password" />
                            <PasswordInput placeholder="Re-enter password" label="Re-enter password" />
                        </div>
                        <ActionButton text="Reset Password" onClick={closeModal} />
                    </>
                )}
            </div>
        </div>
      )}
    </div>
  );
};

// --- HELPER COMPONENTS ---

const ProfileInput = ({ label, name, value, isEditing, onChange, placeholder }) => (
    <div>
        <label className="block text-sm font-bold text-gray-800 mb-2">{label}</label>
        <input 
            type="text" 
            name={name}
            value={value}
            onChange={onChange}
            readOnly={!isEditing}
            placeholder={placeholder}
            className={`w-full px-4 py-3 rounded-xl border text-sm transition outline-none ${
                isEditing 
                ? "bg-white border-green-500 text-gray-800 focus:ring-4 focus:ring-green-500/10 shadow-sm" 
                : "bg-white border-gray-200 text-gray-500 cursor-default"
            }`}
        />
    </div>
);

const PasswordInput = ({ placeholder, label }) => {
    const [show, setShow] = useState(false);
    return (
        <div>
            {label && <label className="block text-gray-800 text-sm font-medium mb-2">{label}</label>}
            <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                    type={show ? "text" : "password"} 
                    placeholder={placeholder}
                    className="w-full pl-10 pr-10 py-3.5 bg-[#F9FAFB] rounded-lg text-sm outline-none border border-transparent focus:border-[#43B948] transition"
                />
                <button onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {show ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>
        </div>
    );
};

const ModalHeader = ({ title, onBack }) => (
    <div className="flex items-center gap-4 mb-4">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100 transition"><FaArrowLeft size={18} /></button>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
);

const ActionButton = ({ text, onClick }) => (
    <button onClick={onClick} className="w-full bg-[#43B948] hover:bg-green-600 text-white py-3.5 rounded-lg font-bold text-sm transition shadow-md active:scale-[0.99]">
        {text}
    </button>
);

export default UserProfileSettings;