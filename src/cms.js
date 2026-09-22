import { useEffect, useState } from "react";

export const CMS_KEY = "vallabhi_capital_admin_v2";
const CMS_API_BASE = String(import.meta.env?.VITE_CMS_API_URL || "").replace(/\/$/, "");

const seed = {
  homepage: {
    bannerImage: "/images/homepage/ff98552205afaf1d8bb88beb794c658de985a44d.png",
    productLogos: {"MSME Loan":"/images/homepage/loan icon/msme.png","Loan Against Property":"/images/homepage/loan icon/real-estate_942140 1.png","Equipment & Machinery Loan":"/images/homepage/loan icon/machinery.png","Green Finance":"/images/homepage/loan icon/green.png","Mid - Corporate":"/images/homepage/loan icon/corporate.png","Micro Enterprises":"/images/homepage/loan icon/micro.png"},
    industryLogos: {"Auto & Auto Ancillaries":"/images/homepage/50c425a9967f791184096f9b5f843b8d242ad903.png","Hospitality":"/images/homepage/71e6135943dd4547cdad0dd5938b8b823702ced3.png","Constructions":"/images/homepage/4176b7276d164a0a48b14ada47fd1fbd501cd696.png","Logistics":"/images/homepage/009aa8b89d3a1177ddab6140a9c065d50fdb0839.png","Capital Goods":"/images/homepage/2e2d8e51de8325fadb34750d01afb655a55af306.png","Pharmaceuticals":"/images/homepage/8526a6c0745b0692cc0f394a6389038d56971af6.png","Micro Enterprises":"/images/homepage/c53d88dfdd7fea47b11912f823bf56efc226cc6b.png","Chemical":"/images/homepage/30b382edc84d4f28ee4e34feb9ef65275cc3efab.png"},
    clientTestimonials: [
      { id: "home-t1", name: "Mr. Vikash Sharma", role: "CEO of an agriculture company", text: "Building a strong foundation for our tools manufacturing business required financial backing. Thanks to Vallabhi Capital’s support, we are confidently moving ahead in our journey of innovation and growth. Prabhas tools & Engineers Tools Manufacturer.", image: "/images/homepage/94813940a7aba3467f98512db80be8e6205f38c1.png", published: true, order: 1 }
    ],
    blogs: [
      { id: "blog-1", title: "Why Smart Indian Businesses Are Switching to Solar", content: "", image: "/images/homepage/e72008befa0dd20609be78a0f73e4ed0f898ab61.png", published: true, order: 1 }
    ],
    faqs: [
      { id: "home-f1", question: "How much business loan can I get?", answer: "The loan amount depends on your turnover, financial profile, repayment capacity, business vintage and security. We assess each business individually.", published: true, order: 1 },
      { id: "home-f2", question: "What documents do I need to apply for an MSME loan?", answer: "Typically, you’ll need KYC, business registration details, bank statements, GST returns and financial documents", published: true, order: 2 },
      { id: "home-f3", question: "How long does it take to get an MSME loan?", answer: "Once your documents and verification are complete, eligible applications can move forward quickly. Timelines vary by loan type and assessment.", published: true, order: 3 },
      { id: "home-f4", question: "Can I apply for a loan online, or do I need to visit a branch?", answer: "Yes, you can apply online through our website. Alternatively, you can visit our nearest branch for in-person assistance.", published: true, order: 4 },
      { id: "home-f5", question: "What types of loans does Vallabhi Capital provide?", answer: "Vallabhi Capital offers MSME Loans, Home Loans, Loan Against Property, Solar Loans, Equipment & Machinery Loans, Working Capital Loans, and Structured Finance Solutions.", published: true, order: 5 },
      { id: "home-f6", question: "How long does it take to process a loan application?", answer: "Processing time varies based on the loan type and documentation. Generally, it takes 2-5 business days for initial processing.", published: true, order: 6 }
    ]
  },
  products: {
    cardImages: {
      "MSME Loan": "/images/products/MSME-LOAN.webp",
      "Loan Against Property": "/images/products/LOAN-AGAINST-PROPERTY.webp",
      "Machinery & Equipment": "/images/products/MACHINERY-EQUIPMENT.webp",
      "Green Finance": "/images/products/GREEN-FINANCE.webp",
      "Mid - Corporate": "/images/products/MID-CORPORATE.webp",
      "Micro Enterprises": "/images/products/MICRO-ENTERPRISES.webp",
      "Purchase Finance": "/images/products/PURCHASE-FINANCE.webp",
      "Work Order Finance": "/images/products/WORK-ORDER-FINANCE.webp",
      "Invoice Discounting": "/images/products/INVOICE-DISCOUNTING.webp",
      "Vendor Finance": "/images/products/VENDOR-FINANCE.webp"
    },
    faqs: [
      { id: "prod-f1", question: "Can I apply a loan online, or do I need to visit a branch?", answer: "Yes, you can apply online through our website. Alternatively, you can visit our nearest branch for in-person assistance.", published: true, order: 1 },
      { id: "prod-f2", question: "What types of loans does Vallabhi Capital provide?", answer: "Vallabhi Capital offers MSME Loans, Home Loans, Loan Against Property, Solar Loans, Equipment & Machinery Loans, Working Capital Loans, and Structured Finance Solutions.", published: true, order: 2 },
      { id: "prod-f3", question: "What documents are required for a loan?", answer: "You’ll typically need KYC documents, income proof, bank statements, and loan-specific documents such as property or business papers.", published: true, order: 3 },
      { id: "prod-f4", question: "How long does it take to process a loan application?", answer: "Processing time varies based on the loan type and documentation. Generally, it takes 2-5 business days for initial processing.", published: true, order: 4 }
    ],
    productPages: {
      msme: { heroImage: "/images/products/1.webp", faqs: [
        { id: "msme-f1", question: "How much business loan can I get?", answer: "The loan amount depends on your turnover, financial profile, repayment capacity, business vintage and security. We assess each business individually.", published: true, order: 1 },
        { id: "msme-f2", question: "What documents do I need to apply for an MSME loan?", answer: "Typically, you’ll need KYC, business registration details, bank statements, GST returns and financial documents.", published: true, order: 2 },
        { id: "msme-f3", question: "How long does it take to get an MSME loan?", answer: "Once your documents and verification are complete, eligible applications can move forward quickly. Timelines vary by loan type and assessment.", published: true, order: 3 },
        { id: "msme-f4", question: "How long does it take to get an MSME loan?", answer: "Once your documents and verification are complete, eligible applications can move forward quickly. Timelines vary by loan type and assessment.", published: true, order: 4 }
      ]},
      lap: { heroImage: "/images/products/loan-against-property-home.webp", faqs: [
        { id: "lap-f1", question: "What type of property can I use for a LAP?", answer: "Depending on the lender’s policy, residential, commercial or certain other eligible properties can be offered as security.", published: true, order: 1 },
        { id: "lap-f2", question: "How much loan can I get against my property?", answer: "The loan amount depends on your property value, income, business profile and repayment capacity.", published: true, order: 2 },
        { id: "lap-f3", question: "Can I get a Loan Against Property for business expansion?", answer: "Yes. LAP funds can be used for business expansion, working capital, machinery, debt consolidation and other eligible business needs.", published: true, order: 3 }
      ]},
      machinery: { heroImage: "/images/products/machinery-and-equipment.webp", faqs: [
        { id: "mach-f1", question: "Can I finance both new and used machinery?", answer: "Yes, eligible new and used machinery can be financed, subject to the lender's assessment and policy.", published: true, order: 1 },
        { id: "mach-f2", question: "Can I get a loan to upgrade existing machinery?", answer: "Yes, financing may be available for upgrading or replacing machinery to improve your business operations.", published: true, order: 2 },
        { id: "mach-f3", question: "What documents are required for a Machinery & Equipment Loan?", answer: "Typically, you’ll need KYC, business documents, bank statements and machinery-related documents such as quotations or invoices.", published: true, order: 3 },
        { id: "mach-f4", question: "What is the maximum loan amount available?", answer: "The maximum loan amount available for Machinery & Equipment financing is ₹30 Lakhs.", published: true, order: 4 }
      ]},
      green: { heroImage: "/images/products/GREEN-FINANCE-HOME.jpg", faqs: [
        { id: "green-f1", question: "Who can apply for Green Finance for solar?", answer: "Depending on the lender's policy, residential, commercial or certain other eligible properties can be offered as security.", published: true, order: 1 },
        { id: "green-f2", question: "How much Green Finance can I get for a solar project?", answer: "The finance amount depends on the project cost, business profile, repayment capacity and applicable eligibility criteria.", published: true, order: 2 },
        { id: "green-f3", question: "Why choose Green Finance for my solar investment?", answer: "It helps you adopt renewable energy while managing the investment through structured repayments and improving long term energy efficiency.", published: true, order: 3 }
      ]}
    },
      "mid-corporate": { heroImage: "/images/products/MID-CORPORATE.webp", faqs: [
        { id: "mid-f1", question: "Who can apply for Mid - Corporate financing?", answer: "Eligible mid-sized businesses can apply subject to financial assessment, business profile and applicable product criteria.", published: true, order: 1 },
        { id: "mid-f2", question: "What documents are required?", answer: "Typically, KYC, business registration documents, bank statements, GST returns and financial statements are required.", published: true, order: 2 },
        { id: "mid-f3", question: "How is the eligible amount decided?", answer: "Eligibility depends on the business profile, financials, repayment capacity and the purpose of funding.", published: true, order: 3 },
        { id: "mid-f4", question: "How long does the process take?", answer: "Timelines vary based on documentation, verification and the assessment required for the financing solution.", published: true, order: 4 }
      ]},
      "micro-enterprises": { heroImage: "/images/products/MICRO-ENTERPRISES.webp", faqs: [
        { id: "micro-f1", question: "Who can apply for Micro Enterprises financing?", answer: "Eligible micro and small businesses can apply subject to business profile, financial assessment and applicable criteria.", published: true, order: 1 },
        { id: "micro-f2", question: "What documents are required?", answer: "KYC, business registration details, bank statements, GST or income documents and other applicable business papers may be required.", published: true, order: 2 },
        { id: "micro-f3", question: "Can the funds be used for working capital?", answer: "Yes, eligible financing can support working capital and other approved business requirements.", published: true, order: 3 },
        { id: "micro-f4", question: "How quickly can I receive funds?", answer: "Processing time depends on documentation, verification and the final assessment.", published: true, order: 4 }
      ]},
      "purchase-finance": { heroImage: "/images/products/PURCHASE-FINANCE.webp", faqs: [
        { id: "purchase-f1", question: "What is Purchase Finance used for?", answer: "Purchase Finance can help eligible businesses fund raw material and supplier purchases while managing working capital requirements.", published: true, order: 1 },
        { id: "purchase-f2", question: "Can multiple supplier payments be financed?", answer: "Eligible businesses may be able to finance payments to multiple suppliers subject to the applicable assessment and terms.", published: true, order: 2 },
        { id: "purchase-f3", question: "Will Purchase Finance affect my CIBIL score?", answer: "Financing and repayment activity can be reflected in credit records according to applicable reporting practices.", published: true, order: 3 },
        { id: "purchase-f4", question: "Are there foreclosure or part-payment charges?", answer: "Charges, if any, depend on the applicable financing terms and agreement.", published: true, order: 4 }
      ]},
      "work-order-finance": { heroImage: "/images/products/WORK-ORDER-FINANCE.webp", faqs: [
        { id: "work-f1", question: "Who can use Work Order Finance?", answer: "Eligible businesses with qualifying work orders or contracts can apply subject to assessment and applicable criteria.", published: true, order: 1 },
        { id: "work-f2", question: "What documents are required?", answer: "Work orders or contracts, KYC, business documents, bank statements and financial information may be required.", published: true, order: 2 },
        { id: "work-f3", question: "Can finance support execution of a new order?", answer: "Eligible funding can help businesses manage working capital needs connected with approved work orders.", published: true, order: 3 },
        { id: "work-f4", question: "How is the funding amount determined?", answer: "The amount depends on the order, business profile, repayment capacity and the applicable assessment.", published: true, order: 4 }
      ]},
      "invoice-discounting": { heroImage: "/images/products/INVOICE-DISCOUNTING.webp", faqs: [
        { id: "invoice-f1", question: "What is Invoice Discounting?", answer: "Invoice Discounting can help eligible businesses unlock working capital against qualifying invoices instead of waiting for customer payment cycles.", published: true, order: 1 },
        { id: "invoice-f2", question: "Which invoices can be financed?", answer: "Invoices are subject to eligibility, customer profile, documentation and the applicable financing policy.", published: true, order: 2 },
        { id: "invoice-f3", question: "Can Invoice Discounting improve cash flow?", answer: "It can provide earlier access to funds tied up in eligible receivables, helping businesses manage cash-flow cycles.", published: true, order: 3 },
        { id: "invoice-f4", question: "What documents are required?", answer: "Typically, invoices, customer details, KYC, business documents and financial information are required.", published: true, order: 4 }
      ]},
      "vendor-finance": { heroImage: "/images/products/VENDOR-FINANCE.webp", faqs: [
        { id: "vendor-f1", question: "What is Vendor Finance?", answer: "Vendor Finance can help eligible businesses manage supplier payments and keep their supply chain moving.", published: true, order: 1 },
        { id: "vendor-f2", question: "Who can apply for Vendor Finance?", answer: "Eligible businesses with qualifying vendor relationships can apply subject to assessment and applicable criteria.", published: true, order: 2 },
        { id: "vendor-f3", question: "What documents are required?", answer: "KYC, business documents, bank statements, vendor details and transaction-related documents may be required.", published: true, order: 3 },
        { id: "vendor-f4", question: "How is the eligible limit determined?", answer: "The limit depends on the business profile, transaction history, supplier relationship, financials and repayment capacity.", published: true, order: 4 }
      ]}
  },
  industries: {
    banner: "/images/industries/industry banner.png",
    cardImages: {
      "Auto & Auto Ancillaries": "/images/industries/auto.png",
      "Hospitality": "/images/industries/Hospitality.png",
      "Constructions": "/images/industries/Construction.png",
      "Logistics": "/images/industries/Logistic.png",
      "Capital Goods": "/images/industries/Capital Goods.png",
      "Pharmaceuticals": "/images/industries/Pharmaceuticals.png",
      "Micro Enterprises": "/images/industries/Micro Enterprises.png",
      "Agro": "/images/industries/Agro.png",
      "Chemical": "/images/industries/Chemical.png",
      "E - Mobility & Green": "/images/industries/E - Mobility & Green.png"
    }
  },
  company: {
    heroImage: "", visionImage: "", missionImage: "", valuesImage: "",
    aboutIntro: { paragraphs: [] },
    vision: { title: "Our Vision", logo: "", content: [] },
    mission: { title: "Our Mission", logo: "", content: [] },
    values: [],
    founders: [],
    teamHeading: "MEET OUR ", teamHeadingHighlight: "GREAT TEAM", teamSubtitle: "",
    team: []
  },
  partners: { banner: "", lendingPartners: [], technologyPartners: [] },
  career: { banner: "/images/aboutus/Career-banner.jpg", employeeTestimonials: [], jobs: [] },
  gallery: { folders: [{id:"events",title:"Events",photos:[]},{id:"people-and-culture",title:"People and Culture",photos:[]},{id:"csr",title:"CSR",photos:[]},{id:"media",title:"Media",photos:[]}] },
  contact: { banner: "", address: "Add your corporate office address here.", phone: "Add your phone number here.", email: "Add your email address here.", openingTime: "Mon - Fri: 9:00 AM - 6:00 PM", formImage: "" },
  leads: []
};

