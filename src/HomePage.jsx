import React, { useState } from "react";
import { useCms, sortItems } from "./cms";
import "./HomePage.css";

const A = "/images/homepage/";
const L = "/images/homepage/loan icon/";
const W = "/images/homepage/why choose/";
const H = "/images/homepage/how it work/";

const assets = {
  heroBg: A + "ff98552205afaf1d8bb88beb794c658de985a44d.png",
  heroCard: A + "c98ad67bc578f2bcbe7d2f536380daa593dd21ec.png",
  logo: A + "514f9971796012cf4d48c9b2b22201833841a4ca.png",
  whyBg: A + "1c4fd8f5baea8a8429fc8ec4cedb0dadedbb8762.png",
  woman: A + "Woman.png",
  testimonial: A + "94813940a7aba3467f98512db80be8e6205f38c1.png",
  blog: A + "e72008befa0dd20609be78a0f73e4ed0f898ab61.png",
  auto: A + "26196 (1).jpg.jpeg",
  hospitality: A + "71e6135943dd4547cdad0dd5938b8b823702ced3.png",
  construction: A + "4176b7276d164a0a48b14ada47fd1fbd501cd696.png",
  logistics: A + "009aa8b89d3a1177ddab6140a9c065d50fdb0839.png",
  capital: A + "2e2d8e51de8325fadb34750d01afb655a55af306.png",
  pharma: A + "8526a6c0745b0692cc0f394a6389038d56971af6.png",
  micro: A + "c53d88dfdd7fea47b11912f823bf56efc226cc6b.png",
  chemical: A + "30b382edc84d4f28ee4e34feb9ef65275cc3efab.png",
  linkedin: A + "e055294bf1118ce8ac7d9086ac137252c4e014db.png",
  instagram: A + "0ba8a42bf0a035a7a042d0dd187d04a059e0dabf.png",
  facebook: A + "7b2ba5bfb77597293dbb965953b924e10d901815.png",
  arrow: A + "bcedc4b2b7d51499b885be3cbd4a2cfde3b64ad1.png",
};

const products = [
  ["MSME Loan", "Fuel your business expansion, address working capital needs, new venture or startups.", "/products/msme", L + "msme.png"],
  ["Loan Against Property", "Fuel your business expansion, address working capital needs, new venture or startups.", "/products/loan-against-property", L + "real-estate_942140 1.png"],
  ["Equipment & Machinery Loan", "Fuel your business expansion, address working capital needs, new venture or startups.", "/products/machinery-and-equipment", L + "machinery.png"],
  ["Green Finance", "Fuel your business expansion, address working capital needs, new venture or startups.", "/products/green-finance", L + "green.png"],
  ["Mid - Corporate", "Fuel your business expansion, address working capital needs, new venture or startups.", "/products/mid-corporate", L + "corporate.png"],
  ["Micro Enterprises", "Fuel your business expansion, address working capital needs, new venture or startups.", "/products/micro-enterprises", L + "micro.png"],
];

const industries = [
  ["Auto & Auto Ancillaries", assets.auto, "/industries/auto-auto-ancillary"],
  ["Hospitality", assets.hospitality, "/industries/hospitality"],
  ["Constructions", assets.construction, "/industries/construction"],
  ["Logistics", assets.logistics, "/industries/logistics"],
  ["Capital Goods", assets.capital, "/industries/capital-goods"],
  ["Pharmaceuticals", assets.pharma, "/industries/pharma-health"],
  ["Micro Enterprises", assets.micro, "/industries/micro-enterprises"],
  ["Chemical", assets.chemical, "/industries/chemical"],
];



function ArrowButton({ href, label }) {
  return (
    <a href={href} className="hp-view-more" aria-label={`View ${label}`}>
      <span>View More</span>
      <span className="hp-product-chevron" />
    </a>
  );
}

