"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Check, Clock, Martini, Snowflake, TreePalm, Users, X } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { site } from "@/lib/config";
import { formatDateLong, formatTime12 } from "@/lib/format";
import { useOverlay } from "@/lib/hooks";
import { todayISO, validateBookingSlot } from "@/lib/hours";
import {
  buildReservationMessage,
  openWhatsApp,
  whatsappUrl,
  type Occasion,
  type ReservationDetails,
  type SeatingPreference,
} from "@/lib/whatsapp";
import { useUI } from "@/store/ui";
import { WhatsAppIcon } from "./icons";

const guestOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "12+"];

const seatingOptions: { value: SeatingPreference; icon: typeof Snowflake; hint: string }[] = [
  { value: "Indoor Air-Conditioned", icon: Snowflake, hint: "Cool & calm" },
  { value: "Garden Terrace", icon: TreePalm, hint: "Under the palms" },
  { value: "Lounge Bar", icon: Martini, hint: "Cocktails & music" },
];

const occasions: Occasion[] = ["None", "Birthday", "Anniversary", "Business", "Date Night", "Other"];

/** 30-minute slots from opening to last seating. */
const timeSlots = (() => {
  const [oh, om] = site.hours.open.split(":").map(Number);
  const [lh, lm] = site.hours.lastSeating.split(":").map(Number);
  const out: string[] = [];
  for (let t = oh * 60 + om; t <= lh * 60 + lm; t += 30) {
    out.push(`${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`);
  }
  return out;
})();

const emptyForm: ReservationDetails = {
  name: "",
  guests: "2",
  date: "",
  time: "19:30",
  seating: "Garden Terrace",
  occasion: "None",
  notes: "",
};

type Errors = Partial<Record<"name" | "slot", string>>;

