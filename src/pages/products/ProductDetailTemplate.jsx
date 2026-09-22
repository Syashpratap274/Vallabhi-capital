import { useState } from "react";
import { sortItems } from "../../cms";
import "./ProductDetailTemplate.css";

const ICONS = {
  interest: "/images/products/INTEREST-RATE-ICON.webp",
  flexible: "/images/products/FLEXIBLE-TERMS-ICON.webp",
  quick: "/images/products/QUICK-APPROVAL-ICON.webp",
  benefit1: "/images/products/MSME-BENEFIT-1.webp",
  benefit2: "/images/products/MSME-BENEFIT-2.webp",
  benefit3: "/images/products/MSME-BENEFIT-3.webp",
};
const fallbackBenefits = [
  {
    image: ICONS.benefit1,
    title: "Quick & Easy Funding",
    description:
      "Get access to hassle-free financing with a simple application process and faster loan approvals.",
  },
  {
    image: ICONS.benefit2,
    title: "Flexible Repayment Options",
    description:
      "Repay at your convenience with flexible tenure options designed around your business cash flow.",
  },
  {
    image: ICONS.benefit3,
    title: "Fuel Your Business Growth",
    description:
      "Use the financing solution to support expansion, working capital and new business opportunities.",
  },
];
const fallbackWhy = [
  "Finance Your Growth",
  "Transparent Financing",
  "Easy Repayment Options",
  "Business-Focused Expertise",
  "Simple Documentation",
  "Quick Approval",
];
const fallbackFaqs = [
  {
    question: "Who can apply for this financing solution?",
    answer:
      "Eligible businesses can apply subject to the applicable business profile, financial assessment and product criteria.",
  },
  {
    question: "What documents are required to apply?",
    answer:
      "Typically, KYC, business registration details, bank statements, GST returns and financial documents are required.",
  },
  {
    question: "How much financing can I get?",
    answer:
      "The eligible amount depends on the product, business profile, repayment capacity and applicable requirements.",
  },
  {
    question: "How long does the process take?",
    answer:
      "Processing timelines vary depending on documentation, verification and the assessment required.",
  },
];