function Hero({ cms }) {
  const openApplication = (event) => {
    event.preventDefault();
    window.dispatchEvent(new CustomEvent("vc-open-application"));
  };

  return (
    <section className="hp-hero">
      <img className="hp-hero-bg" src={cms.bannerImage} alt="" />
      <div className="hp-hero-overlay" />
      <div className="hp-hero-copy">
        <div className="hp-rbi">
          <span className="hp-rbi-mark" aria-label="RBI logo">RBI</span>
          <span>Registered NBFC*</span>
        </div>
        <h1>
          <span className="hp-hero-title-main">Empowering India's</span>
          <span className="hp-hero-title-accent">MSME Growth</span>
        </h1>
        <p>Customized, simple and faster financing solutions<br></br> from small to large businesses.</p>
        <div className="hp-hero-buttons">
          <a href="/products" className="hp-white-btn">Explore Our Products</a>
          <a href="/apply" onClick={openApplication} className="hp-blue-btn">Apply Now</a>
        </div>
      </div>
      <HeroCalculator />
    </section>
  );
}

function HeroCalculator() {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(12.5);
  const [tenure, setTenure] = useState(36);
  const monthlyRate = rate / 12 / 100;
  const emi = amount * monthlyRate * Math.pow(1 + monthlyRate, tenure) /
    (Math.pow(1 + monthlyRate, tenure) - 1);
  const total = emi * tenure;
  const formatCurrency = (value) => new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

  return (
    <div className="hp-hero-card hp-calculator-card">
      <div className="hp-calculator-top">
        <h2>Calculate your EMI</h2>
      </div>
      <div className="hp-calculator-label">
        <span>Loan amount</span>
        <span>₹50K - ₹25L</span>
      </div>
      <strong className="hp-calculator-amount">{formatCurrency(amount)}</strong>
      <input
        className="hp-calculator-range"
        type="range"
        min="50000"
        max="2500000"
        step="10000"
        value={amount}
        onChange={(event) => setAmount(Number(event.target.value))}
        aria-label="Loan amount"
      />
      <div className="hp-calculator-range-values"><span>₹50K</span><span>₹25L</span></div>

      <div className="hp-calculator-field">
        <div className="hp-calculator-label"><span>Interest rate</span><span>{rate}% p.a.</span></div>
        <strong className="hp-calculator-rate">{rate}%</strong>
        <input
          className="hp-calculator-range"
          type="range"
          min="8"
          max="24"
          step="0.1"
          value={rate}
          onChange={(event) => setRate(Number(event.target.value))}
          aria-label="Interest rate"
        />
        <div className="hp-calculator-range-values"><span>8%</span><span>24%</span></div>
      </div>

      <div className="hp-calculator-field hp-calculator-tenure-field">
        <div className="hp-calculator-label"><span>Tenure</span><span>{tenure} months</span></div>
        <div className="hp-calculator-tenures">
          {[12, 24, 36, 48].map((months) => (
            <button
              type="button"
              className={months === tenure ? "active" : ""}
              key={months}
              onClick={() => setTenure(months)}
            >
              {months} mo
            </button>
          ))}
        </div>
      </div>

      <div className="hp-calculator-result">
        <small>Your estimated monthly EMI</small>
        <strong>{formatCurrency(emi)}</strong>
        <div className="hp-calculator-breakdown">
          <div><span>Total interest</span><b>{formatCurrency(total - amount)}</b></div>
          <div><span>Total repayment</span><b>{formatCurrency(total)}</b></div>
        </div>
      </div>
    </div>
  );
}

