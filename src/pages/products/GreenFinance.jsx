import React, { useState } from "react";
import { useCms, sortItems } from "../../cms";
import "./GreenFinance.css";

/* =====================================================
   IMAGE PATHS
===================================================== */

const images = {
  greenFinanceHero: "/images/products/GREEN-FINANCE-HOME.jpg",

  interestRateIcon: "/images/products/INTEREST-RATE-ICON.webp",
  flexibleTermsIcon: "/images/products/FLEXIBLE-TERMS-ICON.webp",
  quickApprovalIcon: "/images/products/QUICK-APPROVAL-ICON.webp",

  greenBenefit1: "/images/products/MSME-BENEFIT-1.webp",
  greenBenefit2: "/images/products/MSME-BENEFIT-2.webp",
  greenBenefit3: "/images/products/MSME-BENEFIT-3.webp",
};

/* =====================================================
   ELIGIBILITY CARD
===================================================== */

function EligibilityCard() {
  return (
    <div className="green-eligibility-card">
      <h2>
        Check Your Loan Eligibility in Just
        <br />
        <span>2 minutes?</span>
      </h2>

      <div className="green-eligibility-list">

        <div className="green-eligibility-item">
          <img
            src={images.interestRateIcon}
            alt=""
          />
          <strong>Attractive interest rates</strong>
        </div>

        <div className="green-eligibility-item">
          <img
            src={images.flexibleTermsIcon}
            alt=""
          />
          <strong>Flexible Terms</strong>
        </div>

        <div className="green-eligibility-item">
          <img
            src={images.quickApprovalIcon}
            alt=""
          />
          <strong>Quick approval</strong>
        </div>

      </div>

      <button
        type="button"
        className="green-eligibility-button"
      >
        Check Eligibility Now!
      </button>
    </div>
  );
}
/* =====================================================
   HERO SECTION
===================================================== */

function GreenFinanceHero({ pageCms }) {
  return (
    <section className="green-hero">

      {/* =====================================================
         HERO VISUAL
      ===================================================== */}

      <div className="green-hero-visual">

        <img
          src={pageCms.heroImage}
          alt="Green Finance for Solar Energy and EV Solutions"
        />

        <div className="green-hero-overlay"></div>

        <div className="green-hero-text">

          <h1>
            Green Finance
          </h1>

          <h3>
            For Solar Energy &amp; EV Solutions
          </h3>

          <p>
            Invest in sustainable energy with simple,
            <br />
            affordable financing. Save on electricity bills
            <br />
            while reducing carbon footprint. Power your
            <br />
            space the smarter way with the sun.
          </p>

        </div>

      </div>


      {/* =====================================================
         ELIGIBILITY CARD
      ===================================================== */}

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
    text: "Starting from ₹3 Lakhs",
  },
  {
    title: "Loan Tenure",
    text: "Up to 3 years",
  },
  {
    title: "Credit Score",
    text: "650+",
  },
  {
    title: "Fair Processing",
    text: "Fees transparent, affordable, and clearly disclosed",
  },
  {
    title: "Collateral Options",
    text: "Solar assets or property can be offered as security",
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
    title: "Document Proof",
    text: "electricity bill, property ownership/lease deed, vendor quotation, etc.",
  },
];

const ourTerms = [
  {
    title: "Interest Rate",
    text: "Starting from @1.40% per month",
  },
  {
    title: "Stable Income & Employment",
    text: "Minimum work experience of 2+ years.",
  },
  {
    title: "LTV",
    text: "Up to 70% of total solar project cost (including installation and hardware)",
  },
  {
    title: "Vendor Requirements",
    text: "Installation by impaneled or certified solar vendors only.",
  },
];

