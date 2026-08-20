import { useState } from "react";

const FAQ = [
  {
    q: "Where is my order?",
    a: "Tracking goes out on email and WhatsApp the day it ships. Metros take 2 to 3 days, everywhere else 4 to 5."
  },
  {
    q: "How do exchanges work?",
    a: "Message us within 7 days and we schedule a pickup from your door. The replacement ships the day the pickup is scanned."
  },
  {
    q: "Do you ship COD?",
    a: "Yes, everywhere we deliver. Prepaid and COD orders ship on the same timelines."
  },
  {
    q: "Will it shrink?",
    a: "Less than 3%. The fabric is sanforised before cutting, so the size you buy is the size it stays."
  }
];

export default function Contact() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    order: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function setField(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function onSubmit(event) {
    event.preventDefault();
    const next = {};
    if (!values.name.trim()) next.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) {
      next.email = "Enter a valid email address.";
    }
    if (!values.message.trim()) next.message = "Tell us what this is about.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  }

  return (
    <div className="wrap">
      <div className="contact-grid">
        <div>
          <h1 className="display display-section">TALK TO US.</h1>
          {sent ? (
            <p className="contact-done body-copy">
              Thanks. We reply within one working day.
            </p>
          ) : (
            <form className="contact-form" onSubmit={onSubmit} noValidate>
              <div className={`field${errors.name ? " has-error" : ""}`}>
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  value={values.name}
                  onChange={(event) => setField("name", event.target.value)}
                />
                {errors.name && (
                  <span className="field-error">{errors.name}</span>
                )}
              </div>
              <div className={`field${errors.email ? " has-error" : ""}`}>
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  value={values.email}
                  onChange={(event) => setField("email", event.target.value)}
                />
                {errors.email && (
                  <span className="field-error">{errors.email}</span>
                )}
              </div>
              <div className="field">
                <label htmlFor="contact-order">Order number (optional)</label>
                <input
                  id="contact-order"
                  type="text"
                  value={values.order}
                  onChange={(event) => setField("order", event.target.value)}
                />
              </div>
              <div className={`field${errors.message ? " has-error" : ""}`}>
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={values.message}
                  onChange={(event) => setField("message", event.target.value)}
                />
                {errors.message && (
                  <span className="field-error">{errors.message}</span>
                )}
              </div>
              <button type="submit" className="btn btn-solid">
                SEND
              </button>
            </form>
          )}
        </div>

        <div className="contact-info">
          <dl>
            <div className="spec-row">
              <dt className="meta">EMAIL</dt>
              <dd>hello@naksha.in</dd>
            </div>
            <div className="spec-row">
              <dt className="meta">WHATSAPP</dt>
              <dd>+91 90000 00000 · 10am–7pm IST</dd>
            </div>
            <div className="spec-row">
              <dt className="meta">RETURNS</dt>
              <dd>returns@naksha.in</dd>
            </div>
            <div className="spec-row">
              <dt className="meta">STUDIO</dt>
              <dd>Unit 4, Avinashi Road, Tiruppur, Tamil Nadu 641603</dd>
            </div>
          </dl>

          <div className="faq">
            <p className="meta faq-title">FAQ</p>
            {FAQ.map((item) => (
              <details className="accordion" key={item.q}>
                <summary>
                  {item.q}
                  <span className="chev" aria-hidden="true" />
                </summary>
                <div className="accordion-body">
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
