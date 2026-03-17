import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/smt-logo.jpg"
            alt="St Matt's Taitā logo — a woven cross in black, white, and red"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-church-blue font-semibold text-lg">
            St Matt&apos;s Taitā
          </span>
        </Link>
      </div>
    </header>
  );
}
