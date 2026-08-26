import { AnimateIn } from "@/components/animate-in";

const quotes = [
  {
    quote:
      "Ils ont levé un chapiteau 10×20, la sono et le dancefloor pendant qu’on répétait. À 16 h, le site était un festival. À 2 h, il n’y avait plus une sangle au sol.",
    name: "Camille R.",
    role: "Direction, Festival des Hauts-Bois",
  },
  {
    quote:
      "On voulait un mariage dehors sans paraître un camping. Tente stretch, lumière, tables — et quelqu’un qui savait où poser chaque mât. Clé en main, vraiment.",
    name: "Léa & Antoine",
    role: "Mariage, Magog",
  },
  {
    quote:
      "Un seul devis, un seul responsable, zéro surprise la veille. Pour un corporatif de 180 personnes, c’est ça le luxe.",
    name: "Marc-André B.",
    role: "Événementiel, entreprise manufacturière",
  },
];

export function TestimonialsSection() {
  return (
    <section id="temoignages" className="bg-forest-deep py-24 text-beige">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <AnimateIn>
          <p className="text-xs font-bold tracking-[0.32em] text-gold uppercase">
            Témoignages
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.9] font-bold uppercase">
            Ils ont vu
            <span className="block">les camions arriver.</span>
          </h2>
        </AnimateIn>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {quotes.map((item, index) => (
            <AnimateIn key={item.name} delay={index * 0.15}>
              <blockquote className="flex h-full flex-col border border-white/10 bg-chocolate-deep/40 p-7">
                <p className="font-serif text-2xl leading-snug text-beige italic">
                  “{item.quote}”
                </p>
                <footer className="mt-8">
                  <p className="font-display text-xl font-bold tracking-wide uppercase">
                    {item.name}
                  </p>
                  <p className="text-sm text-gold">{item.role}</p>
                </footer>
              </blockquote>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
