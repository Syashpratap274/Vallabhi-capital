import ProductDetailTemplate from "./ProductDetailTemplate";

const benefits = [
    {"image": "/images/products/MSME-BENEFIT-1.webp", "title": "Scalable & Cost-Effective Financing", "text": "Fulfil larger orders with multiple vendors while securing better raw-material prices through upfront payments."},
    {"image": "/images/products/MSME-BENEFIT-2.webp", "title": "Unsecured & Flexible Credit", "text": "Access vendor financing without pledging land or property, helping improve working capital and support business growth."},
    {"image": "/images/products/MSME-BENEFIT-3.webp", "title": "Fast & Digital Disbursement", "text": "Complete the financing process online and receive funds quickly after approval and verification."}
  ];
const whyItems = [
    ["Stronger Vendor Relationships", "✓"],
    ["Efficient Supply Chain", "✓"],
    ["Collateral-Free Credit", "✓"],
    ["Fast & Simple Approval", "✓"],
    ["Flexible & Transparent Financing", "✓"],
    ["Digital & Dedicated Support", "✓"]
  ];
const faqs = [
    {"question": "How quickly do suppliers receive payments under the Vendor Finance program?", "answer": "Eligible suppliers can receive funds promptly after invoice verification and approval, subject to the agreed terms."},
    {"question": "What benefits does Vendor Finance offer to anchor (buyer) companies?", "answer": "Vendor Finance helps anchors strengthen supplier relationships, improve supply-chain efficiency, and support smoother procurement and cash-flow management."},
    {"question": "What are the eligibility requirements and documents needed for Vendor Finance?", "answer": "Eligibility generally depends on the business profile, anchor relationship, invoices, and credit assessment. KYC, GST, financial statements, bank statements, and relevant business documents may be required."}
  ];

export default function VendorFinance() {
  return <ProductDetailTemplate
    cmsKey="vendor-finance"
    title="Vendor Finance"
    titleAccent=""
    description="Strengthen your supply chain with our anchor-led vendor finance solution. Provide vendors with timely access to working capital against eligible transactions, helping them manage cash flows and meet operational needs efficiently. Improve supplier relationships, ensure smoother business operations, and support uninterrupted procurement. With better financial flexibility across the supply chain, businesses can build stronger and more resilient vendor networks."
    heroAlt="Vendor Finance"
    heroImage="/images/products/VENDOR-FINANCE.webp"
    benefits={benefits}
    whyItems={whyItems}
    initialFaqs={faqs}
  />;
}
