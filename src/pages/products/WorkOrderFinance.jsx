import ProductDetailTemplate from "./ProductDetailTemplate";

const benefits = [
    {"image": "/images/products/MSME-BENEFIT-1.webp", "title": "Fast & Flexible Financing", "text": "Get quick access to funds and pay interest only on the credit you actually use."},
    {"image": "/images/products/MSME-BENEFIT-2.webp", "title": "Business Growth", "text": "Access timely financing to increase sales, seize new opportunities, and unlock greater revenue potential."},
    {"image": "/images/products/MSME-BENEFIT-3.webp", "title": "Stronger Supply Chains", "text": "Support timely supplier payments and build stronger, more reliable supply chain relationships."}
  ];
const whyItems = [
    ["Unsecured Working Capital", "✓"],
    ["Rapid Credit Approval", "✓"],
    ["Flexible Repayment Options", "✓"],
    ["Cash Flow-Based Financing", "✓"],
    ["Competitive Interest Rates", "✓"],
    ["Fully Digital Journey", "✓"]
  ];
const faqs = [
    {"question": "What documents do I need to apply for Work Order Finance?", "answer": "Basic KYC, business, financial, bank statement, GST, and work order documents may be required, subject to eligibility."},
    {"question": "Is Work Order Finance available to government contractors and subcontractors?", "answer": "Yes, eligible government contractors and subcontractors can apply, subject to Vallabhi Capital’s credit and eligibility criteria."},
    {"question": "Can I finance multiple ongoing work orders at the same time?", "answer": "Yes, multiple work orders may be financed, subject to credit assessment, repayment capacity, and applicable terms."}
  ];

export default function WorkOrderFinance() {
  return <ProductDetailTemplate
    cmsKey="work-order-finance"
    title="Work Order Finance"
    titleAccent=""
    description="Execute tenders from autonomous and government bodies, as well as other reputed organizations, with flexible working capital finance. Access timely funds to manage procurement, project expenses, and operational requirements efficiently. Meet tender-related financial commitments without disrupting your cash flow. Focus on delivering projects on time while keeping your business operations running smoothly. Grow your business by taking on more opportunities with the right financial support."
    heroAlt="Work Order Finance"
    heroImage="/images/products/WORK-ORDER-FINANCE.webp"
    benefits={benefits}
    whyItems={whyItems}
    initialFaqs={faqs}
  />;
}
