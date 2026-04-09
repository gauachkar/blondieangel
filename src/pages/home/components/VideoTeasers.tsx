import { useState } from "react";
const TEASERS = [
  {
    id: "v1",
    title: "Dark Fantasy Arc — Watch Me Take Over",
    desc: "This is what a dominant session actually looks like. Buckle up, loser.",
    thumb: "🎬",
    duration: "3:47",
    color: "#8B00FF",
    videoId: "dQw4w9WgXcQ",
  },
  {
    id: "v2",
    title: "JJK Lore Drop + Character Takeover",
    desc: "I break down Jujutsu Kaisen lore, then slide straight into character. Try to keep up.",
    thumb: "🌸",
    duration: "5:12",
    color: "#FF1493",
    videoId: "dQw4w9WgXcQ",
  },
  {
    id: "v3",
    title: "Elden Ring Gamer RP — I Roast You The Whole Time",
    desc: "Co-op companion session. I narrate, I stay in character, and I absolutely roast every mistake you make.",
    thumb: "🎮",
    duration: "4:30",
    color: "#00FFFF",
    videoId: "dQw4w9WgXcQ",
  },
];

export default function VideoTeasers() {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <section id="teasers" className="relative w-full bg-[#0A0A0A] py-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FFFF]/30 to-transparent" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#00FFFF]/4 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-[#8B00FF] text-xs font-rajdhani font-bold tracking-widest uppercase mb-4">
            <div className="h-px w-8 bg-[#8B00FF]" />
            Teaser Clips
            <div className="h-px w-8 bg-[#8B00FF]" />
          </div>
          <h2 className="font-orbitron font-black text-3xl md:text-4xl text-white mb-3 glitch-text">
            Watch Me <span className="shimmer-text">Work</span>
          </h2>
          <p className="text-white/40 font-rajdhani text-lg">Free previews. Just enough to make you want more. That's intentional.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEASERS.map((t) => (
            <div key={t.id} className="group gradient-border-card rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300">
              {/* Thumbnail */}
              <div className="relative aspect-video bg-[#0d0015] flex items-center justify-center overflow-hidden cursor-pointer"
                onClick={() => setPlaying(playing === t.id ? null : t.id)}>
                {playing === t.id ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${t.videoId}?autoplay=1`}
                    className="absolute inset-0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title={t.title}
                  />
                ) : (
                  <>
                    <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${t.color}22, #0d0015)` }} />
                    <span className="text-7xl z-10 group-hover:scale-110 transition-transform duration-300">{t.thumb}</span>
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300 group-hover:bg-white/20">
                        <span className="text-white text-xl ml-1">▶</span>
                      </div>
                    </div>
                    {/* Duration */}
                    <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-orbitron px-2 py-1 rounded">
                      {t.duration}
                    </div>
                  </>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-rajdhani font-bold text-white text-base mb-2 leading-tight">{t.title}</h3>
                <p className="text-white/50 text-sm font-inter leading-relaxed">{t.desc}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: t.color }} />
                  <span className="text-xs font-rajdhani tracking-widest uppercase" style={{ color: t.color }}>Free Preview</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
