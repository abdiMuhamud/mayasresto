import { site } from "@/lib/config";
import { BrandMark, FacebookIcon, InstagramIcon, TripadvisorIcon } from "./icons";
import { SocialLink } from "./Location";

export function Footer() {
  return (
    <footer className="bg-ebony pb-28 pt-16 text-sand sm:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <BrandMark size={34} />
              <span className="font-serif text-3xl font-semibold">Maya&apos;s Resto</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-sand/55">{site.description}</p>
          </div>

          <div className="text-sm">
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

          <div className="text-sm">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brass">Follow</h3>
            <a
              href={site.socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-serif text-2xl text-sand transition hover:text-gold"
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

        <div className="flex flex-col gap-2 pt-8 text-xs text-sand/40 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Senegambia · Kololi · The Gambia</p>
        </div>
      </div>
    </footer>
  );
}
