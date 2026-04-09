import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "VIP Club", href: "#vip" },
  { label: "FAQ", href: "#faq" },
  { label: "Reviews", href: "#reviews" },
];

const PLATFORMS = [
  { label: "OnlyFans", href: "https://onlyfans.com", color: "#00AFF0", icon: "💙" },
  { label: "Fansly", href: "https://fansly.com", color: "#1DA1F2", icon: "⭐" },
  { label: "Telegram VIP", href: "https://t.me", color: "#00AAFF", icon: "✈️" },
  { label: "Reddit", href: "https://reddit.com", color: "#FF4500", icon: "🔥" },
];

interface Props { onAdminOpen: () => void; }

export default function FooterSection({ onAdminOpen }: Props) {
  const { user } = useAuth();
  const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL ?? "";
  const isAdmin = !!user && (!ADMIN_EMAIL || user.email === ADMIN_EMAIL);

  return (
    <footer className="relative w-full bg-[#060606] border-t border-[#8B00FF]/15 overflow-hidden">
      {/* Big background text */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center overflow-hidden pointer-events-none select-none">
        <span className="font-orbitron font-black text-[12vw] leading-none text-white/[0.015]">BLONDIEANGEL</span>
      </div>

      {/* Grid bg */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage: "linear-gradient(#8B00FF 1px, transparent 1px), linear-gradient(90deg, #8B00FF 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 md:py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-10 md:mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-1 mb-4">
              <span className="font-orbitron font-black text-2xl shimmer-text">BLONDIE</span>
              <span className="font-orbitron font-black text-2xl text-[#FF1493]" style={{ textShadow: "0 0 12px #FF1493" }}>ANGEL</span>
            </div>
            <p className="text-white/35 text-sm font-inter leading-relaxed mb-5">
              Real 18+ adult content creator. Dominant anime gamer brat. All content produced by a verified adult. 18+ only.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00FF00] rounded-full animate-pulse" />
              <span className="text-[#00FF00] text-xs font-rajdhani font-bold tracking-widest">ONLINE · OPEN FOR BOOKINGS</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h5 className="font-rajdhani font-bold text-white text-xs tracking-widest uppercase mb-5 neon-text-purple">Navigation</h5>
            <ul className="space-y-3">
              {NAV.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-white/35 hover:text-[#00FFFF] text-sm font-rajdhani transition-colors duration-300">
                    {l.label}
                  </a>
                </li>
              ))}
              {/* Portal / Sign In link — always visible */}
              <li>
                {user ? (
                  <Link to="/portal" className="text-white/35 hover:text-[#00FFFF] text-sm font-rajdhani transition-colors duration-300">
                    👾 My Portal
                  </Link>
                ) : (
                  <Link to="/auth" className="text-white/35 hover:text-[#00FFFF] text-sm font-rajdhani transition-colors duration-300">
                    Sign In
                  </Link>
                )}
              </li>
              {/* Admin Panel — only shown when signed in as admin */}
              {isAdmin && (
                <li>
                  <Link to="/admin" className="text-[#FFD700]/50 hover:text-[#FFD700] text-sm font-rajdhani transition-colors duration-300">
                    ⚙ Admin Panel
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h5 className="font-rajdhani font-bold text-white text-xs tracking-widest uppercase mb-5 neon-text-pink">Platforms</h5>
            <ul className="space-y-3">
              {PLATFORMS.map((p) => (
                <li key={p.label}>
                  <a href={p.href} target="_blank" rel="nofollow noopener noreferrer"
                    className="flex items-center gap-2 text-white/35 hover:text-white text-sm font-rajdhani transition-colors duration-300 group">
                    <span>{p.icon}</span>
                    <span style={{ color: "inherit" }} className="group-hover:text-white transition-colors">{p.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5 className="font-rajdhani font-bold text-white text-xs tracking-widest uppercase mb-5 neon-text-cyan">Legal & Info</h5>
            <div className="space-y-3 text-white/35 text-xs font-inter leading-relaxed">
              <p>👑 Real 18+ adult content creator. Verified adult. Real sessions.</p>
              <p>🔒 All content is text-based. 18+ adults only.</p>
              <p>✅ My body, my rules, no exceptions.</p>
              <p>💳 Payments processed securely via third-party providers.</p>
              <p>🔕 Discreet billing — nothing weird on your statement.</p>
            </div>
          </div>
        </div>

        {/* Neon divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#8B00FF]/50 to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs font-rajdhani text-center sm:text-left tracking-wider">
            © {new Date().getFullYear()} Blondie Angel · All rights reserved · 18+ Adult content · Real creator · Real sessions
          </p>
          <div className="flex items-center gap-4">
            <a href="#hero" className="text-white/20 hover:text-[#8B00FF] text-xs font-rajdhani tracking-wider transition-colors">↑ Back to Top</a>
            {/* [admin] button — only rendered when signed in as admin */}
            {isAdmin && (
              <Link to="/admin" className="text-[#FFD700]/25 hover:text-[#FFD700] text-xs font-rajdhani tracking-wider transition-colors">
                [admin]
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
