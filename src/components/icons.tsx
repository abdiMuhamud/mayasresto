import type { SVGProps } from "react";

/** Brand marks (lucide ships no brand logos). */

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

export function WhatsAppIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01Zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28Z" />
    </svg>
  );
}

export function InstagramIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21.95V14.2h2.6l.39-3.02H13.5V9.25c0-.87.24-1.47 1.5-1.47h1.6V5.08a21.4 21.4 0 0 0-2.33-.12c-2.3 0-3.88 1.4-3.88 3.98v2.23H7.78v3.02h2.6v7.76C5.6 21.2 2 17.03 2 12 2 6.48 6.48 2 12 2s10 4.48 10 10c0 5.03-3.72 9.2-8.5 9.95Z" />
    </svg>
  );
}

export function TripadvisorIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden="true" {...props}>
      <circle cx="6.8" cy="13.2" r="3.9" />
      <circle cx="17.2" cy="13.2" r="3.9" />
      <circle cx="6.8" cy="13.2" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="17.2" cy="13.2" r="1.2" fill="currentColor" stroke="none" />
      <path d="M2.2 8.4h3.3M18.5 8.4h3.3M5.2 8.6C7.2 7 9.5 6.3 12 6.3s4.8.7 6.8 2.3M12 13.2v.1M10.4 17.1 12 19l1.6-1.9" strokeLinecap="round" />
    </svg>
  );
}

/** Maya's sun-and-palm mark. */
export function BrandMark({ size = 28, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true" {...props}>
      <circle cx="16" cy="16" r="15" fill="none" stroke="var(--color-brass)" strokeWidth="1.2" />
      <path d="M6 21.5a10 10 0 0 1 20 0" fill="var(--color-clay)" />
      <path d="M4 21.5h24" stroke="var(--color-brass)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M8 24.5h16M11 27h10" stroke="var(--color-brass)" strokeWidth="1" strokeLinecap="round" opacity=".7" />
      <path d="M16 6.5v3M9.3 9.3l2 2M22.7 9.3l-2 2" stroke="var(--color-gold)" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
