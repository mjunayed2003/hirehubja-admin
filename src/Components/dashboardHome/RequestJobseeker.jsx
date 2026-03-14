import { useState } from "react";
import { useGetApprovalRequestsQuery } from "../../redux/features/dashboard/dashboardApi";
import { useApproveUserMutation, useRejectUserMutation } from "../../redux/features/users/usersApi";
import toast from "react-hot-toast";

const TYPE_MAP = {
  "Job Seeker": "JOB_SEEKER",
  "Employee":   "EMPLOYER",
  "Company":    "COMPANY",
};

export default function RegistrationApprovalRequests({ onView }) {
  const [filterType, setFilterType] = useState("Job Seeker");
  const [showDropdown, setShowDropdown] = useState(false);

  const { data, isLoading, refetch } = useGetApprovalRequestsQuery({
    type: TYPE_MAP[filterType],
    limit: 10,
  });

  const [approveUser] = useApproveUserMutation();
  const [rejectUser]  = useRejectUserMutation();

  const requests = data?.data || [];

  const handleApprove = async (id) => {
    try {
      await approveUser(id).unwrap();
      toast.success("User approved!");
      refetch();
    } catch {
      toast.error("Failed to approve");
    }
  };

  const handleDecline = async (id) => {
    try {
      await rejectUser(id).unwrap();
      toast.success("User rejected!");
      refetch();
    } catch {
      toast.error("Failed to reject");
    }
  };

  const handleFilterSelect = (type) => {
    setFilterType(type);
    setShowDropdown(false);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#fff", borderRadius: 14, padding: "24px 28px", boxShadow: "0 1px 8px rgba(0,0,0,0.07)", border: "1px solid #f0f0f0", minHeight: 500 }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, paddingBottom: 16, borderBottom: "1.5px dashed #e5e7eb" }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: 0 }}>
          New Registration Approval Requests
        </h3>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowDropdown((v) => !v)}
              style={{ padding: "6px 14px", borderRadius: 7, border: "1.5px solid #e5e7eb", background: "#fff", color: "#374151", fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, minWidth: 130, justifyContent: "space-between" }}
            >
              {filterType}
              <span style={{ fontSize: 10, color: "#6b7280" }}>▼</span>
            </button>
            {showDropdown && (
              <div style={{ position: "absolute", right: 0, top: 38, width: 150, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.10)", zIndex: 99, padding: "6px 0" }}>
                {["Job Seeker", "Employee", "Company"].map((type) => (
                  <button
                    key={type}
                    onClick={() => handleFilterSelect(type)}
                    style={{ display: "block", width: "100%", textAlign: "left", padding: "9px 16px", fontSize: 13, background: filterType === type ? "#f0fdf4" : "transparent", color: filterType === type ? "#16a34a" : "#374151", fontWeight: filterType === type ? 700 : 400, border: "none", cursor: "pointer" }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
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
                  <th key={h} style={{ padding: "10px 12px", fontWeight: 500, textAlign: h === "Action" || h === "Verification Status" || h === "View Details" ? "center" : "left", borderBottom: "1.5px dashed #e5e7eb", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((row) => (
                  <tr key={row.id} style={{ borderBottom: "1px solid #f3f4f6" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                    <td style={{ padding: "14px 12px", fontWeight: 500, color: "#111827" }}>{row.fullName || row.name}</td>
                    <td style={{ padding: "14px 12px", color: "#6b7280" }}>{row.email}</td>
                    <td style={{ padding: "14px 12px", color: "#6b7280" }}>{row.createdAt ? new Date(row.createdAt).toLocaleDateString() : row.date}</td>
                    <td style={{ padding: "14px 12px", color: "#6b7280" }}>{row.category || "-"}</td>
                    <td style={{ padding: "14px 12px", textAlign: "center" }}>
                      <span style={{ padding: "5px 18px", borderRadius: 999, fontSize: 12, fontWeight: 600, display: "inline-block", background: row.status === "PENDING" ? "#FFF4E3" : row.status === "ACTIVE" ? "#E7F8EE" : "#FFEEEE", color: row.status === "PENDING" ? "#F39C12" : row.status === "ACTIVE" ? "#00B074" : "#FF5B5B" }}>
                        {row.status || "Pending"}
                      </span>
                    </td>
                    <td style={{ padding: "14px 12px", textAlign: "center" }}>
                      <button onClick={() => onView && onView(row)} style={{ background: "#EAEAEA", color: "#4B5563", border: "none", borderRadius: 999, padding: "6px 22px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#d1d5db")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "#EAEAEA")}
                      >
                        View
                      </button>
                    </td>
                    <td style={{ padding: "14px 12px", textAlign: "center" }}>
                      {row.status === "PENDING" ? (
                        <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
                          <button onClick={() => handleApprove(row.id)} style={{ background: "#E7F8EE", color: "#00B074", border: "none", borderRadius: 999, padding: "6px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "#00B074"; e.currentTarget.style.color = "#fff"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "#E7F8EE"; e.currentTarget.style.color = "#00B074"; }}
                          >
                            Approve
                          </button>
                          <button onClick={() => handleDecline(row.id)} style={{ background: "#FFEEEE", color: "#FF5B5B", border: "none", borderRadius: 999, padding: "6px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
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
                ))
              ) : (
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