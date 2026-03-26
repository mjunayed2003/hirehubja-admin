import { useState } from "react";
import { useGetApprovalRequestsQuery } from "../../redux/features/dashboard/dashboardApi";
import { useApproveUserMutation, useRejectUserMutation } from "../../redux/features/users/usersApi.js";
import toast from "react-hot-toast";

export default function RegistrationApprovalRequests({ onView }) {
  const [filterType, setFilterType] = useState("All");
  const [showDropdown, setShowDropdown] = useState(false);

  const { data: jobSeekerData, isLoading: l1, refetch: r1 } = useGetApprovalRequestsQuery({ type: "JOB_SEEKER", limit: 10 });
  const { data: employerData,  isLoading: l2, refetch: r2 } = useGetApprovalRequestsQuery({ type: "EMPLOYER",   limit: 10 });
  const { data: companyData,   isLoading: l3, refetch: r3 } = useGetApprovalRequestsQuery({ type: "COMPANY",    limit: 10 });

  const isLoading = l1 || l2 || l3;
  const refetch = () => { r1(); r2(); r3(); };

  // filterType অনুযায়ী data দেখাবে
  const requests =
    filterType === "All"       ? [...(jobSeekerData?.data || []), ...(employerData?.data || []), ...(companyData?.data || [])]
    : filterType === "Job Seeker" ? (jobSeekerData?.data || [])
    : filterType === "Employee"   ? (employerData?.data || [])
    : filterType === "Company"    ? (companyData?.data || [])
    : [];

  const [approveUser] = useApproveUserMutation();
  const [rejectUser]  = useRejectUserMutation();

  const handleApprove = async (userId) => {
    try {
      await approveUser(userId).unwrap();
      toast.success("User approved!");
      refetch();
    } catch {
      toast.error("Failed to approve");
    }
  };

  const handleDecline = async (userId) => {
    try {
      await rejectUser(userId).unwrap();
      toast.success("User rejected!");
      refetch();
    } catch {
      toast.error("Failed to reject");
    }
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#fff", borderRadius: 14, padding: "24px 28px", boxShadow: "0 1px 8px rgba(0,0,0,0.07)", border: "1px solid #f0f0f0", minHeight: 500 }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, paddingBottom: 16, borderBottom: "1.5px dashed #e5e7eb" }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: 0 }}>
          New Registration Approval Requests
        </h3>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowDropdown((v) => !v)}
            style={{ padding: "6px 14px", borderRadius: 7, border: "1.5px solid #e5e7eb", background: "#fff", color: "#374151", fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, minWidth: 130, justifyContent: "space-between" }}
          >
            {filterType} <span style={{ fontSize: 10, color: "#6b7280" }}>▼</span>
          </button>
          {showDropdown && (
            <div style={{ position: "absolute", right: 0, top: 38, width: 150, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.10)", zIndex: 99, padding: "6px 0" }}>
              {["All", "Job Seeker", "Employee", "Company"].map((type) => (
                <button key={type} onClick={() => { setFilterType(type); setShowDropdown(false); }}
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "9px 16px", fontSize: 13, background: filterType === type ? "#f0fdf4" : "transparent", color: filterType === type ? "#16a34a" : "#374151", fontWeight: filterType === type ? 700 : 400, border: "none", cursor: "pointer" }}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ color: "#9ca3af", fontSize: 12 }}>
                {["Name", "Email", "Registration Date", "Category", "Verification Status", "View Details", "Action"].map((h) => (
                  <th key={h} style={{ padding: "10px 12px", fontWeight: 500, textAlign: ["Action", "Verification Status", "View Details"].includes(h) ? "center" : "left", borderBottom: "1.5px dashed #e5e7eb", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? requests.map((row, idx) => (
                <tr key={row.userId || idx} style={{ borderBottom: "1px solid #f3f4f6" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "14px 12px", fontWeight: 500, color: "#111827" }}>{row.fullName || "-"}</td>
                  <td style={{ padding: "14px 12px", color: "#6b7280" }}>{row.email}</td>
                  <td style={{ padding: "14px 12px", color: "#6b7280" }}>
                    {row.registrationDate ? new Date(row.registrationDate).toLocaleDateString() : "-"}
                  </td>
                  <td style={{ padding: "14px 12px", color: "#6b7280" }}>{row.category || "-"}</td>
                  <td style={{ padding: "14px 12px", textAlign: "center" }}>
                    <span style={{
                      padding: "5px 18px", borderRadius: 999, fontSize: 12, fontWeight: 600, display: "inline-block",
                      background: row.verificationStatus === "PENDING" ? "#FFF4E3" : row.verificationStatus === "ACTIVE" ? "#E7F8EE" : "#FFEEEE",
                      color: row.verificationStatus === "PENDING" ? "#F39C12" : row.verificationStatus === "ACTIVE" ? "#00B074" : "#FF5B5B",
                    }}>
                      {row.verificationStatus}
                    </span>
                  </td>
                  <td style={{ padding: "14px 12px", textAlign: "center" }}>
                    <button onClick={() => onView && onView(row)}
                      style={{ background: "#EAEAEA", color: "#4B5563", border: "none", borderRadius: 999, padding: "6px 22px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#d1d5db")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "#EAEAEA")}
                    >
                      View
                    </button>
                  </td>
                  <td style={{ padding: "14px 12px", textAlign: "center" }}>
                    {row.verificationStatus === "PENDING" ? (
                      <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
                        <button onClick={() => handleApprove(row.userId)}
                          style={{ background: "#E7F8EE", color: "#00B074", border: "none", borderRadius: 999, padding: "6px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "#00B074"; e.currentTarget.style.color = "#fff"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "#E7F8EE"; e.currentTarget.style.color = "#00B074"; }}
                        >
                          Approve
                        </button>
                        <button onClick={() => handleDecline(row.userId)}
                          style={{ background: "#FFEEEE", color: "#FF5B5B", border: "none", borderRadius: 999, padding: "6px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "#FF5B5B"; e.currentTarget.style.color = "#fff"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "#FFEEEE"; e.currentTarget.style.color = "#FF5B5B"; }}
                        >
                          Decline
                        </button>
                      </div>
                    ) : (
                      <span style={{ fontSize: 12, color: "#9ca3af", fontStyle: "italic" }}>Action Taken</span>
                    )}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "40px 0", color: "#9ca3af" }}>
                    No requests found for {filterType}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}