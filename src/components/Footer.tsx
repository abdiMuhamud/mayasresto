import { ArrowUp } from "lucide-react";
import { site } from "@/lib/config";
import { BrandMark, FacebookIcon, InstagramIcon, RotatingBadge, TripadvisorIcon } from "./icons";
import { SocialLink } from "./Location";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ebony pb-28 pt-20 text-sand sm:pb-10">
      <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/2 size-[44rem] -translate-x-1/2 rounded-full bg-clay/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="group flex items-center gap-3">
              <BrandMark size={44} />
              <span className="font-serif text-3xl font-semibold">Maya&apos;s Resto</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-sand/55">{site.description}</p>
          </div>

          <div className="text-sm md:col-span-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brass">Visit</h3>
            <p className="mt-4 leading-relaxed text-sand/75">
              {site.address.line1}
              <br />
              {site.address.line2}
            </p>
            <p className="mt-4 leading-relaxed text-sand/75">
              {site.hours.label}
              <br />
              <span className="text-clay">{site.hours.closedLabel}</span>
            </p>
          </div>

          <div className="text-sm md:col-span-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brass">Follow</h3>
            <a
              href={site.socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-serif text-3xl text-sand transition hover:text-gold"
            >
              {site.socials.instagram.handle}
            </a>
            <div className="mt-4 flex gap-2">
              <SocialLink dark href={site.socials.instagram.url} label="Instagram">
                <InstagramIcon size={19} />
              </SocialLink>
              <SocialLink dark href={site.socials.facebook.url} label="Facebook">
                <FacebookIcon size={19} />
              </SocialLink>
              <SocialLink dark href={site.socials.tripadvisor.url} label="Tripadvisor">
                <TripadvisorIcon size={21} />
              </SocialLink>
            </div>
          </div>
        </div>

        {/* Oversized wordmark */}
        <div className="relative flex items-end justify-between gap-6 pt-10">
          <p
            aria-hidden
            className="select-none bg-gradient-to-b from-sand/90 to-sand/10 bg-clip-text font-serif text-[23vw] font-medium leading-[0.8] tracking-[-0.04em] text-transparent lg:text-[17rem]"
          >
            Maya&apos;s
          </p>
          <a href="#top" aria-label="Back to top" className="group mb-4 hidden shrink-0 text-sand/60 sm:block" data-cursor="Top">
            <RotatingBadge size={120} text="Back to top ✦ Back to top ✦ ">
              <span className="grid size-12 place-items-center rounded-full bg-clay text-white transition-transform duration-500 group-hover:-translate-y-1">
                <ArrowUp size={20} />
              </span>
            </RotatingBadge>
          </a>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-sand/40 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Senegambia · Kololi · The Gambia</p>
        </div>
      </div>
    </footer>
  );
}