function InfoCard({ title, items }) {
  return (
    <div className="green-info-card">

      <h3>{title}</h3>

      <div className="green-info-list">

        {items.map((item) => (
          <div
            className="green-info-item"
            key={item.title}
          >

            <span className="green-info-arrow">
              ▶
            </span>

            <div>

              <span className="green-info-label">
                {item.title}
              </span>

              <p>
                {item.text}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

function ApplicationSection() {
  return (
    <section className="green-application">

      <div className="green-section-heading">
        <h2>
          What You’ll Need to Apply
        </h2>
      </div>

      <div className="green-info-grid">

        <InfoCard
          title="Eligibility Criteria"
          items={eligibilityCriteria}
        />

        <InfoCard
          title="Required Documents"
          items={requiredDocuments}
        />

        <InfoCard
          title="Our Terms"
          items={ourTerms}
        />

      </div>

    </section>
  );
}

/* =====================================================
   GREEN FINANCE BENEFITS
===================================================== */

const benefits = [
  {
    image: images.greenBenefit1,
    title: "Reduce Your Energy Costs",
    text:
      "Lower your power bills with solar and energy-efficient solutions designed for your business.",
  },
  {
    image: images.greenBenefit2,
    title: "Upgrade Your Business Sustainably",
    text:
      "Finance energy-efficient upgrades without straining your cash flow.",
  },
  {
    image: images.greenBenefit3,
    title: "Grow with Green Financing",
    text:
      "Invest in green upgrades and make your business more efficient.",
  },
];

function BenefitsSection() {
  return (
    <section className="green-benefits">

      <div className="green-benefits-inner">

        <h2>
          Green Finance Benefits
        </h2>

        <div className="green-benefits-grid">

          {benefits.map((benefit) => (
            <div
              className="green-benefit-card"
              key={benefit.title}
            >

              <div className="green-benefit-icon">

                <img
                  src={benefit.image}
                  alt=""
                />

              </div>

              <h3>
                {benefit.title}
              </h3>

              <p>
                {benefit.text}
              </p>

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
  "Flexible Green Financing",
  "Reduce Your Energy Costs",
  "Faster Loan Processing",
  "Support eco-friendly projects",
  "Finance for EV Solutions",
  "Finance for Solar",
];

function WhyVallabhiSection() {
  return (
    <section className="green-why">

      <div className="green-why-heading">

        <h2>
          Why Vallabhi Capital?
        </h2>

      </div>

      <div className="green-why-box">

        <div className="green-why-grid">

          {whyVallabhi.map((item) => (
            <div
              className="green-why-item"
              key={item}
            >
              {item}
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
    setOpenFaq(
      openFaq === index ? null : index
    );
  };

  const visibleFaqs = showAllFaqs ? faqs : faqs.slice(0, 3);

  const toggleShowMore = () => {
    setShowAllFaqs(!showAllFaqs);
    setOpenFaq(null);
  };

  return (
    <section className="green-faq shared-faq">

      <div className="green-faq-inner">

        <h2>
          Frequently Asked Questions
        </h2>

        <div className="green-faq-list shared-faq-list">

          {visibleFaqs.map((faq, index) => {

            const isOpen = openFaq === index;

            return (
              <div
                className={`green-faq-item shared-faq-item ${
                  isOpen ? "open" : ""
                }`}
                key={faq.question}
              >

                <button
                  type="button"
                  className="green-faq-question shared-faq-question"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >

                  <span>
                    {faq.question}
                  </span>

                  <span className="green-faq-dropdown">

                    <span
                      className={`green-faq-chevron ${
                        isOpen ? "open" : ""
                      }`}
                    ></span>

                  </span>

                </button>

                {isOpen && (
                  <div className="green-faq-answer shared-faq-answer">
                    {faq.answer}
                  </div>
                )}

              </div>
            );

          })}

        </div>

        {faqs.length > 3 && (
          <button
            type="button"
            className="green-faq-bottom-button"
            onClick={toggleShowMore}
            aria-label={showAllFaqs ? "Show fewer FAQs" : "Show more FAQs"}
            aria-expanded={showAllFaqs}
          >
            <span
              className={`green-faq-bottom-chevron ${
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
   MAIN GREEN FINANCE PAGE
===================================================== */

export default function GreenFinance() {
  const cms = useCms();
  const pageCms = cms.products.productPages["green"];
  const faqs = sortItems(pageCms.faqs).filter(x => x.published !== false);
  return (
    <main className="green-page">

      <GreenFinanceHero pageCms={pageCms} />

      <ApplicationSection />

      <BenefitsSection />

      <WhyVallabhiSection />

      <FAQSection faqs={faqs} />

      {/* Footer will be added later */}

    </main>
  );
}