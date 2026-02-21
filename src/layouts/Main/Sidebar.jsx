import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { routeLinkGenerators } from "../../utils/routeLinkGenerators";
import { dashboardItems } from "../../constants/router.constants";
import { MdArrowRight } from "react-icons/md";
import { cn } from "../../lib/utils";
import logo from '../../assets/image/logo.svg'; 

const Sidebar = () => {
  const location = useLocation();
  const [openNome, setOpenNome] = useState({});

  return (
    <div className="fixed top-0 left-0 w-[280px] h-screen bg-white shadow-[2px_0_10px_rgba(0,0,0,0.03)] flex flex-col z-50">
      {/* Logo Area */}
      <div className="h-[160px] flex items-center justify-center mt-4">
        <img src={logo} alt="HireHubJA" className="w-36 h-auto object-contain" />
      </div>

      {/* Nav Items Container */}
      <div className="flex-1 overflow-y-auto hide-scrollbar pb-10">
        <ul className="space-y-0.5"> 
          {routeLinkGenerators(dashboardItems).map(
            ({ name, path, children, rootPath }, indx) => {
              
              // চেক করছে এই মেনুটি অ্যাক্টিভ কি না
              const isActiveRoot = location.pathname.includes(rootPath) || (path === '/' && location.pathname === '/');
              const isOpen = name === openNome?.name || (isActiveRoot && !openNome.name);

              return children?.length ? (
                <li key={indx} className="relative flex flex-col">
                  {/* Parent Button */}
                  <button
                    onClick={() => setOpenNome((c) => ({ name: c?.name === name ? null : name }))}
                    className={cn(
                      "w-[calc(100%-20px)] ml-5 pl-4 pr-3 py-3 flex items-center justify-between text-[15px] transition-all rounded-md relative group",
                      isActiveRoot 
                        ? "text-[#44B12C] font-semibold bg-gradient-to-r from-[#EAF6E9] to-transparent" 
                        : "text-[#333333] font-medium hover:text-[#44B12C] hover:bg-gradient-to-r hover:from-[#EAF6E9] hover:to-transparent"
                    )}
                  >
                    {/* Left Green Bar */}
                    <div className={cn(
                      "absolute -left-5 top-1.5 bottom-1.5 w-[5px] bg-[#44B12C] rounded-r-[4px] transition-all duration-200",
                      isActiveRoot ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    )} />

                    <span>{name}</span>
                    <MdArrowRight
                      className={cn("transition-transform text-[22px]", {
                        "rotate-90 text-[#44B12C]": isOpen,
                        "text-[#666] group-hover:text-[#44B12C]": !isOpen
                      })}
                    />
                  </button>
                  
                  {/* Dropdown Menu Items */}
                  <div className={cn("overflow-hidden transition-all duration-300 w-full", 
                    isOpen ? "max-h-[500px]" : "max-h-0")}>
                    <div className="flex flex-col gap-0.5 mt-1 mb-2">
                        {children?.map(({ subName, subPath }, inx) => (
                          <NavLink
                            key={inx}
                            to={subPath}
                            className={({ isActive }) =>
                              cn("block w-full pl-16 py-3 text-[14.5px] transition-all",
                              isActive 
                                ? "bg-[#EAF6E9] text-[#1A1A1A] font-medium" // Image 3 & 5 অনুযায়ী সলিড ব্যাকগ্রাউন্ড এবং ডার্ক টেক্সট
                                : "text-[#555555] hover:bg-[#F2F9F1] hover:text-[#1A1A1A]")
                            }
                          >
                            {subName}
                          </NavLink>
                        ))}
                    </div>
                  </div>
                </li>
              ) : (
                <li key={indx} className="relative">
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      cn("flex items-center w-[calc(100%-20px)] ml-5 pl-4 py-3 text-[15px] transition-all rounded-md relative group",
                      isActive 
                        ? "text-[#44B12C] font-semibold bg-gradient-to-r from-[#EAF6E9] to-transparent" 
                        : "text-[#333333] font-medium hover:text-[#44B12C] hover:bg-gradient-to-r hover:from-[#EAF6E9] hover:to-transparent")
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {/* Left Green Bar */}
                        <div className={cn(
                          "absolute -left-5 top-1.5 bottom-1.5 w-[5px] bg-[#44B12C] rounded-r-[4px] transition-all duration-200",
                          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        )} />
                        <span>{name}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              )
            }
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;