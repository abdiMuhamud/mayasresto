"use client";

import { BookOpen, Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/lib/config";
import { formatTime12 } from "@/lib/format";
import { isOpenNow } from "@/lib/hours";
import { quickReserveMessage, whatsappUrl } from "@/lib/whatsapp";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { Reveal, SectionEyebrow } from "./Reveal";

const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const weekdayIndex = (day: string) => (week.indexOf(day) + 1) % 7; // Monday → 1 … Sunday → 0

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

  const hoursText = `${formatTime12(site.hours.open)} – ${formatTime12(site.hours.close)}`;

  return (
    <section id="location" className="bg-sand py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <SectionEyebrow>Location &amp; Contact</SectionEyebrow>
          <h2 className="font-serif text-5xl font-medium leading-[1] tracking-tight text-ink sm:text-7xl">
            Find us in <em className="text-clay">Kololi</em>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="flex h-full flex-col gap-7 rounded-[2rem] bg-white/80 p-6 shadow-soft ring-1 ring-ink/5 sm:p-8">
              <Detail icon={<MapPin size={19} />} title="Address">
                <p className="font-serif text-xl leading-snug text-ink">
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
              </Detail>

              <Detail
                icon={<Clock size={19} />}
                title="Opening hours"
                badge={
                  open !== null && (
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                        open ? "bg-emerald-50 text-emerald-700" : "bg-ink/5 text-taupe"
                      }`}
                    >
                      <span className={`size-1.5 rounded-full ${open ? "animate-pulse bg-emerald-500" : "bg-taupe"}`} />
                      {open ? "Open now" : "Closed now"}
                    </span>
                  )
                }
              >
                <p className="font-serif text-xl text-ink">{site.meals}</p>
                <ul className="mt-3 divide-y divide-ink/5 text-sm">
                  {week.map((day) => {
                    const closed = (site.hours.closedDays as readonly number[]).includes(weekdayIndex(day));
                    return (
                      <li
                        key={day}
                        className={`flex justify-between py-1.5 ${day === today ? "font-semibold text-ink" : "text-taupe"}`}
                      >
                        <span>{day}</span>
                        <span className={closed ? "text-clay" : ""}>{closed ? "Closed" : hoursText}</span>
                      </li>
                    );
                  })}
                </ul>
              </Detail>

              <Detail icon={<Phone size={19} />} title="Phone & WhatsApp">
                <a href={site.phoneHref} className="font-serif text-xl text-ink hover:text-clay">
                  {site.phoneDisplay}
                </a>
              </Detail>

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
                  <SocialLink href={site.socials.directory.url} label={site.socials.directory.label}>
                    <BookOpen size={18} />
                  </SocialLink>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="relative h-[380px] overflow-hidden rounded-[2rem] bg-ivory shadow-soft ring-1 ring-ink/5 sm:h-[460px] lg:h-full lg:min-h-[600px]">
              <iframe
                title={`Map showing ${site.name} at The Oasis Complex, Kololi`}
                src={mapSrc}
                className="absolute inset-0 size-full border-0 grayscale-[25%]"
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

function Detail({
  icon,
  title,
  badge,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-navy text-apricot">{icon}</span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-taupe">{title}</h3>
          {badge}
        </div>
        <div className="mt-1.5">{children}</div>
      </div>
    </div>
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
      title={label}
      className={`grid size-11 place-items-center rounded-full transition ${
        dark
          ? "bg-white/5 text-sand/80 ring-1 ring-white/10 hover:bg-white/10 hover:text-apricot"
          : "bg-sand text-ink ring-1 ring-ink/10 hover:bg-white hover:text-clay"
      }`}
    >
      {children}
    </a>
  );
}