function mergeList(current, fallback) {
  if (Array.isArray(current) && current.length > 0) return current;
  if (Array.isArray(fallback) && fallback.length > 0) return fallback;
  if (Array.isArray(current)) return current;
  if (Array.isArray(fallback)) return fallback;
  return [];
}

function mergeRecords(current, fallback) {
  const records = [];
  const seen = new Set();
  [...(Array.isArray(current) ? current : []), ...(Array.isArray(fallback) ? fallback : [])].forEach((record) => {
    const key = record?.id || record?.slug || record?.title;
    if (!key || seen.has(key)) return;
    seen.add(key);
    const fallbackRecord = (Array.isArray(fallback) ? fallback : []).find((item) => (item?.id || item?.slug || item?.title) === key);
    const currentRecord = (Array.isArray(current) ? current : []).find((item) => (item?.id || item?.slug || item?.title) === key);
    if (currentRecord && fallbackRecord) {
      records.push(Object.fromEntries(Object.keys({ ...fallbackRecord, ...currentRecord }).map((field) => {
        const currentValue = currentRecord[field];
        return [field, currentValue === undefined || currentValue === null || currentValue === "" ? fallbackRecord[field] : currentValue];
      })));
    } else {
      records.push(record);
    }
  });
  return records;
}

export function mergeCmsData(base, override) {
  if (!override || typeof override !== "object") return base;
  const fallback = base && typeof base === "object" ? base : {};
  const current = override && typeof override === "object" ? override : {};

  return {
    ...fallback,
    ...current,
    blogs: mergeRecords(current.blogs, fallback.blogs),
    homepage: {
      ...(fallback.homepage || {}),
      ...(current.homepage || {}),
      clientTestimonials: mergeList(current.homepage?.clientTestimonials, fallback.homepage?.clientTestimonials),
      blogs: mergeList(current.homepage?.blogs, fallback.homepage?.blogs),
      faqs: mergeList(current.homepage?.faqs, fallback.homepage?.faqs),
    },
    products: {
      ...(fallback.products || {}),
      ...(current.products || {}),
      cardImages: { ...(fallback.products?.cardImages || {}), ...(current.products?.cardImages || {}) },
      productPages: { ...(fallback.products?.productPages || {}), ...(current.products?.productPages || {}) },
      items: mergeList(current.products?.items, fallback.products?.items),
      whyPoints: mergeList(current.products?.whyPoints, fallback.products?.whyPoints),
      faqs: mergeList(current.products?.faqs, fallback.products?.faqs),
    },
    industries: {
      ...(fallback.industries || {}),
      ...(current.industries || {}),
      cardImages: { ...(fallback.industries?.cardImages || {}), ...(current.industries?.cardImages || {}) },
      items: mergeRecords(current.industries?.items, fallback.industries?.items),
    },
    company: {
      ...(fallback.company || {}),
      ...(current.company || {}),
      aboutIntro: { ...(fallback.company?.aboutIntro || {}), ...(current.company?.aboutIntro || {}) },
      vision: { ...(fallback.company?.vision || {}), ...(current.company?.vision || {}) },
      mission: { ...(fallback.company?.mission || {}), ...(current.company?.mission || {}) },
      values: mergeRecords(current.company?.values, fallback.company?.values),
      founders: mergeRecords(current.company?.founders, fallback.company?.founders),
      team: mergeRecords(current.company?.team, fallback.company?.team),
    },
    partners: {
      ...(fallback.partners || {}),
      ...(current.partners || {}),
      lendingPartners: mergeList(current.partners?.lendingPartners, fallback.partners?.lendingPartners),
      technologyPartners: mergeList(current.partners?.technologyPartners, fallback.partners?.technologyPartners),
    },
    career: {
      ...(fallback.career || {}),
      ...(current.career || {}),
      employeeTestimonials: mergeList(current.career?.employeeTestimonials, fallback.career?.employeeTestimonials),
      jobs: mergeList(current.career?.jobs, fallback.career?.jobs),
    },
    gallery: {
      ...(fallback.gallery || {}),
      ...(current.gallery || {}),
      folders: mergeRecords(current.gallery?.folders, fallback.gallery?.folders),
    },
    contact: { ...(fallback.contact || {}), ...(current.contact || {}) },
    leads: mergeList(current.leads, fallback.leads),
  };
}

