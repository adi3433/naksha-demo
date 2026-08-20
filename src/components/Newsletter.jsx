import { useState } from "react";
import SectionRule from "./SectionRule";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [joined, setJoined] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    setError(null);
    setJoined(true);
  }

  return (
    <section className="newsletter">
      <div className="wrap">
        <SectionRule label="03 — LIST" className="newsletter-rule" />
        <div className="newsletter-center">
          <h2>FIRST LOOK AT DROP 02.</h2>
          <p>One email when a drop goes live. Nothing else.</p>
          {joined ? (
            <p className="newsletter-done">You&rsquo;re on the list.</p>
          ) : (
            <form className="newsletter-form" onSubmit={onSubmit} noValidate>
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <button type="submit" className="btn btn-cobalt">
                JOIN
              </button>
            </form>
          )}
          {!joined && error && <p className="newsletter-error">{error}</p>}
        </div>
      </div>
    </section>
  );
}
