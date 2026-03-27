import React, { useState } from "react";
import {
  useGetJobsQuery,
  useBlockJobMutation,
  useUnblockJobMutation,
} from "../../../redux/features/jobsApi/JobsApi";
import JobDetails from "./JobDetails";

const JobPosts = () => {
  const [filterType, setFilterType] = useState("Employer");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);
  const itemsPerPage = 12;

  const { data, isLoading, isError, refetch } = useGetJobsQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  const [blockJob] = useBlockJobMutation();
  const [unblockJob] = useUnblockJobMutation();

  const jobList = data?.data ||[];
  const totalPages = data?.meta?.totalPages || 1;

  const toggleBlockStatus = async (id, isCurrentlyBlocked) => {
    try {
      if (isCurrentlyBlocked) {
        await unblockJob(id).unwrap();;
      } else {
        await blockJob(id).unwrap();
      }
      
      refetch();
    } catch (error) {
      alert("Something went wrong! Please check the console.");
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const formatPageNumber = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[700px] flex items-center justify-center">
        <p className="text-gray-500 font-medium">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[700px] flex items-center justify-center">
        <p className="text-red-500 font-medium">Failed to load jobs.</p>
      </div>
    );
  }

  if (selectedJob) {
    return <JobDetails job={selectedJob} onBack={() => setSelectedJob(null)} />;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden w-full min-h-[700px] flex flex-col justify-between p-6">
      <div>
        <div className="flex justify-between items-center mb-6 border-b border-dashed border-gray-200 pb-4">
          <h2 className="text-xl font-bold text-gray-800">Job Posts</h2>

          <div className="relative group">
            <button className="px-4 py-1.5 border border-gray-200 rounded text-sm text-gray-600 flex items-center bg-white hover:bg-gray-50 transition min-w-[120px] justify-between">
              {filterType} <span className="ml-2 text-[10px] text-green-600">▼</span>
            </button>
            <div className="absolute right-0 top-full mt-1 w-full bg-white border border-gray-100 shadow-lg rounded hidden group-hover:block z-10">
              {["Employer", "Agency", "Admin"].map((type) => (
                <div
                  key={type}
                  onClick={() => setFilterType(type)}
                  className="px-4 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-green-600 cursor-pointer"
                >
                  {type}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white text-gray-500 text-xs border-b border-gray-200">
              <tr>
                <th className="py-4 px-4 font-medium">Name</th>
                <th className="py-4 px-4 font-medium">Email</th>
                <th className="py-4 px-4 font-medium">Registration Date</th>
                <th className="py-4 px-4 font-medium">Category</th>
                <th className="py-4 px-4 font-medium text-center">Status</th>
                <th className="py-4 px-4 font-medium text-center">View Details</th>
                <th className="py-4 px-4 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700 divide-y divide-gray-50">
              {jobList.map((row) => {
                const currentStatus = row?.status?.toUpperCase() || "";
                const isBlocked = currentStatus === "BLOCKED_BY_ADMIN";
                
                const employerName = row.employerName || row.companyName || "N/A";
                const employerEmail = row.employerEmail || "N/A";
                const categoryName = row.category?.name || "N/A";

                return (
                  <tr key={row.id} className="hover:bg-[#FAFAFA] transition">
                    <td className="py-4 px-4 font-medium text-gray-700">
                      {employerName}
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {employerEmail}
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {categoryName}
                    </td>

                    <td className="py-4 px-4 text-center">
                      <span
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                          currentStatus === "OPEN" || currentStatus === "ACTIVE"
                            ? "bg-[#E7F8EE] text-[#00B074]"
                            : "bg-[#FFEEEE] text-[#FF5B5B]"
                        }`}
                      >
                        {row.status || "N/A"}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-center">
                      <button 
                        onClick={() => setSelectedJob(row)}
                        className="bg-[#EAEAEA] text-[#4B5563] px-6 py-1.5 rounded-full text-xs font-bold hover:bg-gray-300 transition shadow-sm"
                      >
                        View
                      </button>
                    </td>

                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => toggleBlockStatus(row.id, isBlocked)}
                        className={`px-6 py-1.5 rounded-full text-xs font-bold transition min-w-[80px] shadow-sm ${
                          isBlocked
                            ? "bg-[#EAEAEA] text-[#4B5563] hover:bg-gray-300"
                            : "bg-[#FFEEEE] text-[#FF5B5B] hover:bg-red-200"
                        }`}
                      >
                        {isBlocked ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-100 flex items-center justify-center gap-8 bg-white mt-4">
        {/* Pagination UI */}
      </div>
    </div>
  );
};

export default JobPosts;