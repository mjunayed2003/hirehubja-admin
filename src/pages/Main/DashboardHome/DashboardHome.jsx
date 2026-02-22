import React, { useState } from "react";
import EarningsChart from "../../../Components/dashboardHome/EarningsChart";
import { useGetDashboardQuery } from "../../../redux/features/Dashboard/dashboardApi";
import userIcon from "../../../assets/image/total.svg";

// Import your components properly
import RegistrationApprovalRequests from "../../../Components/dashboardHome/RegistrationTable"; 
import RegistrationDetails from "../../../Components/dashboardHome/RegistrationDetails"; // The new file from Step 1

const currentYear = new Date().getFullYear();

const DashboardHome = () => {
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  // --- NEW STATE: This controls the Full Page View ---
  const [viewData, setViewData] = useState(null);

  const { data: overallData } = useGetDashboardQuery({
    recentLimit: 20,
    year: selectedYear,
    month: selectedMonth,
  });

  const totalUsers = overallData?.data?.totalUsers ?? 120;
  // ... (Other variables: totalProvider, appBalance, etc.)
  const earningChart = overallData?.data?.earningChart ?? [];

  // Interview Scheduled Table Data (Mock)
  const interviewScheduled = [
     { title: "Senior sales Executive", seeker: "bepary", employer: "Mercedes", date: "12.00 PM, 01.02.2026", status: "Scheduled" },
     { title: "Senior sales Executive", seeker: "bepary", employer: "Mercedes", date: "12.00 PM, 01.02.2026", status: "Scheduled" },
     { title: "Senior sales Executive", seeker: "bepary", employer: "Mercedes", date: "12.00 PM, 01.02.2026", status: "Scheduled" },
     // ... add more mock data
  ];

  const homeStatus = [
    { title: "Total Job Seekers", amount: totalUsers, icon: userIcon, percentage: "4% (30 days)" },
    { title: "Total Employers", amount: 120, icon: userIcon, percentage: "4% (30 days)" },
    { title: "Total Companies", amount: 120, icon: userIcon, percentage: "4% (30 days)" },
    { title: "Active Job Posts", amount: 120, icon: userIcon, percentage: "4% (30 days)" },
  ];

  const PieRing = ({ percentage, color }) => (
    <div className="relative flex items-center justify-center w-32 h-32 rounded-full" style={{ background: `conic-gradient(${color} ${percentage}%, #F3F4F6 0)` }}>
      <div className="absolute w-16 h-16 bg-white rounded-full flex items-center justify-center">
        <span className="text-xl font-bold text-gray-800">{percentage}%</span>
      </div>
    </div>
  );

  // --- LOGIC: If a user is selected, ONLY show the details page ---
  if (viewData) {
    return (
      <div className="p-4 bg-[#F8F9FD] min-h-screen">
         <RegistrationDetails 
            user={viewData} 
            onBack={() => setViewData(null)} 
         />
      </div>
    );
  }

  // --- OTHERWISE: Show the normal Dashboard ---
  return (
    <div className="space-y-6 bg-[#F8F9FD] p-4 font-sans text-[#1A1A1A]">
      
      {/* Top Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {homeStatus.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl p-6 shadow-sm flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <img src={item.icon} alt="icon" className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">{item.amount}</h3>
              <p className="text-sm text-gray-500 font-medium">{item.title}</p>
              <p className="text-xs text-green-500 mt-1 flex items-center">
                <span className="mr-1">●</span> {item.percentage}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Section: Pie & Earning */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-5 bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Pie Chart</h3>
          <div className="border-b border-dashed border-gray-200 mb-8"></div>
          <div className="flex justify-between items-center px-2">
            <div className="flex flex-col items-center gap-4">
              <PieRing percentage={81} color="#FF5B5B" />
              <span className="text-sm font-medium text-gray-600">Job seeker</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <PieRing percentage={22} color="#00B074" />
              <span className="text-sm font-medium text-gray-600">Employer</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <PieRing percentage={62} color="#2D9CDB" />
              <span className="text-sm font-medium text-gray-600">Companies</span>
            </div>
          </div>
        </div>

        <div className="xl:col-span-7">
          <EarningsChart earningChart={earningChart} selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
        </div>
      </div>

      {/* Table 1: Registration Requests */}
      {/* Pass the setViewData function here */}
      <RegistrationApprovalRequests onView={(user) => setViewData(user)} />

      {/* Table 2: Interview Scheduled */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="border-b border-dashed border-gray-200 mb-6 pb-4 flex justify-between items-center">
            <h3 className="text-lg font-bold">Interview Scheduled</h3>
            <button className="px-4 py-1.5 border border-gray-200 rounded text-sm text-gray-600">See all</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-dashed border-gray-200">
                <th className="font-medium py-3">Job Title</th>
                <th className="font-medium py-3">Job Seeker Name</th>
                <th className="font-medium py-3">Employer / Company</th>
                <th className="font-medium py-3">Interview Date & Time</th>
                <th className="font-medium py-3 text-center">Status</th>
                <th className="font-medium py-3 text-center">View Details</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {interviewScheduled.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-4">{row.title}</td>
                  <td className="py-4">{row.seeker}</td>
                  <td className="py-4">{row.employer}</td>
                  <td className="py-4">{row.date}</td>
                  <td className="py-4 text-center">
                    <span className="bg-[#FFF4E3] text-[#F39C12] px-4 py-1 rounded-full text-xs font-medium">{row.status}</span>
                  </td>
                  <td className="py-4 text-center">
                    <button className="bg-gray-200 text-gray-700 px-4 py-1 rounded text-xs font-medium hover:bg-gray-300">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default DashboardHome;