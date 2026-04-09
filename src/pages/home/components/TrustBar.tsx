const TRUST_ITEMS = [
  { icon: "👑", label: "Real Brat. Real Business." },
  { icon: "✅", label: "Verified 18+ Creator" },
  { icon: "💸", label: "Pay Up & Enjoy It" },
  { icon: "🛡️", label: "Discreet & Secure" },
  { icon: "⚡", label: "Fast Response · No Waiting" },
  { icon: "🌟", label: "10,000+ Drained & Delighted" },
  { icon: "🎮", label: "Gamer. Dominant. Yours." },
  { icon: "🔒", label: "Arizona LLC · All Legal" },
];

export default function TrustBar() {
  return (
    <div className="relative w-full bg-[#0d0015] border-y border-[#8B00FF]/20 overflow-hidden py-4">
      {/* Marquee */}
      <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap" style={{ animation: "none" }}>
        <div className="flex items-center gap-12 whitespace-nowrap" style={{
          animation: "scroll-x 25s linear infinite",
        }}>
          {[...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
            <div key={i} className="flex items-center gap-3 flex-shrink-0">
              <span className="text-lg">{item.icon}</span>
              <span className="text-white/60 text-sm font-rajdhani font-semibold tracking-wider uppercase whitespace-nowrap">{item.label}</span>
              <span className="text-[#8B00FF]/40 mx-2">◆</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes scroll-x {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
