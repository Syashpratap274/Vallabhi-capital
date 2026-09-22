import { useState } from "react";

function csvValue(value) {
  return `"${String(value || "").replaceAll('"', '""')}"`;
}

export default function LeadsAdmin({ data, update }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const leads = data.leads || [];
  const filtered = leads.filter((lead) => (
    (status === "All" || lead.status === status) &&
    JSON.stringify(lead).toLowerCase().includes(query.toLowerCase())
  ));

  const exportCsv = () => {
    const headers = ["Name", "Company", "Phone", "Email", "Product", "Aadhaar", "PAN", "Loan Amount", "Purpose", "Source", "Status", "Date"];
    const rows = leads.map((lead) => [
      lead.name,
      lead.company,
      lead.phone,
      lead.email,
      lead.product,
      lead.aadhaar,
      lead.pan,
      lead.loanAmount,
      lead.purpose,
      lead.source,
      lead.status,
      lead.date,
    ].map(csvValue).join(","));
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([[headers.join(","), ...rows].join("\n")], { type: "text/csv" }));
    link.download = "vallabhi-leads.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return <section className="adm-panel">
    <div className="adm-panel-title">
      <div><h2>Applications / Form Submissions</h2><p className="adm-note">All website form records can be searched, filtered, updated and exported.</p></div>
      <button className="adm-primary" onClick={exportCsv}>Export CSV</button>
    </div>
    <div className="adm-toolbar">
      <input className="adm-search" placeholder="Search leads..." value={query} onChange={(event) => setQuery(event.target.value)} />
      <select value={status} onChange={(event) => setStatus(event.target.value)}>
        <option>All</option><option>New</option><option>Contacted</option><option>Follow-up</option><option>Converted</option><option>Closed</option>
      </select>
    </div>
    {filtered.length ? <div className="adm-table-wrap"><table><thead><tr>
      <th>Name</th><th>Company</th><th>Phone</th><th>Aadhaar</th><th>PAN</th><th>Loan Amount</th><th>Purpose</th><th>Status</th><th>Date</th>
    </tr></thead><tbody>{filtered.map((lead) => <tr key={lead.id}>
      <td>{lead.name}</td><td>{lead.company}</td><td>{lead.phone}</td><td>{lead.aadhaar}</td><td>{lead.pan}</td><td>{lead.loanAmount}</td><td>{lead.purpose}</td>
      <td><select value={lead.status || "New"} onChange={(event) => update((next) => { const item = next.leads.find((entry) => entry.id === lead.id); if (item) item.status = event.target.value; })}>
        <option>New</option><option>Contacted</option><option>Follow-up</option><option>Converted</option><option>Closed</option>
      </select></td><td>{lead.date}</td>
    </tr>)}</tbody></table></div> : <div className="adm-empty">No matching submissions.</div>}
  </section>;
}
