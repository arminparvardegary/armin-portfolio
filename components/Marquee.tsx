export default function Marquee({
  items = [],
  speed = 30,
}: {
  items: string[];
  speed?: number;
}) {
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track" style={{ animationDuration: `${speed}s` }}>
        {row.map((t, i) => (
          <span key={i} className="marquee-item">
            {t} <em>✦</em>
          </span>
        ))}
      </div>
    </div>
  );
}
