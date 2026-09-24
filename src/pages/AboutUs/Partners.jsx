import React from "react";
import { useCms } from "../../cms";
import "./Partners.css";

const TECH_PDF_NAMES = [
  "Fair practice code",
  "KYC & AML Policy",
  "Interest Rate Policy",
  "Refund & Cancellation Policy",
  "Terms & Condition Policy",
];

export default function Partners() {
  const cms = useCms();
  const p = cms.partners || {};

  const technologyPartnerLogos = Array.isArray(p.technologyPartnerLogos)
    ? p.technologyPartnerLogos
    : (Array.isArray(p.technologyPartners) ? p.technologyPartners.filter((x) => x?.image || x?.logo || x?.src) : []);

  const technologyPartnerPdfs = Array.isArray(p.technologyPartnerPdfs)
    ? p.technologyPartnerPdfs
    : (Array.isArray(p.technologyPartners) ? p.technologyPartners.filter((x) => x?.pdfUrl || x?.url || x?.file) : []);

  const LogoGroup = ({ title, desc, keyName, items }) => (
    <section id={keyName === "lendingPartners" ? "lending-partners" : "technology-partners"} className="partners-section">
      <div className="partners-section-heading">
        <h2>{title}</h2>
        {desc && <p>{desc}</p>}
      </div>
      <div className="partners-logo-grid">
        {(items || []).length ? (
          (items || []).map((x) => (
            <div className="partner-logo-card" key={x.id || x.name || Math.random().toString(36).slice(2)}>
              <img src={x.image || x.logo || x.src} alt={x.name || title} />
            </div>
          ))
        ) : (
          <div className="partners-empty-message">
            <span>{title} logos</span>
            <p>Logos will be added from the Admin Panel.</p>
          </div>
        )}
      </div>
    </section>
  );

  const pdfList = TECH_PDF_NAMES.map((name) => {
    const item = technologyPartnerPdfs.find((x) => x?.name === name);
    const shortLabel = {
      "Fair practice code": "FPC",
      "KYC & AML Policy": "KYC",
      "Interest Rate Policy": "IRP",
      "Refund & Cancellation Policy": "RCP",
      "Terms & Condition Policy": "TCP",
    }[name] || "PDF";

    return {
      id: item?.id || name,
      name,
      shortLabel,
      pdfUrl: item?.pdfUrl || item?.url || item?.file || "",
    };
  });

  return (
    <main className="partners-page">
      <LogoGroup title="Our Lending Partners" keyName="lendingPartners" items={p.lendingPartners || []} />
      <LogoGroup title="Our Technology Partners" keyName="technologyPartners" items={technologyPartnerLogos} />

      <section className="partners-section partners-policy-section">
        <div className="partners-policy-block">
          <div className="partners-policy-subheading">
            <h3>Governance Policies &amp; Codes</h3>
            <p>Open each policy document in the browser as a PDF.</p>
          </div>

          <div className="partners-policy-list">
            {pdfList.map((x) => (
              <a
                key={x.id}
                className={`partners-policy-item ${x.pdfUrl ? "" : "partners-policy-item-disabled"}`}
                href={x.pdfUrl || "#"}
                target={x.pdfUrl ? "_blank" : undefined}
                rel={x.pdfUrl ? "noreferrer" : undefined}
                aria-label={x.pdfUrl ? `Open ${x.name} PDF` : `${x.name} PDF not uploaded yet`}
                onClick={(event) => {
                  if (!x.pdfUrl) event.preventDefault();
                }}
              >
                <span className="partners-policy-icon" aria-hidden="true">{x.shortLabel}</span>
                <span className="partners-policy-name">{x.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
