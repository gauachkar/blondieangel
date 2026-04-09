import { useState, useRef } from "react";

const DROPS = [
  { id: 1, emoji: "🗡️", title: "Dark Knight Arc — Ch.4", type: "Story Drop", date: "Apr 5", price: "$12", isNew: true, color: "#8B00FF" },
  { id: 2, emoji: "🌸", title: "Cherry Blossom Bundle — She's Feral", type: "PPV Pack", date: "Apr 3", price: "$18", isNew: true, color: "#FF1493" },
  { id: 3, emoji: "🎮", title: "Midnight Co-Op Vol.7 — I Carried", type: "Gamer RP", date: "Mar 30", price: "$10", isNew: false, color: "#00FFFF" },
  { id: 4, emoji: "🐉", title: "Dragon Empress — I'm the Empress", type: "Roleplay Arc", date: "Mar 28", price: "$20", isNew: false, color: "#FF6B35" },
  { id: 5, emoji: "👑", title: "Lore Bible Season 2 — Members Only", type: "VIP Exclusive", date: "Mar 25", price: "$35", isNew: false, color: "#FFD700" },
  { id: 6, emoji: "⚡", title: "Cyberpunk One-Shot — Chaotic Good", type: "Story Drop", date: "Mar 20", price: "$8", isNew: false, color: "#00FFFF" },
];

export default function DropsCarousel() {
  const [offset, setOffset] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const visible = 3;
  const max = DROPS.length - visible;

  const prev = () => setOffset((o) => Math.max(0, o - 1));
  const next = () => setOffset((o) => Math.min(max, o + 1));

  return (
    <section id="drops" className="relative w-full bg-[#080808] py-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#FF1493]/4 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-[#FFD700] text-xs font-rajdhani font-bold tracking-widest uppercase mb-4">
              <div className="h-px w-8 bg-[#FFD700]" />
              Latest Drops
            </div>
            <h2 className="font-orbitron font-black text-3xl md:text-4xl text-white glitch-text">
              Just <span className="shimmer-text">Dropped</span>
            </h2>
          </div>
          <div className="flex gap-3">
            <button onClick={prev} disabled={offset === 0}
              className="w-10 h-10 rounded-full border border-white/15 hover:border-[#8B00FF]/60 text-white/60 hover:text-[#8B00FF] transition-all disabled:opacity-30 disabled:cursor-not-allowed text-lg">
              ‹
            </button>
            <button onClick={next} disabled={offset >= max}
              className="w-10 h-10 rounded-full border border-white/15 hover:border-[#8B00FF]/60 text-white/60 hover:text-[#8B00FF] transition-all disabled:opacity-30 disabled:cursor-not-allowed text-lg">
              ›
            </button>
          </div>
        </div>

        {/* Carousel track */}
        <div className="overflow-hidden" ref={trackRef}>
          <div
            className="flex gap-5 transition-transform duration-500"
            style={{ transform: `translateX(calc(-${offset} * (100% / ${visible} + 20px)))` }}
          >
            {DROPS.map((drop) => (
              <div
                key={drop.id}
                className="flex-shrink-0 w-full md:w-[calc((100%-40px)/3)] gradient-border-card rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{drop.emoji}</span>
                  <div className="flex flex-col items-end gap-1">
                    {drop.isNew && (
                      <span className="bg-[#FF1493] text-white text-[9px] font-orbitron font-bold px-2 py-0.5 rounded-full tracking-widest animate-pulse">NEW</span>
                    )}
                    <span className="text-white/30 text-xs font-rajdhani">{drop.date}</span>
                  </div>
                </div>

                <h3 className="font-rajdhani font-bold text-white text-lg leading-tight mb-2">{drop.title}</h3>
                <div className="text-xs font-rajdhani tracking-widest uppercase mb-4" style={{ color: drop.color }}>{drop.type}</div>

                <div className="flex items-center justify-between pt-4 border-t border-white/8">
                  <span className="font-orbitron font-black text-xl" style={{ color: drop.color }}>{drop.price}</span>
                  <button className="bg-transparent border text-sm font-rajdhani font-bold px-4 py-2 rounded-full tracking-wider transition-all hover:scale-105"
                    style={{ borderColor: `${drop.color}50`, color: drop.color, background: `${drop.color}12` }}>
                    Get It
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: max + 1 }).map((_, i) => (
            <button key={i} onClick={() => setOffset(i)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{ background: i === offset ? "#8B00FF" : "#333", boxShadow: i === offset ? "0 0 8px #8B00FF" : "none" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
