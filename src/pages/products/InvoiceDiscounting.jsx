import ProductDetailTemplate from "./ProductDetailTemplate";

const benefits = [
    {"image": "/images/products/MSME-BENEFIT-1.webp", "title": "Instant & Easy Financing", "text": "Get quick access to funds with a streamlined approval process and no collateral requirements."},
    {"image": "/images/products/MSME-BENEFIT-2.webp", "title": "Improved Cash Flow", "text": "Boost liquidity and maintain a healthy cash flow to manage everyday business expenses smoothly."},
    {"image": "/images/products/MSME-BENEFIT-3.webp", "title": "Flexible Credit Solutions", "text": "Choose flexible financing terms designed to match your business requirements and repayment capacity."}
  ];
const whyItems = [
    ["Instant Working Capital", "✓"],
    ["Collateral-Free Financing", "✓"],
    ["Competitive Interest Rates", "✓"],
    ["Fast & Simple Approval", "✓"],
    ["Flexible Repayment Options", "✓"],
    ["100% Digital & Transparent", "✓"]
  ];
const faqs = [
    {"question": "Can I select specific invoices for discounting, or do I need to discount all invoices?", "answer": "Yes, eligible businesses can select specific invoices for discounting, subject to Vallabhi Capital’s eligibility and approval criteria."},
    {"question": "How does invoice discounting differ from invoice factoring?", "answer": "Invoice discounting provides funds against invoices while the business generally continues managing collections. In factoring, the financier may also manage the collection process."},
    {"question": "Is invoice discounting suitable for businesses with longer payment cycles of 90 days or more?", "answer": "Yes, businesses with longer payment cycles may be eligible for invoice discounting, subject to invoice quality, buyer profile, and Vallabhi Capital’s credit assessment."}
  ];

export default function InvoiceDiscounting() {
  return <ProductDetailTemplate
    cmsKey="invoice-discounting"
    title="Invoice Discounting"
    titleAccent=""
    description="Discount your receivables and unlock funds faster with our bill discounting solution. Improve your cash inflows and maintain a healthy working capital cycle. Access funds against eligible invoices without waiting for payment due dates. Manage day-to-day business expenses and supplier payments more efficiently. Keep your business moving forward with timely access to working capital."
    heroAlt="Invoice Discounting"
    heroImage="/images/products/INVOICE-DISCOUNTING.webp"
    benefits={benefits}
    whyItems={whyItems}
    initialFaqs={faqs}
  />;
}
