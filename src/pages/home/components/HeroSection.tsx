import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Menu", "Gallery", "VIP", "FAQ"];

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: Math.random() * 10 + 8,
  color: ["#8B00FF", "#00FFFF", "#FF1493"][i % 3],
}));

interface Props { onChatOpen: () => void; }

export default function HeroSection({ onChatOpen }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const phrases = ["Dominant Gamer. 🎮", "Anime Brat. 🌸", "Your Wallet's Weakness. 💜", "18 & Unbothered. 👑"];
  const phraseIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      const current = phrases[phraseIdx.current];
      if (!deleting.current) {
        setTypedText(current.slice(0, charIdx.current + 1));
        charIdx.current++;
        if (charIdx.current === current.length) {
          deleting.current = true;
          setTimeout(tick, 1800);
          return;
        }
      } else {
        setTypedText(current.slice(0, charIdx.current - 1));
        charIdx.current--;
        if (charIdx.current === 0) {
          deleting.current = false;
          phraseIdx.current = (phraseIdx.current + 1) % phrases.length;
        }
      }
      setTimeout(tick, deleting.current ? 60 : 100);
    };
    const t = setTimeout(tick, 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center overflow-hidden scanlines">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0d0015] to-[#0A0A0A]" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#8B00FF]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#FF1493]/6 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-[#00FFFF]/5 rounded-full blur-[80px] pointer-events-none" />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(#00FFFF 1px, transparent 1px), linear-gradient(90deg, #00FFFF 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: 0,
            background: p.color,
            boxShadow: `0 0 6px ${p.color}`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-[#8B00FF]/20 py-3" : "py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <span className="text-2xl font-orbitron font-black shimmer-text glitch">BLONDIE</span>
            <span className="text-2xl font-orbitron font-black text-[#FF1493]" style={{ textShadow: "0 0 15px #FF1493" }}>ANGEL</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white/60 hover:text-[#00FFFF] transition-all duration-300 text-sm font-rajdhani font-semibold tracking-widest uppercase hover:text-shadow-cyan"
                style={{ letterSpacing: "0.15em" }}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onChatOpen}
              className="hidden md:flex items-center gap-2 bg-[#8B00FF] hover:bg-[#7a00e6] text-white px-5 py-2.5 rounded-full text-sm font-rajdhani font-bold tracking-wider transition-all duration-300 hover:scale-105 neon-border-purple"
            >
              🎮 Book a Session
            </button>
            <button
              className="md:hidden text-white/70 hover:text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="text-xl">{menuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#0d0015]/98 backdrop-blur-xl border-t border-[#8B00FF]/20 px-6 py-4 slide-down">
            {NAV_LINKS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-white/60 hover:text-[#00FFFF] font-rajdhani font-semibold tracking-widest uppercase text-sm border-b border-white/5"
              >
                {item}
              </a>
            ))}
            <button
              onClick={() => { setMenuOpen(false); onChatOpen(); }}
              className="mt-4 w-full bg-[#8B00FF] text-white py-3 rounded-full font-rajdhani font-bold tracking-wider"
            >
              🎮 Book a Session
            </button>
          </div>
        )}
      </nav>

      {/* Hero content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 bg-[#8B00FF]/15 border border-[#8B00FF]/40 text-[#00FFFF] text-xs font-rajdhani font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-[#00FF00] rounded-full animate-pulse" />
              Online Now · Arizona LLC · 18+ Verified
            </div>

            {/* Main headline */}
            <h1 className="font-orbitron font-black text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4 glitch-text">
              I'm{" "}
              <span className="shimmer-text">Blondie Angel</span>
            </h1>

            {/* Typewriter */}
            <div className="text-xl md:text-2xl font-rajdhani text-[#00FFFF] mb-6 h-9" style={{ textShadow: "0 0 15px #00FFFF55" }}>
              {typedText}
              <span className="cursor-blink text-[#FF1493]">|</span>
            </div>

            <p className="text-white/60 text-base leading-relaxed mb-8 font-inter max-w-xl">
              18 years old, dominant anime gamer brat, and I already turned my passion into a <em className="text-[#FF1493] not-italic font-semibold">full-time LLC business</em> in Arizona. My body, my rules, my income. I provide for my loved ones doing exactly what I love. Real sessions. Real me. Pay up.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={onChatOpen}
                className="group flex items-center justify-center gap-3 bg-gradient-to-r from-[#8B00FF] to-[#FF1493] text-white px-8 py-4 rounded-full font-rajdhani font-bold text-base tracking-wider transition-all duration-300 hover:scale-105 hover:opacity-90 neon-border-purple"
              >
                <span>🎮</span> Book a Session
              </button>
              <a
                href="#menu"
                className="flex items-center justify-center gap-3 bg-transparent border border-[#00FFFF]/40 hover:border-[#00FFFF] text-[#00FFFF] px-8 py-4 rounded-full font-rajdhani font-bold text-base tracking-wider transition-all duration-300 hover:bg-[#00FFFF]/5"
              >
                <span>📋</span> Browse My Menu
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-white/8">
              {[
                { val: "18", label: "Years Young" },
                { val: "10K+", label: "Happy Clients" },
                { val: "∞", label: "Anime Watched" },
                { val: "LLC", label: "Verified Business" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-orbitron font-black text-2xl neon-text-purple">{s.val}</div>
                  <div className="text-white/40 text-xs font-rajdhani tracking-widest uppercase mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - avatar card */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              {/* Glow rings */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#8B00FF]/20 to-[#FF1493]/20 blur-2xl scale-110" />
              
              {/* Card */}
              <div className="relative gradient-border-card p-6 rounded-3xl">
                {/* Avatar */}
                <div className="relative mx-auto mb-6 w-52 h-52 rounded-2xl overflow-hidden float-anim">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8B00FF] via-[#4B0082] to-[#FF1493]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-8xl">👾</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {/* Glitch overlay */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#00FFFF]/60 glitch" />
                  <div className="absolute bottom-8 left-0 w-3/4 h-px bg-[#FF1493]/60 glitch" />
                </div>

                {/* Name + status */}
                <div className="text-center mb-4">
                  <h2 className="font-orbitron font-black text-2xl shimmer-text">Blondie Angel</h2>
                  <p className="text-white/50 text-sm font-rajdhani mt-1">Dominant · Findom · Anime · Gamer · 18</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="w-2 h-2 bg-[#00FF00] rounded-full animate-pulse" />
                    <span className="text-[#00FF00] text-xs font-rajdhani font-bold tracking-widest">ONLINE · OPEN FOR BOOKINGS</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {["🎮 RPG Queen", "🌸 Anime Expert", "👑 Findom", "🦶 Feet", "🕹️ Gamer RP"].map((tag) => (
                    <span key={tag} className="text-xs bg-[#8B00FF]/15 border border-[#8B00FF]/30 text-[#00FFFF] px-3 py-1 rounded-full font-rajdhani">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Corner decorations */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#00FFFF]/60 rounded-tl" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#00FFFF]/60 rounded-tr" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#FF1493]/60 rounded-bl" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#FF1493]/60 rounded-br" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/30 text-xs font-rajdhani tracking-widest uppercase">Scroll</span>
        <span className="text-[#8B00FF] text-lg">↓</span>
      </div>
    </section>
  );
}
