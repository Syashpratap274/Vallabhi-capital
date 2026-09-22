import { useState } from "react";
import { useCms, sortItems } from "../../cms";
import "./MachineryAndEquipment.css";

/* =====================================================
   IMAGE PATHS
===================================================== */

const images = {
  machineryHero: "/images/products/machinery-and-equipment.webp",

  interestRateIcon: "/images/products/INTEREST-RATE-ICON.webp",
  flexibleTermsIcon: "/images/products/FLEXIBLE-TERMS-ICON.webp",
  quickApprovalIcon: "/images/products/QUICK-APPROVAL-ICON.webp",

  benefit1: "/images/products/MSME-BENEFIT-1.webp",
  benefit2: "/images/products/MSME-BENEFIT-2.webp",
  benefit3: "/images/products/MSME-BENEFIT-3.webp",
};

/* =====================================================
   MACHINERY & EQUIPMENT FAQs
===================================================== */



/* =====================================================
   MACHINERY BENEFITS
===================================================== */

const benefits = [
  {
    image: images.benefit1,
    title: "Improve Business Efficiency",
    text:
      "Invest in better equipment to increase productivity, streamline operations and meet growing demand.",
  },
  {
    image: images.benefit2,
    title: "Support Your Next Phase of Growth",
    text:
      "Get the financial support you need to expand capacity, modernise operations and take on bigger opportunities.",
  },
  {
    image: images.benefit3,
    title: "Stay Ahead with Modern Equipment",
    text:
      "Invest in updated technology and equipment to stay competitive, improve quality and keep your business ready for future growth.",
  },
];

/* =====================================================
   COMPONENT
===================================================== */

