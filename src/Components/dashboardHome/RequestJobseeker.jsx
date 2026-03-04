import { useState } from "react";

const initialData = [
  { id: 1, type: "Job Seeker", name: "Sowrove Bepary", email: "sowrove@gmail.com", date: "20.10.2026", category: "Education", status: "Pending" },
  { id: 2, type: "Company", name: "Tech Solutions Ltd", email: "hr@techsol.com", date: "21.10.2026", category: "IT Service", status: "Pending" },
  { id: 3, type: "Employee", name: "Rahim Ahmed", email: "rahim@work.com", date: "22.10.2026", category: "Management", status: "Pending" },
  { id: 4, type: "Job Seeker", name: "John Doe", email: "john@gmail.com", date: "23.10.2026", category: "Design", status: "Pending" },
  { id: 5, type: "Company", name: "Grameenphone", email: "info@gp.com", date: "24.10.2026", category: "Telecom", status: "Pending" },
  { id: 6, type: "Employee", name: "Karim Uddin", email: "karim@shop.com", date: "25.10.2026", category: "Sales", status: "Pending" },
  { id: 7, type: "Job Seeker", name: "Sowrove Bepary", email: "sowrove@gmail.com", date: "20.10.2026", category: "Education", status: "Pending" },
  { id: 8, type: "Company", name: "Tech Solutions Ltd", email: "hr@techsol.com", date: "21.10.2026", category: "IT Service", status: "Pending" },
  { id: 9, type: "Employee", name: "Rahim Ahmed", email: "rahim@work.com", date: "22.10.2026", category: "Management", status: "Pending" },
  { id: 10, type: "Job Seeker", name: "John Doe", email: "john@gmail.com", date: "23.10.2026", category: "Design", status: "Pending" },
  { id: 11, type: "Company", name: "Grameenphone", email: "info@gp.com", date: "24.10.2026", category: "Telecom", status: "Pending" },
  { id: 12, type: "Employee", name: "Karim Uddin", email: "karim@shop.com", date: "25.10.2026", category: "Sales", status: "Pending" },
];

export default function RegistrationApprovalRequests({ onView }) {
  const [requests, setRequests] = useState(initialData);
  const [filterType, setFilterType] = useState("Job Seeker");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredRequests =
    filterType === "All"
      ? requests
      : requests.filter((req) => req.type === filterType);

  const handleApprove = (id) =>
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "Approved" } : req))
    );

  const handleDecline = (id) =>
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "Declined" } : req))
    );

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
          {/* See all button */}
          <button
            onClick={() => handleFilterSelect("All")}
            style={{
              padding: "6px 18px",
              borderRadius: 7,
              border: "1.5px solid #e5e7eb",
              background: filterType === "All" ? "#f3f4f6" : "#fff",
              color: "#374151",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            See all
          </button>

          {/* Dropdown */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowDropdown((v) => !v)}
              style={{
                padding: "6px 14px",
                borderRadius: 7,
                border: "1.5px solid #e5e7eb",
                background: "#fff",
                color: "#374151",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                minWidth: 130,
                justifyContent: "space-between",
              }}
            >
              {filterType === "All" ? "Select Type" : filterType}
              <span style={{ fontSize: 10, color: "#6b7280" }}>▼</span>
            </button>

            {showDropdown && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 38,
                  width: 150,
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 10,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
                  zIndex: 99,
                  padding: "6px 0",
                }}
              >
                {["Job Seeker", "Employee", "Company"].map((type) => (
                  <button
                    key={type}
                    onClick={() => handleFilterSelect(type)}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "9px 16px",
                      fontSize: 13,
                      background: filterType === type ? "#f0fdf4" : "transparent",
                      color: filterType === type ? "#16a34a" : "#374151",
                      fontWeight: filterType === type ? 700 : 400,
                      border: "none",
                      cursor: "pointer",
                    }}
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
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ color: "#9ca3af", fontSize: 12 }}>
              {["Name", "Email", "Registration Date", "Category", "Verification Status", "View Details", "Action"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "10px 12px",
                    fontWeight: 500,
                    textAlign: h === "Action" || h === "Verification Status" || h === "View Details" ? "center" : "left",
                    borderBottom: "1.5px dashed #e5e7eb",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((row) => (
                <tr
                  key={row.id}
                  style={{ borderBottom: "1px solid #f3f4f6", transition: "background 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  {/* Name */}
                  <td style={{ padding: "14px 12px", fontWeight: 500, color: "#111827" }}>{row.name}</td>

                  {/* Email */}
                  <td style={{ padding: "14px 12px", color: "#6b7280" }}>{row.email}</td>

                  {/* Date */}
                  <td style={{ padding: "14px 12px", color: "#6b7280" }}>{row.date}</td>

                  {/* Category */}
                  <td style={{ padding: "14px 12px", color: "#6b7280" }}>{row.category},</td>

                  {/* Status Badge */}
                  <td style={{ padding: "14px 12px", textAlign: "center" }}>
                    <span
                      style={{
                        padding: "5px 18px",
                        borderRadius: 999,
                        fontSize: 12,
                        fontWeight: 600,
                        display: "inline-block",
                        minWidth: 80,
                        background:
                          row.status === "Pending"
                            ? "#FFF4E3"
                            : row.status === "Approved"
                            ? "#E7F8EE"
                            : "#FFEEEE",
                        color:
                          row.status === "Pending"
                            ? "#F39C12"
                            : row.status === "Approved"
                            ? "#00B074"
                            : "#FF5B5B",
                      }}
                    >
                      {row.status}
                    </span>
                  </td>

                  {/* View Details */}
                  <td style={{ padding: "14px 12px", textAlign: "center" }}>
                    <button
                      onClick={() => onView && onView(row)}
                      style={{
                        background: "#EAEAEA",
                        color: "#4B5563",
                        border: "none",
                        borderRadius: 999,
                        padding: "6px 22px",
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#d1d5db")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "#EAEAEA")}
                    >
                      View
                    </button>
                  </td>

                  {/* Action */}
                  <td style={{ padding: "14px 12px", textAlign: "center" }}>
                    {row.status === "Pending" ? (
                      <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
                        <button
                          onClick={() => handleApprove(row.id)}
                          style={{
                            background: "#E7F8EE",
                            color: "#00B074",
                            border: "none",
                            borderRadius: 999,
                            padding: "6px 16px",
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: "pointer",
                            transition: "all 0.15s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#00B074";
                            e.currentTarget.style.color = "#fff";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#E7F8EE";
                            e.currentTarget.style.color = "#00B074";
                          }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDecline(row.id)}
                          style={{
                            background: "#FFEEEE",
                            color: "#FF5B5B",
                            border: "none",
                            borderRadius: 999,
                            padding: "6px 16px",
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: "pointer",
                            transition: "all 0.15s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#FF5B5B";
                            e.currentTarget.style.color = "#fff";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#FFEEEE";
                            e.currentTarget.style.color = "#FF5B5B";
                          }}
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
    </div>
  );
}