export function createId(prefix = "item") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

const LEGACY_PRODUCT_DATA = {
  "MSME Loan": {
    slug:"msme-loan", shortDescription:"Fuel your business expansion, address working capital needs, new venture or startups.", heroSubtitle:"Fuel your business expansion, address working capital needs, new venture or startups.", heroParagraph:"Fast, flexible funding for growing businesses and new opportunities.", heroImage:"/images/products/1.webp",
    eligibility:[['Loan Amount','₹10 Lakhs to 2 Crore'],['Repayment Tenure','6 month to 5 year'],['Credit Score','650+ (higher for unsecured portion)'],['Fair Processing','Transparent and affordable charges'],['LTV','Up to 50% of asset value.']],
    documents:[['KYC Details','Aadhar Card, PAN Card'],['Financial Documents','ITRs, GST returns, udyam registration, bank statements'],['Collateral Options','Flexible collateral options tailored to secure your loan with ease.']],
    terms:[['Interest Rate','Starting from @1.20% per month'],['Loan Purpose','Working capital, business expansion, constructions, raw material purchase,'],['Business Vintage','Minimum 6 month']],
    benefits:[['Quick & Easy Funding','Get access to hassle-free financing with a simple application process and faster loan approvals.','/images/products/MSME-BENEFIT-1.webp'],['Flexible Repayment Options','Repay at your convenience with flexible tenure options designed around your business cash flow.','/images/products/MSME-BENEFIT-2.webp'],['Fuel Your Business Growth','Invest in expansion and opportunities with funds for working capital, machinery, inventory, or business growth','/images/products/MSME-BENEFIT-3.webp']],
    why:['Fast Processing','Flexible Financing','Transparent Process','Business-Focused Expertise','Simple Documentation','Quick Approval']
  },
  "Loan Against Property": {
    slug:"loan-against-property", shortDescription:"A hassle-free process to help you make the most of your property’s potential.", heroSubtitle:"We offer flexible tenures, competitive interest rates, and a hassle-free process to help you make the most of your property’s potential.", heroImage:"/images/products/loan-against-property-home.webp",
    eligibility:[['Loan Amount','₹10 Lakhs to 5 Crore'],['Loan Tenure','Up to 7 years'],['Credit Score','650+'],['Business Age','Minimum 22 years (age should be minimum 65 years at the time of loan maturity)']],
    documents:[['KYC Details','Aadhar Card, PAN Card'],['Financial Documents','ITRs, GST returns, bank statements + Individual Certificate'],['Certificate','Udyam Certificate']],
    terms:[['Interest Rate','Starting from @1.50% per month'],['Stable Income & Employment','Minimum work experience of 2+ years.'],['Property Ownership','Eligible property ownership and applicable property documents.']],
    benefits:[['Unlock Property Value','Turn the value of your owned property into funds to meet important business or financial requirements.','/images/products/MSME-BENEFIT-1.webp'],['Flexible Funding','Access suitable financing with repayment options structured around your business cash flow.','/images/products/MSME-BENEFIT-2.webp'],['Grow Without Selling','Leverage your property to raise funds while continuing to retain ownership of your valuable asset.','/images/products/MSME-BENEFIT-3.webp']],
    why:['Property-Backed Funding','Competitive Interest Rates','Quick Processing','MSME-Focused Expertise','Digital & Minimal Documentation','Strengthen Business Liquidity']
  },
  "Machinery & Equipment": {
    slug:"machinery-and-equipment", shortDescription:"We provide financial support to businesses looking to invest in essential machinery.", heroSubtitle:"Enhance your business operations with the right tools and technology. Our Equipment & Machinery Loans provide financial support to businesses looking to invest in essential machinery whether brand-new or pre-owned.", heroImage:"/images/products/machinery-and-equipment.webp",
    eligibility:[['Loan Amount','₹10 Lakhs to 30 Lakhs'],['Loan Tenure','From 1 year to 5 years'],['Credit Score','650+ (higher for unsecured portion)'],['Fair Processing','Transparent and affordable charges'],['Industry-wide Usability','Ideal for fabricators, manufacturers and construction businesses.']],
    documents:[['KYC Details','Aadhar Card, PAN Card'],['Financial Documents','ITRs, GST returns, Udyam registration, bank statements'],['Collateral Options','Flexible collateral options tailored to secure your loan with ease.']],
    terms:[['Interest Rate','Starting from @1.40% per month'],['Loan Purpose','Purchase of new / pre-owned equipment & machinery.'],['Business Type','Manufacturing, construction, industrial firms, etc.'],['Operational History','Minimum track record of 3 years with operating profit.']],
    benefits:[['Improve Business Efficiency','Invest in better equipment to increase productivity, streamline operations and meet growing demand.','/images/products/MSME-BENEFIT-1.webp'],['Support Your Next Phase of Growth','Get the financial support you need to expand capacity, modernise operations and take on bigger opportunities.','/images/products/MSME-BENEFIT-2.webp'],['Stay Ahead with Modern Equipment','Invest in updated technology and equipment to stay competitive, improve quality and keep your business ready for future growth.','/images/products/MSME-BENEFIT-3.webp']],
    why:['Purchase New Machinery','Upgrade Existing Equipment','Expand production Capacity','Fund Business Expansion','Smart Automation','Higher Efficiency']
  },
  "Green Finance": {
    slug:"green-finance", shortDescription:"Powering a sustainable future with smart financing for Solar, EV & Green Energy solutions.", heroSubtitle:"Powering a sustainable future with smart financing for Solar, EV & Green Energy solutions.", heroImage:"/images/products/GREEN-FINANCE-HOME.jpg",
    eligibility:[['Loan Amount','Starting from ₹3 Lakhs'],['Loan Tenure','Up to 3 years'],['Credit Score','650+'],['Fair Processing','Fees transparent, affordable, and clearly disclosed'],['Collateral Options','Solar assets or property can be offered as security']],
    documents:[['KYC Details','Aadhar Card, PAN Card'],['Financial Documents','ITRs, GST returns, udyam registration, bank statements'],['Document Proof','electricity bill, property ownership/lease deed, vendor quotation, etc.']],
    terms:[['Interest Rate','Starting from @1.40% per month'],['Stable Income & Employment','Minimum work experience of 2+ years.'],['LTV','Up to 70% of total solar project cost (including installation and hardware)'],['Vendor Requirements','Installation by impaneled or certified solar vendors only.']],
    benefits:[['Reduce Your Energy Costs','Lower your power bills with solar and energy-efficient solutions designed for your business.','/images/products/MSME-BENEFIT-1.webp'],['Upgrade Your Business Sustainably','Finance energy-efficient upgrades without straining your cash flow.','/images/products/MSME-BENEFIT-2.webp'],['Grow with Green Financing','Invest in green upgrades and make your business more efficient.','/images/products/MSME-BENEFIT-3.webp']],
    why:['Flexible Green Financing','Reduce Your Energy Costs','Faster Loan Processing','Support eco-friendly projects','Finance for EV Solutions','Finance for Solar']
  },
  "Mid - Corporate": {slug:"mid-corporate", shortDescription:"Flexible funding designed to support mid-corporate growth.", heroSubtitle:"Running a small business comes with everyday expenses and new opportunities. Our financing helps you manage working capital, handle business needs, and invest in growth, so you can focus on running your business, not arranging funds.", heroImage:"/images/products/MID-CORPORATE.webp", benefits:[['Manage Working Capital Better','Meet day-to-day business needs, manage cash flow, and keep operations running smoothly.','/images/products/MSME-BENEFIT-1.webp'],['Finance for Your Next Growth Move','Secure funding for new opportunities, business expansion, and long-term growth plans.','/images/products/MSME-BENEFIT-2.webp'],['Funding for Business Expansion','Access financing to support new projects, capacity expansion, and growing business operations','/images/products/MSME-BENEFIT-3.webp']], why:['Business-Focused Credit Approach','Solutions Built Around Your Business','Dedicated Relationship Support','Transparent Documentation Process','Technology-Enabled Loan Journey','Understanding of Growing Enterprises'], faqs:[{question:"Who can apply for a Mid-Corporate Loan?",answer:"Established businesses with a stable financial track record can apply based on their funding needs."},{question:"What can I use a Mid-Corporate Loan for?",answer:"You can use the funding for business expansion, working capital needs, asset purchases, project requirements, or other approved business purposes."},{question:"How is the loan amount decided?",answer:"The loan amount is based on your business profile, financial performance, and repayment capacity."}]},
  "Micro Enterprises": {slug:"micro-enterprises", shortDescription:"Flexible, fast & reliable funding for growing enterprises.", heroSubtitle:"Running a small business comes with everyday expenses and new opportunities. Our financing helps you manage working capital, handle business needs, and invest in growth, so you can focus on running your business, not arranging funds.", heroImage:"/images/products/MICRO-ENTERPRISES.webp", benefits:[['Manage Cash Flow','Cover everyday business expenses without disrupting operations.','/images/products/MSME-BENEFIT-1.webp'],['Buy Essential Equipment','Finance machinery, tools, or equipment needed for your work.','/images/products/MSME-BENEFIT-2.webp'],['Stock Up When Needed','Maintain inventory and meet increased customer demand.','/images/products/MSME-BENEFIT-3.webp']], why:['Built for Small Business Needs','Simple, Business-Friendly Process','Funding That Fits Your Growth','Quick & Clear Credit Journey','Support Beyond the Loan'], faqs:[{question:"Who can apply for a Micro Enterprise Loan?",answer:"Small business owners, traders, manufacturers, and self-employed entrepreneurs can apply, subject to eligibility criteria."},{question:"What can I use a Micro Enterprise Loan for?",answer:"The loan can be used for business expansion, working capital, inventory, equipment, or other genuine business requirements."},{question:"What documents are required to apply?",answer:"Typically, applicants may need KYC, business-related documents, banking details, and financial documents, depending on the loan profile."}]},
  "Purchase Finance": {slug:"purchase-finance", shortDescription:"Fund your raw material needs with flexible finance.", heroSubtitle:"Procure raw materials for your business at the right price with flexible working capital finance. Manage supplier payments efficiently, maintain healthy cash flow, and keep your operations running smoothly. With timely access to funds, you can meet your business needs, take advantage of better purchase opportunities, and focus on sustainable growth.", heroImage:"/images/products/PURCHASE-FINANCE.webp", benefits:[['Faster & Smarter Financing','Get quick approvals and instant digital disbursement, helping you access funds when you need them.','/images/products/MSME-BENEFIT-1.webp'],['Flexible & Cost-Efficient Credit','Benefit from flexible terms, collateral-free financing, and interest charged based on usage.','/images/products/MSME-BENEFIT-2.webp'],['Business Growth & Working Capital','Strengthen cash flow, improve profitability, and access funds to support day-to-day operations and growth.','/images/products/MSME-BENEFIT-3.webp']], why:['Save on Purchases','Collateral-Free Credit','Lower Borrowing Costs','Pay as You Use','Fast Digital Approval','Easy Repayment'], faqs:[{question:"What is the interest rate for Purchase Finance?",answer:"Purchase Finance is available at an interest rate of 1.3%."},{question:"Can I finance purchases from multiple suppliers at the same time?",answer:"Yes, you can finance purchases from multiple suppliers simultaneously."},{question:"Will applying for Purchase Finance affect my CIBIL score?",answer:"Yes, applying for Purchase Finance may affect your CIBIL score."}]},
  "Work Order Finance": {slug:"work-order-finance", shortDescription:"Turn tender opportunities into business with flexible finance.", heroSubtitle:"Execute tenders from autonomous and government bodies, as well as other reputed organizations, with flexible working capital finance. Access timely funds to manage procurement, project expenses, and operational requirements efficiently. Meet tender-related financial commitments without disrupting your cash flow. Focus on delivering projects on time while keeping your business operations running smoothly. Grow your business by taking on more opportunities with the right financial support.", heroImage:"/images/products/WORK-ORDER-FINANCE.webp", benefits:[['Fast & Flexible Financing','Get quick access to funds and pay interest only on the credit you actually use.','/images/products/MSME-BENEFIT-1.webp'],['Business Growth','Access timely financing to increase sales, seize new opportunities, and unlock greater revenue potential.','/images/products/MSME-BENEFIT-2.webp'],['Stronger Supply Chains','Support timely supplier payments and build stronger, more reliable supply chain relationships.','/images/products/MSME-BENEFIT-3.webp']], why:['Unsecured Working Capital','Rapid Credit Approval','Flexible Repayment Options','Cash Flow-Based Financing','Competitive Interest Rates','Fully Digital Journey'], faqs:[{question:"What documents do I need to apply for Work Order Finance?",answer:"Basic KYC, business, financial, bank statement, GST, and work order documents may be required, subject to eligibility."},{question:"Is Work Order Finance available to government contractors and subcontractors?",answer:"Yes, eligible government contractors and subcontractors can apply, subject to Vallabhi Capital’s credit and eligibility criteria."},{question:"Can I finance multiple ongoing work orders at the same time?",answer:"Yes, multiple work orders may be financed, subject to credit assessment, repayment capacity, and applicable terms."}]},
  "Invoice Discounting": {slug:"invoice-discounting", shortDescription:"Improve cash flow with smarter receivables financing.", heroSubtitle:"Discount your receivables and unlock funds faster with our bill discounting solution. Improve your cash inflows and maintain a healthy working capital cycle. Access funds against eligible invoices without waiting for payment due dates. Manage day-to-day business expenses and supplier payments more efficiently. Keep your business moving forward with timely access to working capital.", heroImage:"/images/products/INVOICE-DISCOUNTING.webp", benefits:[['Instant & Easy Financing','Get quick access to funds with a streamlined approval process and no collateral requirements.','/images/products/MSME-BENEFIT-1.webp'],['Improved Cash Flow','Boost liquidity and maintain a healthy cash flow to manage everyday business expenses smoothly.','/images/products/MSME-BENEFIT-2.webp'],['Flexible Credit Solutions','Choose flexible financing terms designed to match your business requirements and repayment capacity.','/images/products/MSME-BENEFIT-3.webp']], why:['Instant Working Capital','Collateral-Free Financing','Competitive Interest Rates','Fast & Simple Approval','Flexible Repayment Options','100% Digital & Transparent'], faqs:[{question:"Can I select specific invoices for discounting, or do I need to discount all invoices?",answer:"Yes, eligible businesses can select specific invoices for discounting, subject to Vallabhi Capital’s eligibility and approval criteria."},{question:"How does invoice discounting differ from invoice factoring?",answer:"Invoice discounting provides funds against invoices while the business generally continues managing collections. In factoring, the financier may also manage the collection process."},{question:"Is invoice discounting suitable for businesses with longer payment cycles of 90 days or more?",answer:"Yes, businesses with longer payment cycles may be eligible for invoice discounting, subject to invoice quality, buyer profile, and Vallabhi Capital’s credit assessment."}]},
  "Vendor Finance": {slug:"vendor-finance", shortDescription:"Keep your supply chain moving with flexible vendor finance.", heroSubtitle:"Strengthen your supply chain with our anchor-led vendor finance solution. Provide vendors with timely access to working capital against eligible transactions, helping them manage cash flows and meet operational needs efficiently. Improve supplier relationships, ensure smoother business operations, and support uninterrupted procurement. With better financial flexibility across the supply chain, businesses can build stronger and more resilient vendor networks.", heroImage:"/images/products/VENDOR-FINANCE.webp", benefits:[['Scalable & Cost-Effective Financing','Fulfil larger orders with multiple vendors while securing better raw-material prices through upfront payments.','/images/products/MSME-BENEFIT-1.webp'],['Unsecured & Flexible Credit','Access vendor financing without pledging land or property, helping improve working capital and support business growth.','/images/products/MSME-BENEFIT-2.webp'],['Fast & Digital Disbursement','Complete the financing process online and receive funds quickly after approval and verification.','/images/products/MSME-BENEFIT-3.webp']], why:['Stronger Vendor Relationships','Efficient Supply Chain','Collateral-Free Credit','Fast & Simple Approval','Flexible & Transparent Financing','Digital & Dedicated Support']}
};
function toPoints(arr){return (arr||[]).map((x,i)=>({id:`legacy-${slugifyCms(x[0])||i}`,title:x[0],description:x[1]}));}
function legacyApply(item, def){ if(!def) return item; return {...item, slug:def.slug||item.slug, shortDescription:item.shortDescription ?? def.shortDescription ?? '', heroSubtitle:item.heroSubtitle ?? def.heroSubtitle ?? '', heroParagraph:item.heroParagraph ?? def.heroParagraph ?? '', heroImage:item.heroImage ?? def.heroImage ?? '', eligibility:item.eligibility?.length?item.eligibility:toPoints(def.eligibility), documents:item.documents?.length?item.documents:toPoints(def.documents), terms:item.terms?.length?item.terms:toPoints(def.terms), benefits:(item.benefits||[]).some(x=>x.title)?item.benefits:def.benefits.map((x,i)=>({id:`legacy-benefit-${i}`,title:x[0],description:x[1],text:x[1],image:x[2]})), whyPoints:item.whyPoints?.length?item.whyPoints:def.why.map((x,i)=>({id:`legacy-why-${i}`,title:x,description:'',image:''})), faqs:item.faqs?.length?item.faqs:(def.faqs||[]) }; }

