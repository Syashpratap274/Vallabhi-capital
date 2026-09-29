import { useEffect, useState } from "react";

function csvValue(value) {
  return `"${String(value || "").replaceAll('"', '""')}"`;
}

export default function LeadsAdmin() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLeads = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/leads", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Unable to load leads.");
      }

      const result = await response.json();

      setLeads(Array.isArray(result.leads) ? result.leads : []);
    } catch (error) {
      console.error("Lead fetch error:", error);
      setError(error.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const filtered = leads.filter((lead) => (
    (status === "All" || lead.status === status) &&
    JSON.stringify(lead).toLowerCase().includes(query.toLowerCase())
  ));

  const exportCsv = () => {
    const headers = [
      "Name",
      "Company",
      "Phone",
      "Consent",
      "Email",
      "Product",
      "Aadhaar",
      "PAN",
      "Loan Amount",
      "Purpose",
      "Source",
      "Status",
      "Date",
    ];

    const rows = leads.map((lead) => [
      lead.name,
      lead.company,
      lead.phone,
      lead.consented ? "Consented" : "Not recorded",
      lead.email,
      lead.product,
      lead.aadhaar,
      lead.pan,
      lead.loan_amount,
      lead.purpose,
      lead.source,
      lead.status,
      lead.created_at,
    ].map(csvValue).join(","));

    const blob = new Blob(
      [[headers.join(","), ...rows].join("\n")],
      { type: "text/csv" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "vallabhi-leads.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <section className="adm-panel">
        <div className="adm-empty">
          Loading leads...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="adm-panel">
        <div className="adm-empty">
          {error}
        </div>
      </section>
    );
  }

  return (
    <section className="adm-panel">
      <div className="adm-panel-title">
        <div>
          <h2>Applications / Form Submissions</h2>

          <p className="adm-note">
            All website form records can be searched, filtered, updated and exported.
          </p>
        </div>

        <button
          className="adm-primary"
          onClick={exportCsv}
        >
          Export CSV
        </button>
      </div>

      <div className="adm-toolbar">
        <input
          className="adm-search"
          placeholder="Search leads..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option>All</option>
          <option>New</option>
          <option>Contacted</option>
          <option>Follow-up</option>
          <option>Converted</option>
          <option>Closed</option>
        </select>
      </div>

      {filtered.length ? (
        <div className="adm-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Phone / Consent</th>
                <th>Aadhaar</th>
                <th>PAN</th>
                <th>Loan Amount</th>
                <th>Purpose</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>

                  <td>{lead.company}</td>

                  <td>
                    <div>{lead.phone}</div>

                    <small
                      className={
                        lead.consented
                          ? "adm-consent-status"
                          : "adm-consent-missing"
                      }
                    >
                      {lead.consented
                        ? "Consented"
                        : "Not recorded"}
                    </small>
                  </td>

                  <td>{lead.aadhaar}</td>

                  <td>{lead.pan}</td>

                  <td>{lead.loan_amount}</td>

                  <td>{lead.purpose}</td>

                  <td>
                    <select
                      value={lead.status || "New"}
                      onChange={() => {
                        // Status editing will be moved to the
                        // authenticated admin API in the next step.
                      }}
                    >
                      <option>New</option>
                      <option>Contacted</option>
                      <option>Follow-up</option>
                      <option>Converted</option>
                      <option>Closed</option>
                    </select>
                  </td>

                  <td>
                    {lead.created_at
                      ? new Date(lead.created_at).toLocaleString()
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="adm-empty">
          No matching submissions.
        </div>
      )}
    </section>
  );
}