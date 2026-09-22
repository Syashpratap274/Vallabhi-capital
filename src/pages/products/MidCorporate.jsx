import ProductDetailTemplate from "./ProductDetailTemplate";

const benefits = [
    {"image": "/images/products/MSME-BENEFIT-1.webp", "title": "Manage Working Capital Better", "text": "Meet day-to-day business needs, manage cash flow, and keep operations running smoothly."},
    {"image": "/images/products/MSME-BENEFIT-2.webp", "title": "Finance for Your Next Growth Move", "text": "Secure funding for new opportunities, business expansion, and long-term growth plans."},
    {"image": "/images/products/MSME-BENEFIT-3.webp", "title": "Funding for Business Expansion", "text": "Access financing to support new projects, capacity expansion, and growing business operations"}
  ];
const whyItems = [
    ["Business-Focused Credit Approach", "✓"],
    ["Solutions Built Around Your Business", "✓"],
    ["Dedicated Relationship Support", "✓"],
    ["Transparent Documentation Process", "✓"],
    ["Technology-Enabled Loan Journey", "✓"],
    ["Understanding of Growing Enterprises", "✓"]
  ];
const faqs = [
    {"question": "Who can apply for a Mid-Corporate Loan?", "answer": "Established businesses with a stable financial track record can apply based on their funding needs."},
    {"question": "What can I use a Mid-Corporate Loan for?", "answer": "You can use the funding for business expansion, working capital needs, asset purchases, project requirements, or other approved business purposes."},
    {"question": "How is the loan amount decided?", "answer": "The loan amount is based on your business profile, financial performance, and repayment capacity."}
  ];

export default function MidCorporate() {
  return <ProductDetailTemplate
    cmsKey="mid-corporate"
    title="Mid Corporate"
    titleAccent=""
    description="Running a small business comes with everyday expenses and new opportunities. Our financing helps you manage working capital, handle business needs, and invest in growth, so you can focus on running your business, not arranging funds."
    heroAlt="Mid Corporate"
    heroImage="/images/products/MID-CORPORATE.webp"
    benefits={benefits}
    whyItems={whyItems}
    initialFaqs={faqs}
  />;
}