export function normalizeCms(data) {
  const out = structuredClone(data);
  out.homepage = out.homepage || {};
  out.products = out.products || {};
  out.products.whyPoints = Array.isArray(out.products.whyPoints) ? out.products.whyPoints : [];
  out.industries = out.industries || {};
  out.products.productPages = out.products.productPages || {};
  const legacyNames = Object.keys(out.products.cardImages || {});
  const legacyKey = {"MSME Loan":"msme","Loan Against Property":"lap","Machinery & Equipment":"machinery","Equipment & Machinery":"machinery","Green Finance":"green","Mid - Corporate":"mid-corporate","Micro Enterprises":"micro-enterprises","Purchase Finance":"purchase-finance","Work Order Finance":"work-order-finance","Invoice Discounting":"invoice-discounting","Vendor Finance":"vendor-finance"};

  if (!Array.isArray(out.products.items)) {
    out.products.items = legacyNames.map((name, i) => {
      const page = out.products.productPages[legacyKey[name] || ""] || {};
      return {
        id: createId("product"), name, category: ["Purchase Finance","Work Order Finance","Invoice Discounting","Vendor Finance"].includes(name) ? "supply-chain" : "loan", slug: slugifyCms(name), shortDescription: "", heroSubtitle: "", heroParagraph: "", productLogo: out.homepage.productLogos?.[name] || "", cardImage: out.products.cardImages[name] || "", heroImage: page.heroImage || "", description: "", published: true, homepageVisible: i < 6, order: i + 1,
        eligibility: page.eligibility || [], documents: page.documents || [], terms: page.terms || [], benefits: page.benefits || [{id:createId("benefit"),title:"",description:"",image:""},{id:createId("benefit"),title:"",description:"",image:""},{id:createId("benefit"),title:"",description:"",image:""}], whyPoints: page.whyPoints || [], faqs: page.faqs || []
      };
    });
  }
  // Migrate/normalize existing product records without overwriting admin content.
  out.products.items = out.products.items.map((p, i) => {
    const page = out.products.productPages[legacyKey[p.name] || p.slug || ""] || {};
    return {
      ...p,
      category: p.category || (["Purchase Finance","Work Order Finance","Invoice Discounting","Vendor Finance"].includes(p.name) ? "supply-chain" : "loan"),
      slug: p.slug || slugifyCms(p.name),
      homepageVisible: typeof p.homepageVisible === "boolean" ? p.homepageVisible : i < 6,
      order: p.order || i + 1,
      productLogo: p.productLogo || out.homepage.productLogos?.[p.name] || out.products.productLogos?.[p.name] || ({"Purchase Finance":"/images/Navbar/Products/purchase.png","Work Order Finance":"/images/Navbar/Products/work order.png","Vendor Finance":"/images/Navbar/Products/vendor.png"}[p.name] || ""),
      cardImage: p.cardImage || out.products.cardImages?.[p.name] || "",
      heroImage: p.heroImage || page.heroImage || "",
      heroSubtitle: p.heroSubtitle ?? p.titleAccent ?? "",
      heroParagraph: p.heroParagraph ?? "",
      eligibility: Array.isArray(p.eligibility) ? p.eligibility.map(x => typeof x === "string" ? ({id:createId("point"),title:x,description:""}) : ({id:x.id||createId("point"),title:x.title||x.name||x.label||"",description:x.description||x.text||"",...x})) : [],
      documents: Array.isArray(p.documents) ? p.documents.map(x => typeof x === "string" ? ({id:createId("point"),title:x,description:""}) : ({id:x.id||createId("point"),title:x.title||x.name||x.label||"",description:x.description||x.text||"",...x})) : [],
      terms: Array.isArray(p.terms) ? p.terms.map(x => typeof x === "string" ? ({id:createId("point"),title:x,description:""}) : ({id:x.id||createId("point"),title:x.title||x.name||x.label||"",description:x.description||x.text||"",...x})) : [],
      benefits: Array.isArray(p.benefits) && p.benefits.length ? p.benefits.slice(0,3).map(x => ({...x,id:x.id||createId("benefit"),description:x.description||x.text||""})) : [{id:createId("benefit"),title:"",description:"",image:""},{id:createId("benefit"),title:"",description:"",image:""},{id:createId("benefit"),title:"",description:"",image:""}],
      whyPoints: Array.isArray(p.whyPoints) ? p.whyPoints.map(x => typeof x === "string" ? ({id:createId("point"),title:x,description:"",image:""}) : ({...x,id:x.id||createId("point"),title:x.title||x.name||x.text||"",description:x.description||x.text||"",image:x.image||x.icon||""})) : [],
      faqs: Array.isArray(p.faqs) ? p.faqs : (page.faqs || [])
    };
  });

  out.products.items = out.products.items.map(p => legacyApply(p, LEGACY_PRODUCT_DATA[p.name]));

  // Enforce the homepage limit: only six products can be selected at a time.
  const homeSelected = out.products.items.filter(p => p.homepageVisible !== false).sort((a,b)=>(a.order||0)-(b.order||0));
  if (homeSelected.length > 6) {
    const keep = new Set(homeSelected.slice(0, 6).map(p => p.id));
    out.products.items = out.products.items.map(p => ({...p, homepageVisible: keep.has(p.id)}));
  }
  if (!Array.isArray(out.industries.items)) {
    out.industries.items = Object.keys(out.industries.cardImages || {}).map((name, i) => ({id:createId("industry"),name,slug:slugifyCms(name),bannerImage:"",heading:"",subtitle:"",content:"",secondImage:out.industries.cardImages[name]||"",homepageImage:out.homepage.industryLogos?.[name]||out.industries.cardImages[name]||"",published:true,order:i+1,marketSize:{icon:"",value:""},coreFocus:{icon:"",value:""},loanAmount:{icon:"",value:""},approvalTimeline:{icon:"",value:""}}));
  }
  out.industries.items = out.industries.items.map((x,i)=>({...x,bannerImage:x.bannerImage ?? "",secondImage:x.secondImage ?? "",homepageImage:x.homepageImage ?? "",heading:x.heading ?? "",subtitle:x.subtitle ?? "",slug:x.slug||slugifyCms(x.name),order:x.order||i+1,marketSize:x.marketSize||{icon:"",value:""},coreFocus:x.coreFocus||{icon:"",value:""},loanAmount:x.loanAmount||{icon:"",value:""},approvalTimeline:x.approvalTimeline||{icon:"",value:""}}));
  if (!Array.isArray(out.blogs)) out.blogs = out.homepage.blogs || [];
  out.blogs = out.blogs.map((b,i)=>({...b,id:b.id||createId("blog"),slug:b.slug||slugifyCms(b.title),order:b.order||i+1,content:b.content||"<p></p>"}));
  out.homepage.blogs = out.blogs;
  out.gallery = out.gallery || {folders:[]};
  out.gallery.folders = Array.isArray(out.gallery.folders) ? out.gallery.folders.map(f=>({...f,photos:Array.isArray(f.photos)?f.photos:[]})) : [];
  out.company = out.company || {};
  out.company.aboutIntro = out.company.aboutIntro || {};
  out.company.aboutIntro.paragraphs = Array.isArray(out.company.aboutIntro.paragraphs) ? out.company.aboutIntro.paragraphs.map((x, i) => typeof x === "string" ? ({ id: createId("intro"), text: x }) : ({ ...x, id: x.id || createId(`intro-${i}`), text: x.text || "" })) : [];
  ["vision", "mission"].forEach((key) => {
    out.company[key] = out.company[key] || {};
    out.company[key].title = out.company[key].title || (key === "vision" ? "Our Vision" : "Our Mission");
    out.company[key].logo = out.company[key].logo || out.company[`${key}Image`] || "";
    out.company[key].content = Array.isArray(out.company[key].content) ? out.company[key].content.map((x, i) => typeof x === "string" ? ({ id: createId(`${key}-point`), text: x }) : ({ ...x, id: x.id || createId(`${key}-point-${i}`), text: x.text || "" })) : [];
    out.company[key].description = out.company[key].description || out.company[key].content.map((x) => x.text).filter(Boolean).join("\n\n");
  });
  out.company.values = Array.isArray(out.company.values) ? out.company.values.map((x, i) => ({ ...x, id: x.id || createId(`value-${i}`), title: x.title || "", description: x.description || "", logo: x.logo || x.image || x.icon || "", published: x.published !== false })) : [];
  out.company.founders = Array.isArray(out.company.founders) ? out.company.founders.map((x, i) => ({ ...x, id: x.id || createId(`founder-${i}`), name: x.name || "", designation: x.designation || "", description: x.description || "", image: x.image || "", linkedin: x.linkedin || "", published: x.published !== false })) : [];
  out.company.team = Array.isArray(out.company.team) ? out.company.team.map((x, i) => ({ ...x, id: x.id || createId(`team-${i}`), image: x.image || x.photo || "", description: x.description || x.text || "", published: x.published !== false })) : [];
  return out;
}
function slugifyCms(s){return String(s||"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}
// Neon is the only durable source of truth. The seed is used only for the
// first initialization when the Neon CMS has no row yet.
let cmsCache = normalizeCms(seed);
let cmsInitialized = false;
let cmsInitPromise = null;
let cmsWritePromise = Promise.resolve();

async function apiRequest(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(`${CMS_API_BASE}${url}`, {
      ...options,
      signal: options.signal || controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(text || `CMS API request failed (${response.status})`);
    }
    return response.status === 204 ? null : response.json();
  } finally {
    clearTimeout(timeout);
  }
}

async function initializeCms() {
  if (cmsInitialized) return cmsCache;
  if (cmsInitPromise) return cmsInitPromise;

  cmsInitPromise = (async () => {
    try {
      await cmsWritePromise;
      const response = await apiRequest("/api/cms", { method: "GET" });

      if (response?.data && typeof response.data === "object") {
        cmsCache = normalizeCms(response.data);
      } else {
        // First run only: seed Neon once. Never use browser localStorage as a
        // fallback because it can overwrite newer data stored in Neon.
        cmsCache = normalizeCms(seed);
        await apiRequest("/api/cms", {
          method: "PUT",
          body: JSON.stringify(cmsCache),
        });
      }

      cmsInitialized = true;
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("vc-cms-updated", { detail: cmsCache }));
      }
      return cmsCache;
    } catch (error) {
      console.error("Unable to load CMS from Neon.", error);
      // Keep the seed in memory so the UI can render, but DO NOT claim it is
      // persisted. A later refresh/focus can retry the Neon connection.
      cmsCache = normalizeCms(seed);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("vc-cms-error", { detail: error }));
      }
      throw error;
    } finally {
      cmsInitPromise = null;
    }
  })();

  return cmsInitPromise;
}

