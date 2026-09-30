import React, { useState } from "react";
import { useCms } from "../../cms";
import "./ContactUs.css";

export default function ContactUs() {
  const { contact } = useCms();
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const f = new FormData(form);

    const name = String(f.get("name") || "").trim();
    const email = String(f.get("email") || "").trim();
    const phone = String(f.get("phone") || "").replace(/\D/g, "");
    const subject = String(f.get("subject") || "").trim();
    const message = String(f.get("message") || "").trim();

    if (!name || !email || !phone || !subject) {
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "Contact Form",
          name,
          email,
          phone,
          subject,
          message,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.error || "Unable to submit your enquiry."
        );
      }

      form.reset();
      setSent(true);

      setTimeout(() => setSent(false), 2500);
    } catch (error) {
      console.error("Contact form submission error:", error);

      alert(
        error.message ||
          "Unable to submit your enquiry. Please try again."
      );
    }
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
        </div>
      </section>

      <section className="contact-get-in-touch">
        <div className="contact-touch-inner">
          <div className="contact-touch-left">
            <h2 className="contact-details-heading">
              <span>Get In Touch</span>
            </h2>

            <p className="contact-details-intro">
              Share your details and our team will get in touch with you shortly.
            </p>

            <div className="contact-details-list">
              {contact.phone && (
                <div className="contact-detail-item">
                  <span>Contact for General Enquiries</span>
                  <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                </div>
              )}

              {contact.email && (
                <div className="contact-detail-item">
                  <span>Email for General Enquiries</span>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </div>
              )}

              {contact.openingTime && (
                <div className="contact-detail-item">
                  <span>Opening time</span>
                  <p>{contact.openingTime}</p>
                </div>
              )}
            </div>

          </div>

          <div className="contact-form-wrapper">
            <span className="contact-small-label">CONTACT US</span>

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

              <textarea
                name="message"
                placeholder="Enter Message"
                rows="4"
              />

              <button
                type="submit"
                className="contact-submit-button"
              >
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