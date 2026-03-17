import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-church-blue to-church-green text-white">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Logo and name */}
          <div className="flex items-center gap-3">
            <Image
              src="/smt-logo.jpg"
              alt="St Matt's Taitā logo"
              width={48}
              height={48}
              className="rounded-full bg-white p-1"
            />
            <span className="font-bold text-xl">
              St Matt&apos;s Anglican Church{" "}
              <span lang="mi">Taitā</span>
            </span>
          </div>

          {/* Addresses */}
          <div className="flex flex-col sm:flex-row gap-6 text-white/90">
            <div>
              <p className="font-semibold text-white">Visit us</p>
              <a
                href="https://www.google.com/maps/place/St.+Matthew's+Anglican+Church/@-41.1790479,174.956379,19z/data=!4m6!3m5!1s0x6d4755834e4697ef:0x49440d4cea8a91db!8m2!3d-41.1784671!4d174.9565276!16s%2Fg%2F11k3d00vvd?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors underline underline-offset-2"
              >
                53 Reynolds Street, Taitā
              </a>
            </div>
            <div>
              <p className="font-semibold text-white">Post</p>
              <p>42a Poole Street, Taitā</p>
            </div>
          </div>

          {/* Contact links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-white/90">
            <a
              href="tel:+64224097237"
              className="hover:text-white transition-colors min-h-[44px] flex items-center"
            >
              022 409 7237
            </a>
            <span className="hidden sm:inline text-white/40">|</span>
            <a
              href="mailto:admin@stmattstaita.org.nz"
              className="hover:text-white transition-colors min-h-[44px] flex items-center"
            >
              admin@stmattstaita.org.nz
            </a>
          </div>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/profile.php?id=100088895017140"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-church-amber transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Visit our Facebook page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>

          {/* Copyright */}
          <p className="text-white/60 text-sm">
            &copy; 2026 St Matt&apos;s Anglican Church{" "}
            <span lang="mi">Taitā</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