export function ReservationModal() {
  const open = useUI((s) => s.reservationOpen);
  const close = useUI((s) => s.closeReservation);
  const panelRef = useOverlay(open, close);
  const titleId = useId();

  const [form, setForm] = useState<ReservationDetails>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  const minDate = useMemo(() => (open ? todayISO() : ""), [open]);

  const set = <K extends keyof ReservationDetails>(key: K, value: ReservationDetails[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (key === "name") setErrors((e) => ({ ...e, name: undefined }));
    if (key === "date" || key === "time") setErrors((e) => ({ ...e, slot: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Please tell us your name.";
    const slotError = validateBookingSlot(form.date, form.time);
    if (slotError) next.slot = slotError;
    setErrors(next);
    if (Object.keys(next).length) return;

    const message = buildReservationMessage(form);
    openWhatsApp(message);
    setSentUrl(whatsappUrl(message));
  };

  const handleClose = () => {
    close();
    // Reset after the exit animation so the form doesn't flash.
    setTimeout(() => {
      if (sentUrl) setForm(emptyForm);
      setSentUrl(null);
      setErrors({});
    }, 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-ebony/60 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="relative flex max-h-[94svh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[2rem] bg-sand shadow-lift outline-none sm:rounded-[2rem]"
          >
            <div className="relative shrink-0 bg-ebony px-6 pb-6 pt-7 text-sand sm:px-8">
              <div aria-hidden className="absolute -right-10 -top-16 size-48 rounded-full bg-clay/30 blur-3xl" />
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20 sm:hidden" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brass">Reserve a table</p>
              <h2 id={titleId} className="mt-1.5 font-serif text-3xl font-medium sm:text-4xl">
                Join us at Maya&apos;s
              </h2>
              <p className="mt-1 text-sm text-sand/60">
                {site.hours.label} · {site.hours.closedLabel}
              </p>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close reservation form"
                className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/10 text-sand transition hover:bg-white/20"
              >
                <X size={18} />
              </button>
            </div>

            {sentUrl ? (
              <div className="flex flex-col items-center px-6 py-12 text-center sm:px-10">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="grid size-16 place-items-center rounded-full bg-whatsapp text-white shadow-lift"
                >
                  <Check size={30} />
                </motion.span>
                <h3 className="mt-6 font-serif text-3xl text-ink">Almost there, {form.name.split(" ")[0]}!</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-taupe">
                  Your request for <strong className="text-ink">{form.guests} guests</strong> on{" "}
                  <strong className="text-ink">{formatDateLong(form.date)}</strong> at{" "}
                  <strong className="text-ink">{formatTime12(form.time)}</strong> is ready in WhatsApp. Press send there
                  and our host will confirm shortly.
                </p>
                <a
                  href={sentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  <WhatsAppIcon size={18} /> WhatsApp didn&apos;t open? Tap here
                </a>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-3 text-sm font-semibold text-taupe underline-offset-4 hover:text-ink hover:underline"
                >
                  Back to the site
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
                <div className="flex-1 space-y-7 overflow-y-auto px-6 py-7 sm:px-8">
                  {/* Name */}
                  <Field label="Full name" htmlFor="res-name" error={errors.name}>
                    <input
                      id="res-name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="e.g. Fatou Jallow"
                      aria-invalid={!!errors.name}
                      className={inputClass(!!errors.name)}
                    />
                  </Field>

                  {/* Guests */}
                  <fieldset>
                    <legend className={labelClass}>
                      <Users size={14} className="text-clay" /> Number of guests
                    </legend>
                    <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
                      {guestOptions.map((g) => {
                        const selected = form.guests === g;
                        return (
                          <label
                            key={g}
                            className={`grid h-11 min-w-11 shrink-0 cursor-pointer place-items-center rounded-full px-3 text-sm font-semibold ring-1 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-clay ${
                              selected ? "bg-ink text-sand ring-ink" : "bg-white text-ink ring-ink/10 hover:ring-ink/30"
                            }`}
                          >
                            <input
                              type="radio"
                              name="guests"
                              value={g}
                              checked={selected}
                              onChange={() => set("guests", g)}
                              className="sr-only"
                            />
                            {g}
                          </label>
                        );
                      })}
                    </div>
                    {form.guests === "12+" && (
                      <p className="mt-2 text-xs text-taupe">For larger groups we&apos;ll arrange a set menu — add details below.</p>
                    )}
                  </fieldset>

                  {/* Date & time */}
                  <div>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Date" htmlFor="res-date" icon={<Calendar size={14} className="text-clay" />}>
                        <input
                          id="res-date"
                          type="date"
                          min={minDate}
                          value={form.date}
                          onChange={(e) => set("date", e.target.value)}
                          aria-invalid={!!errors.slot}
                          className={inputClass(!!errors.slot)}
                        />
                      </Field>
                      <Field label="Time" htmlFor="res-time" icon={<Clock size={14} className="text-clay" />}>
                        <select
                          id="res-time"
                          value={form.time}
                          onChange={(e) => set("time", e.target.value)}
                          className={inputClass(!!errors.slot)}
                        >
                          {timeSlots.map((t) => (
                            <option key={t} value={t}>
                              {formatTime12(t)}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>
                    {errors.slot ? (
                      <p role="alert" className="mt-2 text-xs font-medium text-red-700">
                        {errors.slot}
                      </p>
                    ) : (
                      <p className="mt-2 text-xs text-taupe">Closed Tuesdays · last seating 9:30 PM</p>
                    )}
                  </div>

                  {/* Seating */}
                  <fieldset>
                    <legend className={labelClass}>Seating preference</legend>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {seatingOptions.map((s) => {
                        const selected = form.seating === s.value;
                        return (
                          <label
                            key={s.value}
                            className={`flex cursor-pointer items-center gap-3 rounded-2xl p-3.5 ring-1 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-clay sm:flex-col sm:items-start sm:gap-2 ${
                              selected ? "bg-clay-soft ring-clay" : "bg-white ring-ink/10 hover:ring-ink/25"
                            }`}
                          >
                            <input
                              type="radio"
                              name="seating"
                              value={s.value}
                              checked={selected}
                              onChange={() => set("seating", s.value)}
                              className="sr-only"
                            />
                            <span
                              className={`grid size-9 shrink-0 place-items-center rounded-full ${
                                selected ? "bg-clay text-white" : "bg-ivory text-taupe"
                              }`}
                            >
                              <s.icon size={17} />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-sm font-semibold leading-tight text-ink">{s.value}</span>
                              <span className="block text-xs text-taupe">{s.hint}</span>
                            </span>
                            {selected && <Check size={16} className="ml-auto text-clay sm:hidden" />}
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  {/* Occasion */}
                  <fieldset>
                    <legend className={labelClass}>Occasion</legend>
                    <div className="flex flex-wrap gap-2">
                      {occasions.map((o) => {
                        const selected = form.occasion === o;
                        return (
                          <label
                            key={o}
                            className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium ring-1 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-clay ${
                              selected ? "bg-ink text-sand ring-ink" : "bg-white text-ink ring-ink/10 hover:ring-ink/30"
                            }`}
                          >
                            <input
                              type="radio"
                              name="occasion"
                              value={o}
                              checked={selected}
                              onChange={() => set("occasion", o)}
                              className="sr-only"
                            />
                            {o === "None" ? "Just dinner" : o}
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  <Field label="Special notes" htmlFor="res-notes" optional>
                    <textarea
                      id="res-notes"
                      rows={3}
                      maxLength={400}
                      value={form.notes}
                      onChange={(e) => set("notes", e.target.value)}
                      placeholder="Allergies, high chair, a surprise cake…"
                      className={`${inputClass(false)} resize-none`}
                    />
                  </Field>
                </div>

                <div className="shrink-0 border-t border-ink/5 bg-sand/95 px-6 py-4 backdrop-blur-md sm:px-8">
                  <button
                    type="submit"
                    className="inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-whatsapp text-base font-semibold text-white shadow-soft transition hover:brightness-110 active:scale-[0.99]"
                  >
                    <WhatsAppIcon size={20} /> Send request via WhatsApp
                  </button>
                  <p className="mt-2 text-center text-[11px] text-taupe">
                    Opens WhatsApp with your details filled in. Nothing is sent until you press send.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const labelClass = "mb-2.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-taupe";

const inputClass = (invalid: boolean) =>
  `h-12 w-full rounded-2xl bg-white px-4 text-[15px] text-ink placeholder:text-taupe/60 outline-none ring-1 transition focus:ring-2 ${
    invalid ? "ring-red-400 focus:ring-red-500" : "ring-ink/10 focus:ring-clay"
  } [&:is(textarea)]:h-auto [&:is(textarea)]:py-3`;

function Field({
  label,
  htmlFor,
  error,
  icon,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  icon?: React.ReactNode;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelClass}>
        {icon}
        {label}
        {optional && <span className="font-normal normal-case tracking-normal text-taupe/70">(optional)</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-2 text-xs font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