function Products({ cms }) {
  const productItems = sortItems(cms.products?.items || [])
    .filter((p) => p.published !== false);
  return (
    <section className="hp-products">
      <div className="hp-section-head">
        <div>
          <h2>Solutions For All Needs</h2>
          <p>For every situation and every journey</p>
        </div>
        <a href="/products" className="hp-dark-btn">View all Solutions</a>
      </div>
      <div className="hp-product-grid">
        {productItems.map((product) => (
          <article className="hp-product-card" key={product.id}>
            <div className="hp-product-image">
              <img src={product.productLogo || cms.productLogos?.[product.name] || product.cardImage || ""} alt={`${product.name} product`} />
            </div>
            <div className="hp-product-content">
              <h3>{product.name}</h3>
              <p>{product.shortDescription}</p>
              <ArrowButton href={`/products/${product.slug}`} label={product.name} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/*
function Industries({ cms }) {
  return (
    <section className="hp-industries">
      <div className="hp-section-head">
        <div>
          <h2>Industries We Served</h2>
          <p>Finance for Every Industry</p>
        </div>
        <a href="/industries" className="hp-dark-btn">All Industries</a>
      </div>
      <div className="hp-industry-grid">
        {industries.map(([name, image, href]) => (
          <a className="hp-industry-card" href={href} key={name} aria-label={`View ${name} industry`}>
            <img src={cms.industryLogos[name]} alt="" />
            <div className="hp-industry-shade" />
            <h3>{name}</h3>
          </a>
        ))}
      </div>
    </section>
  );
}
*/

/* =========================================================
   INDUSTRIES WE SERVED
========================================================= */

const industryCards = [
  {
    title: "Auto & Auto Ancillary",
    image: assets.auto,
    className: "industry-auto",
    link: "/industries/auto-auto-ancillary",
  },
  {
    title: "Constructions",
    image: "/images/homepage/4176b7276d164a0a48b14ada47fd1fbd501cd696.png",
    className: "industry-construction",
    link: "/industries/construction",
  },
  {
    title: "Logistics",
    image: "/images/homepage/009aa8b89d3a1177ddab6140a9c065d50fdb0839.png",
    className: "industry-logistics",
    link: "/industries/logistics",
  },
  {
    title: "Chemical",
    image: "/images/homepage/30b382edc84d4f28ee4e34feb9ef65275cc3efab.png",
    className: "industry-chemical",
    link: "/industries/chemical",
  },
];

function IndustriesServed({ cms }) {
  const industryItems = cms?.industries?.items || [];
  const imageFor = (name, fallback) => industryItems.find(x => x.name === name)?.homepageImage || fallback;
  return (
    <section className="industries-served-section">

      {/* LEFT CONTENT */}
      <div className="industries-served-left">

        <div className="industries-served-heading">
        <h2>Serving Diverse</h2>
          <h2>Business Sectors</h2>
          <p>
            <span className="industries-first-line">Tailored financing solutions for every industry,</span><br />
            helping businesses manage growth, cash flow,
            and long-term opportunities.
          </p>
        </div>

        <a
          href="/industries"
          className="all-industries-btn"
        >
          View all Sectors
        </a>

      </div>

      {/* RIGHT IMAGE GRID */}
      <div className="industries-served-grid">

        {industryCards.map((industry) => (
          <a
            href={industry.link}
            className={`industry-served-card ${industry.className}`}
            key={industry.title}
          >
            <img
              src={imageFor(industry.title, industry.image)}
              alt={industry.title}
            />

            <div className="industry-served-overlay"></div>

            <h4>{industry.title}</h4>
          </a>
        ))}

      </div>

    </section>
  );
}


function WhyChoose() {
  const features = [
    ["Minimum Paperwork", W + "Minimum Paperwork.png"],
    ["Quick Loan Processing", W + "loan (3).png"],
    ["Competitive Interest Rate", W + "Competitive Interest Rate.png"],
    ["Secure & Transparent Process", W + "Secure & Transparent Process.png"],
    ["Easy EMI Options", W + "Easy EMI Options.png"],
    ["Flexible Repayment Tenure", W + "Flexible Repayment Tenure.png"],
  ];
  return (
    <section className="hp-why">
      <div className="hp-why-person">
        <div className="hp-why-blue-shape" />
        <img src={assets.woman} alt="" />
      </div>
      <div className="hp-why-content">
        <h2>Why Choose Vallabhi Capital?</h2>
        <p>Customized Financing Solutions for Your Business</p>
        <div className="hp-features">
          {features.map(([feature, icon]) => (
            <span key={feature} className="hp-feature">
              <img className="hp-feature-icon" src={icon} alt="" aria-hidden="true" />
              {feature}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}


function Testimonial({ cms }) {
  const testimonials = sortItems(cms.clientTestimonials).filter(x => x.published !== false);
  const [active, setActive] = useState(0);
  const item = testimonials[active];

  React.useEffect(() => {
    setActive(index => Math.min(index, Math.max(testimonials.length - 1, 0)));
  }, [testimonials.length]);

  if (!item) return null;

  const move = direction => {
    setActive(index => (index + direction + testimonials.length) % testimonials.length);
  };

  const nextItem = testimonials[(active + 1) % testimonials.length];

  return (
    <section className="hp-testimonial">
      <h2>Hear From Our <span>Happy Customers</span></h2>
      <div className="hp-testimonial-body">
        <div className="hp-testimonial-copy">
          <h3>{item.name}</h3>
          <p className="hp-role">{item.role}</p>
          <p>{item.text}</p>
          <div className="hp-testimonial-arrows">
            <button onClick={() => move(-1)} disabled={testimonials.length < 2} aria-label="Previous testimonial">
              <span className="hp-testimonial-chevron hp-testimonial-chevron-prev" aria-hidden="true" />
            </button>
            <button onClick={() => move(1)} disabled={testimonials.length < 2} aria-label="Next testimonial">
              <span className="hp-testimonial-chevron hp-testimonial-chevron-next" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="hp-testimonial-visual">
          {nextItem && (
            <img
              key={`${nextItem.id ?? 'next'}-${active}`}
              className="hp-testimonial-preview-image"
              src={nextItem.image}
              alt=""
              aria-hidden="true"
            />
          )}
          <img key={`${item.id ?? 'current'}-${active}`} className="hp-testimonial-main-image" src={item.image} alt="Customer testimonial" />
        </div>
      </div>
    </section>
  );
}

function Blogs({ cms }) {
  const blogs = sortItems(cms.blogs || cms.homepage?.blogs || []).filter(x => x.published !== false);
  if (!blogs.length) return null;
  return (
    <section className="hp-blogs">
      <h2>Read Our Latest Blogs</h2>
      <div className="hp-blog-row">
        {blogs.slice(0, 3).map(blog => (
          <a className="hp-blog-card hp-blog-card-grid" key={blog.id} href="/blogs">
            <img src={blog.image} alt="" />
            <div className="hp-blog-shade" />
            <div className="hp-blog-card-grid-copy">
              <h3>{blog.title}</h3>
              <div className="hp-blog-card-meta">{blog.author && `By ${blog.author}`}{blog.author && blog.publishedAt && " · "}{blog.publishedAt}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function FAQ({ cms }) {
  const [open, setOpen] = useState(null);
  const faqs = sortItems(cms.faqs).filter(x => x.published !== false);
  const [showAll, setShowAll] = useState(false);
  const visibleFaqs = showAll ? faqs : faqs.slice(0, 3);

  const toggleShowAll = () => {
    setShowAll(!showAll);
    setOpen(null);
  };

  return (
    <section className="hp-faq">
      <h2>Frequently Asked Questions</h2>
      {visibleFaqs.map((faq, i) => (
        <div className="hp-faq-item" key={faq.id || faq.question}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span>{faq.question}</span>
            <span className="hp-faq-arrow">
              <span className={`hp-faq-chevron ${open === i ? "open" : ""}`} />
            </span>
          </button>
          {open === i && <p>{faq.answer}</p>}
        </div>
      ))}
      {faqs.length > 3 && (
        <button
          type="button"
          className="hp-faq-more"
          onClick={toggleShowAll}
          aria-label={showAll ? "Show fewer FAQs" : "Show more FAQs"}
          aria-expanded={showAll}
        >
          <span className={`hp-faq-more-chevron ${showAll ? "open" : ""}`} />
        </button>
      )}
    </section>
  );
}

export default function HomePage() {
  const cms = useCms();
  return (
    <main className="homepage">
      <Hero cms={cms.homepage} />
      <Products cms={cms} />
    {/* <Industries cms={cms.homepage} /> */}
      <IndustriesServed cms={cms} />
      <WhyChoose />
      <Testimonial cms={cms.homepage} />
      <Blogs cms={cms} />
      <FAQ cms={cms.homepage} />
    </main>
  );
}
