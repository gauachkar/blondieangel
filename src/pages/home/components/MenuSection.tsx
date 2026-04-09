import { useState } from "react";

const MENU_ITEMS = [
  {
    id: "roleplay",
    icon: "⚔️",
    title: "1-on-1 Dominant Roleplay",
    desc: "You sit down. I take over. Custom text sessions with bratty dominant power dynamics, dark fantasy arcs, and pure brat energy. I don't half-ass my sessions — you'll feel every word and beg for more.",
    tags: ["Text Sessions", "Custom Arc", "Dominant Lead"],
    tiers: [
      { name: "Starter", price: "$15", duration: "30 min session", features: ["Single scene", "Your kink, my execution"] },
      { name: "Full Arc", price: "$35", duration: "90 min session", features: ["Multi-scene arc", "Deep character work", "Save state"] },
      { name: "Epic", price: "$75", duration: "3-hour saga", features: ["Full campaign", "Voice notes", "Custom world built for you"] },
    ],
    featured: true,
    color: "#8B00FF",
  },
  {
    id: "findom",
    icon: "💸",
    title: "Findom & Tribute Sessions",
    desc: "You already know why you're here, loser. Pay up, get bratted, and enjoy every second of being drained by a woman who's better than you at literally everything. Rank: Drained. Wallet: Empty. Smile: Huge.",
    tags: ["Findom", "Tribute", "Bratty Queen"],
    tiers: [
      { name: "Tribute", price: "$20+", duration: "One-time", features: ["Acknowledgment from me", "Bratty thank-you"] },
      { name: "Owned", price: "$60/wk", duration: "Weekly drain", features: ["Regular sessions", "Priority DM access", "Custom tasks"] },
      { name: "Wallet Slave", price: "$150/mo", duration: "Monthly", features: ["Daily check-ins", "Spend assignments", "Exclusive content"] },
    ],
    color: "#FF1493",
  },
  {
    id: "feet",
    icon: "🦶",
    title: "Feet Content & Worship",
    desc: "Premium feet content from an 18-year-old brat who knows exactly what she's got. Photos, custom sets, written worship sessions — I'm in charge of how this goes and what you get. Earn it.",
    tags: ["Feet Content", "Custom Sets", "Worship Sessions"],
    tiers: [
      { name: "Basic Set", price: "$25", duration: "10 photos", features: ["Curated set", "Instant delivery"] },
      { name: "Custom", price: "$50", duration: "Personalized", features: ["Your requests", "20+ photos", "Poses of your choice"] },
      { name: "Worship Session", price: "$40", duration: "30 min text", features: ["Written worship session", "I narrate everything", "Dominant energy"] },
    ],
    color: "#FF6B35",
  },
  {
    id: "gaming",
    icon: "🎮",
    title: "Gamer RP Companion",
    desc: "Text-based gaming companion experience — I stay in character, banter like the gamer I actually am, roast you when you mess up, and make every session feel like we're playing side by side. Fresh brat energy, real gamer knowledge.",
    tags: ["Gamer RP", "In-Character", "Real Gamer Energy"],
    tiers: [
      { name: "Session", price: "$20", duration: "60 min", features: ["In-character banter", "Game universe of your choice"] },
      { name: "Campaign", price: "$50", duration: "Weekly drops", features: ["Ongoing narrative", "Character progression", "I remember everything"] },
    ],
    color: "#00FFFF",
  },
  {
    id: "anime",
    icon: "🌸",
    title: "Anime Scenarios",
    desc: "Pick your fandom, I'll write it right. AoT, JJK, One Piece, Fate, Persona — deep lore accuracy with dominant energy only a true otaku can bring. Don't pick something basic.",
    tags: ["Anime Expert", "Lore Accurate", "Any Fandom"],
    tiers: [
      { name: "Scene", price: "$12", duration: "One shot", features: ["Single scenario", "Your series, my execution"] },
      { name: "Arc", price: "$28", duration: "3-part story", features: ["Full arc", "Multiple characters", "Canon-accurate"] },
    ],
    color: "#8B00FF",
  },
  {
    id: "ppv",
    icon: "🔒",
    title: "PPV Drops & Custom Content",
    desc: "Limited content drops — feet sets, findom packs, written stories, audio clips. Released weekly. Buy once, keep forever. Some drop and disappear. Don't sleep on it.",
    tags: ["PPV", "Limited Edition", "Keep Forever"],
    tiers: [
      { name: "Drop", price: "$8–$40", duration: "One-time", features: ["Content bundle", "Instant delivery"] },
    ],
    color: "#FFD700",
  },
];