if (typeof window !== "undefined") {
  initializeCms().catch(() => {});
}

export function getCms() {
  return normalizeCms(cmsCache);
}

export function upsertGalleryFolder(data, folder) {
  const next = structuredClone(data || {});
  const safeFolder = {
    id: folder?.id || createId("folder"),
    title: String(folder?.title ?? "").trim() || "Untitled folder",
    photos: Array.isArray(folder?.photos) ? folder.photos : [],
  };

  const folders = Array.isArray(next.gallery?.folders) ? next.gallery.folders : [];
  const index = folders.findIndex((item) => item.id === safeFolder.id);

  if (index >= 0) {
    folders[index] = { ...folders[index], ...safeFolder, photos: safeFolder.photos.length ? safeFolder.photos : (folders[index].photos || []) };
  } else {
    folders.push(safeFolder);
  }

  next.gallery = next.gallery || {};
  next.gallery.folders = folders;
  return next;
}

export function saveCms(data) {
  const normalized = normalizeCms(data);

  // Update the in-memory UI immediately, but only report success after Neon
  // confirms the PUT. This prevents the Admin from showing a false "saved"
  // state when the database/API is unavailable.
  cmsCache = normalized;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("vc-cms-updated", { detail: normalized }));
  }

  cmsWritePromise = cmsWritePromise
    .catch(() => {})
    .then(async () => {
      const response = await apiRequest("/api/cms", {
        method: "PUT",
        body: JSON.stringify(normalized),
      });

      if (!response?.ok) {
        throw new Error("CMS API did not confirm the database save.");
      }

      // Keep the cache aligned with exactly what the API confirmed.
      cmsCache = normalizeCms(response.data || normalized);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("vc-cms-updated", { detail: cmsCache }));
      }
      return cmsCache;
    })
    .catch((error) => {
      console.error("CMS save failed:", error);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("vc-cms-error", { detail: error }));
      }
      throw error;
    });

  return cmsWritePromise;
}

