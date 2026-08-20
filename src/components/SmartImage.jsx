// Photography is looked up from src/assets/images at build time.
// A file that exists renders as a real image; a missing file renders the
// brief's missing-asset block: a hairline-filled panel at the correct aspect
// ratio with the garment name in metadata style. Never a stock substitute.
const found = import.meta.glob("../assets/images/*", {
  eager: true,
  query: "?url",
  import: "default"
});

const byName = {};
for (const path of Object.keys(found)) {
  const base = path.split("/").pop();
  byName[base] = found[path];
}

export default function SmartImage({
  file,
  alt,
  ratio = "4 / 5",
  label,
  eager = false,
  className = ""
}) {
  const src = byName[file];

  if (!src) {
    return (
      <div
        className={`img-missing ${className}`}
        style={{ aspectRatio: ratio }}
        role="img"
        aria-label={alt}
      >
        <span>{label || alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ aspectRatio: ratio }}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
