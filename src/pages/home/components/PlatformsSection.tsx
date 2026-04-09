const PLATFORMS = [
  { name: "OnlyFans", icon: "💙", color: "#00AFF0", desc: "Subscriptions + exclusive PPV story drops", badge: "Most Popular", url: "https://onlyfans.com", cta: "Subscribe" },
  { name: "Fansly", icon: "⭐", color: "#1DA1F2", desc: "Live fiction events + premium content tiers", badge: "Live Events", url: "https://fansly.com", cta: "Join Fansly" },
  { name: "Telegram VIP", icon: "✈️", color: "#00AAFF", desc: "Private VIP channel — direct drops & early access", badge: "VIP Channel", url: "https://t.me", cta: "Join Channel" },
  { name: "Reddit", icon: "🔥", color: "#FF4500", desc: "Daily free teasers & community fiction drops", badge: "Free Teasers", url: "https://reddit.com", cta: "See Teasers" },
  { name: "Discord", icon: "🎮", color: "#5865F2", desc: "Fan community · Lore discussions · Events", badge: "Community", url: "https://discord.com", cta: "Join Server" },
];

export default function PlatformsSection() {
  return (
    <section id="platforms" className="relative w-full bg-[#080808] py-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B00FF]/30 to-transparent" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-[#00FFFF]/4 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-[#8B00FF] text-xs font-rajdhani font-bold tracking-widest uppercase mb-4">
            <div className="h-px w-8 bg-[#8B00FF]" />
            Find Me
            <div className="h-px w-8 bg-[#8B00FF]" />
          </div>
          <h2 className="font-orbitron font-black text-3xl md:text-4xl text-white mb-3 glitch-text">
            My <span className="shimmer-text">Platforms</span>
          </h2>
          <p className="text-white/40 font-rajdhani text-lg">Multiple ways to access Blondie's world 🎮</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PLATFORMS.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="group relative flex flex-col items-center text-center p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-2 gradient-border-card"
              style={{ background: `${p.color}08` }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-[10px] font-rajdhani font-bold px-3 py-0.5 rounded-full"
                style={{ background: p.color }}>
                {p.badge}
              </div>
              <div className="w-16 h-16 flex items-center justify-center rounded-2xl mb-4 mt-2 text-3xl group-hover:scale-110 transition-transform duration-300"
                style={{ background: `${p.color}18`, border: `1px solid ${p.color}30` }}>
                {p.icon}
              </div>
              <h3 className="font-orbitron font-bold text-white text-base mb-2">{p.name}</h3>
              <p className="text-white/40 text-xs font-inter leading-relaxed mb-5 flex-1">{p.desc}</p>
              <div className="w-full py-2.5 rounded-full text-white text-xs font-rajdhani font-bold tracking-wider text-center transition-all group-hover:opacity-90"
                style={{ background: p.color }}>
                {p.cta}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
