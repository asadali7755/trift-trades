const ITEMS = [
  "Imported Quality",
  "Football Boots",
  "Running Shoes",
  "Casual Sneakers",
  "Nationwide Delivery",
  "Cash on Delivery",
];

export function Ticker() {
  const items = [...ITEMS, ...ITEMS];

  return (
    <div className="overflow-hidden border-y border-white/10 py-4">
      <div className="ticker-track flex w-max gap-8 whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={i}
            className="text-xs font-bold uppercase tracking-[0.2em] text-paper/40"
          >
            {item} <span className="text-accent">&middot;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
