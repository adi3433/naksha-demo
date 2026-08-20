// The signature structural detail: a 1px hairline spanning the content width
// with a small uppercase label sitting on its left.
export default function SectionRule({ label, className = "" }) {
  return (
    <div className={`section-rule ${className}`}>
      <span className="meta">{label}</span>
    </div>
  );
}
