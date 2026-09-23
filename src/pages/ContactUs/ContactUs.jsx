import React, { useState } from "react";
import { useCms, saveCms, getCms, createId } from "../../cms";
import "./ContactUs.css";
export default function ContactUs() {
  const { contact } = useCms();
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const d = getCms();
    d.leads.push({
      id: createId("lead"),
      name: f.get("name"),
      email: f.get("email"),
      phone: f.get("phone"),
      company: f.get("company") || "",
      product: f.get("product") || "",
      loanAmount: f.get("loanAmount") || "",
      source: "Contact Form",
      subject: f.get("subject"),
      message: f.get("message"),
      status: "New",
      date: new Date().toLocaleString("en-IN"),
    });
    saveCms(d);
    e.currentTarget.reset();
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };
  return (
    <main className="contact-page">
      <section className="contact-hero">
        {contact.banner ? (
          <img
            src={contact.banner}
            alt="Contact Vallabhi Capital"
            className="contact-hero-image"
          />
        ) : (
          <div className="contact-hero-image" />
        )}
        <div className="contact-hero-overlay">
          <h1>Contact Us</h1>
        </div>
      </section>
      <section className="contact-info-section">
        <div className="contact-section-heading">
          <span className="contact-small-label">CONTACT INFO</span>
          <h2>
            <span>Contact</span> & Join Together
          </h2>
          <p>
            Have a question or need assistance? Our team is here to help you.
          </p>
        </div>
        <div className="contact-info-grid">
          <Info
            icon="📍"
            label="LOCATION"
            title="Visit Us At"
            value={contact.address}
          />
          <Info
            icon="☎"
            label="24/7 SERVICE"
            title="Call Us On"
            value={contact.phone}
          />
          <Info
            icon="✉"
            label="DROP A LINE"
            title="Mail Address"
            value={contact.email}
          />
          <Info
            icon="◷"
            label="OFFICE HOURS"
            title="Opening Time"
            value={contact.openingTime}
          />
        </div>
      </section>
      <section className="contact-get-in-touch">
        <div className="contact-touch-inner">
          <div className="contact-touch-left">
            <div className="contact-chat-card">
              <div className="contact-chat-icon">♧</div>
              <h3>Chat With Live!</h3>
              <p>
                Get quick assistance from our team for your financial queries
                and requirements.
              </p>
              <button
                type="button"
                onClick={() => {
                  window.location.href = "https://wa.me/919557269926";
                }}
              >
                LET'S CHAT
              </button>
            </div>
            <div className="contact-person-wrapper">
              {contact.formImage ? (
                <img
                  src={contact.formImage}
                  alt="Contact support"
                  className="contact-person-image"
                />
              ) : (
                <div className="contact-person-image" />
              )}
            </div>
          </div>
          <div className="contact-form-wrapper">
            <span className="contact-small-label">CONTACT US</span>
            <h2>
              <span>Reach & Get In Touch</span>
              <br />
              With Us!
            </h2>
            <form className="contact-form" onSubmit={submit}>
              <div className="contact-form-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name*"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email*"
                  required
                />
              </div>
              <div className="contact-form-row">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Number*"
                  required
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Your Subject*"
                  required
                />
              </div>
              <textarea name="message" placeholder="Enter Message" rows="7" />
              <button type="submit" className="contact-submit-button">
                SEND MESSAGE
              </button>
              {sent && (
                <p style={{ marginTop: 12 }}>
                  Thank you. Your enquiry has been received.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
function Info({ icon, label, title, value }) {
  return (
    <div className="contact-info-card">
      <div className="contact-info-icon">{icon}</div>
      <div>
        <span className="contact-card-label">{label}</span>
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
}
