import ProductDetailTemplate from "./ProductDetailTemplate";

const benefits = [
    {"image": "/images/products/MSME-BENEFIT-1.webp", "title": "Manage Cash Flow", "text": "Cover everyday business expenses without disrupting operations."},
    {"image": "/images/products/MSME-BENEFIT-2.webp", "title": "Buy Essential Equipment", "text": "Finance machinery, tools, or equipment needed for your work."},
    {"image": "/images/products/MSME-BENEFIT-3.webp", "title": "Stock Up When Needed", "text": "Maintain inventory and meet increased customer demand."}
  ];
const whyItems = [
    ["Built for Small Business Needs", "✓"],
    ["Simple, Business-Friendly Process", "✓"],
    ["Funding That Fits Your Growth", "✓"],
    ["Quick & Clear Credit Journey", "✓"],
    ["Support Beyond the Loan", "✓"]
  ];
const faqs = [
    {"question": "Who can apply for a Micro Enterprise Loan?", "answer": "Small business owners, traders, manufacturers, and self-employed entrepreneurs can apply, subject to eligibility criteria."},
    {"question": "What can I use a Micro Enterprise Loan for?", "answer": "The loan can be used for business expansion, working capital, inventory, equipment, or other genuine business requirements."},
    {"question": "What documents are required to apply?", "answer": "Typically, applicants may need KYC, business-related documents, banking details, and financial documents, depending on the loan profile."}
  ];

export default function MicroEnterprises() {
  return <ProductDetailTemplate
    cmsKey="micro-enterprises"
    title="Micro – Enterprises"
    titleAccent=""
    description="Running a small business comes with everyday expenses and new opportunities. Our financing helps you manage working capital, handle business needs, and invest in growth, so you can focus on running your business, not arranging funds."
    heroAlt="Micro – Enterprises"
    heroImage="/images/products/MICRO-ENTERPRISES.webp"
    benefits={benefits}
    whyItems={whyItems}
    initialFaqs={faqs}
  />;
}
