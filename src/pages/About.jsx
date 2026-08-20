import { useRef } from "react";
import { useRevealScope } from "../lib/reveal";
import Newsletter from "../components/Newsletter";
import SectionRule from "../components/SectionRule";
import SmartImage from "../components/SmartImage";

const HOW = [
  {
    number: "01",
    title: "Fabric first.",
    body: "We lock the fabric spec before we draw the garment, not after."
  },
  {
    number: "02",
    title: "Small batches.",
    body: "Runs of a few hundred per style, recut only when they sell through."
  },
  {
    number: "03",
    title: "Direct, always.",
    body: "No marketplaces, no middle margin. This site is the only shelf."
  }
];

export default function About() {
  const pageRef = useRef(null);
  useRevealScope(pageRef);

  return (
    <div ref={pageRef}>
      <div className="wrap">
        <div className="about-hero">
          <div className="reveal">
            <SmartImage
              file="about-1.jpg"
              alt="Founder inspecting a run of heavyweight tees on a cutting table"
              label="NAKSHA / STUDIO"
              ratio="4 / 5"
            />
          </div>
          <div className="about-hero-copy">
            <h1 className="display display-section">WE MAKE FIVE THINGS.</h1>
            <p className="body-copy">
              Naksha started because we couldn&rsquo;t find a plain tee that
              survived a year. So we went to Tiruppur, found a unit that would
              run small batches at 240 GSM, and made five pieces we&rsquo;d
              wear ourselves. That&rsquo;s the whole plan.
            </p>
          </div>
        </div>
      </div>

      <section className="home-section">
        <div className="wrap">
          <SectionRule label="01 — HOW" />
          <div style={{ marginTop: 56 }}>
            {HOW.map((row) => (
              <div className="how-row" key={row.number}>
                <span className="meta">{row.number}</span>
                <h3>{row.title}</h3>
                <p>{row.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="reveal">
        <SmartImage
          file="factory.jpg"
          alt="Sewing floor of the Tiruppur unit, twelve machines in two rows"
          label="TIRUPPUR / UNIT 4"
          ratio="3 / 2"
        />
      </div>

      <section className="home-section">
        <div className="wrap">
          <SectionRule label="02 — WHERE" />
          <div className="where-grid" style={{ marginTop: 56 }}>
            <h3>Tiruppur, Tamil Nadu</h3>
            <div className="where-copy">
              <p className="body-copy">
                The unit is twelve people on Avinashi Road. They cut, sew and
                finish everything we sell, on machines they own and maintain
                themselves. Small runs suit them; it is how they have always
                worked.
              </p>
              <p className="body-copy">
                What they don&rsquo;t do matters as much. No minimum-order
                pressure, no polyester blends, no subcontracting the parts
                nobody sees.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
