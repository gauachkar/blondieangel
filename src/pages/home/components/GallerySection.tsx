import { useState } from "react";

const GALLERY_ITEMS = [
  { id: 1, emoji: "🌸", label: "Sakura Arc — Season 1", type: "Story Preview", color: "#FF1493", locked: false },
  { id: 2, emoji: "⚔️", label: "Dark Knight Campaign", type: "Roleplay Session", color: "#8B00FF", locked: false },
  { id: 3, emoji: "🎮", label: "Gaming Night — Vol. 3", type: "Co-op Fiction", color: "#00FFFF", locked: false },
  { id: 4, emoji: "🔒", label: "VIP Drop #12 — Preview", type: "PPV Exclusive", color: "#FFD700", locked: true },
  { id: 5, emoji: "🌙", label: "Midnight Lore Session", type: "Anime Scenario", color: "#8B00FF", locked: false },
  { id: 6, emoji: "🔒", label: "Members-Only Arc", type: "VIP Content", color: "#FF1493", locked: true },
  { id: 7, emoji: "🐉", label: "Dragon's Lair — Ch.1", type: "Story Preview", color: "#FF6B35", locked: false },
  { id: 8, emoji: "🔒", label: "Exclusive Character Lore", type: "PPV Story Pack", color: "#00FFFF", locked: true },
];

export default function GallerySection() {
  const [lightbox, setLightbox] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  return (
    <section id="gallery" className="relative w-full bg-[#080808] py-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF1493]/40 to-transparent" />
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-[#8B00FF]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-[#00FFFF] text-xs font-rajdhani font-bold tracking-widest uppercase mb-4">
            <div className="h-px w-8 bg-[#00FFFF]" />
            Content Vault
            <div className="h-px w-8 bg-[#00FFFF]" />
          </div>
          <h2 className="font-orbitron font-black text-3xl md:text-4xl text-white mb-3 glitch-text">
            Content <span className="shimmer-text">Vault</span>
          </h2>
          <p className="text-white/40 font-rajdhani text-lg">Some of this is free. Some of it you have to earn. 🔒</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {GALLERY_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setLightbox(item)}
              className="group relative aspect-square rounded-2xl border border-white/8 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#8B00FF]/50"
              style={{ background: `linear-gradient(135deg, ${item.color}18, #111)` }}
            >
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <span className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {item.locked ? "🔒" : item.emoji}
                </span>
                <div className="text-center">
                  <div className="text-white font-rajdhani font-semibold text-sm leading-tight">{item.label}</div>
                  <div className="text-xs font-rajdhani mt-1 tracking-wider" style={{ color: item.color }}>{item.type}</div>
                </div>
              </div>

              {/* Locked overlay */}
              {item.locked && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
                  <span className="text-3xl mb-2">🔒</span>
                  <span className="text-[#FFD700] text-xs font-rajdhani font-bold tracking-widest">VIP ONLY</span>
                </div>
              )}

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 50%, ${item.color}15, transparent 70%)` }} />

              {/* Corner accent */}
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full animate-pulse" style={{ background: item.color }} />
            </button>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#vip" className="inline-flex items-center gap-2 bg-[#8B00FF]/15 border border-[#8B00FF]/40 hover:border-[#8B00FF] text-[#8B00FF] px-8 py-4 rounded-full font-rajdhani font-bold text-sm tracking-wider transition-all hover:bg-[#8B00FF]/20">
            👑 Unlock Everything — Join the Fan Club
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 modal-backdrop bg-black/80 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <div
            className="gradient-border-card rounded-3xl p-10 max-w-md w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-8xl block mb-6">{lightbox.locked ? "🔒" : lightbox.emoji}</span>
            <h3 className="font-orbitron font-bold text-xl text-white mb-2">{lightbox.label}</h3>
            <p className="text-xs font-rajdhani tracking-widest mb-6" style={{ color: lightbox.color }}>{lightbox.type}</p>
            {lightbox.locked ? (
              <>
                <p className="text-white/60 font-inter text-sm mb-6">This one's for members only. Join the fan club and unlock all the content, drops, and everything else I'm keeping from you right now.</p>
                <a href="#vip" onClick={() => setLightbox(null)} className="block bg-gradient-to-r from-[#8B00FF] to-[#FF1493] text-white py-3 rounded-full font-rajdhani font-bold tracking-wider">
                  👑 Get Access Now
                </a>
              </>
            ) : (
              <>
                <p className="text-white/60 font-inter text-sm mb-6">This is just the preview. Book the full session if you actually want to see how this ends — and trust me, you do.</p>
                <a href="#menu" onClick={() => setLightbox(null)} className="block bg-gradient-to-r from-[#8B00FF] to-[#FF1493] text-white py-3 rounded-full font-rajdhani font-bold tracking-wider">
                  🎮 Book the Full Session
                </a>
              </>
            )}
            <button onClick={() => setLightbox(null)} className="mt-4 text-white/40 text-sm font-rajdhani hover:text-white transition-colors">
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