function MachineryAndEquipment() {
  const cms = useCms();
  const pageCms = cms.products.productPages["machinery"];
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
    <main className="machinery-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="machinery-hero">

        <div className="machinery-hero-visual">

          <img
            src={pageCms.heroImage}
            alt="Machinery and Equipment"
          />

          <div className="machinery-hero-overlay"></div>

          <div className="machinery-hero-text">

            <h1>
              Machinery <span>&amp; Equipment</span>
            </h1>

            <p>
              Enhance your business operations with the right
              tools and technology. Our Equipment &amp; Machinery
              Loans provide financial support to businesses
              looking to invest in essential machinery whether
              brand-new or pre-owned.
            </p>

          </div>

        </div>

        {/* ELIGIBILITY CARD */}
        <div className="machinery-eligibility-card">

          <h2>
            Check Your Loan Eligibility in Just
            <br />
            <span>2 minutes?</span>
          </h2>

          <div className="machinery-eligibility-list">

            <div className="machinery-eligibility-item">

              <img
                src={images.interestRateIcon}
                alt=""
              />

              <strong>
                Attractive interest rates
              </strong>

            </div>

            <div className="machinery-eligibility-item">

              <img
                src={images.flexibleTermsIcon}
                alt=""
              />

              <strong>
                Flexible Terms
              </strong>

            </div>

            <div className="machinery-eligibility-item">

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
            className="machinery-eligibility-button"
          >
            Check Eligibility Now!
          </button>

        </div>

      </section>

      {/* =================================================
          WHAT YOU'LL NEED TO APPLY
      ================================================= */}

      <section className="machinery-application">

        <div className="machinery-section-heading">

          <h2>
            What You’ll Need to Apply
          </h2>

        </div>

        <div className="machinery-info-grid">

          {/* =================================================
              ELIGIBILITY CRITERIA
          ================================================= */}

          <div className="machinery-info-card">

            <h3>
              Eligibility Criteria
            </h3>

            <div className="machinery-info-list">

              {/* LOAN AMOUNT */}
              <div className="machinery-info-item">

                <span className="machinery-info-arrow">
                  ➤
                </span>

                <div>

                  <span className="machinery-info-label">
                    Loan Amount
                  </span>

                  <p>
                    ₹10 Lakhs to 30 Lakhs
                  </p>

                </div>

              </div>

              {/* FLEXIBLE TENURE */}
              <div className="machinery-info-item">

                <span className="machinery-info-arrow">
                  ➤
                </span>

                <div>

                  <span className="machinery-info-label">
                    Loan Tenure
                  </span>

                  <p>
                    From 1 year to 5 years
                  </p>

                </div>

              </div>

              {/* CREDIT SCORE */}
              <div className="machinery-info-item">

                <span className="machinery-info-arrow">
                  ➤
                </span>

                <div>

                  <span className="machinery-info-label">
                    Credit Score
                  </span>

                  <p>
                    650+ (higher for unsecured portion)
                  </p>

                </div>

              </div>

              {/* FAIR PROCESSING */}
              <div className="machinery-info-item">

                <span className="machinery-info-arrow">
                  ➤
                </span>

                <div>

                  <span className="machinery-info-label">
                    Fair Processing
                  </span>

                  <p>
                    Transparent and affordable charges
                  </p>

                </div>

              </div>

              {/* INDUSTRY-WIDE USABILITY */}
              <div className="machinery-info-item">

                <span className="machinery-info-arrow">
                  ➤
                </span>

                <div>

                  <span className="machinery-info-label">
                    Industry-wide Usability
                  </span>

                  <p>
                    Ideal for fabricators, manufacturers
                    and construction businesses.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              REQUIRED DOCUMENTS
          ================================================= */}

          <div className="machinery-info-card">

            <h3>
              Required Documents
            </h3>

            <div className="machinery-info-list">

              {/* KYC DETAILS */}
              <div className="machinery-info-item">

                <span className="machinery-info-arrow">
                  ➤
                </span>

                <div>

                  <span className="machinery-info-label">
                    KYC Details
                  </span>

                  <p>
                    Aadhar Card, PAN Card
                  </p>

                </div>

              </div>

              {/* FINANCIAL DOCUMENTS */}
              <div className="machinery-info-item">

                <span className="machinery-info-arrow">
                  ➤
                </span>

                <div>

                  <span className="machinery-info-label">
                    Financial Documents
                  </span>

                  <p>
                    ITRs, GST returns, Udyam registration,
                    bank statements
                  </p>

                </div>

              </div>

              {/* COLLATERAL OPTIONS */}
              <div className="machinery-info-item">

                <span className="machinery-info-arrow">
                  ➤
                </span>

                <div>

                  <span className="machinery-info-label">
                    Collateral Options
                  </span>

                  <p>
                    Flexible collateral options tailored
                    to secure your loan with ease.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              OUR TERMS
          ================================================= */}

          <div className="machinery-info-card">

            <h3>
              Our Terms
            </h3>

            <div className="machinery-info-list">

              {/* INTEREST RATE */}
              <div className="machinery-info-item">

                <span className="machinery-info-arrow">
                  ➤
                </span>

                <div>

                  <span className="machinery-info-label">
                    Interest Rate
                  </span>

                  <p>
                    Starting from @1.40% per month
                  </p>

                </div>

              </div>

              {/* LOAN PURPOSE */}
              <div className="machinery-info-item">

                <span className="machinery-info-arrow">
                  ➤
                </span>

                <div>

                  <span className="machinery-info-label">
                    Loan Purpose
                  </span>

                  <p>
                    Purchase of new / pre-owned
                    equipment &amp; machinery.
                  </p>

                </div>

              </div>

              {/* BUSINESS TYPE */}
              <div className="machinery-info-item">

                <span className="machinery-info-arrow">
                  ➤
                </span>

                <div>

                  <span className="machinery-info-label">
                    Business Type
                  </span>

                  <p>
                    Manufacturing, construction,
                    industrial firms, etc.
                  </p>

                </div>

              </div>

              {/* OPERATIONAL HISTORY */}
              <div className="machinery-info-item">

                <span className="machinery-info-arrow">
                  ➤
                </span>

                <div>

                  <span className="machinery-info-label">
                    Operational History
                  </span>

                  <p>
                    Minimum track record of 3 years
                    with operating profit.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          MACHINERY & EQUIPMENT BENEFITS
      ================================================= */}

      <section className="machinery-benefits">

        <div className="machinery-benefits-inner">

          <h2>
            Machinery &amp; Equipment Benefits
          </h2>

          <div className="machinery-benefits-grid">

            {benefits.map((benefit) => (

              <div
                className="machinery-benefit-card"
                key={benefit.title}
              >

                <div className="machinery-benefit-icon">

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

      <section className="machinery-why">

        <div className="machinery-why-heading">

          <h2>
            Why Vallabhi Capital?
          </h2>

        </div>

        <div className="machinery-why-box">

          <div className="machinery-why-grid">

            <div className="machinery-why-item">
              <h3>
                Purchase New Machinery
              </h3>
            </div>

            <div className="machinery-why-item">
              <h3>
                Upgrade Existing Equipment
              </h3>
            </div>

            <div className="machinery-why-item">
              <h3>
                Expand production Capacity
              </h3>
            </div>

            <div className="machinery-why-item">
              <h3>
                Fund Business Expansion
              </h3>
            </div>

            <div className="machinery-why-item">
              <h3>
                Smart Automation
              </h3>
            </div>

            <div className="machinery-why-item">
              <h3>
                Higher Efficiency
              </h3>
            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          FAQ
      ================================================= */}

      <section className="machinery-faq shared-faq">

        <div className="machinery-faq-inner">

          <h2>
            Frequently Asked Questions
          </h2>

          <div className="machinery-faq-list shared-faq-list">

            {visibleFaqs.map((faq, index) => {

              const isOpen = openFaq === index;

              return (

                <div
                  className={`machinery-faq-item shared-faq-item ${
                    isOpen ? "open" : ""
                  }`}
                  key={`${faq.question}-${index}`}
                >

                  <button
                    type="button"
                    className="machinery-faq-question shared-faq-question"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                  >

                    <span>
                      {faq.question}
                    </span>

                    <span className="machinery-faq-dropdown">

                      <span
                        className={`machinery-faq-chevron ${
                          isOpen ? "open" : ""
                        }`}
                      ></span>

                    </span>

                  </button>

                  {isOpen && (

                    <div className="machinery-faq-answer shared-faq-answer">
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
              className="machinery-faq-bottom-button"
              onClick={toggleShowMore}
              aria-label={
                showAllFaqs
                  ? "Show fewer FAQs"
                  : "Show more FAQs"
              }
            >

              <span
                className={`machinery-faq-bottom-chevron ${
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

export default MachineryAndEquipment;