import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createId, getCms, saveCms, sortItems, useCms } from "../cms";
import "./Navbar.css";
import imgLogo from "@/imports/OurProducts/514f9971796012cf4d48c9b2b22201833841a4ca.webp";

function IndustryIcon({ type }) {
  const commonProps = {
    className: "navbar-generated-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ariaHidden: "true",
  };

  const icons = {
    micro: <><path d="M4 20V9l8-5 8 5v11" /><path d="M8 20v-5h8v5M9 10h.01M15 10h.01" /></>,
    hospitality: <><path d="M5 20V8h14v12M3 20h18M8 8V5h8v3M8 12h.01M12 12h.01M16 12h.01" /></>,
    construction: <><path d="M4 19h16M6 19V9h4v10M14 19V5h4v14M7 12h2M15 8h2M15 12h2" /></>,
    logistics: <><path d="M3 7h11v10H3zM14 11h4l3 3v3h-7M7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4M18 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4" /></>,
    capital: <><path d="M4 20V8l8-4 8 4v12M8 20v-5h8v5M8 10h.01M12 10h.01M16 10h.01" /></>,
    pharma: <><path d="m9 3 6 6M15 3 9 9M8 9l7 7a4 4 0 0 1-6 6l-2-2a4 4 0 0 1 0-6l6-6" /></>,
    auto: <><path d="m5 16 2-6h10l2 6M4 16h16v4H4zM7 20v1M17 20v1M7 14h.01M17 14h.01" /></>,
    agro: <><path d="M12 20V9M12 14c-4 0-6-2-6-6 4 0 6 2 6 6ZM12 11c0-4 2-6 6-6 0 4-2 6-6 6Z" /></>,
    chemical: <><path d="M9 3h6M10 3v6l-5 8a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-8V3M8 15h8" /></>,
    mobility: <><circle cx="12" cy="12" r="8" /><path d="m12 7 1.5 3.5L17 12l-3.5 1.5L12 17l-1.5-3.5L7 12l3.5-1.5L12 7Z" /></>,
    company: <><path d="M4 20V8l8-4 8 4v12M8 20v-5h8v5M8 10h.01M12 10h.01M16 10h.01" /></>,
    partners: <><circle cx="8" cy="9" r="3" /><circle cx="16" cy="9" r="3" /><path d="M3 20c.5-3 2.2-5 5-5s4.5 2 5 5M11 20c.5-3 2.2-5 5-5s4.5 2 5 5" /></>,
    esg: <><path d="M12 20V9M12 14c-4 0-6-2-6-6 4 0 6 2 6 6ZM12 11c0-4 2-6 6-6 0 4-2 6-6 6Z" /></>,
    career: <><rect x="4" y="7" width="16" height="13" rx="2" /><path d="M9 7V5h6v2M8 13h8M12 10v6" /></>,
    gallery: <><rect x="4" y="4" width="16" height="16" rx="2" /><circle cx="9" cy="9" r="1.5" /><path d="m4 16 4-4 3 3 2-2 7 6" /></>,
    msme: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 20v-5h8v5M8 9h.01M12 9h.01M16 9h.01" /></>,
    property: <><path d="m3 11 9-7 9 7M5 10v10h14V10M9 20v-5h6v5" /></>,
    machinery: <><circle cx="12" cy="12" r="4" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /></>,
    green: <><path d="M12 20V9M12 14c-4 0-6-2-6-6 4 0 6 2 6 6ZM12 11c0-4 2-6 6-6 0 4-2 6-6 6Z" /></>,
    corporate: <><path d="M4 20V8l8-4 8 4v12M8 20v-5h8v5M8 10h.01M12 10h.01M16 10h.01" /></>,
    microLoan: <><path d="M4 20V10l8-5 8 5v10M8 20v-4h8v4M9 11h.01M15 11h.01" /></>,
    supply: <><circle cx="7" cy="12" r="3" /><circle cx="17" cy="12" r="3" /><path d="M10 12h4" /></>,
    purchase: <><path d="M4 5h2l2 10h9l2-7H7M10 19h.01M17 19h.01" /></>,
    workorder: <><path d="M6 4h12v16H6zM9 8h6M9 12h6M9 16h4" /></>,
    invoice: <><path d="M6 3h9l3 3v15H6zM15 3v4h4M9 11h6M9 15h6" /></>,
    vendor: <><circle cx="8" cy="9" r="3" /><circle cx="16" cy="9" r="3" /><path d="M3 20c.5-3 2.2-5 5-5s4.5 2 5 5M11 20c.5-3 2.2-5 5-5s4.5 2 5 5" /></>,
  };

  return <svg {...commonProps}>{icons[type]}</svg>;
}

