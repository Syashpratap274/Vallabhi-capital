import React, { useState } from "react";
import { useCms, sortItems } from "../../cms";
import "./MSMELoan.css";

/* =====================================================
   IMAGE PATHS
===================================================== */

const images = {
  msmeHero: "/images/products/1.webp",

  interestRateIcon: "/images/products/INTEREST-RATE-ICON.webp",
  flexibleTermsIcon: "/images/products/FLEXIBLE-TERMS-ICON.webp",
  quickApprovalIcon: "/images/products/QUICK-APPROVAL-ICON.webp",

  benefit1: "/images/products/MSME-BENEFIT-1.webp",
  benefit2: "/images/products/MSME-BENEFIT-2.webp",
  benefit3: "/images/products/MSME-BENEFIT-3.webp",
};

/* =====================================================
   ELIGIBILITY CARD
===================================================== */

function EligibilityCard() {
  return (
    <div className="msme-eligibility-card">
      <h2>
        Check Your Loan Eligibility in Just 
        <br />
        <span>2 minutes ?</span>
      </h2>

      <div className="msme-eligibility-list">
        <div className="msme-eligibility-item">
          <img src={images.interestRateIcon} alt="" />
          <strong>Attractive interest rates</strong>
        </div>

        <div className="msme-eligibility-item">
          <img src={images.flexibleTermsIcon} alt="" />
          <strong>Flexible Terms</strong>
        </div>

        <div className="msme-eligibility-item">
          <img src={images.quickApprovalIcon} alt="" />
          <strong>Quick approval</strong>
        </div>
      </div>

      <button type="button" className="msme-eligibility-button">
        Check Eligibility Now!
      </button>
    </div>
  );
}

/* =====================================================
   HERO SECTION
===================================================== */

function MSMEHero({ pageCms }) {
  return (
    <section className="msme-hero">
      <div className="msme-hero-visual">
        <img src={pageCms.heroImage} alt="MSME Loan" />
        <div className="msme-hero-overlay"></div>

        <div className="msme-hero-text">
          <h1>
            MSME Loan<span>(Samriddhi)</span>
          </h1>

          <p>
            Our MSME Loans are tailored to fuel your business expansion, address working capital needs, property purchase, new venture or startups, asset acquisition, seasonal funding and facilitate asset acquisition.
          </p>
        </div>
      </div>

      <EligibilityCard />
    </section>
  );
}

/* =====================================================
   APPLICATION INFORMATION
===================================================== */

const eligibilityCriteria = [
  {
    title: "Loan Amount",
    text: "₹10 Lakhs to 2 Crore",
  },
  {
    title: "Repayment Tenure",
    text: "6 month to 5 year",
  },
  {
    title: "Credit Score",
    text: "650+ (higher for unsecured portion)",
  },
  {
    title: "Fair Processing",
    text: "Transparent and affordable charges",
  },
  {
    title: "LTV",
    text: "Up to 50% of asset value.",
  },
];

const requiredDocuments = [
  {
    title: "KYC Details",
    text: "Aadhar Card, PAN Card",
  },
  {
    title: "Financial Documents",
    text: "ITRs, GST returns, udyam registration, bank statements",
  },
  {
    title: "Collateral Options",
    text: "Flexible collateral options tailored to secure your loan with ease.",
  },
];

const ourTerms = [
  {
    title: "Interest Rate",
    text: "Starting from @1.20% per month",
  },
  {
    title: "Loan Purpose",
    text: "Working capital, business expansion, constructions, raw material purchase,",
  },
  {
    title: "Business Vintage",
    text: "Minimum 6 month",
  },
];

