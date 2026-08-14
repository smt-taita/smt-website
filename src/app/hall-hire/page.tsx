import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";

const description =
  "Hire St Matt's Taitā hall, kitchen, and meeting rooms for community events. Available to groups across Taitā, Pomare, and Avalon. From $15/hour.";

export const metadata: Metadata = {
  // The layout's title template appends the church name.
  title: "Hall Hire",
  description,
  alternates: {
    canonical: "/hall-hire",
  },
  openGraph: {
    title: "Hall Hire | St Matt's Anglican Church Taitā",
    description,
    url: "/hall-hire",
    type: "website",
    // Declaring an openGraph block here stops this page inheriting the
    // root opengraph-image.jpg, so point at it explicitly.
    images: ["/opengraph-image.jpg"],
  },
  twitter: {
    title: "Hall Hire | St Matt's Anglican Church Taitā",
    description,
    images: ["/twitter-image.jpg"],
  },
};

/**
 * Live booking enquiry form URL (Google Form, owned by the church admin account).
 * Until the admin has built the form this stays null, and the page shows the
 * direct-contact path instead of a dead button.
 * Build spec: docs/hall-hire-booking-form.md
 * TODO(admin): set this to the published Google Form URL before go-live.
 */
const BOOKING_FORM_URL: string | null = null;

/** In-page jump targets, in page order. Ids match each section's heading. */
const JUMP_LINKS = [
  { href: "#facilities-heading", label: "Facilities" },
  { href: "#charges-heading", label: "Charges" },
  { href: "#availability-heading", label: "Availability" },
  { href: "#book-heading", label: "Book" },
  { href: "#conditions-heading", label: "Conditions" },
  { href: "#payment-heading", label: "Payment" },
];

/**
 * Facts an enquirer uses to self-qualify before reading further.
 * Every figure here is stated elsewhere on the page — deliberately no hall
 * capacity, which we have never published.
 */
const AT_A_GLANCE = [
  { label: "Hall, kitchen and foyer", value: "$20 / hour" },
  { label: "Front meeting room", value: "$15 / hour" },
  { label: "Kitchen", value: "Crockery for 50+" },
  { label: "Access", value: "Ramp from Reynolds St" },
];

/**
 * Condition item displayed as a border-accented card.
 * The left-border colour rotates through the brand palette to create
 * visual rhythm without being distracting.
 */
function ConditionCard({
  heading,
  children,
  accentColour,
}: {
  heading: string;
  children: React.ReactNode;
  accentColour: "church-blue" | "church-green" | "church-amber";
}) {
  const borderClass = {
    "church-blue": "border-church-blue",
    "church-green": "border-church-green",
    "church-amber": "border-church-amber",
  }[accentColour];

  return (
    <div className={`border-l-4 ${borderClass} pl-5 py-1`}>
      <h3 className="text-xl font-bold text-church-blue mb-2">{heading}</h3>
      <p className="text-lg leading-relaxed text-church-slate">{children}</p>
    </div>
  );
}

/** Shared back-to-home link — rendered at top and bottom of the page for convenience. */
function BackToHomeLink() {
  return (
    <Link
      href="/"
      className="inline-flex items-center min-h-[44px] text-church-blue hover:text-church-green transition-colors font-medium underline underline-offset-4"
    >
      ← Back to home
    </Link>
  );
}

