const items = [
  "Mariages",
  "Festivals",
  "Corporatif",
  "Municipal",
  "Afters",
  "Chapiteaux",
  "Sono",
  "Animation",
  "Clé en main",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-chocolate-deep bg-forest-deep">
      <div className="marquee-track flex w-max gap-10 py-3 pr-10">
        {row.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="font-display text-2xl font-bold tracking-[0.18em] text-beige uppercase"
          >
            {item}
            <span className="ml-10 text-forest-bright">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
