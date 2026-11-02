import { Flame, Leaf, Waves } from "lucide-react";
import Image from "next/image";
import { Reveal, SectionEyebrow } from "./Reveal";

const pillars = [
  {
    icon: Leaf,
    title: "Garden first",
    text: "Bowls and salads built around produce from growers in Brikama and Lamin, with plenty for vegan guests.",
  },
  {
    icon: Flame,
    title: "Live-fire grill",
    text: "An Argentinian-style parrilla burning hardwood, for steaks, skewers and sharing asado platters.",
  },
  {
    icon: Waves,
    title: "Atlantic catch",
    text: "Fish and prawns bought each morning at Tanji and Bakau and cooked simply.",
  },
];

export function About() {
  return (
    <section id="about" className="overflow-hidden bg-ivory py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift sm:rounded-[2.5rem]">
            <Image
              src="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=1200&q=75"
              alt="Warm, plant-filled dining room set for dinner"
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -right-2 w-[46%] overflow-hidden rounded-3xl border-[6px] border-ivory shadow-lift sm:-right-8">
            <div className="relative aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=75"
                alt="A plated dish being finished at the pass"
                fill
                sizes="260px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute -left-2 top-8 rounded-2xl bg-ebony px-5 py-4 text-sand shadow-lift sm:-left-6">
            <p className="font-serif text-3xl leading-none text-gold">Kololi</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-sand/60">On the Strip</p>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <SectionEyebrow>About Us</SectionEyebrow>
            <h2 className="font-serif text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl">
              A barefoot-luxury table on the <em className="text-clay">Smiling Coast</em>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-taupe sm:text-lg">
              Maya&apos;s is a garden restaurant on the Senegambia Strip. We cook with local produce and fresh fish,
              grill steaks over wood, and pour cocktails made with Gambian ingredients like wonjo and baobab.
            </p>
            <p className="mt-4 text-base leading-relaxed text-taupe sm:text-lg">
              Come for a long lunch on the terrace, sunset drinks at the lounge bar, or a celebration dinner.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="h-full">
                <div className="h-full rounded-2xl bg-sand p-5 shadow-soft ring-1 ring-ink/5">
                  <span className="grid size-10 place-items-center rounded-full bg-clay-soft text-clay">
                    <p.icon size={19} />
                  </span>
                  <h3 className="mt-4 font-serif text-xl font-semibold text-ink">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-taupe">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