export default function HallHirePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      {/* ── Top navigation ── */}
      <div className="mb-10">
        <BackToHomeLink />
      </div>

      {/* ── Page heading ── */}
      <SectionHeading subtitle="Community facilities available for hire">
        Hireage of St Matt&apos;s <span lang="mi">Taitā</span>
      </SectionHeading>

      {/* ── Introduction ── */}
      <p className="text-lg leading-relaxed text-church-slate mb-8">
        Our facilities are a community resource available for groups across{" "}
        <span lang="mi">Taitā</span>, Pomare, and Avalon. We welcome community
        organisations, health providers, educational groups, and private hirers
        who share our values of care and respect.
      </p>

      {/* ── At a glance ──
          The four facts most enquirers decide on, surfaced before the detail
          so they can qualify themselves in seconds rather than scrolling. */}
      <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 rounded-xl overflow-hidden border border-slate-200 shadow-sm mb-8">
        {AT_A_GLANCE.map((item) => (
          <div key={item.label} className="bg-white px-5 py-4">
            <dt className="text-sm text-church-slate/70">{item.label}</dt>
            <dd className="text-lg font-semibold text-church-blue mt-1">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* ── In-page navigation ──
          The page is long; these let someone go straight to the bit they came
          for. Targets carry scroll-mt so the fixed header doesn't cover them. */}
      <nav aria-label="On this page" className="mb-16">
        <ul className="flex flex-wrap gap-2">
          {JUMP_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-flex items-center min-h-[44px] px-4 rounded-full border border-slate-200 bg-white text-church-blue hover:border-church-green hover:text-church-green transition-colors font-medium"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ══════════════════════════════════════════ */}
      {/* FACILITIES                                  */}
      {/* ══════════════════════════════════════════ */}
      <section className="mb-16" aria-labelledby="facilities-heading">
        <h2
          id="facilities-heading"
          className="text-2xl font-bold text-church-blue scroll-mt-20 mb-8"
        >
          Our Facilities
        </h2>

        <div className="space-y-6">
          {/* Hall, Kitchen and Foyer */}
          <div className="bg-white rounded-xl border-l-4 border-church-amber p-8 shadow-sm">
            <h3 className="text-xl font-bold text-church-blue mb-3">
              Hall, Kitchen and Foyer
            </h3>
            <p className="text-lg leading-relaxed text-church-slate mb-4">
              The main hall is a large, bright, carpeted, heated and ventilated
              space with ramp-access from Reynolds Street — suitable for
              meetings, events, classes, and celebrations of all kinds.
            </p>
            <p className="text-lg leading-relaxed text-church-slate mb-4">
              The kitchen is fully equipped with an oven, microwave, hot water
              urn, crockery and cutlery for 50+, fridge, dishwasher, and servery
              window to the hall.
            </p>
            <p className="text-lg leading-relaxed text-church-slate">
              The foyer opens off the hall and works well for registration
              desks, smaller breakout groups, or simply as extra space when you
              need it.
            </p>
          </div>

          {/* Front Meeting Room */}
          <div className="bg-white rounded-xl border-l-4 border-church-green p-8 shadow-sm">
            <h3 className="text-xl font-bold text-church-blue mb-3">
              Front Meeting Room
            </h3>
            <p className="text-lg leading-relaxed text-church-slate mb-4">
              A carpeted room comfortably seating around 15 people — ideal for
              small group meetings, workshops, and counselling sessions.
            </p>
            <p className="text-lg leading-relaxed text-church-slate">
              The room includes a dedicated children&apos;s activity area
              suitable for under-fives, so parents can participate while little
              ones play safely nearby.
            </p>
          </div>

          {/* Sacred Space */}
          <div className="bg-white rounded-xl border-l-4 border-church-blue p-8 shadow-sm">
            <h3 className="text-xl font-bold text-church-blue mb-3">
              Sacred Space{" "}
              <span lang="mi" className="font-normal">
                (Whare Karakia)
              </span>
            </h3>
            <p className="text-lg leading-relaxed text-church-slate mb-4">
              Our worship space is available by prior arrangement for
              reflective, ceremonial, or spiritual use.
            </p>
            <p className="text-lg leading-relaxed text-church-slate">
              No food or drink is permitted inside. This space must be treated
              with respect as a sacred space — please discuss your intended use
              with us before booking.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* CHARGES                                     */}
      {/* ══════════════════════════════════════════ */}
      <section className="mb-16" aria-labelledby="charges-heading">
        <h2
          id="charges-heading"
          className="text-2xl font-bold text-church-blue scroll-mt-20 mb-8"
        >
          Charges
        </h2>

        {/* Using a table for charges so screen readers can associate rates with spaces clearly */}
        <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-church-blue text-white">
                <th className="px-6 py-4 text-base font-semibold">Space</th>
                <th className="px-6 py-4 text-base font-semibold text-right">
                  Rate (incl. GST)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b border-slate-100">
                <td className="px-6 py-4 text-lg text-church-slate">
                  Main hall, kitchen and foyer
                </td>
                <td className="px-6 py-4 text-lg text-church-blue font-semibold text-right">
                  $20 / hour
                </td>
              </tr>
              <tr className="bg-slate-50 border-b border-slate-100">
                <td className="px-6 py-4 text-lg text-church-slate">
                  Front meeting room
                </td>
                <td className="px-6 py-4 text-lg text-church-blue font-semibold text-right">
                  $15 / hour
                </td>
              </tr>
              <tr className="bg-white border-b border-slate-100">
                <td className="px-6 py-4 text-lg text-church-slate">
                  Full day hire
                </td>
                <td className="px-6 py-4 text-lg text-church-blue font-semibold text-right">
                  By negotiation
                </td>
              </tr>
              <tr className="bg-slate-50">
                {/* The bond row uses a different colour to distinguish it from hourly rates */}
                <td className="px-6 py-4 text-lg text-church-slate">
                  Refundable bond{" "}
                  <span className="text-sm text-church-slate/70">
                    (full-day hire only)
                  </span>
                </td>
                <td className="px-6 py-4 text-lg text-church-amber font-semibold text-right">
                  $100
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* AVAILABILITY CALENDAR                      */}
      {/* ══════════════════════════════════════════ */}
      <section className="mb-16" aria-labelledby="availability-heading">
        <h2
          id="availability-heading"
          className="text-2xl font-bold text-church-blue scroll-mt-20 mb-4"
        >
          Availability
        </h2>
        <p className="text-church-slate mb-6">
          The times listed are already booked. Contact us for available slots.
        </p>
        {/*
         * Two embeds rather than one: Google Calendar's week grid is fixed-width
         * and unreadable on a phone, so small screens get the agenda (schedule)
         * list instead, which reads as a simple list of what's booked. Only one
         * is ever visible; both are lazy-loaded so the hidden one costs little.
         */}
        <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
          {/* Mobile: agenda list */}
          <iframe
            src="https://calendar.google.com/calendar/embed?src=c_3546bfe8d5aebfc0f60e1275173956a2eb110c94a5302c97d72a17b6942d0494%40group.calendar.google.com&mode=AGENDA&showTitle=0&showPrint=0&showCalendars=0&showTabs=0&showNav=1&showDate=1&showTz=0"
            className="w-full border-0 block md:hidden"
            height="450"
            loading="lazy"
            title="Hall booking availability — upcoming bookings"
          />
          {/* Desktop: week grid, where the gaps are the point */}
          <iframe
            src="https://calendar.google.com/calendar/embed?src=c_3546bfe8d5aebfc0f60e1275173956a2eb110c94a5302c97d72a17b6942d0494%40group.calendar.google.com&mode=WEEK&showTitle=0&showPrint=0&showCalendars=0&showTabs=1&showNav=1&showDate=1&showTz=0"
            className="w-full border-0 hidden md:block"
            height="500"
            loading="lazy"
            title="Hall booking availability calendar"
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* BOOK YOUR ENQUIRY                           */}
      {/* ══════════════════════════════════════════ */}
      <section className="mb-16" aria-labelledby="book-heading">
        <h2
          id="book-heading"
          className="text-2xl font-bold text-church-blue scroll-mt-20 mb-4"
        >
          Book Your Enquiry
        </h2>
        <p className="text-lg leading-relaxed text-church-slate mb-6">
          Have a look at the availability calendar above before you enquire, so
          you can suggest a time that&apos;s free. Sending an enquiry isn&apos;t
          a confirmed booking — we&apos;ll be in touch to confirm availability.
        </p>

        {BOOKING_FORM_URL ? (
          <a
            href={BOOKING_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-church-amber text-white hover:bg-amber-600 transition-colors px-6 py-3 rounded-xl font-semibold min-h-[44px]"
          >
            Start your booking enquiry &rarr;
          </a>
        ) : (
          <p className="text-lg text-church-slate bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
            Our online booking form is coming soon. In the meantime, please get
            in touch using the details below.
          </p>
        )}

        {/* Direct-contact fallback — always available for those who prefer to talk to us. */}
        <div className="bg-white rounded-xl border-l-4 border-church-green p-8 shadow-sm mt-8">
          <h3 className="text-xl font-bold text-church-blue mb-3">
            Prefer to talk to us first?
          </h3>
          <div className="space-y-3">
            <p className="text-lg text-church-slate">
              <span className="font-medium">Email: </span>
              <a
                href="mailto:admin@stmattstaita.org.nz"
                className="text-church-blue hover:text-church-green transition-colors underline underline-offset-4 inline-flex items-center min-h-[44px]"
              >
                admin@stmattstaita.org.nz
              </a>
            </p>
            <p className="text-lg text-church-slate">
              <span className="font-medium">Phone: </span>
              <a
                href="tel:+64224097237"
                className="text-church-blue hover:text-church-green transition-colors underline underline-offset-4 inline-flex items-center min-h-[44px]"
              >
                022 409 7237
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* CONDITIONS OF USE                          */}
      {/* ══════════════════════════════════════════ */}
      {/* Collapsed by default — the conditions are reference detail rather than
          something a first-time visitor needs to read before enquiring.
          Native <details> so it works without JS and stays keyboard-accessible. */}
      <section className="mb-16" aria-labelledby="conditions-heading">
        <details className="group rounded-xl border border-slate-200 bg-white shadow-sm">
          <summary className="flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden px-6 py-5 min-h-[44px] rounded-xl hover:bg-slate-50 transition-colors">
            <h2
              id="conditions-heading"
              className="text-2xl font-bold text-church-blue"
            >
              Conditions of Use
            </h2>
            <span
              aria-hidden="true"
              className="shrink-0 text-church-green text-xl leading-none transition-transform duration-200 motion-reduce:transition-none group-open:rotate-180"
            >
              ▾
            </span>
          </summary>

          <div className="grid gap-6 md:grid-cols-2 px-6 pb-8 pt-2">
            {/*
             * Colours rotate blue → green → amber to create visual rhythm.
             * They carry no semantic meaning — purely for scannability.
             */}
            <ConditionCard heading="Alcohol" accentColour="church-blue">
              No alcohol may be consumed on the premises without prior written
              permission from the Vicar&apos;s Warden.
            </ConditionCard>

            <ConditionCard heading="Cleaning" accentColour="church-green">
              Premises must be left clean and tidy. Please clean all surfaces,
              sweep or vacuum floors, and wash and put away all dishes before
              leaving.
            </ConditionCard>

            <ConditionCard
              heading="Rubbish and Recycling"
              accentColour="church-amber"
            >
              All rubbish must be taken away by the hirer. Please do not leave
              rubbish in church bins.
            </ConditionCard>

            <ConditionCard heading="Storage" accentColour="church-blue">
              No goods may be stored on the premises without prior arrangement
              with the church office.
            </ConditionCard>

            <ConditionCard heading="Damage" accentColour="church-green">
              Any damage must be reported immediately. The hirer is liable for
              all repair or replacement costs arising from damage during the
              hire period.
            </ConditionCard>

            <ConditionCard heading="Car Parking" accentColour="church-amber">
              Limited on-site parking is available. Additional parking can be
              found on Reynolds Street and nearby side streets.
            </ConditionCard>

            <ConditionCard heading="Power" accentColour="church-blue">
              All heaters and lights must be turned off when leaving. Please
              check all switches before locking up.
            </ConditionCard>

            <ConditionCard heading="Keys" accentColour="church-green">
              Keys are issued on payment of the hire fee and must be returned
              after use. A $15 replacement fee applies for lost keys.
            </ConditionCard>

            <ConditionCard
              heading="Earthquake Procedure"
              accentColour="church-amber"
            >
              In an earthquake: drop, cover, and hold. Once shaking has stopped,
              evacuate calmly to the car park area, keeping well clear of
              buildings. Do not re-enter the building until it has been assessed
              as safe.
            </ConditionCard>
          </div>
        </details>
      </section>

      {/* ══════════════════════════════════════════ */}
      {/* PAYMENT                                     */}
      {/* ══════════════════════════════════════════ */}
      <section className="mb-16" aria-labelledby="payment-heading">
        <h2
          id="payment-heading"
          className="text-2xl font-bold text-church-blue scroll-mt-20 mb-8"
        >
          Payment
        </h2>

        <div className="bg-white rounded-xl border-l-4 border-church-green p-8 shadow-sm">
          <h3 className="text-xl font-bold text-church-blue mb-3">
            Payment by bank transfer
          </h3>
          <p className="text-lg text-church-slate mb-2">
            <span className="font-medium">Bank: </span>BNZ
          </p>
          <p className="text-lg text-church-slate mb-2">
            <span className="font-medium">Account number: </span>
            <span className="font-mono">02-0610-0070823-00</span>
          </p>
          {/* Registered payee name — must match the bank record exactly,
              so no macron or apostrophe here. */}
          <p className="text-lg text-church-slate mb-4">
            <span className="font-medium">Account name: </span>
            SAINT MATTHEWS - TAITA
          </p>
          {/* Reminding hirers to use their name as reference prevents payment matching issues */}
          <p className="text-lg text-church-slate bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
            Please use your name and &ldquo;booking&rdquo; when paying so we can
            match your payment.
          </p>
        </div>
      </section>

      {/* ── Bottom navigation ── */}
      <div className="pt-4">
        <BackToHomeLink />
      </div>
    </div>
  );
}
