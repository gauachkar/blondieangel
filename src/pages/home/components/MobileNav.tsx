interface Props {
  onChatOpen: () => void;
  onSpinnerOpen: () => void;
}

const NAV_ITEMS = [
  { icon: "🏠", label: "Home", href: "#hero" },
  { icon: "📋", label: "Menu", href: "#menu" },
  { icon: "👑", label: "VIP", href: "#vip" },
  { icon: "❓", label: "FAQ", href: "#faq" },
];

export default function MobileNav({ onChatOpen, onSpinnerOpen }: Props) {
  return (
    <>
      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0d0015]/95 backdrop-blur-xl border-t border-[#8B00FF]/25 px-2 py-3 pb-safe">
        <div className="flex items-center justify-around">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl hover:bg-[#8B00FF]/15 transition-all"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-white/50 text-[10px] font-rajdhani tracking-wider">{item.label}</span>
            </a>
          ))}
          <button
            onClick={onChatOpen}
            className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl bg-[#8B00FF]/20 border border-[#8B00FF]/40 transition-all"
          >
            <span className="text-xl">🎮</span>
            <span className="text-[#8B00FF] text-[10px] font-rajdhani font-bold tracking-wider">Book</span>
          </button>
          <button
            onClick={onSpinnerOpen}
            className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl hover:bg-[#FF1493]/15 transition-all"
          >
            <span className="text-xl">🎰</span>
            <span className="text-white/50 text-[10px] font-rajdhani tracking-wider">Spin</span>
          </button>
        </div>
      </nav>

      {/* Floating Telegram button — desktop */}
      <a
        href="https://t.me"
        target="_blank"
        rel="nofollow noopener noreferrer"
        className="hidden md:flex fixed bottom-8 right-8 z-40 items-center gap-3 bg-[#0d0015] border border-[#00AAFF]/40 hover:border-[#00AAFF] text-white px-5 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group"
        style={{ boxShadow: "0 0 20px #00AAFF22" }}
      >
        <span className="text-xl">✈️</span>
        <span className="font-rajdhani font-bold text-sm tracking-wider text-[#00AAFF]">VIP Channel</span>
        <span className="w-2 h-2 bg-[#00FF00] rounded-full animate-pulse" />
      </a>

      {/* Floating chat button — mobile only, above bottom nav */}
      <button
        onClick={onChatOpen}
        className="md:hidden fixed bottom-20 right-5 z-40 w-14 h-14 bg-gradient-to-br from-[#8B00FF] to-[#FF1493] rounded-full flex items-center justify-center text-2xl shadow-2xl neon-border-purple transition-all hover:scale-110"
        aria-label="Open chat"
      >
        🎮
      </button>
    </>
  );
}