export async function refreshCms() {
  try {
    await cmsWritePromise;
    const response = await apiRequest("/api/cms", { method: "GET" });
    if (response?.data && typeof response.data === "object") {
      cmsCache = normalizeCms(response.data);
      cmsInitialized = true;
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("vc-cms-updated", { detail: cmsCache }));
      }
      return cmsCache;
    }
    return cmsCache;
  } catch (error) {
    console.error("CMS refresh failed:", error);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("vc-cms-error", { detail: error }));
    }
    throw error;
  }
}

export async function resetCms() {
  return saveCms(normalizeCms(seed));
}

export function useCms() {
  const [data, setData] = useState(() => getCms());

  useEffect(() => {
    let mounted = true;
    initializeCms()
      .then((value) => {
        if (mounted) setData(normalizeCms(value));
      })
      .catch(() => {
        // Keep rendering the in-memory seed/current snapshot. The error event
        // is available to Admin for a visible save/load failure message.
      });

    const refresh = (event) => {
      if (mounted) setData(normalizeCms(event?.detail || getCms()));
    };

    const refreshOnFocus = () => {
      refreshCms()
        .then((value) => {
          if (mounted) setData(normalizeCms(value));
        })
        .catch(() => {});
    };

    window.addEventListener("vc-cms-updated", refresh);
    window.addEventListener("focus", refreshOnFocus);
    return () => {
      mounted = false;
      window.removeEventListener("vc-cms-updated", refresh);
      window.removeEventListener("focus", refreshOnFocus);
    };
  }, []);

  return data;
}

