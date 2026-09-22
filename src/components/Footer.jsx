/*
=========================================================
FOOTER
=========================================================
*/

import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="products-footer">
      <div className="footer-inner">

        {/* =================================================
            COLUMN 1 - COMPANY
        ================================================= */}

        <div className="footer-company">

          <img
            src="/images/products/LOGO.webp"
            alt="Vallabhi Capital"
            className="footer-logo"
          />

          {/* SOCIAL MEDIA */}
          <div className="follow-us">
            <span>Follow us</span>

            <div className="social-icons">

              <a
                href="https://www.linkedin.com/company/vallabhi-capital-private-limited/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <img
                  src="/images/products/LINKEDIN.webp"
                  alt="LinkedIn"
                />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61584062965033"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <img
                  src="/images/products/FACEBOOK.webp"
                  alt="Facebook"
                />
              </a>

              <a
                href="https://www.instagram.com/vallabhicapital"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <img
                  src="/images/products/INSTAGRAM.webp"
                  alt="Instagram"
                />
              </a>

            </div>
          </div>

          {/* CORPORATE OFFICE */}
          <div className="office-block">
            <h4>Corporate Office</h4>

            <p>
              Office No. 1017-18, 10th Floor, World Trade
              Tower, Plot No, 1, Delhi Noida Direct
              Flyway, Block B, Sector 16, Noida, Uttar
              Pradesh - 201301
            </p>
          </div>

          {/* HEAD OFFICE */}
          <div className="office-block">
            <h4>Head Office</h4>

            <p>
              B-303, Rustomjee Central Park Business
              Spaces Andheri - Kurla Rd, Chakala, Andheri
              East, Mumbai, Maharashtra - 400093
            </p>
          </div>

          {/* REGISTERED OFFICE */}
          <div className="office-block">
            <h4>Registered Office</h4>

            <p>
              SF-4C, Second Floor, Rishabh Ipex
              Mall, Patparganj, IP Extension, Delhi -
              110092
            </p>
          </div>

          {/* BUSINESS ENQUIRY */}
          <div className="footer-contact">
            <h4>FOR Business Enquiry</h4>

            <p>
              Email:{" "}
              <a href="mailto:office@vallabhicapital.com">
                <strong>office@vallabhicapital.com</strong>
              </a>
            </p>

            <p>
              Toll Free:{" "}
              <a href="tel:18008900622">
                <strong>1800-890-0622</strong>
              </a>
            </p>
          </div>

        </div>


        {/* =================================================
            COLUMN 2 - OUR PRODUCTS
        ================================================= */}

        <div className="footer-column">

          <h3>Products</h3>

          <Link to="/products/msme">
            MSME Loan
          </Link>

          <Link to="/products/loan-against-property">
            Loan Against Property
          </Link>

          <Link to="/products/machinery-and-equipment">
            Machinery &amp; Equipment
          </Link>

          <Link to="/products/green-finance">
            Green Finance
          </Link>

          <Link to="/products/mid-corporate">
            Mid - Corporate
          </Link>

          <Link to="/products/micro-enterprises">
            Micro Enterprises
          </Link>

          <Link to="/products/purchase-finance">
            Purchase Financing
          </Link>

          <Link to="/products/work-order-finance">
            Work Order Finance
          </Link>

          <Link to="/products/invoice-discounting">
            Invoice Discounting
          </Link>

          <Link to="/products/vendor-finance">
            Vendor Finance
          </Link>

        </div>


        {/* =================================================
            COLUMN 3 - INDUSTRIES
        ================================================= */}

        <div className="footer-column">

          <h3>Industries</h3>

          <Link to="/industries/auto-auto-ancillary">
            Auto &amp; Auto Ancillary
          </Link>

          <Link to="/industries/hospitality">
            Hospitality
          </Link>

          <Link to="/industries/construction">
            Construction
          </Link>

          <Link to="/industries/logistics">
            Logistic
          </Link>

          <Link to="/industries/capital-goods">
            Capital Goods
          </Link>

          <Link to="/industries/pharma-health">
            Pharma Health
          </Link>

          <Link to="/industries/micro-enterprises">
            Micro Enterprises
          </Link>

          <Link to="/industries/agro">
            Agro
          </Link>

          <Link to="/industries/chemical">
            Chemical
          </Link>

          <Link to="/industries/e-mobility-green">
            E - Mobility &amp; Green
          </Link>


          {/* GRIEVANCES */}
          <div className="footer-contact grievances">

            <h4>FOR GRIEVANCES</h4>

            <p>
              Email:{" "}
              <a href="mailto:compliance@vallabhicapital.com">
                <strong>compliance@vallabhicapital.com</strong>
              </a>
            </p>

            <p>
              Call:{" "}
              <a href="tel:+918448694983">
                <strong>+91-844-869-4983</strong>
              </a>
            </p>

          </div>

        </div>


        {/* =================================================
            COLUMN 4 - QUICK LINKS
        ================================================= */}

        <div className="footer-column">

          <h3>Quick Links</h3>

          <Link to="/about-us">
            About Us
          </Link>

          <Link to="/company#vision-mission">
            Value | Mission | Vision
          </Link>

          <Link to="/company#board-team">
            Board Directors | Team
          </Link>

          <Link to="/blogs">
            Blogs
          </Link>

          <Link to="/investors/lending-partners#lending-partners">
            Lending Partners
          </Link>

          <Link to="/investors/technology-partners#technology-partners">
            Technology Partners
          </Link>

          <Link to="/esg">
            ESG
          </Link>

          <Link to="/career">
            Career
          </Link>

          <Link to="/gallery">
            Gallery
          </Link>


          {/* COMPANY POLICY */}
          <div className="company-policy">

            <h3>Company Policy</h3>

            <Link to="/privacy-policy">
              Privacy Policy
            </Link>

            <Link to="/terms-and-conditions">
              Terms &amp; Conditions
            </Link>

            <Link to="/refund-cancellation">
              Refund &amp; Cancellation
            </Link>

          </div>

        </div>

      </div>


      {/* =================================================
          COPYRIGHT
      ================================================= */}

      <div className="copyright">
        © 2026 Vallabhicapital.com. All Rights Reserved
      </div>

    </footer>
  );
}

export default Footer;