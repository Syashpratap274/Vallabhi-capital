import ProductDetailTemplate from "./ProductDetailTemplate";

const benefits = [
    {"image": "/images/products/MSME-BENEFIT-1.webp", "title": "Faster & Smarter Financing", "text": "Get quick approvals and instant digital disbursement, helping you access funds when you need them."},
    {"image": "/images/products/MSME-BENEFIT-2.webp", "title": "Flexible & Cost-Efficient Credit", "text": "Benefit from flexible terms, collateral-free financing, and interest charged based on usage."},
    {"image": "/images/products/MSME-BENEFIT-3.webp", "title": "Business Growth & Working Capital", "text": "Strengthen cash flow, improve profitability, and access funds to support day-to-day operations and growth."}
  ];
const whyItems = [
    ["Save on Purchases", "✓"],
    ["Collateral-Free Credit", "✓"],
    ["Lower Borrowing Costs", "✓"],
    ["Pay as You Use", "✓"],
    ["Fast Digital Approval", "✓"],
    ["Easy Repayment", "✓"]
  ];
const faqs = [
    {"question": "What is the interest rate for Purchase Finance?", "answer": "Purchase Finance is available at an interest rate of 1.3%."},
    {"question": "Can I finance purchases from multiple suppliers at the same time?", "answer": "Yes, you can finance purchases from multiple suppliers simultaneously."},
    {"question": "Will applying for Purchase Finance affect my CIBIL score?", "answer": "Yes, applying for Purchase Finance may affect your CIBIL score."}
  ];

export default function PurchaseFinance() {
  return <ProductDetailTemplate
    cmsKey="purchase-finance"
    title="Purchase Finance"
    titleAccent=""
    description="Procure raw materials for your business at the right price with flexible working capital finance. Manage supplier payments efficiently, maintain healthy cash flow, and keep your operations running smoothly. With timely access to funds, you can meet your business needs, take advantage of better purchase opportunities, and focus on sustainable growth."
    heroAlt="Purchase Finance"
    heroImage="/images/products/PURCHASE-FINANCE.webp"
    benefits={benefits}
    whyItems={whyItems}
    initialFaqs={faqs}
  />;
}