const productIconBySlug = {
  "msme-loan": "msme",
  msme: "msme",
  "loan-against-property": "property",
  "machinery-and-equipment": "machinery",
  machinery: "machinery",
  "green-finance": "green",
  green: "green",
  "mid-corporate": "corporate",
  "micro-enterprises": "microLoan",
  "purchase-finance": "purchase",
  "work-order-finance": "workorder",
  "invoice-discounting": "invoice",
  "vendor-finance": "vendor",
};

const industryIconBySlug = {
  "micro-enterprises": "micro",
  hospitality: "hospitality",
  construction: "construction",
  logistics: "logistics",
  "capital-goods": "capital",
  "pharma-health": "pharma",
  "auto-and-auto-ancillaries": "auto",
  agro: "agro",
  chemical: "chemical",
  "e-mobility-and-green": "mobility",
};

const getIconType = (map, slug, fallback) => map[String(slug || "").toLowerCase()] || fallback;

function Navbar() {
  const cms = useCms();
  const products = sortItems(cms.products?.items || []).filter((item) => item.published !== false && item.name && item.slug);
  const industries = sortItems(cms.industries?.items || []).filter((item) => item.published !== false && item.name && item.slug);
  const galleryFolders = (cms.gallery?.folders || []).filter((folder) => folder?.id && folder?.title).slice(0, 4);
  const esgInitiatives = sortItems(cms.esg?.initiatives || []).filter((event) => event.title?.trim());
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authType, setAuthType] = useState("user");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [applicationStep, setApplicationStep] = useState("otp");
  const [consentChecked, setConsentChecked] = useState(false);
  const [showConsentDetails, setShowConsentDetails] = useState(false);

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [error, setError] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [applicationForm, setApplicationForm] = useState({
    name: "",
    mobile: "",
    aadhaar: "",
    pan: "",
    amount: "",
    purpose: "",
  });

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "",
    city: "Mumbai",
  });

  const [showProfileDetails, setShowProfileDetails] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);

  const toggleMobileSubmenu = (menuKey) => {
    setMobileSubmenu((current) => (current === menuKey ? null : menuKey));
  };

  const resetLoginState = () => {
    setPhone("");
    setOtp("");
    setOtpSent(false);
    setGeneratedOtp("");
    setError("");
    setApplicationStep("otp");
    setConsentChecked(false);
    setShowConsentDetails(false);
    setApplicationForm({
      name: "",
      mobile: "",
      aadhaar: "",
      pan: "",
      amount: "",
      purpose: "",
    });
  };

  const openLoginModal = () => {
    resetLoginState();
    setAuthType("user");
    setIsLoginOpen(true);
  };

  useEffect(() => {
    const openApplication = () => openLoginModal();
    window.addEventListener("vc-open-application", openApplication);
    return () => window.removeEventListener("vc-open-application", openApplication);
  }, []);

  const openSelectedAuthModal = (type) => {
    setAuthType(type);
    resetLoginState();
    setIsLoginOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginOpen(false);
    resetLoginState();
  };

  const handleSendOtp = () => {
    const cleanedPhone = phone.replace(/\D/g, "");

    if (!consentChecked) {
      setError("Please provide consent before continuing.");
      return;
    }

    if (cleanedPhone.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    const newOtp = String(
      Math.floor(100000 + Math.random() * 900000)
    );

    setGeneratedOtp(newOtp);
    setUserPhone(phone.trim());
    setOtpSent(true);
    setOtp("");
    setError("");

    const cms = getCms();
    const leads = [...(cms.leads || [])];
    const existingLeadIndex = leads.findIndex((lead) => lead.phone === phone.trim() && lead.source === "Apply Now");
    const consentedAt = new Date().toISOString();
    const lead = existingLeadIndex >= 0 ? leads[existingLeadIndex] : {
      id: createId("lead"),
      name: "",
      company: "",
      phone: phone.trim(),
      email: "",
      product: "",
      loanAmount: "",
      source: "Apply Now",
      status: "New",
      date: new Date().toLocaleString("en-IN"),
    };
    const consentedLead = { ...lead, consented: true, consentedAt };
    if (existingLeadIndex >= 0) leads[existingLeadIndex] = consentedLead;
    else leads.push(consentedLead);
    saveCms({ ...cms, leads });
  };

  const handleOtpSubmit = (event) => {
    event.preventDefault();

    if (!otpSent) {
      return;
    }

    if (otp.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    if (otp !== generatedOtp) {
      setError("The OTP you entered is incorrect.");
      return;
    }

    setIsLoggedIn(true);
    setProfile((current) => ({
      ...current,
      phone: userPhone,
    }));
    setApplicationForm((current) => ({
      ...current,
      mobile: userPhone,
    }));
    setError("");
    setApplicationStep("form");
    setOtp("");
  };

  const handleApplicationChange = (field, value) => {
    setApplicationForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleApplicationSubmit = (event) => {
    event.preventDefault();

    const aadhaar = applicationForm.aadhaar.trim();
    const pan = applicationForm.pan.trim().toUpperCase();
    const amount = applicationForm.amount.trim();

    if (!applicationForm.name.trim() || !applicationForm.mobile.trim() || !aadhaar || !pan || !amount || !applicationForm.purpose.trim()) {
      setError("Please complete all application fields.");
      return;
    }

    if (!/^\d{12}$/.test(aadhaar)) {
      setError("Aadhaar must contain exactly 12 digits.");
      return;
    }

    if (!/^[A-Z]{5}\d{4}[A-Z]$/.test(pan)) {
      setError("PAN must be in the format ABCDE1234F.");
      return;
    }

    if (!/^\d+(?:\.\d{1,2})?$/.test(amount) || Number(amount) <= 0) {
      setError("Enter a valid loan amount.");
      return;
    }

    setApplicationForm((current) => ({ ...current, aadhaar, pan, amount }));
    setError("");

    const cms = getCms();
    const leadIndex = (cms.leads || []).findIndex((lead) => lead.phone === applicationForm.mobile && lead.source === "Apply Now");
    const lead = leadIndex >= 0 ? cms.leads[leadIndex] : {
      id: createId("lead"),
      phone: applicationForm.mobile,
      source: "Apply Now",
      status: "New",
      date: new Date().toLocaleString("en-IN"),
    };
    const updatedLead = {
      ...lead,
      name: applicationForm.name.trim(),
      aadhaar,
      pan,
      loanAmount: amount,
      purpose: applicationForm.purpose.trim(),
    };
    const leads = [...(cms.leads || [])];
    if (leadIndex >= 0) leads[leadIndex] = updatedLead;
    else leads.push(updatedLead);
    saveCms({ ...cms, leads });
    setApplicationStep("success");
  };

  const handleProfileChange = (field, value) => {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">

          {/* LOGO */}
          <a href="/" className="navbar-logo">
            <img src={imgLogo} alt="Vallabhi Capital" />
          </a>

          {/* MAIN NAVIGATION */}
          <nav className="navbar-menu">

            {/* OUR PRODUCT */}
            <div className="navbar-dropdown">

              <a
                href="/products"
                className="navbar-link navbar-dropdown-button"
              >
                Products
                <span className="navbar-chevron" aria-hidden="true" />
              </a>

              <div className="dropdown-menu dropdown-menu--columns">
                {products.filter((product) => product.category !== "supply-chain").map((product) => (
                  <a key={product.id} href={`/products/${product.slug}`} className="navbar-product-item">
                    <IndustryIcon type={getIconType(productIconBySlug, product.slug, "corporate")} />
                    {product.name}
                  </a>
                ))}
                {products.some((product) => product.category === "supply-chain") && <div className="dropdown-submenu">
                  <button className="submenu-button" type="button">
                    <span className="navbar-menu-label"><IndustryIcon type="supply" />Supply Chain</span>
                    <span className="navbar-chevron navbar-chevron-right" aria-hidden="true" />
                  </button>
                  <div className="submenu-menu">
                    {products.filter((product) => product.category === "supply-chain").map((product) => (
                      <a key={product.id} href={`/products/${product.slug}`} className="navbar-product-item">
                        <IndustryIcon type={getIconType(productIconBySlug, product.slug, "supply")} />
                        {product.name}
                      </a>
                    ))}
                  </div>
                </div>}

              </div>
            </div>

            {/* OUR INDUSTRIES */}
            <div className="navbar-dropdown">

              <Link
                to="/industries"
                className="navbar-link navbar-dropdown-button"
              >
                Industries
                <span className="navbar-chevron" aria-hidden="true" />
              </Link>

              <div className="dropdown-menu dropdown-menu--columns dropdown-menu--industries">
                {industries.map((industry) => (
                  <a key={industry.id} href={`/industries/${industry.slug}`} className="navbar-product-item">
                    <IndustryIcon type={getIconType(industryIconBySlug, industry.slug, "company")} />
                    {industry.name}
                  </a>
                ))}

              </div>
            </div>

            {/* ABOUT US */}
            <div className="navbar-dropdown">

              <button
                className="navbar-link navbar-dropdown-button"
                type="button"
              >
                About Us
                <span className="navbar-chevron" aria-hidden="true" />
              </button>

              <div className="dropdown-menu">

                {/* COMPANY */}
                <div className="dropdown-submenu">

                  <Link
                    to="/company"
                    className="submenu-button submenu-link"
                  >
                    <span className="navbar-menu-label"><IndustryIcon type="company" />Company</span>
                    <span className="navbar-chevron navbar-chevron-right" aria-hidden="true" />
                  </Link>

                  <div className="submenu-menu">

                    <Link
                      to="/company"
                      state={{ section: "who-we-are" }}
                    >
                      Who We Are
                    </Link>

                    <Link
                      to="/company"
                      state={{ section: "vision-mission" }}
                    >
                      Vision / Mission
                    </Link>

                    <Link
                      to="/company"
                      state={{ section: "values" }}
                    >
                      Values
                    </Link>

                    <Link
                      to="/company"
                      state={{ section: "board-and-team" }}
                    >
                      Board of Directors / Team
                    </Link>

                  </div>
                </div>


                {/* INVESTORS */}
                <div className="dropdown-submenu">

                  <Link
                    to="/partners"
                    className="submenu-button submenu-link"
                  >
                    <span className="navbar-menu-label"><IndustryIcon type="partners" />Partners</span>
                    <span className="navbar-chevron navbar-chevron-right" aria-hidden="true" />
                  </Link>

                  <div className="submenu-menu">

                    <Link
                      to="/partners"
                      state={{ section: "technology-partner" }}
                    >
                      Technology Partner
                    </Link>

                    <Link
                      to="/partners"
                      state={{ section: "investors" }}
                    >
                      Landing Partners
                    </Link>

                  </div>
                </div>


                {/* ESG */}
                <div className="dropdown-submenu">

                  <Link
                    to="/esg"
                    className="submenu-button submenu-link"
                  >
                    <span className="navbar-menu-label"><IndustryIcon type="esg" />ESG</span>
                    <span className="navbar-chevron navbar-chevron-right" aria-hidden="true" />
                  </Link>

                  <div className="submenu-menu">
                    {esgInitiatives.map((event) => (
                      <Link
                        key={event.id}
                        to="/esg"
                        state={{ section: event.id }}
                      >
                        {event.title}
                      </Link>
                    ))}
                  </div>
                </div>


                {/* CAREER */}
                <div className="dropdown-submenu">

                  <Link
                    to="/career"
                    className="submenu-button submenu-link"
                  >
                    <span className="navbar-menu-label"><IndustryIcon type="career" />Career</span>
                    <span className="navbar-chevron navbar-chevron-right" aria-hidden="true" />
                  </Link>

                  <div className="submenu-menu">

                    <Link
                      to="/career"
                      state={{ section: "employee-testimonial" }}
                    >
                      Employee Testimonial
                    </Link>

                    <Link
                      to="/career"
                      state={{ section: "openings" }}
                    >
                      Openings
                    </Link>

                  </div>
                </div>


                {/* GALLERY */}
                <div className="dropdown-submenu">

                  <Link
                    to="/gallery"
                    className="submenu-button submenu-link"
                  >
                    <span className="navbar-menu-label"><IndustryIcon type="gallery" />Gallery</span>
                    <span className="navbar-chevron navbar-chevron-right" aria-hidden="true" />
                  </Link>

                  <div className="submenu-menu">
                    {galleryFolders.map((folder) => (
                      <Link
                        key={folder.id}
                        to="/gallery"
                        state={{ galleryFolder: folder.id }}
                      >
                        {folder.title}
                      </Link>
                    ))}

                  </div>
                </div>

              </div>
            </div>

            {/* CONTACT US */}
            <a
              href="/contact-us"
              className="navbar-link"
            >
              Contact Us
            </a>

          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            className="navbar-mobile-toggle"
            aria-label="Open navigation menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>

          {/* MOBILE NAVIGATION */}
          {isMobileMenuOpen && (
            <div className="navbar-mobile-menu">
              <div className="navbar-mobile-group">
                <button
                  type="button"
                  className="navbar-mobile-item-button"
                  onClick={() => toggleMobileSubmenu("products")}
                >
                  <span>Products</span>
                  <span className={`navbar-chevron ${mobileSubmenu === "products" ? "navbar-chevron-open" : ""}`} aria-hidden="true" />
                </button>
                {mobileSubmenu === "products" && (
                  <div className="navbar-mobile-submenu">
                    {products.map((product) => (
                      <Link
                        key={product.id}
                        to={`/products/${product.slug}`}
                        onClick={() => { setIsMobileMenuOpen(false); setMobileSubmenu(null); }}
                      >
                        {product.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="navbar-mobile-group">
                <button
                  type="button"
                  className="navbar-mobile-item-button"
                  onClick={() => toggleMobileSubmenu("industries")}
                >
                  <span>Industries</span>
                  <span className={`navbar-chevron ${mobileSubmenu === "industries" ? "navbar-chevron-open" : ""}`} aria-hidden="true" />
                </button>
                {mobileSubmenu === "industries" && (
                  <div className="navbar-mobile-submenu">
                    {industries.map((industry) => (
                      <Link
                        key={industry.id}
                        to={`/industries/${industry.slug}`}
                        onClick={() => { setIsMobileMenuOpen(false); setMobileSubmenu(null); }}
                      >
                        {industry.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="navbar-mobile-group">
                <button
                  type="button"
                  className="navbar-mobile-item-button"
                  onClick={() => toggleMobileSubmenu("about")}
                >
                  <span>About Us</span>
                  <span className={`navbar-chevron ${mobileSubmenu === "about" ? "navbar-chevron-open" : ""}`} aria-hidden="true" />
                </button>
                {mobileSubmenu === "about" && (
                  <div className="navbar-mobile-submenu">
                    <Link to="/company" onClick={() => { setIsMobileMenuOpen(false); setMobileSubmenu(null); }}>Company</Link>
                    <Link to="/partners" onClick={() => { setIsMobileMenuOpen(false); setMobileSubmenu(null); }}>Partners</Link>
                    <Link to="/esg" onClick={() => { setIsMobileMenuOpen(false); setMobileSubmenu(null); }}>ESG</Link>
                    <Link to="/career" onClick={() => { setIsMobileMenuOpen(false); setMobileSubmenu(null); }}>Career</Link>
                    <Link to="/gallery" onClick={() => { setIsMobileMenuOpen(false); setMobileSubmenu(null); }}>Gallery</Link>
                  </div>
                )}
              </div>

              <Link to="/contact-us" className="navbar-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>
                Contact Us
              </Link>
              <a href="/apply" className="navbar-mobile-link navbar-mobile-cta" onClick={(event) => { event.preventDefault(); setIsMobileMenuOpen(false); openLoginModal(); }}>
                Apply Now
              </a>
            </div>
          )}

          {/* LOGIN */}
          <div
            className="navbar-login-wrapper"
            onMouseEnter={() =>
              isLoggedIn && setIsProfileMenuOpen(true)
            }
            onMouseLeave={() =>
              isLoggedIn && setIsProfileMenuOpen(false)
            }
            onFocus={() =>
              isLoggedIn && setIsProfileMenuOpen(true)
            }
            onBlur={() =>
              isLoggedIn && setIsProfileMenuOpen(false)
            }
          >

            <button
              className={`navbar-login ${
                isLoggedIn ? "navbar-login--active" : ""
              }`}
              type="button"
              aria-label={
                isLoggedIn ? "User profile" : "Login"
              }
              onClick={
                isLoggedIn
                  ? () =>
                      setIsProfileMenuOpen(
                        (current) => !current
                      )
                  : openLoginModal
              }
            >

              {isLoggedIn ? (
                <span
                  className="navbar-user-icon"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
 
                    <path
                      d="M4 19C5.76878 16.5625 8.57138 15.25 12 15.25C15.4286 15.25 18.2312 16.5625 20 19"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              ) : (
                "Apply Now"
              )}

            </button>

            {/* PROFILE DROPDOWN */}
            {isLoggedIn && isProfileMenuOpen && (

              <div
                className="profile-dropdown"
                onMouseLeave={() =>
                  setIsProfileMenuOpen(false)
                }
              >

                <div className="profile-header">

                  <div className="profile-avatar">
                    {profile.name
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>

                    <h3>{profile.name}</h3>

                    <p>
                      {profile.phone || userPhone}
                    </p>

                  </div>

                </div>

                <div className="profile-form">

                  <label>
                    Full Name

                    <input
                      type="text"
                      value={profile.name}
                      onChange={(event) =>
                        handleProfileChange(
                          "name",
                          event.target.value
                        )
                      }
                    />
                  </label>

                  <label>
                    Email

                    <input
                      type="email"
                      value={profile.email}
                      onChange={(event) =>
                        handleProfileChange(
                          "email",
                          event.target.value
                        )
                      }
                    />
                  </label>

                  <label>
                    Phone

                    <input
                      type="tel"
                      value={
                        profile.phone || userPhone
                      }
                      onChange={(event) =>
                        handleProfileChange(
                          "phone",
                          event.target.value
                        )
                      }
                    />
                  </label>

                  <label>
                    City

                    <input
                      type="text"
                      value={profile.city}
                      onChange={(event) =>
                        handleProfileChange(
                          "city",
                          event.target.value
                        )
                      }
                    />
                  </label>

                </div>

                <div className="profile-actions">

                  <button
                    type="button"
                    className="profile-btn profile-btn-secondary"
                    onClick={() =>
                      setShowProfileDetails(
                        (current) => !current
                      )
                    }
                  >
                    {showProfileDetails
                      ? "Hide details"
                      : "View details"}
                  </button>

                  <button
                    type="button"
                    className="profile-btn profile-btn-primary"
                    onClick={() =>
                      setIsProfileMenuOpen(false)
                    }
                  >
                    Save
                  </button>

                </div>

                {showProfileDetails && (

                  <div className="profile-details">

                    <p>
                      <strong>Name:</strong>{" "}
                      {profile.name}
                    </p>

                    <p>
                      <strong>Email:</strong>{" "}
                      {profile.email}
                    </p>

                    <p>
                      <strong>Phone:</strong>{" "}
                      {profile.phone || userPhone}
                    </p>

                    <p>
                      <strong>City:</strong>{" "}
                      {profile.city}
                    </p>

                  </div>

                )}

              </div>

            )}

          </div>

        </div>
      </header>

      {/* LOGIN MODAL */}
      {isLoginOpen && (

        <div
          className="login-modal-backdrop"
          onClick={closeLoginModal}
        >

          <div
            className="login-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="login-close"
              type="button"
              aria-label="Close login"
              onClick={closeLoginModal}
            >
              ×
            </button>

            <div className="login-header">

              <span className="login-badge">
                Secure Access
              </span>

              <h2>
                {applicationStep === "success"
                  ? "Application Submitted"
                  : applicationStep === "form"
                  ? "Complete Your Application"
                  : otpSent
                  ? "Verify OTP"
                  : "Get Started"}
              </h2>

            </div>

            {applicationStep === "success" ? (
              <div className="application-success">
                <p>Thank you, our team will contact you soon.</p>
              </div>
            ) : applicationStep === "form" ? (
              <form className="application-form" onSubmit={handleApplicationSubmit}>
                <div className="application-grid">
                  <div className="application-field application-field--full">
                    <label className="login-label" htmlFor="app-name">
                      Full Name
                    </label>
                    <input
                      id="app-name"
                      className="login-otp-input"
                      type="text"
                      value={applicationForm.name}
                      onChange={(event) => handleApplicationChange("name", event.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="application-field">
                    <label className="login-label" htmlFor="app-mobile">
                      Mobile Number
                    </label>
                    <input
                      id="app-mobile"
                      className="login-otp-input"
                      type="tel"
                      value={applicationForm.mobile}
                      readOnly
                    />
                  </div>

                  <div className="application-field">
                    <label className="login-label" htmlFor="app-amount">
                      Amount
                    </label>
                    <input
                      id="app-amount"
                      className="login-otp-input"
                      type="text"
                      inputMode="decimal"
                      value={applicationForm.amount}
                      onChange={(event) => handleApplicationChange("amount", event.target.value.replace(/[^\d.]/g, ""))}
                      placeholder="Enter amount"
                      required
                    />
                  </div>

                  <div className="application-field">
                    <label className="login-label" htmlFor="app-aadhaar">
                      Aadhaar Number
                    </label>
                    <input
                      id="app-aadhaar"
                      className="login-otp-input"
                      type="text"
                      inputMode="numeric"
                      maxLength={12}
                      value={applicationForm.aadhaar}
                      onChange={(event) => handleApplicationChange("aadhaar", event.target.value.replace(/\D/g, "").slice(0, 12))}
                      placeholder="12-digit Aadhaar number"
                      pattern="[0-9]{12}"
                      required
                    />
                  </div>

                  <div className="application-field">
                    <label className="login-label" htmlFor="app-pan">
                      PAN Number
                    </label>
                    <input
                      id="app-pan"
                      className="login-otp-input"
                      type="text"
                      maxLength={10}
                      value={applicationForm.pan}
                      onChange={(event) => handleApplicationChange("pan", event.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 10))}
                      placeholder="ABCDE1234F"
                      pattern="[A-Z]{5}[0-9]{4}[A-Z]"
                      required
                    />
                  </div>

                  <div className="application-field application-field--full">
                    <label className="login-label" htmlFor="app-purpose">
                      Purpose
                    </label>
                    <textarea
                      id="app-purpose"
                      className="login-otp-input application-textarea"
                      value={applicationForm.purpose}
                      onChange={(event) => handleApplicationChange("purpose", event.target.value)}
                      placeholder="Tell us the purpose of the loan"
                      rows={4}
                      required
                    />
                  </div>
                </div>

                {error && <p className="login-error application-form-error">{error}</p>}

                <button type="submit" className="login-submit">
                  Submit
                </button>
              </form>
            ) : !otpSent ? (

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSendOtp();
                }}
              >

                <label
                  className="login-label"
                  htmlFor="mobile-number"
                >
                  Mobile Number
                </label>

                <div className="login-input-wrap">

                  <span className="login-country-code">
                    +91
                  </span>

                  <input
                    id="mobile-number"
                    type="tel"
                    value={phone}
                    maxLength={10}
                    placeholder="Enter 10-digit number"
                    onChange={(event) =>
                      setPhone(
                        event.target.value.replace(
                          /\D/g,
                          ""
                        )
                      )
                    }
                  />

                </div>

                <div className="application-consent">
                  <label className="application-consent-check">
                    <input type="checkbox" checked={consentChecked} onChange={(event) => { setConsentChecked(event.target.checked); setError(""); }} />
                    <span>I agree to Vallabhi Capital’s <Link to="/terms-and-conditions">Terms and Conditions</Link> and <Link to="/policies/privacy-policy">Privacy Policy</Link> and consent to the collection and use of my phone number and SMS, and to receive communications, including promotional offers, via SMS, WhatsApp, email, and other permitted channels.</span>
                  </label>
                  <button type="button" className="login-text-button application-view-details" onClick={() => setShowConsentDetails(true)}>View Details</button>
                </div>

                {error && (
                  <p className="login-error">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="login-submit"
                >
                  Send OTP
                </button>

              </form>

            ) : (

              <form onSubmit={handleOtpSubmit}>

                <label
                  className="login-label"
                  htmlFor="otp-value"
                >
                  Enter OTP sent to {userPhone}
                </label>

                <input
                  id="otp-value"
                  className="login-otp-input"
                  type="text"
                  value={otp}
                  maxLength={6}
                  inputMode="numeric"
                  placeholder="6-digit OTP"
                  onChange={(event) =>
                    setOtp(
                      event.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                />

                {error && (
                  <p className="login-error">
                    {error}
                  </p>
                )}

                <div className="login-actions-row">

                  <button
                    type="button"
                    className="login-text-button"
                    onClick={() =>
                      setOtpSent(false)
                    }
                  >
                    Edit number
                  </button>

                  <button
                    type="button"
                    className="login-text-button"
                    onClick={handleSendOtp}
                  >
                    Resend OTP
                  </button>

                </div>

                <p className="login-demo-otp">
                  Demo OTP: {generatedOtp}
                </p>

                <button
                  type="submit"
                  className="login-submit"
                >
                  Login
                </button>

              </form>

            )}

          </div>

          {showConsentDetails && (
            <div className="consent-details-backdrop" onClick={() => setShowConsentDetails(false)}>
              <div className="consent-details-modal" role="dialog" aria-modal="true" aria-labelledby="consent-details-title" onClick={(event) => event.stopPropagation()}>
                <button type="button" className="login-close" aria-label="Close consent details" onClick={() => setShowConsentDetails(false)}>×</button>
                <h3 id="consent-details-title">Consent Details</h3>
                <p>I agree to Vallabhi Capital’s <Link to="/terms-and-conditions">Terms and Conditions</Link> and <Link to="/policies/privacy-policy">Privacy Policy</Link> and consent to the collection and use of my phone number and SMS, and to receive communications, including promotional offers, via SMS, WhatsApp, email, and other permitted channels.</p>
                <p>I expressly consent to Vallabhi Capital obtaining my credit report and relevant information from credit bureaus and authorised third-party providers to assess my creditworthiness and eligibility for financial products. I authorise Vallabhi Capital to receive, process, use, and share my credit and related information with authorised third parties, lending partners, and service providers solely for evaluating and processing my eligibility and application.</p>
              </div>
            </div>
          )}

        </div>

      )}

    </>
  );
}

export default Navbar;