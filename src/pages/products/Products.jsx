import { useState } from "react";
import { useCms, sortItems } from "../../cms";
import "./Products.css";

/*
=========================================================
IMAGE FILES
=========================================================

Put your images inside:

public/images/products/

Then change ONLY the filenames below.

Example:

public/images/products/msme-loan.webp
public/images/products/loan-against-property.webp

The image names below are placeholders.
=========================================================
*/

const images = {
  logo: "/images/products/LOGO.webp",

  // Loan We Offered
  msmeLoan: "/images/products/MSME-LOAN.webp",
  loanAgainstProperty: "/images/products/LOAN-AGAINST-PROPERTY.webp",
  machineryEquipment: "/images/products/MACHINERY-EQUIPMENT.webp",
  greenFinance: "/images/products/GREEN-FINANCE.webp",
  midCorporate: "/images/products/MID-CORPORATE.webp",
  microEnterprises: "/images/products/MICRO-ENTERPRISES.webp",

  // Supply Chain
  purchaseFinance: "/images/products/PURCHASE-FINANCE.webp",
  workOrderFinance: "/images/products/WORK-ORDER-FINANCE.webp",
  invoiceDiscounting: "/images/products/INVOICE-DISCOUNTING.webp",
  vendorFinance: "/images/products/VENDOR-FINANCE.webp",

  // Eligibility icons
  interestRateIcon: "/images/products/INTEREST-RATE-ICON.webp",
  flexibleTermsIcon: "/images/products/FLEXIBLE-TERMS-ICON.webp",
  quickApprovalIcon: "/images/products/QUICK-APPROVAL-ICON.webp",

  // Footer social icons
  linkedin: "/images/products/LINKEDIN.webp",
  facebook: "/images/products/FACEBOOK.webp",
  instagram: "/images/products/INSTAGRAM.webp",
};


/*
=========================================================
DATA
=========================================================
*/

const loanProducts = [
  {
    image: images.msmeLoan,
    title: "MSME Loan",
    description: "Fuel your business expansion, new venture or startups",
  },
  {
    image: images.loanAgainstProperty,
    title: "Loan Against Property",
    description:
      "A hassle-free process to help you make the most of your property’s potential.",
  },
  {
    image: images.machineryEquipment,
    title: "Machinery & Equipment",
    description:
      "We provide financial support to businesses looking to invest in essential machinery.",
  },
  {
    image: images.greenFinance,
    title: "Green Finance",
    description:
      "Powering a sustainable future with smart financing for Solar, EV & Green Energy solutions.",
  },
  {
    image: images.midCorporate,
    title: "Mid - Corporate",
    description:
      "Flexible funding designed to support mid-corporate growth.",
  },
  {
    image: images.microEnterprises,
    title: "Micro Enterprises",
    description:
      "Flexible, fast & reliable funding for growing enterprises.",
  },
];

const supplyProducts = [
  {
    image: images.purchaseFinance,
    title: "Purchase Finance",
    description: "Fund your raw material needs with flexible finance.",
  },
  {
    image: images.workOrderFinance,
    title: "Work Order Finance",
    description: "Turn tender opportunities into business with flexible finance.",
  },
  {
    image: images.invoiceDiscounting,
    title: "Invoice Discounting",
    description: "Improve cash flow with smarter receivables financing.",
  },
  {
    image: images.vendorFinance,
    title: "Vendor Finance",
    description:
      "Keep your supply chain moving with flexible vendor finance.",
  },
];




/*
=========================================================
VIEW MORE BUTTON
=========================================================
*/

function ViewMore({ href }) {
  return (
    <a href={href} className="product-view-more">
      <span>View More</span>
      <span className="view-more-arrow">›</span>
    </a>
  );
}


/*
=========================================================
PRODUCT CARD
=========================================================
*/

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-card-image">
        <img src={product.image || product.productLogo} alt={product.title} />
      </div>

      <div className="product-card-content">
        <h3>{product.title}</h3>

        <p>{product.description}</p>

        <ViewMore href={`/products/${product.slug}`} />
      </div>
    </div>
  );
}


/*
=========================================================
ELIGIBILITY CARD
=========================================================
*/

function EligibilityCard() {
  return (
    <div className="eligibility-card">
      <h2>
        Get a Loan Sanction in just <span>48 hours</span>
      </h2>

      <div className="eligibility-item">
        <img src={images.interestRateIcon} alt="" />
        <span>Attractive interest rates</span>
      </div>

      <div className="eligibility-item">
        <img src={images.flexibleTermsIcon} alt="" />
        <span>Flexible Terms</span>
      </div>

      <div className="eligibility-item">
        <img src={images.quickApprovalIcon} alt="" />
        <span>Quick approval</span>
      </div>

      <button type="button" className="eligibility-button" onClick={() => window.dispatchEvent(new CustomEvent("vc-open-application"))}>
        Apply Now
      </button>
    </div>
  );
}


