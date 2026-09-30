import React, { useEffect, useRef, useState } from "react";
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
  const [isMobile, setIsMobile] = useState(() => (typeof window !== "undefined" ? window.innerWidth <= 600 : false));
  const techTrackRef = useRef(null);
  const lendingTrackRef = useRef(null);
  const techPointerStartX = useRef(null);
  const lendingPointerStartX = useRef(null);

  const technologyPartnerLogos = Array.isArray(p.technologyPartnerLogos)
    ? p.technologyPartnerLogos
    : (Array.isArray(p.technologyPartners) ? p.technologyPartners.filter((x) => x?.image || x?.logo || x?.src) : []);

  const technologyPartnerPdfs = Array.isArray(p.technologyPartnerPdfs)
    ? p.technologyPartnerPdfs
    : (Array.isArray(p.technologyPartners) ? p.technologyPartners.filter((x) => x?.pdfUrl || x?.url || x?.file) : []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const moveTrack = (trackRef, direction, itemCount) => {
    const animation = trackRef.current?.getAnimations().find((entry) => entry.animationName === "partners-logo-marquee");
    if (!animation || itemCount < 2) return;

    const duration = itemCount * 2000;
    const currentTime = Number(animation.currentTime) || 0;
    animation.currentTime = ((currentTime + direction * 2000) % duration + duration) % duration;
  };

  const renderCarousel = ({ title, items, type, onPointerDown, onPointerUp, onPointerCancel, trackRef, onMove }) => {
    if (!items || items.length === 0) {
      return (
        <div className="partners-empty-message">
          <span>{title} logos</span>
          <p>Logos will be added from the Admin Panel.</p>
        </div>
      );
    }

    const marqueeItems = items.length > 1 ? [...items, ...items] : items;

    return (
      <>
        <div
          className="partners-logo-slider"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
        >
          <div
            ref={trackRef}
            className={`partners-logo-track${items.length > 1 ? " partners-logo-track-moving" : ""}`}
            style={{ "--partners-marquee-duration": `${items.length * 2}s` }}
          >
            {marqueeItems.map((x, index) => (
              <div className="partner-logo-slide" key={`${x.id || x.name || title}-${index}`} aria-hidden={index >= items.length}>
                <div className="partner-logo-card">
                  <img src={x.image || x.logo || x.src} alt={x.name || title} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {items.length > 1 && (
          <div className="partners-logo-slider-arrows" aria-label={`${type} partner navigation`}>
            <button
              type="button"
              className="partners-logo-arrow"
              onClick={() => onMove(-1)}
              aria-label={`Previous ${type} partner logo`}
            >
              ‹
            </button>
            <button
              type="button"
              className="partners-logo-arrow"
              onClick={() => onMove(1)}
              aria-label={`Next ${type} partner logo`}
            >
              ›
            </button>
          </div>
        )}
      </>
    );
  };

  const LogoGroup = ({ title, desc, keyName, items }) => {
    if (isMobile) {
      const trackRef = keyName === "lendingPartners" ? lendingTrackRef : techTrackRef;
      const pointerStartX = keyName === "lendingPartners" ? lendingPointerStartX : techPointerStartX;
      const onMove = (direction) => moveTrack(trackRef, direction, items.length);
      const onPointerDown = (event) => {
        pointerStartX.current = event.clientX;
        event.currentTarget.setPointerCapture(event.pointerId);
      };
      const onPointerUp = (event) => {
        const startX = pointerStartX.current;
        pointerStartX.current = null;
        if (startX !== null && Math.abs(startX - event.clientX) >= 40) {
          onMove(startX > event.clientX ? 1 : -1);
        }
      };
      const onPointerCancel = () => {
        pointerStartX.current = null;
      };

      return (
        <section id={keyName === "lendingPartners" ? "lending-partners" : "technology-partners"} className="partners-section">
          <div className="partners-section-heading">
            <h2>{title}</h2>
            {desc && <p>{desc}</p>}
          </div>
          {renderCarousel({
            title,
            items: items || [],
            type: keyName === "lendingPartners" ? "lending" : "technology",
            onPointerDown,
            onPointerUp,
            onPointerCancel,
            trackRef,
            onMove,
          })}
        </section>
      );
    }

    return (
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
  };

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
