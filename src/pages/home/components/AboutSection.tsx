const TAGS = ["18 & Unbothered", "Anime Expert", "Findom Brat", "Feet Content", "Gamer RP", "Custom Sessions", "JRPG Addict", "Certified Chaos"];
const GAMES = ["🗡️ Final Fantasy XIV", "🔫 Destiny 2", "⚔️ Elden Ring", "🌸 Persona Series", "🎮 Dead by Daylight", "🧙 World of Warcraft"];

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full bg-[#080808] py-16 md:py-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B00FF]/40 to-transparent" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#FF1493]/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8B00FF]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Avatar visual */}
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#8B00FF]/25 to-[#FF1493]/15 rounded-3xl blur-2xl scale-110" />

              {/* Main card */}
              <div className="relative gradient-border-card rounded-3xl overflow-hidden">
                {/* Cyber header */}
                <div className="bg-gradient-to-r from-[#8B00FF]/30 to-[#FF1493]/20 p-4 border-b border-[#8B00FF]/20 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#FF4444]" />
                    <span className="w-3 h-3 rounded-full bg-[#FFAA00]" />
                    <span className="w-3 h-3 rounded-full bg-[#00FF00]" />
                  </div>
                  <span className="font-orbitron text-xs text-[#00FFFF]/70 tracking-widest">BLONDIE_ANGEL.EXE</span>
                  <span className="ml-auto text-[#00FF00] text-xs font-rajdhani animate-pulse">● RUNNING</span>
                </div>

                {/* Avatar area */}
                <div className="p-8">
                  <div className="relative mx-auto w-48 h-48 mb-6 float-anim">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#8B00FF] via-[#4B0082] to-[#FF1493]" />
                    <div className="absolute inset-0 flex items-center justify-center rounded-2xl">
                      <span className="text-7xl">🎮</span>
                    </div>
                    <div className="absolute -top-2 -right-2 bg-[#8B00FF] rounded-full px-2 py-0.5 text-xs font-orbitron text-white font-bold">LVL 18</div>
                  </div>

                  {/* Stats bars */}
                  <div className="space-y-3">
                    {[
                      { stat: "Dominance", val: 99, color: "#FF1493" },
                      { stat: "Roleplay XP", val: 97, color: "#8B00FF" },
                      { stat: "Anime IQ", val: 100, color: "#00FFFF" },
                      { stat: "Gamer Rank", val: 95, color: "#FFD700" },
                    ].map((s) => (
                      <div key={s.stat}>
                        <div className="flex justify-between mb-1">
                          <span className="text-white/60 text-xs font-rajdhani tracking-wider uppercase">{s.stat}</span>
                          <span className="font-orbitron text-xs font-bold" style={{ color: s.color }}>{s.val}/100</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${s.val}%`, background: s.color, boxShadow: `0 0 8px ${s.color}` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Text */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#FF1493]" style={{ boxShadow: "0 0 8px #FF1493" }} />
              <span className="text-[#FF1493] text-xs font-rajdhani font-bold tracking-widest uppercase">About Blondie Angel</span>
            </div>

            <h2 className="font-orbitron font-black text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-8 glitch-text">
              18. Dominant.{" "}
              <span className="shimmer-text">Undefeated.</span>{" "}
              Deal With It.
            </h2>

            <div className="space-y-5 text-white/65 text-base leading-relaxed font-inter">
              <p>
                Yeah, I'm <strong className="text-[#00FFFF] font-semibold">18</strong>. And I already do exactly what I love every single day. Gaming, anime, dominance, and draining wallets — this is my full-time passion and I'm not slowing down. Jealous?
              </p>
              <p>
                I provide <strong className="text-[#FF1493] font-semibold">premium adult content and sessions</strong> — bratty dominant text roleplay, findom, feet content, anime scenarios, and gamer RP. I'm fresh, I'm hot, I'm in charge, and I'm not sorry about any of it.
              </p>
              <p>
                My body, my rules, my <em className="text-[#8B00FF] not-italic">chaos</em>. If you're here, you already know what you want — so stop hesitating and <strong className="text-white font-semibold">book a session already.</strong>
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {TAGS.map((tag) => (
                <span key={tag} className="bg-[#8B00FF]/12 border border-[#8B00FF]/30 text-[#00FFFF] text-xs font-rajdhani font-semibold px-4 py-2 rounded-full tracking-wider">
                  {tag}
                </span>
              ))}
            </div>

            {/* Games */}
            <div className="mt-8 p-5 bg-[#111]/80 border border-[#8B00FF]/20 rounded-2xl">
              <div className="text-[#8B00FF] text-xs font-rajdhani font-bold tracking-widest uppercase mb-3">Current Rotation (ask me anything):</div>
              <div className="grid grid-cols-2 gap-2">
                {GAMES.map((g) => (
                  <div key={g} className="text-white/60 text-sm font-rajdhani">{g}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
