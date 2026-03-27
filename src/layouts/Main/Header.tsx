import { useNavigate } from "react-router-dom";
import { Avatar, Badge } from "antd";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiSettings4Line } from "react-icons/ri";
import profileImage from "../../assets/images/profile.png";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/features/Auth/AuthSlice";


const Header = () => {
  const navigate = useNavigate();

  const user = useSelector(selectCurrentUser);


  const baseUrl = import.meta.env.VITE_SERVER_URL || "";

  const avatarSrc =
    user?.profilePic && !user.profilePic.includes("undefined")
      ? `${baseUrl.replace(/\/$/, "")}${user.profilePic}`
      : profileImage;

  return (
    <div className="w-full h-[80px] bg-white border border-gray-200 rounded-xl px-10 flex justify-between items-center shadow-sm">
      <div>
        <h1 className="text-[28px] font-bold text-[#111] leading-none">Dashboard</h1>
        <p className="text-[#9E9E9E] text-[14px] mt-1">
          Hi, {user?.fullName || user?.name || "Admin"}. Welcome back!
        </p>
      </div>

      <div className="flex items-center gap-x-5">
        <div className="cursor-pointer bg-[#E9F3FF] w-[48px] h-[48px] flex items-center justify-center rounded-xl relative hover:opacity-80 transition-all">
          <IoNotificationsOutline size={26} className="text-[#007AFF]" />
        </div>

        <div
          title="Logout"
          className="cursor-pointer bg-[#FFF0F0] w-[48px] h-[48px] flex items-center justify-center rounded-xl hover:opacity-80 transition-all"
        >
          <RiSettings4Line size={26} className="text-[#FF4D4F]" />
        </div>

        <div className="h-10 w-[1px] bg-gray-200 mx-2"></div>

        <div
          onClick={() => navigate("/settings/profile")}
          className="flex items-center gap-4 cursor-pointer"
        >
          <div className="text-right hidden lg:block">
            <p className="text-[14px] font-semibold text-[#111]">
              {user?.fullName || user?.name || "Admin"}
            </p>
            <p className="text-[12px] text-gray-400">{user?.email || ""}</p>
          </div>
          <Avatar
            size={52}
            src={avatarSrc}
            className="border border-gray-100 shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