function InfoCard({ title, items }) {
  return (
    <div className="product-detail-info-card">
      <h2>{title}</h2>
      <div className="product-detail-info-list">
        {(items || []).map((x, i) => (
          <div className="product-detail-info-item" key={x.id || i}>
            <span className="product-detail-info-arrow">▶</span>
            <div>
              <h3>{x.title || x.name}</h3>
              <p>{x.description || x.text || ""}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function FAQSection({ faqs }) {
  const [open, setOpen] = useState(null);
  const [all, setAll] = useState(false);
  const list = sortItems(faqs || []).filter((x) => x.published !== false);
  const visible = all ? list : list.slice(0, 3);
  return (
    <section className="faq-section shared-faq product-detail-faq">
      <div className="product-detail-faq-inner">
        <h2>Frequently Asked Questions</h2>
        <div className="shared-faq-list product-detail-faq-list">
          {visible.map((f, i) => (
            <div
              className={`shared-faq-item product-detail-faq-item ${open === i ? "open" : ""}`}
              key={f.id || i}
            >
              <button
                className="shared-faq-question product-detail-faq-question"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span>{f.question}</span>
                <span className="product-detail-faq-chevron shared-faq-chevron" />
              </button>
              {open === i && (
                <div className="shared-faq-answer product-detail-faq-answer">
                  {f.answer}
                </div>
              )}
            </div>
          ))}
        </div>
        {list.length > 3 && (
          <button
            className={`product-detail-faq-more ${all ? "open" : ""}`}
            onClick={() => {
              setAll(!all);
              setOpen(null);
            }}
            aria-label={all ? "Show Less" : "Show More"}
          />
        )}
      </div>
    </section>
  );
}

export default function ProductDetailTemplate({
  product,
  cmsKey,
  title: titleProp,
  description,
  heroImage,
  benefits: legacyBenefits,
  whyItems: legacyWhyItems,
  initialFaqs,
}) {
  const normalizedProduct = product || {
    name: titleProp || cmsKey || "Product",
    slug: cmsKey || "",
    heroSubtitle: description || "",
    heroParagraph: "",
    shortDescription: description || "",
    description: description || "",
    heroImage: heroImage || "",
    cardImage: heroImage || "",
    eligibility: [],
    documents: [],
    terms: [],
    benefits: Array.isArray(legacyBenefits) ? legacyBenefits : [],
    whyPoints: Array.isArray(legacyWhyItems)
      ? legacyWhyItems.map((item) => {
          if (typeof item === "string") return { title: item, image: "" };
          if (Array.isArray(item))
            return { title: item[0] || "", image: item[1] || "" };
          return {
            title: item?.title || item?.text || "",
            image: item?.image || "",
            description: item?.description || "",
          };
        })
      : [],
    faqs: initialFaqs || [],
  };

  const title = normalizedProduct.name || titleProp || "Product";
  const subtitle =
    normalizedProduct.heroSubtitle ||
    normalizedProduct.shortDescription ||
    normalizedProduct.description ||
    "Flexible financing designed around your business needs.";
  const heroParagraph = normalizedProduct.heroParagraph || "";
  const hero =
    normalizedProduct.heroImage ||
    normalizedProduct.cardImage ||
    "/images/products/MSME-LOAN.webp";
  const isCmsProduct = Boolean(product);
  const eligibility = isCmsProduct
    ? normalizedProduct.eligibility || []
    : normalizedProduct.eligibility?.length
      ? normalizedProduct.eligibility
      : [
          {
            title: "Loan Amount",
            description:
              "Flexible financing amount based on product and business profile.",
          },
          {
            title: "Business Profile",
            description:
              "Eligibility is subject to business profile and assessment.",
          },
        ];
  const documents = isCmsProduct
    ? normalizedProduct.documents || []
    : normalizedProduct.documents?.length
      ? normalizedProduct.documents
      : [
          {
            title: "KYC Details",
            description: "PAN, Aadhaar and applicable KYC documents.",
          },
          {
            title: "Financial Documents",
            description:
              "Bank statements, GST/ITR and applicable financial records.",
          },
        ];
  const terms = isCmsProduct
    ? normalizedProduct.terms || []
    : normalizedProduct.terms?.length
      ? normalizedProduct.terms
      : [
          {
            title: "Interest Rate",
            description: "As per the applicable product terms.",
          },
          {
            title: "Loan Tenure",
            description: "Tenure is based on product, profile and assessment.",
          },
        ];
  const benefitItems = (normalizedProduct.benefits || [])
    .filter((x) => x?.title || x?.description || x?.text)
    .slice(0, 3)
    .map((x) => ({
      id: x.id || x.title || Math.random().toString(36).slice(2),
      title: x.title || x.name || "",
      description: x.description || x.text || "",
      image: x.image || x.icon || "",
    }));
  const finalBenefits = isCmsProduct
    ? benefitItems
    : benefitItems.length === 3
      ? benefitItems
      : fallbackBenefits;
  const whyList = (normalizedProduct.whyPoints || [])
    .filter((x) => x?.title || x?.description || x?.text)
    .map((x) => ({
      id: x.id || x.title || Math.random().toString(36).slice(2),
      title: x.title || x.name || x.text || "",
      description: x.description || x.text || "",
      image: x.image || x.icon || "",
    }));
  const finalWhy = isCmsProduct
    ? whyList
    : whyList.length
      ? whyList
      : fallbackWhy.map((x) => ({ title: x, image: "" }));
  const faqs = isCmsProduct
    ? normalizedProduct.faqs || []
    : normalizedProduct.faqs?.length
      ? normalizedProduct.faqs
      : fallbackFaqs;

  return (
    <main className="product-detail-page">
      <section className="product-detail-hero">
        <img className="product-detail-hero-bg" src={hero} alt="" />
        <div className="product-detail-hero-overlay" />
        <div className="product-detail-hero-eligibility">
          <h2>
            Get a Loan Sanction in just<br></br> <span>48 hours</span>
          </h2>
          <div>
            <p>
              <img src={ICONS.interest} alt="" />
              Attractive interest rates
            </p>
            <p>
              <img src={ICONS.flexible} alt="" />
              Flexible Terms
            </p>
            <p>
              <img src={ICONS.quick} alt="" />
              Quick approval
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("vc-open-application"))
            }
          >
            Apply Now!
          </button>
        </div>
        <div className="product-detail-hero-copy">
          <h1>{title}</h1>
          <span>{subtitle}</span>
          {heroParagraph && <p>{heroParagraph}</p>}
        </div>
      </section>
      {(eligibility.length || documents.length || terms.length) > 0 && (
        <section className="product-detail-application">
          <div className="product-detail-section-heading">
            <h2>What You’ll Need to Apply</h2>
          </div>
          <div className="product-detail-info-grid">
            {eligibility.length > 0 && (
              <InfoCard title="Eligibility Criteria" items={eligibility} />
            )}{" "}
            {documents.length > 0 && (
              <InfoCard title="Required Documents" items={documents} />
            )}{" "}
            {terms.length > 0 && <InfoCard title="Our Terms" items={terms} />}
          </div>
        </section>
      )}
      {finalBenefits.length > 0 && (
        <section className="product-detail-benefits">
          <h2>{title} Benefits</h2>
          <div className="product-detail-benefits-grid">
            {finalBenefits.map((b, i) => (
              <div className="product-detail-benefit-card" key={b.id || i}>
                <div className="product-detail-benefit-icon">
                  <img src={b.image || fallbackBenefits[i]?.image} alt="" />
                </div>
                <h3>{b.title}</h3>
                <p>{b.description || b.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      {finalWhy.length > 0 && (
        <section className="product-detail-why">
          <h2>Why Vallabhi Capital?</h2>
          <div className="product-detail-why-box">
            <div className="product-detail-why-grid">
              {finalWhy.map((x, i) => (
                <div className="product-detail-why-item" key={x.id || i}>
                  {x.image ? (
                    <img src={x.image} alt="" />
                  ) : (
                    <span className="product-detail-why-fallback">✓</span>
                  )}
                  <span>{x.title || x.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {faqs.length > 0 && <FAQSection faqs={faqs} />}
    </main>
  );
}
