import { useState } from "react";

const FAQS = [
  {
    q: "Who exactly is LilaVibes?",
    a: "Me. 18, dominant, anime gamer brat, and full-time content creator running a legit LLC in Arizona. I do text sessions, findom, feet content, anime RP, and gamer companion sessions. This is my real job and I love it. Any other questions?",
  },
  {
    q: "How do sessions actually work?",
    a: "Pick what you want from the menu, book it, and we connect via secure messaging. You bring your premise, I take over from there. I don't half-ass sessions — you'll get your money's worth and then some.",
  },
  {
    q: "Is my info and payment private?",
    a: "Obviously yes. No real names needed — use any handle you want. Payments go through secure third-party processors, billing is discreet, and I don't gossip. Your chaos stays between us.",
  },
  {
    q: "What's the difference between Simp, Obsessed, and Owned tiers?",
    a: "Simp gets you all content + front of queue. Obsessed adds monthly story bundles, weekly gaming sessions, and lore vault access. Owned gets you weekly 1-on-1 time with me, your name in story credits, and a custom character I build just for you. Owned is exactly what it sounds like.",
  },
  {
    q: "How fast do you respond?",
    a: "Standard queue within 24hrs. Obsessed members within 4hrs. Owned members same day. I only take sessions I can do right — no rushed garbage. If you're on my calendar, you're getting my full energy.",
  },
  {
    q: "Can I pick a specific anime or game for my session?",
    a: "That's literally my specialty. AoT, JJK, One Piece, Fate, Persona, Elden Ring, FFXIV — pick literally anything. I know the lore. Don't try to quiz me, you'll lose.",
  },
  {
    q: "What if I don't know what I want?",
    a: "Spin the Reward Spinner or use the Fantasy Builder — they'll get your brain going. Or just tell me a vibe, a mood, a single feeling, and I'll build something you didn't even know you needed. That's kind of what I do.",
  },
  {
    q: "What's your findom setup?",
    a: "Tribute, weekly drain, or monthly ownership — all in the menu. You pay, I acknowledge you in the most bratty, satisfying way possible. It's a whole thing. Check the Findom section and pick your level of damage.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="relative w-full bg-[#0A0A0A] py-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FFFF]/30 to-transparent" />
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#8B00FF]/4 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-[#00FFFF] text-xs font-rajdhani font-bold tracking-widest uppercase mb-4">
            <div className="h-px w-8 bg-[#00FFFF]" />
            FAQ
            <div className="h-px w-8 bg-[#00FFFF]" />
          </div>
          <h2 className="font-orbitron font-black text-3xl md:text-4xl text-white mb-3 glitch-text">
            Dumb <span className="shimmer-text">Questions</span> Welcome
          </h2>
          <p className="text-white/40 font-rajdhani text-lg">I'll answer them. Probably with attitude. You're welcome.</p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                open === i ? "border-[#8B00FF]/50 bg-[#8B00FF]/8" : "border-white/6 bg-[#111]/60 hover:border-[#8B00FF]/25"
              }`}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className={`font-rajdhani font-bold text-base pr-4 ${open === i ? "text-[#00FFFF]" : "text-white"}`}>
                  {faq.q}
                </span>
                <span
                  className="text-2xl flex-shrink-0 transition-transform duration-300 font-light"
                  style={{ color: open === i ? "#8B00FF" : "#444", transform: open === i ? "rotate(45deg)" : "none" }}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 slide-down">
                  <p className="text-white/60 font-inter text-sm leading-relaxed border-t border-[#8B00FF]/20 pt-4">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-white/30 font-rajdhani text-sm">
            Still confused? <a href="#request" className="text-[#8B00FF] hover:text-[#00FFFF] transition-colors underline underline-offset-4">Send me a direct message</a> and I'll answer in real time. With attitude.
          </p>
        </div>
      </div>
    </section>
  );
}