interface Props { onChatOpen: () => void; }

export default function MenuSection({ onChatOpen }: Props) {
  const [selected, setSelected] = useState<string | null>("roleplay");
  const active = MENU_ITEMS.find((m) => m.id === selected);

  return (
    <section id="menu" className="relative w-full bg-[#0A0A0A] py-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B00FF]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF1493]/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#8B00FF]/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[#FF1493] text-xs font-rajdhani font-bold tracking-widest uppercase mb-4">
            <div className="h-px w-8 bg-[#FF1493]" />
            Services Menu
            <div className="h-px w-8 bg-[#FF1493]" />
          </div>
          <h2 className="font-orbitron font-black text-3xl md:text-5xl text-white mb-4 glitch-text">
            My <span className="shimmer-text">Services</span>
          </h2>
          <p className="text-white/40 font-rajdhani text-lg">Real sessions. Real me. All text-based · 18+ adults only · No fake AI, no bots</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Menu items */}
          <div className="space-y-3 lg:col-span-1">
            {MENU_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected(item.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                  selected === item.id
                    ? "border-[#8B00FF]/60 bg-[#8B00FF]/12 shadow-lg"
                    : "border-white/6 bg-[#111]/60 hover:border-[#8B00FF]/30 hover:bg-[#8B00FF]/5"
                }`}
                style={selected === item.id ? { boxShadow: `0 0 20px ${item.color}22` } : {}}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-rajdhani font-bold text-white text-sm truncate">{item.title}</div>
                    <div className="flex gap-1.5 mt-1 flex-wrap">
                      {item.tags.slice(0, 2).map((t) => (
                        <span key={t} className="text-[10px] font-rajdhani tracking-wider uppercase" style={{ color: item.color }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  {selected === item.id && (
                    <span className="text-[#8B00FF] text-lg flex-shrink-0">▶</span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Right: Detail + pricing */}
          {active && (
            <div className="lg:col-span-2 gradient-border-card rounded-3xl p-8">
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: `${active.color}20`, border: `1px solid ${active.color}40` }}>
                  {active.icon}
                </div>
                <div>
                  <h3 className="font-orbitron font-bold text-white text-xl mb-2">{active.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {active.tags.map((t) => (
                      <span key={t} className="text-xs font-rajdhani font-semibold px-3 py-1 rounded-full border tracking-wider"
                        style={{ color: active.color, borderColor: `${active.color}40`, background: `${active.color}12` }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-white/60 font-inter text-base leading-relaxed mb-8">{active.desc}</p>

              {/* Pricing tiers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {active.tiers.map((tier) => (
                  <div key={tier.name} className="bg-[#0d0d0d] border border-white/8 rounded-2xl p-5 hover:border-[#8B00FF]/40 transition-all hover:-translate-y-1 group">
                    <div className="font-orbitron font-bold text-xl mb-1" style={{ color: active.color }}>{tier.price}</div>
                    <div className="text-white font-rajdhani font-semibold text-base mb-1">{tier.name}</div>
                    <div className="text-white/40 text-xs font-rajdhani mb-4 tracking-wider">{tier.duration}</div>
                    <ul className="space-y-1.5">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-white/60 text-xs font-inter">
                          <span style={{ color: active.color }}>✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onChatOpen}
                  className="flex-1 bg-gradient-to-r from-[#8B00FF] to-[#FF1493] text-white py-4 rounded-full font-rajdhani font-bold text-base tracking-wider transition-all hover:scale-105 neon-border-purple"
                >
                  🎮 Book This Session
                </button>
                <a href="#request" className="flex-1 text-center bg-transparent border border-[#00FFFF]/30 hover:border-[#00FFFF] text-[#00FFFF] py-4 rounded-full font-rajdhani font-bold text-base tracking-wider transition-all">
                  ✍️ Send a Request
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
