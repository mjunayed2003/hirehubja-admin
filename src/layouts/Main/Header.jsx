import { useNavigate } from "react-router-dom";
import { Avatar, Badge } from "antd";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiSettings4Line } from "react-icons/ri";
import profileImage from "../../assets/images/admin.png";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="w-full h-[80px] bg-white border border-gray-200 rounded-xl px-10 flex justify-between items-center shadow-sm">
      {/* Title Area */}
      <div>
        <h1 className="text-[28px] font-bold text-[#111] leading-none">Dashboard</h1>
        <p className="text-[#9E9E9E] text-[14px] mt-1">
          Hi, {user?.name || "Samantha"}. Welcome back !
        </p>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-x-5">
        {/* Notification Box (Blue) - Width/Height matched to image */}
        <div className="cursor-pointer bg-[#E9F3FF] w-[48px] h-[48px] flex items-center justify-center rounded-xl relative hover:opacity-80 transition-all">
          <Badge count={21} size="small" offset={[-2, 2]} color="#007AFF">
            <IoNotificationsOutline size={26} className="text-[#007AFF]" />
          </Badge>
        </div>

        {/* Settings Box (Red) */}
        <div className="cursor-pointer bg-[#FFF0F0] w-[48px] h-[48px] flex items-center justify-center rounded-xl hover:opacity-80 transition-all">
          <Badge count={18} size="small" offset={[-2, 2]} color="#FF4D4F">
            <RiSettings4Line size={26} className="text-[#FF4D4F]" />
          </Badge>
        </div>

        {/* Divider */}
        <div className="h-10 w-[1px] bg-gray-200 mx-2"></div>

        {/* User Profile Info */}
        <div 
          onClick={() => navigate("/settings/profile")}
          className="flex items-center gap-4 cursor-pointer"
        >
          <div className="text-right hidden lg:block">
            <p className="text-[14px] font-semibold text-[#111]">Hello, {user?.name || "Samantha"}</p>
          </div>
          <Avatar 
            size={52} 
            src={user?.profileImage ? `${import.meta.env.VITE_IMAGE_URL}/` + user.profileImage : profileImage} 
            className="border border-gray-100 shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;