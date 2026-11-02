"use client";

import { Clock, Mail, MapPin, Navigation } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/lib/config";
import { isOpenNow } from "@/lib/hours";
import { quickReserveMessage, whatsappUrl } from "@/lib/whatsapp";
import { FacebookIcon, InstagramIcon, TripadvisorIcon, WhatsAppIcon } from "./icons";
import { Reveal, SectionEyebrow } from "./Reveal";

const week = [
  { day: "Monday", open: true },
  { day: "Tuesday", open: false },
  { day: "Wednesday", open: true },
  { day: "Thursday", open: true },
  { day: "Friday", open: true },
  { day: "Saturday", open: true },
  { day: "Sunday", open: true },
];

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.address.mapQuery)}&z=16&output=embed`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.address.mapQuery)}`;

export function Location() {
  const [open, setOpen] = useState<boolean | null>(null);
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      setOpen(isOpenNow());
      setToday(new Intl.DateTimeFormat("en-GB", { weekday: "long", timeZone: site.timeZone }).format(new Date()));
    };
    update();
    const t = setInterval(update, 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="location" className="bg-sand py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <SectionEyebrow>Location &amp; Contact</SectionEyebrow>
          <h2 className="font-serif text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Find us on the <em className="text-clay">Strip</em>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="flex h-full flex-col gap-6 rounded-3xl bg-ivory p-6 shadow-soft ring-1 ring-ink/5 sm:p-8">
              <div className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-clay-soft text-clay">
                  <MapPin size={19} />
                </span>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-taupe">Address</h3>
                  <p className="mt-1.5 font-serif text-xl leading-snug text-ink">
                    {site.address.line1}
                    <br />
                    {site.address.line2}
                  </p>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-clay hover:text-clay-dark"
                  >
                    <Navigation size={14} /> Get directions
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-clay-soft text-clay">
                  <Clock size={19} />
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-taupe">Opening hours</h3>
                    {open !== null && (
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                          open ? "bg-emerald-50 text-emerald-700" : "bg-ink/5 text-taupe"
                        }`}
                      >
                        <span className={`size-1.5 rounded-full ${open ? "animate-pulse bg-emerald-500" : "bg-taupe"}`} />
                        {open ? "Open now" : "Closed now"}
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 font-serif text-xl text-ink">{site.hours.label}</p>
                  <p className="text-sm font-semibold text-clay">{site.hours.closedLabel}</p>
                  <ul className="mt-4 divide-y divide-ink/5 text-sm">
                    {week.map((d) => (
                      <li
                        key={d.day}
                        className={`flex justify-between py-1.5 ${d.day === today ? "font-semibold text-ink" : "text-taupe"}`}
                      >
                        <span>{d.day}</span>
                        <span>{d.open ? `${site.hours.open} – ${site.hours.close}` : "Closed"}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-3 border-t border-ink/5 pt-6">
                <a
                  href={whatsappUrl(quickReserveMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  <WhatsAppIcon size={18} /> Chat with us on WhatsApp
                </a>
                {site.email && (
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-sand px-6 py-3.5 text-sm font-semibold text-ink ring-1 ring-ink/10 transition hover:bg-white"
                  >
                    <Mail size={16} /> {site.email}
                  </a>
                )}
                <div className="flex justify-center gap-2 pt-1">
                  <SocialLink href={site.socials.instagram.url} label={`Instagram ${site.socials.instagram.handle}`}>
                    <InstagramIcon size={19} />
                  </SocialLink>
                  <SocialLink href={site.socials.facebook.url} label="Facebook">
                    <FacebookIcon size={19} />
                  </SocialLink>
                  <SocialLink href={site.socials.tripadvisor.url} label="Tripadvisor">
                    <TripadvisorIcon size={21} />
                  </SocialLink>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="relative h-[380px] overflow-hidden rounded-3xl bg-ivory shadow-soft ring-1 ring-ink/5 sm:h-[460px] lg:h-full lg:min-h-[560px]">
              <iframe
                title={`Map showing ${site.name} on the Senegambia Strip, Kololi`}
                src={mapSrc}
                className="absolute inset-0 size-full border-0 grayscale-[35%] sepia-[15%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function SocialLink({
  href,
  label,
  children,
  dark = false,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`grid size-11 place-items-center rounded-full transition ${
        dark
          ? "bg-white/5 text-sand/80 ring-1 ring-white/10 hover:bg-white/10 hover:text-gold"
          : "bg-sand text-ink ring-1 ring-ink/10 hover:bg-white hover:text-clay"
      }`}
    >
      {children}
    </a>
  );
}
