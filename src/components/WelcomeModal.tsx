"use client";

import { useEffect, useRef } from "react";

const DISMISSED_KEY = "smt-welcome-dismissed";

/**
 * Welcome popup shown on first visit (same idea as St Matt's Brooklyn).
 * Uses the native <dialog> element so Esc-to-close and focus containment
 * come for free. Dismissal is remembered in localStorage so returning
 * visitors aren't nagged.
 */
export default function WelcomeModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    // localStorage can throw in private-browsing modes — fail closed (no popup).
    let dismissed = true;
    try {
      dismissed = localStorage.getItem(DISMISSED_KEY) === "true";
    } catch {
      return;
    }
    if (!dismissed) {
      dialogRef.current?.showModal();
    }
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(DISMISSED_KEY, "true");
    } catch {
      // Remembering the dismissal is best-effort.
    }
    dialogRef.current?.close();
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={dismiss}
      onClick={(e) => {
        // A click on the backdrop lands on the <dialog> element itself;
        // clicks inside the card land on its children.
        if (e.target === dialogRef.current) {
          dismiss();
        }
      }}
      aria-labelledby="welcome-heading"
      className="welcome-modal m-auto w-[calc(100%-3rem)] max-w-lg rounded-xl p-0 shadow-xl backdrop:bg-black/50"
    >
      <div className="relative p-8">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close welcome message"
          className="absolute top-2 right-2 flex min-h-[44px] min-w-[44px] items-center justify-center text-church-slate hover:text-church-blue transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <h2
          id="welcome-heading"
          className="text-2xl font-bold text-church-blue mb-4"
          lang="mi"
        >
          Nau mai, haere mai!
        </h2>
        <div className="space-y-3 text-church-slate leading-relaxed">
          <p>
            We meet every Sunday at 9:30 AM at 53 Reynolds Street,{" "}
            <span lang="mi">Taitā</span>.
          </p>
          <p>
            On the last Sunday of each month, we have a rhythm of GO (where we
            serve in our neighbourhood) or INVITE (where we invite our friends
            and neighbours to a more relaxed church gathering).
          </p>
          <p>
            Our time together typically runs for about an hour and a half and
            includes worship, prayer, teaching and reflection for{" "}
            <span lang="mi">tamariki</span> and adults, discussion, communion,
            and a kids&apos; programme. As well as coffee + good{" "}
            <span lang="mi">kai</span> afterwards — all welcome!
          </p>
        </div>

        <button
          type="button"
          onClick={dismiss}
          className="mt-6 inline-flex min-h-[44px] items-center rounded-xl bg-church-amber px-6 py-3 font-semibold text-white hover:bg-amber-600 transition-colors"
        >
          Come on in
        </button>
      </div>
    </dialog>
  );
}