/*
=========================================================
HERO
=========================================================
*/

function HeroSection() {
  return (
    <section className="products-hero">
      <div className="hero-text">
        <h1>
          Financing Solutions for <span>Every Business Need</span>
        </h1>

        <p>
          From personal to business financing, Vallabhi Capital offers
          flexible solutions to help you achieve your goals with ease.
        </p>
      </div>

      <EligibilityCard />
    </section>
  );
}


/*
=========================================================
LOAN SECTION
=========================================================
*/

function LoanSection({ cms }) {
  const products = sortItems(cms.items || []).filter(p => p.published !== false && (p.category || "loan") !== "supply-chain");
  return (
    <section className="loan-section">
      <h2>Loans We Offered</h2>
      <p className="section-description">We provide the financial support you need with flexible tailored loan options.</p>
      <div className="loan-grid">
        {products.map(product => <ProductCard key={product.id} product={{...product, title: product.name, description: product.shortDescription, image: product.cardImage}} />)}
      </div>
    </section>
  );
}

/*
=========================================================
SUPPLY CHAIN
=========================================================
*/

function SupplyChainSection({ cms }) {
  const products = sortItems(cms.items || []).filter(p => p.published !== false && p.category === "supply-chain");
  if (!products.length) return null;
  return (
    <section className="supply-section">
      <h2>Supply Chain</h2>
      <p className="section-description">Improve cash flow and empower your business with supply chain finance.</p>
      <div className="supply-grid">
        {products.map(product => <ProductCard key={product.id} product={{...product, title: product.name, description: product.shortDescription, image: product.cardImage}} />)}
      </div>
    </section>
  );
}

/* 
=========================================================
WHY VALLABHI CAPITAL
=========================================================
*/

const defaultWhyChooseItems = [
  { text: "Tailored Financing Solutions", icon: "₹" },
  { text: "Simple Documentation Process", icon: "📝" },
  { text: "Flexible Loan Structure", icon: "⚖" },
  { text: "Competitive Financing Options", icon: "📊" },
  { text: "Faster Credit Assessment", icon: "⚡" },
  { text: "Dedicated Customer Support", icon: "🤝" },
];

