import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-screen bg-gradient-to-br from-church-blue to-church-green flex items-center justify-center -mt-14">
        <div className="text-center text-white px-6 py-24">
          <div className="mx-auto mb-8 w-20 h-20 md:w-28 md:h-28 rounded-full bg-white p-2 flex items-center justify-center">
            <Image
              src="/smt-logo.jpg"
              alt="St Matt's Taitā logo — a woven cross in black, white, and red"
              width={112}
              height={112}
              className="rounded-full"
              priority
            />
          </div>
          <p className="text-lg md:text-xl text-white/80 mb-1" lang="mi">
            Nau mai, haere mai
          </p>
          <p className="text-lg md:text-xl text-white/80 mb-6">Welcome</p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-2xl mx-auto">
            St Matt&apos;s Anglican Church{" "}
            <span lang="mi">Taitā</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            One small church with one big heart
          </p>

          {/* Scroll indicator — aria-hidden because it is purely decorative */}
          <div className="mt-16 animate-gentle-bounce" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto text-white/60"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </section>

      {/* Sunday Rhythm */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading>Join Us Sunday</SectionHeading>
          <div className="bg-white rounded-xl border-l-4 border-church-amber p-8 shadow-sm">
            <p className="text-4xl md:text-5xl font-bold text-church-blue mb-4">
              9:30 AM
            </p>
            <p className="text-lg mb-2">
              <a
                href="https://maps.app.goo.gl/WkBnzH3mxsw56Fxt7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-church-blue hover:text-church-green transition-colors underline underline-offset-4"
              >
                53 Reynolds Street, <span lang="mi">Taitā</span>
              </a>
            </p>
            <p className="text-church-slate text-lg">
              Every Sunday, followed by coffee and{" "}
              <span lang="mi">kai</span> together.
            </p>
          </div>

          {/* Giving — collapsible for privacy */}
          <details className="mt-6 group">
            <summary className="cursor-pointer text-church-slate hover:text-church-blue transition-colors text-sm font-medium list-none flex items-center gap-2 min-h-[44px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-open:rotate-90"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
              Giving &amp; Tithes
            </summary>
            <div className="mt-4 bg-white rounded-xl border-l-4 border-church-blue p-8 shadow-sm">
              <div className="bg-slate-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-church-slate mb-1">Bank account</p>
                <p className="font-mono text-lg font-semibold text-church-blue select-all">
                  02-0610-0070823-00
                </p>
                <p className="text-sm text-church-slate mt-1">
                  St Matt&apos;s{" "}
                  <span lang="mi">Taitā</span>
                </p>
              </div>
              <p className="text-church-slate mb-2">
                Reference: <span className="font-semibold">your full name</span>
              </p>
              <p className="text-sm text-church-slate">
                Tax receipts are emailed at the end of the financial year.
              </p>
            </div>
          </details>
        </div>
      </section>

      {/* Activities */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading>What&apos;s Happening in the Neighbourhood</SectionHeading>
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl border-l-4 border-church-green p-8 shadow-sm">
              <p className="font-semibold text-church-blue text-lg mb-2">
                Community Garden
              </p>
              <p className="text-church-slate mb-1">Wednesdays</p>
              <p className="text-church-slate text-sm">
                Open to everyone. Come along for shared{" "}
                <span lang="mi">mahi</span> in the garden and learn to
                grow your own <span lang="mi">kai</span>.
              </p>
              <p className="text-sm font-medium text-church-green mt-3">
                Official Eco Church with A Rocha Aotearoa NZ
              </p>
            </div>
            <div className="bg-white rounded-xl border-l-4 border-church-amber p-8 shadow-sm">
              <p className="font-semibold text-church-blue text-lg mb-2">
                Playgroup
              </p>
              <p className="text-church-slate mb-1">
                Fridays, 10:00 – 11:30 AM
              </p>
              <p className="text-church-slate text-sm">
                A relaxed morning for parents, caregivers, and little ones.
              </p>
            </div>
            <div className="bg-white rounded-xl border-l-4 border-church-blue p-8 shadow-sm">
              <p className="font-semibold text-church-blue text-lg mb-2">
                Morning Prayers
              </p>
              <p className="text-church-slate mb-1">
                Weekdays, 6:30 AM
              </p>
              <p className="text-church-slate text-sm">
                Start the day together in prayer. Everyone welcome.
              </p>
            </div>
            <div className="bg-white rounded-xl border-l-4 border-church-green p-8 shadow-sm">
              <p className="font-semibold text-church-blue text-lg mb-2">
                Go Sunday
              </p>
              <p className="text-church-slate mb-1">
                Last Sunday of every second month
              </p>
              <p className="text-church-slate text-sm">
                We head out into the community to lend a hand where
                it&apos;s needed.
              </p>
            </div>
          </div>
          <p className="text-church-slate text-lg leading-relaxed">
            Produce from the garden is shared with neighbours in need
            and{" "}
            <span lang="mi">Taitā Pātaka Kai</span>. No
            experience needed — everyone is welcome.
          </p>
          <p className="text-center mt-8">
            <a
              href="https://www.facebook.com/profile.php?id=100088895017140"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-church-blue font-semibold hover:text-church-green transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Find out the latest events on our Facebook page
            </a>
          </p>
        </div>
      </section>

      {/* Hall Hire */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading>Hall Hire</SectionHeading>
          <div className="bg-white rounded-xl border-l-4 border-church-amber p-8 shadow-sm">
            <p className="text-lg text-church-slate leading-relaxed mb-4">
              Our hall and meeting rooms are available for community groups
              across <span lang="mi">Taitā</span>, Pomare, and Avalon.
              From $15/hour.
            </p>
            <a
              href="/hall-hire"
              className="inline-flex items-center bg-church-amber text-white hover:bg-amber-600 transition-colors px-6 py-3 rounded-xl font-semibold min-h-[44px]"
            >
              View booking details &amp; conditions
            </a>
          </div>
        </div>
      </section>

      {/* Kāinga Housing */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading subtitle="More than housing — we're building community">
            St Matt&apos;s <span lang="mi">Kāinga</span>
          </SectionHeading>
          <div>
            <p className="text-lg text-church-slate leading-relaxed mb-4">
              Eight warm, dry homes built on our church site by the Anglican
              Diocese — four one-bedroom, three two-bedroom, and one
              four-bedroom — providing affordable housing for families and
              individuals in{" "}
              <span lang="mi">Taitā</span>.
            </p>
            <p className="text-lg text-church-slate leading-relaxed mb-6">
              Single-storey and designed for community, our{" "}
              <span lang="mi">Kāinga</span> residents are welcome
              neighbours with no obligation to participate in church
              activities.
            </p>
            <a
              href="https://housing.stmattstaita.org.nz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-church-blue hover:text-church-green transition-colors font-medium underline underline-offset-4"
            >
              Read the full Kāinga story &rarr;
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
