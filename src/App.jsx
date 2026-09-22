import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import Admin from "./Admin";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import DynamicProductPage from "./pages/products/DynamicProductPage";
import Policies from "./pages/Policies";
import About from "./pages/AboutUs/About";

function AppShell() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
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
    </div>
  );
}

function App() {
  return <BrowserRouter><AppShell /></BrowserRouter>;
}

export default App;
