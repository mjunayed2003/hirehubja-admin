import React, { useState } from "react";

// Mock Data for Interviews
const initialInterviews = [
  { id: 1, title: "Senior Sales Executive", seeker: "Sowrove Bepary", employer: "Mercedes", date: "12.00 PM, 01.02.2026", type: "Online", status: "Scheduled" },
  { id: 2, title: "Frontend Developer", seeker: "Rahim Ahmed", employer: "Tech Sol", date: "10.00 AM, 03.02.2026", type: "Offline", status: "Completed" },
  { id: 3, title: "UI/UX Designer", seeker: "John Doe", employer: "Grameenphone", date: "02.00 PM, 05.02.2026", type: "Online", status: "Cancelled" },
  { id: 4, title: "Backend Engineer", seeker: "Karim Uddin", employer: "Brain Station", date: "11.00 AM, 07.02.2026", type: "Offline", status: "Scheduled" },
];

export default function InterviewScheduled({ onView }) {
  const [interviews] = useState(initialInterviews);

  return (
    <div className="bg-white rounded-[14px] p-6 shadow-sm border border-[#f0f0f0] font-sans mt-6 min-h-[400px]">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-5 pb-4 border-b border-dashed border-gray-200">
        <h3 className="text-base font-bold text-gray-900">
          Interview Scheduled
        </h3>
        <button className="px-4 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-700 text-xs font-medium hover:bg-gray-50 transition">
            See all
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="text-gray-400 text-xs">
              {["Job Title", "Job Seeker Name", "Employer / Company", "Interview Date & Time", "Status", "View Details"].map((h) => (
                <th
                  key={h}
                  className={`py-3 px-3 font-medium border-b border-dashed border-gray-200 whitespace-nowrap ${
                    h === "Status" || h === "View Details" ? "text-center" : "text-left"
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {interviews.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-50 hover:bg-gray-50 transition duration-150"
              >
                {/* Job Title */}
                <td className="py-3.5 px-3 font-medium text-gray-900">{row.title}</td>

                {/* Seeker Name */}
                <td className="py-3.5 px-3 text-gray-500">{row.seeker}</td>

                {/* Employer */}
                <td className="py-3.5 px-3 text-gray-500">{row.employer}</td>

                {/* Date */}
                <td className="py-3.5 px-3 text-gray-500">{row.date}</td>

                {/* Status Badge */}
                <td className="py-3.5 px-3 text-center">
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-bold inline-block min-w-[90px] ${
                      row.status === "Scheduled"
                        ? "bg-[#FFF4E3] text-[#F39C12]"
                        : row.status === "Completed"
                        ? "bg-[#E7F8EE] text-[#00B074]"
                        : "bg-[#FFEEEE] text-[#FF5B5B]"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>

                {/* View Details Button */}
                <td className="py-3.5 px-3 text-center">
                  <button
                    onClick={() => onView && onView(row)}
                    className="bg-[#EAEAEA] text-[#4B5563] border-none rounded-full px-5 py-1.5 text-xs font-bold hover:bg-gray-300 transition"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}