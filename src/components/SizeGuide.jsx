import { useOverlay } from "../lib/overlay";

const ROWS = [
  ["S", "40", "27", "17.5"],
  ["M", "42", "28", "18.5"],
  ["L", "44", "29", "19.5"],
  ["XL", "46", "30", "20.5"],
  ["XXL", "48", "31", "21.5"]
];

export default function SizeGuide({ open, onClose }) {
  const panelRef = useOverlay(open, onClose);

  if (!open) return null;

  return (
    <>
      <div className="scrim" onClick={onClose} aria-hidden="true" />
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Size guide"
        ref={panelRef}
      >
        <div className="drawer-head">
          <span className="meta meta-dark">SIZE GUIDE</span>
          <button type="button" className="text-btn" onClick={onClose}>
            CLOSE
          </button>
        </div>
        <div className="drawer-body">
          <table className="size-guide-table">
            <thead>
              <tr>
                <th scope="col">Size</th>
                <th scope="col">Chest</th>
                <th scope="col">Length</th>
                <th scope="col">Shoulder</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  <td>{row[1]}&Prime;</td>
                  <td>{row[2]}&Prime;</td>
                  <td>{row[3]}&Prime;</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="meta" style={{ padding: "24px 0" }}>
            All measurements in inches, garment laid flat.
          </p>
        </div>
      </aside>
    </>
  );
}
