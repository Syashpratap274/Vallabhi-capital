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
  const [techSlideIndex, setTechSlideIndex] = useState(0);
  const [lendingSlideIndex, setLendingSlideIndex] = useState(0);
  const techTouchStartX = useRef(null);
  const lendingTouchStartX = useRef(null);

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

  useEffect(() => {
    if (!isMobile || technologyPartnerLogos.length <= 2) return;
    const grouped = chunkIntoPairs(technologyPartnerLogos);
    const timer = window.setInterval(() => {
      setTechSlideIndex((current) => (current + 1) % grouped.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [isMobile, technologyPartnerLogos]);

  useEffect(() => {
    if (!isMobile || (p.lendingPartners || []).length <= 2) return;
    const grouped = chunkIntoPairs(p.lendingPartners || []);
    const timer = window.setInterval(() => {
      setLendingSlideIndex((current) => (current + 1) % grouped.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [isMobile, p.lendingPartners]);

  const chunkIntoPairs = (list) => {
    const chunks = [];
    for (let index = 0; index < list.length; index += 2) {
      chunks.push(list.slice(index, index + 2));
    }
    return chunks;
  };

  const handleTechTouchStart = (event) => {
    techTouchStartX.current = event.touches[0].clientX;
  };

  const handleTechTouchEnd = (event) => {
    if (techTouchStartX.current === null) return;

    const endX = event.changedTouches[0].clientX;
    const diff = techTouchStartX.current - endX;
    techTouchStartX.current = null;

    if (Math.abs(diff) < 40) return;

    const groupedItems = chunkIntoPairs(technologyPartnerLogos);
    setTechSlideIndex((current) => {
      const nextIndex = diff > 0 ? current + 1 : current - 1;
      const safeIndex = (nextIndex + groupedItems.length) % groupedItems.length;
      return safeIndex;
    });
  };

  const handleLendingTouchStart = (event) => {
    lendingTouchStartX.current = event.touches[0].clientX;
  };

  const handleLendingTouchEnd = (event) => {
    if (lendingTouchStartX.current === null) return;

    const endX = event.changedTouches[0].clientX;
    const diff = lendingTouchStartX.current - endX;
    lendingTouchStartX.current = null;

    if (Math.abs(diff) < 40) return;

    const groupedItems = chunkIntoPairs(p.lendingPartners || []);
    setLendingSlideIndex((current) => {
      const nextIndex = diff > 0 ? current + 1 : current - 1;
      const safeIndex = (nextIndex + groupedItems.length) % groupedItems.length;
      return safeIndex;
    });
  };

  const renderCarousel = ({ title, items, type, slideIndex, onTouchStart, onTouchEnd, setSlideIndex }) => {
    if (!items || items.length === 0) {
      return (
        <div className="partners-empty-message">
          <span>{title} logos</span>
          <p>Logos will be added from the Admin Panel.</p>
        </div>
      );
    }

    const groupedItems = chunkIntoPairs(items);

    return (
      <>
        <div
          className="partners-logo-slider"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="partners-logo-track"
            style={{ transform: `translateX(-${slideIndex * 100}%)` }}
          >
            {groupedItems.map((group, groupIndex) => (
              <div className="partner-logo-slide" key={`${title}-${groupIndex}`}>
                <div className="partner-logo-group">
                  {group.map((x, cardIndex) => (
                    <div className="partner-logo-card" key={x.id || `${title}-${groupIndex}-${cardIndex}`}>
                      <img src={x.image || x.logo || x.src} alt={x.name || title} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {groupedItems.length > 1 && (
          <div className="partners-logo-slider-arrows" aria-label={`${type} partner slide navigation`}>
            <button
              type="button"
              className="partners-logo-arrow"
              onClick={() => setSlideIndex((slideIndex - 1 + groupedItems.length) % groupedItems.length)}
              aria-label={`Previous ${type} partner slide`}
            >
              ‹
            </button>
            <button
              type="button"
              className="partners-logo-arrow"
              onClick={() => setSlideIndex((slideIndex + 1) % groupedItems.length)}
              aria-label={`Next ${type} partner slide`}
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
      const slideIndex = keyName === "lendingPartners" ? lendingSlideIndex : techSlideIndex;
      const touchStart = keyName === "lendingPartners" ? handleLendingTouchStart : handleTechTouchStart;
      const touchEnd = keyName === "lendingPartners" ? handleLendingTouchEnd : handleTechTouchEnd;
      const setSlideIndex = keyName === "lendingPartners" ? setLendingSlideIndex : setTechSlideIndex;

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
            slideIndex,
            onTouchStart: touchStart,
            onTouchEnd: touchEnd,
            setSlideIndex,
            sectionId: keyName === "lendingPartners" ? "lending-partners" : "technology-partners",
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
