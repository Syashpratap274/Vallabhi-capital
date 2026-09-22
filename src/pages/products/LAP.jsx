import { useState } from "react";
import { useCms, sortItems } from "../../cms";
import "./LAP.css";

/* =====================================================
   IMAGE PATHS
===================================================== */

const images = {
  lapHero: "/images/products/loan-against-property-home.webp",

  interestRateIcon: "/images/products/INTEREST-RATE-ICON.webp",
  flexibleTermsIcon: "/images/products/FLEXIBLE-TERMS-ICON.webp",
  quickApprovalIcon: "/images/products/QUICK-APPROVAL-ICON.webp",

  benefit1: "/images/products/MSME-BENEFIT-1.webp",
  benefit2: "/images/products/MSME-BENEFIT-2.webp",
  benefit3: "/images/products/MSME-BENEFIT-3.webp",
};

/* =====================================================
   LOAN AGAINST PROPERTY FAQs
===================================================== */



/* =====================================================
   LAP BENEFITS
===================================================== */

const benefits = [
  {
    image: images.benefit1,
    title: "Unlock Property Value",
    text:
      "Turn the value of your owned property into funds to meet important business or financial requirements.",
  },
  {
    image: images.benefit2,
    title: "Flexible Funding",
    text:
      "Access suitable financing with repayment options structured around your business cash flow.",
  },
  {
    image: images.benefit3,
    title: "Grow Without Selling",
    text:
      "Leverage your property to raise funds while continuing to retain ownership of your valuable asset.",
  },
];

/* =====================================================
   COMPONENT
===================================================== */

