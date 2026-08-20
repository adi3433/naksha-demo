const ITEMS = [
  "240 GSM COMBED COTTON",
  "SANFORISED, NO SURPRISE SHRINKAGE",
  "BAR-TACKED STRESS POINTS",
  "TIRUPPUR, TAMIL NADU",
  "7-DAY EXCHANGE, NO QUESTIONS"
];

export default function Marquee() {
  return (
    <div className="marquee">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div
            className="marquee-group"
            key={copy}
            aria-hidden={copy === 1 ? "true" : undefined}
          >
            {ITEMS.map((item) => (
              <span key={item}>
                {item} <b aria-hidden="true">/</b>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
