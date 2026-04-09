const VIP_PERKS = [
  { icon: "⚡", title: "Skip The Queue", desc: "You get first. Everyone else waits. That's the deal." },
  { icon: "🔓", title: "Everything Unlocked", desc: "Every drop, every PPV pack, every arc. All of it. Yours." },
  { icon: "👑", title: "Monthly Drop Bundle", desc: "12+ exclusive pieces every month. VIPs only. Never resold." },
  { icon: "🎮", title: "Weekly Gamer Sessions", desc: "Weekly co-op fiction narrated just for members. Your universe." },
  { icon: "📖", title: "Lore Vault Access", desc: "All the deep lore, worldbuilding, and anime scenario docs." },
  { icon: "💬", title: "Private Member Channel", desc: "Telegram VIP group. Direct drops, early access, bratty chaos." },
];

const TIERS = [
  {
    name: "Simp Tier",
    price: "$9.99",
    period: "/mo",
    color: "#8B00FF",
    features: ["All drops unlocked", "Front of queue", "Members channel access"],
    cta: "I'm In 🎮",
  },
  {
    name: "Obsessed",
    price: "$24.99",
    period: "/mo",
    color: "#FF1493",
    features: ["Everything in Simp", "Monthly story bundle", "Weekly gamer session", "Full lore vault"],
    cta: "Take My Money 💸",
    featured: true,
  },
  {
    name: "Owned",
    price: "$59.99",
    period: "/mo",
    color: "#FFD700",
    features: ["Everything in Obsessed", "Weekly 1-on-1 with Lila", "Name in story credits", "Custom character built for you"],
    cta: "I Belong To Lila 👑",
  },
];

export default function VIPSection() {
  return (
    <section id="vip" className="relative w-full bg-[#0A0A0A] py-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#8B00FF]/4 via-transparent to-[#FF1493]/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[#FFD700] text-xs font-rajdhani font-bold tracking-widest uppercase mb-4">
            <div className="h-px w-8 bg-[#FFD700]" />
            Fan Club
            <div className="h-px w-8 bg-[#FFD700]" />
          </div>
          <h2 className="font-orbitron font-black text-3xl md:text-5xl text-white mb-4 glitch-text">
            Get <span className="shimmer-text">Owned By Lila</span>
          </h2>
          <p className="text-white/50 font-rajdhani text-lg max-w-2xl mx-auto">
            You know you want in. Full access, priority treatment, exclusive drops, and a front-row seat to the chaos. Lurkers are boring. Subscribers get everything.
          </p>
        </div>

        {/* Perks grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {VIP_PERKS.map((perk) => (
            <div key={perk.title} className="gradient-border-card rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300">
              <span className="text-3xl block mb-3">{perk.icon}</span>
              <h3 className="font-rajdhani font-bold text-white text-base mb-1">{perk.title}</h3>
              <p className="text-white/50 text-xs font-inter leading-relaxed">{perk.desc}</p>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-3xl p-8 border transition-all duration-300 hover:-translate-y-2 ${
                tier.featured
                  ? "border-[#FF1493]/60 bg-gradient-to-b from-[#FF1493]/10 to-[#8B00FF]/10"
                  : "border-white/8 bg-[#111]"
              }`}
              style={tier.featured ? { boxShadow: "0 0 40px #FF149322, 0 0 80px #8B00FF11" } : {}}
            >
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#8B00FF] to-[#FF1493] text-white text-xs font-rajdhani font-bold px-5 py-1.5 rounded-full tracking-widest">
                  MOST ADDICTED
                </div>
              )}

              <div className="text-center mb-8">
                <div className="font-orbitron font-black text-4xl mb-1" style={{ color: tier.color }}>{tier.price}</div>
                <div className="text-white/40 font-rajdhani">{tier.period}</div>
                <div className="font-orbitron font-bold text-white text-xl mt-2">{tier.name}</div>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-white/70 text-sm font-inter">
                    <span style={{ color: tier.color }}>✓</span> {f}
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-3.5 rounded-full font-rajdhani font-bold text-base tracking-wider transition-all hover:scale-105 hover:opacity-90"
                style={{
                  background: tier.featured ? `linear-gradient(135deg, #8B00FF, #FF1493)` : `${tier.color}22`,
                  color: tier.featured ? "#fff" : tier.color,
                  border: tier.featured ? "none" : `1px solid ${tier.color}50`,
                  boxShadow: tier.featured ? "0 0 20px #FF149344" : "none",
                }}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-white/25 text-xs font-rajdhani mt-8 tracking-wider">
          Cancel whenever (but you won't) · 18+ adults only · Real creator, real content
        </p>
      </div>
    </section>
  );
}