function LAP() {
  const cms = useCms();
  const pageCms = cms.products.productPages["lap"];
  const faqs = sortItems(pageCms.faqs).filter(x => x.published !== false);
  const [openFaq, setOpenFaq] = useState(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const visibleFaqs = showAllFaqs ? faqs : faqs.slice(0, 3);

  const toggleShowMore = () => {
    setShowAllFaqs(!showAllFaqs);
    setOpenFaq(null);
  };

  return (
    <main className="lap-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="lap-hero">

        <div className="lap-hero-visual">
          <img
            src={pageCms.heroImage}
            alt="Loan Against Property"
          />

          <div className="lap-hero-overlay"></div>

          <div className="lap-hero-text">
            <h1>
              Loan Against <span>Property</span>
            </h1>

            <p>
              We offer flexible tenures, competitive interest rates,
              and a hassle-free process to help you make the most
              of your property’s potential.
            </p>
          </div>
        </div>

        {/* ELIGIBILITY CARD */}
        <div className="lap-eligibility-card">

          <h2>
            Check Your Loan Eligibility in Just
            <br />
            <span>2 minutes?</span>
          </h2>

          <div className="lap-eligibility-list">

            <div className="lap-eligibility-item">
              <img
                src={images.interestRateIcon}
                alt=""
              />
              <strong>
                Attractive interest rates
              </strong>
            </div>

            <div className="lap-eligibility-item">
              <img
                src={images.flexibleTermsIcon}
                alt=""
              />
              <strong>
                Flexible Terms
              </strong>
            </div>

            <div className="lap-eligibility-item">
              <img
                src={images.quickApprovalIcon}
                alt=""
              />
              <strong>
                Quick approval
              </strong>
            </div>

          </div>

          <button
            type="button"
            className="lap-eligibility-button"
          >
            Check Eligibility Now!
          </button>

        </div>

      </section>

      {/* =================================================
          WHAT YOU'LL NEED TO APPLY
      ================================================= */}

      <section className="lap-application">

        <div className="lap-section-heading">
          <h2>
            What You’ll Need to Apply
          </h2>
        </div>

        <div className="lap-info-grid">

          {/* =================================================
              ELIGIBILITY CRITERIA
          ================================================= */}

          <div className="lap-info-card">

            <h3>
              Eligibility Criteria
            </h3>

            <div className="lap-info-list">

              {/* LOAN AMOUNT */}
              <div className="lap-info-item">
                <span className="lap-info-arrow">
                  ➤
                </span>

                <div>
                  <span className="lap-info-label">
                    Loan Amount
                  </span>

                  <p>
                    ₹10 Lakhs to 5 Crore
                  </p>
                </div>
              </div>

              {/* LOAN TENURE */}
              <div className="lap-info-item">
                <span className="lap-info-arrow">
                  ➤
                </span>

                <div>
                  <span className="lap-info-label">
                    Loan Tenure
                  </span>

                  <p>
                    Up to 7 years
                  </p>
                </div>
              </div>

              {/* CREDIT SCORE */}
              <div className="lap-info-item">
                <span className="lap-info-arrow">
                  ➤
                </span>

                <div>
                  <span className="lap-info-label">
                    Credit Score
                  </span>

                  <p>
                    650+
                  </p>
                </div>
              </div>

              {/* BUSINESS AGE */}
              <div className="lap-info-item">
                <span className="lap-info-arrow">
                  ➤
                </span>

                <div>
                  <span className="lap-info-label">
                    Business Age
                  </span>

                  <p>
                    Minimum 22 years (age should be
                    minimum 65 years at the time of loan
                    maturity)
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* =================================================
              REQUIRED DOCUMENTS
          ================================================= */}

          <div className="lap-info-card">

            <h3>
              Required Documents
            </h3>

            <div className="lap-info-list">

              {/* KYC DETAILS */}
              <div className="lap-info-item">
                <span className="lap-info-arrow">
                  ➤
                </span>

                <div>
                  <span className="lap-info-label">
                    KYC Details
                  </span>

                  <p>
                    Aadhar Card, PAN Card
                  </p>
                </div>
              </div>

              {/* FINANCIAL DOCUMENTS */}
              <div className="lap-info-item">
                <span className="lap-info-arrow">
                  ➤
                </span>

                <div>
                  <span className="lap-info-label">
                    Financial Documents
                  </span>

                  <p>
                    ITRs, GST returns, bank statements +
                    Individual Certificate
                  </p>
                </div>
              </div>

              {/* CERTIFICATE */}
              <div className="lap-info-item">
                <span className="lap-info-arrow">
                  ➤
                </span>

                <div>
                  <span className="lap-info-label">
                    Certificate
                  </span>

                  <p>
                    Udyam Certificate
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* =================================================
              OUR TERMS
          ================================================= */}

          <div className="lap-info-card">

            <h3>
              Our Terms
            </h3>

            <div className="lap-info-list">

              {/* INTEREST RATE */}
              <div className="lap-info-item">
                <span className="lap-info-arrow">
                  ➤
                </span>

                <div>
                  <span className="lap-info-label">
                    Interest Rate
                  </span>

                  <p>
                    Starting from @1.50% per month
                  </p>
                </div>
              </div>

              {/* STABLE INCOME & EMPLOYMENT */}
              <div className="lap-info-item">
                <span className="lap-info-arrow">
                  ➤
                </span>

                <div>
                  <span className="lap-info-label">
                    Stable Income &amp; Employment
                  </span>

                  <p>
                    Minimum work experience of 2+ years.
                  </p>
                </div>
              </div>

              {/* PROPERTY OWNERSHIP */}
              <div className="lap-info-item">
                <span className="lap-info-arrow">
                  ➤
                </span>

                <div>
                  <span className="lap-info-label">
                    Property Ownership
                  </span>

                  <p>
                    Minimum 3 years
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          LOAN AGAINST PROPERTY BENEFITS
      ================================================= */}

      <section className="lap-benefits">

        <div className="lap-benefits-inner">

          <h2>
            Loan Against Property Benefits
          </h2>

          <div className="lap-benefits-grid">

            {benefits.map((benefit) => (
              <div
                className="lap-benefit-card"
                key={benefit.title}
              >

                <div className="lap-benefit-icon">
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

      {/* =================================================
          WHY VALLABHI CAPITAL
      ================================================= */}

      <section className="lap-why">

        <div className="lap-why-heading">
          <h2>
            Why Vallabhi Capital?
          </h2>
        </div>

        <div className="lap-why-box">

          <div className="lap-why-grid">

            <div className="lap-why-item">
              <h3>
                Property-Backed Funding
              </h3>
            </div>

            <div className="lap-why-item">
              <h3>
                Competitive Interest Rates
              </h3>
            </div>

            <div className="lap-why-item">
              <h3>
                Quick Processing
              </h3>
            </div>

            <div className="lap-why-item">
              <h3>
                MSME-Focused Expertise
              </h3>
            </div>

            <div className="lap-why-item">
              <h3>
                Digital &amp; Minimal Documentation
              </h3>
            </div>

            <div className="lap-why-item">
              <h3>
                Strengthen Business Liquidity
              </h3>
            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          FAQ
      ================================================= */}

      <section className="lap-faq shared-faq">

        <div className="lap-faq-inner">

          <h2>
            Frequently Asked Questions
          </h2>

          <div className="lap-faq-list shared-faq-list">

            {visibleFaqs.map((faq, index) => {

              const isOpen = openFaq === index;

              return (
                <div
                  className={`lap-faq-item shared-faq-item ${
                    isOpen ? "open" : ""
                  }`}
                  key={`${faq.question}-${index}`}
                >

                  <button
                    type="button"
                    className="lap-faq-question shared-faq-question"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                  >

                    <span>
                      {faq.question}
                    </span>

                    <span className="lap-faq-dropdown">

                      <span
                        className={`lap-faq-chevron ${
                          isOpen ? "open" : ""
                        }`}
                      ></span>

                    </span>

                  </button>

                  {isOpen && (
                    <div className="lap-faq-answer shared-faq-answer">
                      {faq.answer}
                    </div>
                  )}

                </div>
              );

            })}

          </div>

          {/* =================================================
              SHOW MORE / SHOW LESS
          ================================================= */}

          {faqs.length > 3 && (
            <button
              type="button"
              className="lap-faq-bottom-button"
              onClick={toggleShowMore}
              aria-label={
                showAllFaqs
                  ? "Show fewer FAQs"
                  : "Show more FAQs"
              }
            >

              <span
                className={`lap-faq-bottom-chevron ${
                  showAllFaqs ? "open" : ""
                }`}
              ></span>

            </button>
          )}

        </div>

      </section>

    </main>
  );
}

export default LAP;