function InfoCard({ title, items }) {
  return (
    <div className="msme-info-card">
      <h3>{title}</h3>

      <div className="msme-info-list">
        {items.map((item) => (
          <div className="msme-info-item" key={item.title}>
            <span className="msme-info-arrow">▶</span>

            <div>
              <span className="msme-info-label">{item.title}</span>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ApplicationSection() {
  return (
    <section className="msme-application">
      <div className="msme-section-heading">
        <h2>What You’ll Need to Apply</h2>
      </div>

      <div className="msme-info-grid">
        <InfoCard
          title="Eligibility Criteria"
          items={eligibilityCriteria}
        />

        <InfoCard
          title="Required Documents"
          items={requiredDocuments}
        />

        <InfoCard title="Our Terms" items={ourTerms} />
      </div>
    </section>
  );
}

/* =====================================================
   MSME BENEFITS
===================================================== */

const benefits = [
  {
    image: images.benefit1,
    title: "Quick & Easy Funding",
    text: "Get access to hassle-free financing with a simple application process and faster loan approvals.",
  },
  {
    image: images.benefit2,
    title: "Flexible Repayment Options",
    text: "Repay at your convenience with flexible tenure options designed around your business cash flow.",
  },
  {
    image: images.benefit3,
    title: "Fuel Your Business Growth",
    text: "Invest in expansion and opportunities with funds for working capital, machinery, inventory, or business growth",
  },
];

function BenefitsSection() {
  return (
    <section className="msme-benefits">
      <div className="msme-benefits-inner">
        <h2>MSME Benefits</h2>

        <div className="msme-benefits-grid">
          {benefits.map((benefit) => (
            <div className="msme-benefit-card" key={benefit.title}>
              <div className="msme-benefit-icon">
                <img src={benefit.image} alt="" />
              </div>

              <h3>{benefit.title}</h3>

              <p>{benefit.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =====================================================
   WHY VALLABHI CAPITAL
===================================================== */

const whyVallabhi = [
  { text: "Finance Your Expansion", icon: "📈" },
  { text: "Transparent Financing", icon: "₹" },
  { text: "Easy Repayment Options", icon: "💳" },
  { text: "MSME-Focused Expertise", icon: "🏢" },
  { text: "Simple Documentation", icon: "📝" },
  { text: "Quick Approval", icon: "⚡" },
];

function WhyVallabhiSection() {
  return (
    <section className="msme-why">
      <div className="msme-why-heading">
        <h2>Why Vallabhi Capital?</h2>
      </div>

      <div className="msme-why-box">
        <div className="msme-why-grid">
          {whyVallabhi.map((item) => (
            <div className="msme-why-item" key={item.text}>
              <span className="msme-why-item-icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="msme-why-item-text">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =====================================================
   FAQ
===================================================== */



function FAQSection({ faqs }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const visibleFaqs = showAllFaqs ? faqs : faqs.slice(0, 3);

  const toggleShowMore = () => {
    setShowAllFaqs(!showAllFaqs);

    // Close any open FAQ when changing the list
    setOpenFaq(null);
  };

  return (
    <section className="msme-faq shared-faq">
      <div className="msme-faq-inner">
        <h2>Frequently Asked Questions</h2>

        <div className="msme-faq-list shared-faq-list">
          {visibleFaqs.map((faq, index) => {
            const isOpen = openFaq === index;

            return (
              <div
                className={`msme-faq-item shared-faq-item ${isOpen ? "open" : ""}`}
                key={`${faq.question}-${index}`}
              >
                <button
                  type="button"
                  className="msme-faq-question shared-faq-question"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >
                  <span>
                    {faq.question}
                  </span>

                  <span className="msme-faq-dropdown">
                    <span
                      className={`msme-faq-chevron ${
                        isOpen ? "open" : ""
                      }`}
                    ></span>
                  </span>
                </button>

                {isOpen && (
                  <div className="msme-faq-answer shared-faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Show button only when there are more than 3 FAQs */}
        {faqs.length > 3 && (
          <button
            type="button"
            className="msme-faq-bottom-button"
            onClick={toggleShowMore}
            aria-label={
              showAllFaqs ? "Show fewer FAQs" : "Show more FAQs"
            }
          >
            <span
              className={`msme-faq-bottom-chevron ${
                showAllFaqs ? "open" : ""
              }`}
            ></span>
          </button>
        )}
      </div>
    </section>
  );
}

/* =====================================================
   MAIN MSME PAGE
===================================================== */

export default function MSMELoan() {
  const cms = useCms();
  const pageCms = cms.products.productPages["msme"];
  const faqs = sortItems(pageCms.faqs).filter(x => x.published !== false);
  return (
    <main className="msme-page">
      <MSMEHero pageCms={pageCms} />
      <ApplicationSection />
      <BenefitsSection />
      <WhyVallabhiSection />
      <FAQSection faqs={faqs} />
      

      {/* Footer will be added later */}
    </main>
  );
}