function WhyChooseSection({ cms }) {
  return (
    <section className="why-section">

      <div className="why-container">

        {/* =================================================
            HEADING
        ================================================= */}

        <h2>Why Vallabhi Capital?</h2>

        <p className="why-subtitle">
          Customized Financing Solutions for Your Business
        </p>


        {/* =================================================
            BENEFITS GRID
        ================================================= */}

        <div className="why-grid">

          {(cms.whyPoints?.length ? cms.whyPoints.map(x => ({text:x.title || x.text, icon:x.image || x.icon || "✓"})) : defaultWhyChooseItems).map((item) => (
            <div
              className="why-item"
              key={item.text}
            >
              <span className="why-item-icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="why-item-text">{item.text}</span>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

/*
=========================================================
FAQ
=========================================================
*/

/*
function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section shared-faq">
      <h2>
        Frequently Asked Questions
      </h2>

      <div className="faq-list">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div className="faq-item" key={faq.question}>
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={isOpen}
              >
                <span>
                  <strong>{index + 1}.</strong>{" "}
                  {faq.question}
                </span>

                <span className={`faq-arrow ${isOpen ? "open" : ""}`}>
                  ↓
                </span>
              </button>

              {isOpen && (
                <div className="faq-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="faq-bottom-arrow">
        ↓
      </div>
    </section>
  );
}
*/

function FAQSection({ cms }) {
  const [showAll, setShowAll] = useState(false);
  const faqs = sortItems(cms.faqs).filter(x => x.published !== false);
  const [openFaq, setOpenFaq] = useState(null);

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 3);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="faq-inner">

        <div className="faq-heading">
          <h2>Frequently Asked Questions</h2>
        </div>

        <div className="faq-list shared-faq-list">
          {visibleFaqs.map((faq, index) => {
            const isOpen = openFaq === index;

            return (
              <div
                className={`faq-item shared-faq-item ${isOpen ? "active" : ""}`}
                key={faq.question}
              >
                <button
                  type="button"
                  className="faq-question shared-faq-question"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>

                  <span className={`faq-dropdown ${isOpen ? "open" : ""}`}>
                    <span className="faq-chevron"></span>
                  </span>
                </button>

                {isOpen && (
                  <div className="faq-answer shared-faq-answer">
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
            className={`faq-more-button ${showAll ? "open" : ""}`}
            onClick={() => setShowAll(!showAll)}
            aria-label={
              showAll ? "Show fewer FAQs" : "Show more FAQs"
            }
          >
            <span className="faq-more-chevron"></span>
          </button>
        )}

      </div>
    </section>
  );
}


/*
=========================================================
FOOTER
=========================================================
*/

/*
function Footer() {
  return (
    <footer className="products-footer">
      <div className="footer-inner">

        {/* COLUMN 1 * /}
        <div className="footer-company">

          <img
            src={images.logo}
            alt="Vallabhi Capital"
            className="footer-logo"
          />

          <div className="follow-us">
            <span>Follow us</span>

            <div className="social-icons">
              <img src={images.linkedin} alt="LinkedIn" />
              <img src={images.facebook} alt="Facebook" />
              <img src={images.instagram} alt="Instagram" />
            </div>
          </div>

          <div className="office-block">
            <h4>Corporate Office</h4>

            <p>
              Office No. 1017-18, 10th Floor, World Trade
              Tower, Plot No, 1, Delhi Noida Direct
              Flyway, Block B, Sector 16, Noida, Uttar
              Pradesh - 201301
            </p>
          </div>

          <div className="office-block">
            <h4>Head Office</h4>

            <p>
              B-303, Rustomjee Central Park Business
              Spaces Andheri - Kurla Rd, Chakala, Andheri
              East, Mumbai, Maharashtra - 400093
            </p>
          </div>

          <div className="office-block">
            <h4>Registered Office</h4>

            <p>
              SF-4C, Second Floor, Rishabh Ipex
              Mall, Patparganj, IP Extension, Delhi -
              110092
            </p>
          </div>

          <div className="footer-contact">
            <h4>FOR Business Enquiry</h4>

            <p>
              Email:
              <strong>office@vallabhicapital.com</strong>
            </p>

            <p>
              Toll Free:
              <strong>1800-890-0622</strong>
            </p>
          </div>
        </div>


        {/* COLUMN 2 * /}
        <div className="footer-column">
          <h3>Our Products</h3>

          <p>MSME Loan</p>
          <p>Loan Against Property</p>
          <p>Machinery &amp; Equipment</p>
          <p>Green Finance</p>
          <p>Mid - Corporate</p>
          <p>Micro Enterprises</p>
          <p>Purchase Financing</p>
          <p>Work Order Finance</p>
          <p>Invoice Discounting</p>
          <p>Vendor Finance</p>
        </div>


        {/* COLUMN 3 * /}
        <div className="footer-column">
          <h3>Industries</h3>

          <p>Auto &amp; Auto Ancillary</p>
          <p>Hospitality</p>
          <p>Construction</p>
          <p>Logistic</p>
          <p>Capital Goods</p>
          <p>Pharma Health</p>
          <p>Micro Enterprises</p>
          <p>Agro</p>
          <p>Chemical</p>
          <p>E - Mobility &amp; Green</p>

          <div className="footer-contact grievances">
            <h4>FOR GRIEVANCES</h4>

            <p>
              Email:
              <strong>compliance@vallabhicapital.com</strong>
            </p>

            <p>
              Call:
              <strong>+91-844-869-4983</strong>
            </p>
          </div>
        </div>


        {/* COLUMN 4 * /}
        <div className="footer-column">
          <h3>Quick Links</h3>

          <p>About Us</p>
          <p>Value | Mission | Vision</p>
          <p>Board Directors | Team</p>
          <p>Blogs</p>
          <p>Lending Partners</p>
          <p>Technology Partners</p>
          <p>ESG</p>
          <p>Career</p>
          <p>Gallery</p>

          <div className="company-policy">
            <h3>Company Policy</h3>

            <p>Privacy Policy</p>
            <p>Terms &amp; Conditions</p>
            <p>Refund &amp; Cancellation</p>
          </div>
        </div>
      </div>

      <div className="copyright">
        @ 2026 Vallabhicapital.com. All Rights Reserved
      </div>
    </footer>
  );
}
  */


/*
=========================================================
PRODUCT PAGE
=========================================================
*/

export default function Products() {
  const cms = useCms();
  return (
    <main className="products-page">
      <HeroSection />

      <LoanSection cms={cms.products} />

      <SupplyChainSection cms={cms.products} />

      <WhyChooseSection cms={cms.products} />

      <FAQSection cms={cms.products} />

      {/* <Footer /> */}
    </main>
  );
}