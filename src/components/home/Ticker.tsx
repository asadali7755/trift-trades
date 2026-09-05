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
    <div className="overflow-hidden border-y border-white/10 bg-surface py-3">
      <div className="ticker-track flex w-max gap-10 whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="font-display text-xl tracking-wide text-paper/50">
            {item} <span className="text-accent">&bull;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