export function useCmsSection(key) {
  const data = useCms();
  return data[key];
}

export const sortItems = items => [...(items||[])].sort((a,b)=>(a.order||0)-(b.order||0));

export const readFileAsDataUrl = (file, ownership = {}) => new Promise((resolve,reject)=>{
  if(!file.type.startsWith("image/")){
    const r=new FileReader();
    r.onload=()=>resolve(r.result);
    r.onerror=reject;
    r.readAsDataURL(file);
    return;
  }
  const r=new FileReader();
  r.onload=()=>{
    const img=new Image();
    img.onload=async()=>{
      try {
        const max=1800;
        const scale=Math.min(1,max/Math.max(img.width,img.height));
        const c=document.createElement("canvas");
        c.width=Math.round(img.width*scale);
        c.height=Math.round(img.height*scale);
        const ctx=c.getContext("2d");
        ctx.drawImage(img,0,0,c.width,c.height);
        const dataUrl=c.toDataURL("image/webp",0.82);

        // Uploaded media is stored in Neon instead of localStorage.
        try {
          const response = await apiRequest("/api/media", {
            method: "POST",
            body: JSON.stringify({
              dataUrl,
              name: file.name,
              type: "image/webp",
              pageKey: ownership.pageKey || null,
              fieldPath: ownership.fieldPath || null,
              entityId: ownership.entityId || null,
            }),
          });
          // Store only the compact media URL in the CMS JSON. The image bytes
          // remain in the media table, keeping multi-image gallery saves small.
          resolve(response.url);
        } catch (error) {
          console.warn("Unable to store image in media API; saving it with the CMS data instead.", error);
          resolve(dataUrl);
        }
      } catch (error) {
        reject(error);
      }
    };
    img.onerror=reject;
    img.src=r.result;
  };
  r.onerror=reject;
  r.readAsDataURL(file);
});
