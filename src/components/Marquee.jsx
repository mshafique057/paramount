// Endless horizontal ticker. The items are rendered twice so the loop joins seamlessly.
export default function Marquee({ items = [] }) {
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((text, i) => (
          <span key={i}>
            {text} <span className="dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
