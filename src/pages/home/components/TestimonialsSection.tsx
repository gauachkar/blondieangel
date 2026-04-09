const TESTIMONIALS = [
  {
    handle: "GamerKing_R***",
    platform: "Obsessed Tier",
    emoji: "🎮",
    color: "#8B00FF",
    title: "She knew more about Elden Ring than me. I'm embarrassed.",
    text: "Built a 6-chapter Elden Ring arc around my OC with lore I didn't even know existed. Then roasted my character choices the whole time. I've already booked three more sessions. Send help.",
    stars: 5,
  },
  {
    handle: "OtakuFan_M***",
    platform: "Anime Session",
    emoji: "🌸",
    color: "#FF1493",
    title: "JJK accuracy so good it made me feel stupid",
    text: "Asked for a JJK scenario expecting something basic. She dropped obscure lore, stayed perfectly in character, and had me fully immersed in under five minutes. Immediately ordered a 3-part arc. No regrets.",
    stars: 5,
  },
  {
    handle: "DarkArc_J***",
    platform: "Owned Tier",
    emoji: "⚔️",
    color: "#00FFFF",
    title: "18 and absolutely untouchable. It's unfair.",
    text: "The bratty dominant energy she brings to dark fantasy is something you don't expect until it hits you. Real talent, real personality, real sessions. Worth every cent of the Owned tier and then some.",
    stars: 5,
  },
  {
    handle: "RPG_Lover_T***",
    platform: "Simp Tier",
    emoji: "👑",
    color: "#FFD700",
    title: "Subscribed for the drops. Stayed because I'm weak.",
    text: "Joined for the monthly story bundles, ended up booking four custom sessions in a month. Her writing is actually insane — this is clearly a passion, not a gimmick. I'm fully addicted and I accept it.",
    stars: 5,
  },
  {
    handle: "StorySeeker_K***",
    platform: "Custom Story",
    emoji: "📖",
    color: "#8B00FF",
    title: "Asked for 6,000 words. Got 9,000. Still mad about it.",
    text: "Overdelivered by 3,000 words, built a world I didn't even ask for, nailed every character, and delivered in 48 hours. I don't know what's worse — how good it was, or how fast I paid for the sequel.",
    stars: 5,
  },
  {
    handle: "NightGamer_V***",
    platform: "Gamer Session",
    emoji: "🕹️",
    color: "#FF1493",
    title: "Gamer RP companion sessions are actually dangerous.",
    text: "Stayed fully in character the entire session, roasted me every time I messed up, and built a narrative that felt like a real co-op story. I've now cancelled my streaming sub and redirected the money here.",
    stars: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section id="reviews" className="relative w-full bg-[#080808] py-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B00FF]/40 to-transparent" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#FF1493]/4 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-[#FF1493] text-xs font-rajdhani font-bold tracking-widest uppercase mb-4">
            <div className="h-px w-8 bg-[#FF1493]" />
            Fan Reviews
            <div className="h-px w-8 bg-[#FF1493]" />
          </div>
          <h2 className="font-orbitron font-black text-3xl md:text-5xl text-white mb-4 glitch-text">
            They All <span className="shimmer-text">Come Back</span>
          </h2>
          <p className="text-white/40 font-rajdhani text-lg">Real clients. Real sessions. Real addiction. 💜</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="gradient-border-card rounded-3xl p-6 flex flex-col gap-4 hover:-translate-y-1 transition-all duration-300">
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <span key={j} className="text-[#FFD700] text-sm">★</span>
                ))}
              </div>

              <h4 className="font-rajdhani font-bold text-white text-base leading-tight">{t.title}</h4>
              <p className="text-white/55 font-inter text-sm leading-relaxed flex-1">{t.text}</p>

              <div className="flex items-center justify-between pt-4 border-t border-white/6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: `${t.color}22`, border: `1px solid ${t.color}44` }}>
                    {t.emoji}
                  </div>
                  <div>
                    <div className="text-white text-xs font-rajdhani font-bold">{t.handle}</div>
                    <div className="text-white/30 text-[10px] font-rajdhani">Verified Fan</div>
                  </div>
                </div>
                <span className="text-xs font-rajdhani font-semibold px-2 py-1 rounded-full"
                  style={{ color: t.color, background: `${t.color}15`, border: `1px solid ${t.color}30` }}>
                  {t.platform}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Overall rating */}
        <div className="mt-12 max-w-sm mx-auto gradient-border-card rounded-3xl p-8 text-center">
          <div className="font-orbitron font-black text-6xl shimmer-text mb-2">5.0</div>
          <div className="flex justify-center gap-1 mb-2">
            {[1,2,3,4,5].map((s) => <span key={s} className="text-[#FFD700] text-xl">★</span>)}
          </div>
          <div className="text-white/40 font-rajdhani text-sm tracking-wider">10,000+ drained, addicted, and smiling</div>
        </div>
      </div>
    </section>
  );
}
