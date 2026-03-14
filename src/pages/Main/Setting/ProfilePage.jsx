import React, { useState, useRef, useEffect } from "react";
import { FaCamera, FaArrowLeft, FaEye, FaEyeSlash, FaLock, FaRegEnvelope } from "react-icons/fa";
import { MdEdit, MdCheck } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentUser, selectCurrentToken, setLogin,
  useGetProfileQuery, useUpdateProfileMutation,
  useChangePasswordMutation, useForgotPasswordMutation,
  useResetPasswordMutation,
} from "../../../redux/features/Auth/authSlice";
import toast from "react-hot-toast";
import profile from "../../../assets/images/profile.png";

const UserProfileSettings = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  const [isEditing, setIsEditing] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [profileImage, setProfileImage] = useState(profile);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", location: "",
  });

  // ─── API Hooks ───────────────────────────────────────────────
  const { data: profileData, isLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: isChangingPass }] = useChangePasswordMutation();
  const [forgotPassword, { isLoading: isSendingOtp }] = useForgotPasswordMutation();
  const [resetPassword, { isLoading: isResetting }] = useResetPasswordMutation();

  // ─── Profile data populate ───────────────────────────────────
  useEffect(() => {
    const data = profileData?.data || user;
    if (data) {
      setFormData({
        fullName: data.fullName || "",
        email: data.email || "",
        phone: data.phone || "",
        location: data.location || "",
      });
      if (data.profilePic && !data.profilePic.includes("undefined")) {
        const base = import.meta.env.VITE_SERVER_URL.replace(/\/$/, "");
        setProfileImage(`${base}${data.profilePic}`);
      }
    }
  }, [profileData, user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = async () => {
    try {
      const fd = new FormData();
      fd.append("fullName", formData.fullName);
      fd.append("phone", formData.phone);
      fd.append("location", formData.location);
      if (imageFile) fd.append("profilePic", imageFile);

      const res = await updateProfile(fd).unwrap();
      const updatedUser = res?.data
        ? { ...user, ...res.data }
        : { ...user, fullName: formData.fullName };
      dispatch(setLogin({ user: updatedUser, token }));
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      setImageFile(null);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  const closeModal = () => setActiveModal(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mt-4">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Profile</h2>
          <div className="border-b border-dashed border-gray-300 mb-10"></div>

          <div className="flex flex-col md:flex-row gap-10">
            {/* LEFT */}
            <div className="w-full md:w-[350px] bg-[#F9FAFB] rounded-2xl p-8 flex flex-col items-center h-fit">
              <div className="relative mb-4 group">
                <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-sm" />
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                {isEditing && (
                  <button onClick={() => fileInputRef.current.click()} className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow text-gray-500 hover:text-green-600 hover:scale-110 transition cursor-pointer">
                    <FaCamera size={14} />
                  </button>
                )}
              </div>
              <h3 className="text-lg font-bold text-gray-900">{formData.fullName || "Admin"}</h3>
              <p className="text-gray-400 text-sm mb-6">Administrator</p>
              <div className="flex gap-3 w-full">
                <button onClick={() => setActiveModal('changePass')} className="flex-1 bg-[#43B948] hover:bg-green-600 text-white py-2.5 rounded-lg text-xs font-bold transition">
                  Change password
                </button>
                <button
                  onClick={() => { setIsEditing(!isEditing); setImageFile(null); }}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition flex justify-center items-center gap-2 ${isEditing ? "bg-red-50 text-red-500 border border-red-200" : "bg-[#EAEAEA] hover:bg-gray-300 text-gray-600"}`}
                >
                  {isEditing ? <>Cancel</> : <><MdEdit size={14} /> Edit Profile</>}
                </button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex-1 space-y-6">
              <ProfileInput label="Full Name" name="fullName" value={formData.fullName} isEditing={isEditing} onChange={handleInputChange} />
              <ProfileInput label="Email Address" name="email" value={formData.email} isEditing={false} onChange={handleInputChange} />
              <ProfileInput label="Phone Number" name="phone" value={formData.phone} placeholder="Enter your phone number" isEditing={isEditing} onChange={handleInputChange} />
              <ProfileInput label="Location" name="location" value={formData.location} placeholder="Enter your location" isEditing={isEditing} onChange={handleInputChange} />
              <div className="pt-2">
                {isEditing ? (
                  <button onClick={handleSaveChanges} disabled={isUpdating} className="flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold text-white bg-[#43B948] hover:bg-green-600 transition shadow-lg disabled:opacity-60">
                    {isUpdating ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <MdCheck size={18} />}
                    Save Changes
                  </button>
                ) : (
                  <button className="opacity-0 cursor-default px-8 py-3">Placeholder</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-[500px] rounded-2xl shadow-2xl p-8 relative">

            {/* 1. CHANGE PASSWORD */}
            {activeModal === 'changePass' && (
              <ChangePasswordModal
                onBack={closeModal}
                onForgot={() => setActiveModal('forgot')}
                changePassword={changePassword}
                isLoading={isChangingPass}
                onClose={closeModal}
              />
            )}

            {/* 2. FORGOT PASSWORD */}
            {activeModal === 'forgot' && (
              <ForgotPasswordModal
                onBack={() => setActiveModal('changePass')}
                forgotPassword={forgotPassword}
                isLoading={isSendingOtp}
                onNext={(email) => {
                  setActiveModal({ name: 'otp', email });
                }}
              />
            )}

            {/* 3. VERIFY OTP */}
            {activeModal?.name === 'otp' && (
              <OtpModal
                onBack={() => setActiveModal('forgot')}
                email={activeModal.email}
                onNext={(otp) => setActiveModal({ name: 'reset', email: activeModal.email, otp })}
              />
            )}

            {/* 4. RESET PASSWORD */}
            {activeModal?.name === 'reset' && (
              <ResetPasswordModal
                onBack={() => setActiveModal({ name: 'otp', email: activeModal.email })}
                resetPassword={resetPassword}
                isLoading={isResetting}
                email={activeModal.email}
                otp={activeModal.otp}
                onClose={closeModal}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Change Password Modal ───────────────────────────────────────
const ChangePasswordModal = ({ onBack, onForgot, changePassword, isLoading, onClose }) => {
  const [passData, setPassData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const handleChange = (e) => setPassData({ ...passData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (passData.newPassword !== passData.confirmPassword) return toast.error("Passwords do not match!");
    try {
      await changePassword(passData).unwrap();
      toast.success("Password changed successfully!");
      onClose();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to change password");
    }
  };

  return (
    <>
      <ModalHeader title="Change Password" onBack={onBack} />
      <p className="text-gray-500 text-sm mb-6">Your password must be 8+ characters long.</p>
      <div className="space-y-4">
        <PasswordInput label="Current password" placeholder="Enter current password" name="currentPassword" value={passData.currentPassword} onChange={handleChange} />
        <PasswordInput label="New password" placeholder="Set new password" name="newPassword" value={passData.newPassword} onChange={handleChange} />
        <PasswordInput label="Re-enter new password" placeholder="Re-enter new password" name="confirmPassword" value={passData.confirmPassword} onChange={handleChange} />
      </div>
      <div className="mt-4 mb-6 text-right">
        <button onClick={onForgot} className="text-[#43B948] text-sm hover:underline font-medium">Forget password?</button>
      </div>
      <ActionButton text={isLoading ? "Updating..." : "Update password"} onClick={handleSubmit} disabled={isLoading} />
    </>
  );
};

// ─── Forgot Password Modal ───────────────────────────────────────
const ForgotPasswordModal = ({ onBack, forgotPassword, isLoading, onNext }) => {
  const [email, setEmail] = useState("");

  const handleSend = async () => {
    if (!email) return toast.error("Please enter your email");
    try {
      await forgotPassword({ email }).unwrap();
      toast.success("OTP sent to your email!");
      onNext(email);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <>
      <ModalHeader title="Forgot Password" onBack={onBack} />
      <p className="text-gray-500 text-sm mb-8">Please enter your email address to reset your password</p>
      <div className="relative mb-8">
        <FaRegEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-[#F9FAFB] rounded-lg text-sm outline-none border border-transparent focus:border-[#43B948] transition"
        />
      </div>
      <ActionButton text={isLoading ? "Sending..." : "Send OTP"} onClick={handleSend} disabled={isLoading} />
    </>
  );
};

// ─── OTP Modal ───────────────────────────────────────────────────
const OtpModal = ({ onBack, email, onNext }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join("");
    if (otpString.length < 6) return toast.error("Please enter complete OTP");
    onNext(otpString);
  };

  return (
    <>
      <ModalHeader title="Verify Email" onBack={onBack} />
      <p className="text-gray-500 text-sm mb-2">OTP sent to <span className="font-semibold text-gray-700">{email}</span></p>
      <p className="text-gray-500 text-sm mb-8">Please enter the 6 digit OTP.</p>
      <div className="flex justify-between gap-3 mb-8">
        {otp.map((digit, i) => (
          <input
            key={i}
            id={`otp-${i}`}
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, i)}
            className="w-12 h-12 bg-[#F9FAFB] rounded-lg text-center text-lg font-bold text-gray-700 outline-none border border-transparent focus:border-[#43B948] transition"
          />
        ))}
      </div>
      <ActionButton text="Verify" onClick={handleVerify} />
    </>
  );
};

// ─── Reset Password Modal ────────────────────────────────────────
const ResetPasswordModal = ({ onBack, resetPassword, isLoading, email, otp, onClose }) => {
  const [passData, setPassData] = useState({ newPassword: "", confirmPassword: "" });

  const handleSubmit = async () => {
    if (!passData.newPassword) return toast.error("Please enter new password");
    if (passData.newPassword !== passData.confirmPassword) return toast.error("Passwords do not match!");
    try {
      await resetPassword({ email, otp, newPassword: passData.newPassword }).unwrap();
      toast.success("Password reset successfully!");
      onClose();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to reset password");
    }
  };

  return (
    <>
      <ModalHeader title="Reset Password" onBack={onBack} />
      <p className="text-gray-500 text-sm mb-6">Your password must be 8+ characters long.</p>
      <div className="space-y-6 mb-8">
        <PasswordInput placeholder="Set your password" label="New password" name="newPassword" value={passData.newPassword} onChange={(e) => setPassData({ ...passData, [e.target.name]: e.target.value })} />
        <PasswordInput placeholder="Re-enter password" label="Re-enter password" name="confirmPassword" value={passData.confirmPassword} onChange={(e) => setPassData({ ...passData, [e.target.name]: e.target.value })} />
      </div>
      <ActionButton text={isLoading ? "Resetting..." : "Reset Password"} onClick={handleSubmit} disabled={isLoading} />
    </>
  );
};

// ─── Helper Components ───────────────────────────────────────────
const ProfileInput = ({ label, name, value, isEditing, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-bold text-gray-800 mb-2">{label}</label>
    <input
      type="text" name={name} value={value} onChange={onChange} readOnly={!isEditing} placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-xl border text-sm transition outline-none ${isEditing ? "bg-white border-green-500 text-gray-800 focus:ring-4 focus:ring-green-500/10 shadow-sm" : "bg-white border-gray-200 text-gray-500 cursor-default"}`}
    />
  </div>
);

const PasswordInput = ({ placeholder, label, name, value, onChange }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      {label && <label className="block text-gray-800 text-sm font-medium mb-2">{label}</label>}
      <div className="relative">
        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type={show ? "text" : "password"} placeholder={placeholder} name={name} value={value} onChange={onChange}
          className="w-full pl-10 pr-10 py-3.5 bg-[#F9FAFB] rounded-lg text-sm outline-none border border-transparent focus:border-[#43B948] transition" />
        <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
          {show ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );
};

const ModalHeader = ({ title, onBack }) => (
  <div className="flex items-center gap-4 mb-4">
    <button onClick={onBack} className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100 transition">
      <FaArrowLeft size={18} />
    </button>
    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
  </div>
);

const ActionButton = ({ text, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled}
    className="w-full bg-[#43B948] hover:bg-green-600 text-white py-3.5 rounded-lg font-bold text-sm transition shadow-md active:scale-[0.99] disabled:opacity-60">
    {text}
  </button>
);

export default UserProfileSettings;