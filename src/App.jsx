import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Products from "./pages/products/Products";
import MSMELoan from "./pages/products/MSMELoan";
import MachineryAndEquipment from "./pages/products/MachineryAndEquipment";
import Footer from "./components/Footer";
import LAP from "./pages/products/LAP";
import GreenFinance from "./pages/products/GreenFinance";
import MidCorporate from "./pages/products/MidCorporate";
import MicroEnterprises from "./pages/products/MicroEnterprises";
import PurchaseFinance from "./pages/products/PurchaseFinance";
import WorkOrderFinance from "./pages/products/WorkOrderFinance";
import InvoiceDiscounting from "./pages/products/InvoiceDiscounting";
import VendorFinance from "./pages/products/VendorFinance";
import Gallery from "./pages/AboutUs/Gallery";
import ContactUs from "./pages/ContactUs/ContactUs";
import Partners from "./pages/AboutUs/Partners";
import HomePage from "./HomePage";
import Industries from "./pages/Industries/Industries";
import IndustryDetail from "./pages/Industries/IndustryDetail";
import Career from "./pages/AboutUs/Career";
import ESG from "./pages/AboutUs/ESG";
import Admin from "./Admin";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import DynamicProductPage from "./pages/products/DynamicProductPage";
import Policies from "./pages/Policies";
import About from "./pages/AboutUs/About";

function AppShell() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <div className={`app-shell${isAdmin ? " app-shell-admin" : ""}`}>
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/company" element={<About />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/supply-chain/:slug" element={<DynamicProductPage />} />
        <Route path="/products/:slug" element={<DynamicProductPage />} />
        <Route path="/products/*" element={<DynamicProductPage />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/esg" element={<ESG />} />
        <Route path="/investors/lending-partners" element={<Partners />} />
        <Route path="/investors/technology-partners" element={<Partners />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/industries/:slug" element={<IndustryDetail />} />
        <Route path="/career" element={<Career />} />
        <Route path="/policies/privacy-policy" element={<Policies />} />
        <Route path="/privacy-policy" element={<Policies />} />
        <Route path="/terms-and-conditions" element={<Policies />} />
        <Route path="/refund-cancellation" element={<Policies />} />
      </Routes>
      {!isAdmin && <Footer />}
      {!isAdmin && (
        <a
          className="contact-whatsapp-button"
          href="https://wa.me/919557269926"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Let's talk on WhatsApp"
          title="Let's talk on WhatsApp"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.5 11.8a8.4 8.4 0 0 1-12.4 7.4L4 20.3l1.1-4a8.4 8.4 0 1 1 15.4-4.5Z" />
            <path d="M9 8.5c.3-.5.6-.5.9 0l.8 1.1c.2.3.2.6-.1.9l-.5.5c.6 1.1 1.5 2 2.6 2.6l.5-.5c.3-.3.6-.3.9-.1l1.1.8c.4.3.4.6 0 .9-.4.5-1 .7-1.6.6-2.1-.4-3.7-2-4.9-4.8-.2-.5 0-1.2.3-1.6Z" />
          </svg>
          <span>LET'S TALK</span>
        </a>
      )}
    </div>
  );
}

function App() {
  return <BrowserRouter><AppShell /></BrowserRouter>;
}

export default App;
