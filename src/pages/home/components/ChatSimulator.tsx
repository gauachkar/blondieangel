import { useState, useEffect, useRef } from "react";

interface Message {
  id: number;
  from: "lila" | "user";
  text: string;
  ts: string;
}

const LILA_RESPONSES: Record<string, string[]> = {
  default: [
    "Bold opener. I've drained wallets with less. Tell me what you actually want — I don't do vague. 👑",
    "Oh? You think you can keep up with my gamer lore and bratty dominant energy? Cute. Prove it. ⚔️",
    "I like where this is going. Findom? Roleplay? Feet? Anime? Pick your poison and I'll make it unforgettable. 💸",
    "Mmm. You're thinking too small. Tell me your kink and I'll show you what it actually looks like when a real woman runs this. 🎮",
    "Interesting. I've built entire session arcs out of less. Give me something to work with, simp. 🌸",
  ],
  hello: ["Oh look, a new one. Welcome to my world. 🎮 I'm Lila — 18, dominant, anime gamer brat, and very much in charge. What are you booking?"],
  anime: ["Now you're speaking my language. Which series? Don't say 'something popular' — I want the specifics, and I will quiz you. 🌸"],
  game: ["Gamer RP? Pick your universe. I know my stuff and I'll stay in character and still roast you when you mess up — don't get it twisted. 🕹️"],
  findom: ["Pay up, loser. 💸 Tribute sessions start at $20. You'll love every second of being drained by someone who's better than you at everything. Check my menu."],
  feet: ["You came to the right place. 🦶 Custom feet sets, photos, worship sessions — all available in my menu. Tell me what you're after and we'll set it up."],
  dark: ["Dark energy is literally my default setting. Give me your scenario and I'll build you something that actually gets under your skin. ⚔️"],
  help: ["Here's the menu: dominant roleplay, findom sessions, feet content, anime scenarios, gamer RP, custom PPV drops. What's your budget and what do you want? 👑"],
};

const QUICK_REPLIES = ["Findom session 💸", "Feet content 🦶", "Gamer RP 🎮", "What are your rates? 👑"];

const getReply = (msg: string): string => {
  const lower = msg.toLowerCase();
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) return LILA_RESPONSES.hello[0];
  if (lower.includes("anime") || lower.includes("manga") || lower.includes("jjk") || lower.includes("naruto")) return LILA_RESPONSES.anime[0];
  if (lower.includes("game") || lower.includes("gaming") || lower.includes("elden") || lower.includes("rpg")) return LILA_RESPONSES.game[0];
  if (lower.includes("findom") || lower.includes("tribute") || lower.includes("drain") || lower.includes("wallet") || lower.includes("simp")) return LILA_RESPONSES.findom[0];
  if (lower.includes("feet") || lower.includes("foot") || lower.includes("toes") || lower.includes("worship")) return LILA_RESPONSES.feet[0];
  if (lower.includes("dark") || lower.includes("fantasy") || lower.includes("dominant") || lower.includes("roleplay")) return LILA_RESPONSES.dark[0];
  if (lower.includes("help") || lower.includes("what") || lower.includes("how") || lower.includes("rate") || lower.includes("price")) return LILA_RESPONSES.help[0];
  const pool = LILA_RESPONSES.default;
  return pool[Math.floor(Math.random() * pool.length)];
};

const ts = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

interface Props { onClose: () => void; }

export default function ChatSimulator({ onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      from: "lila",
      text: "You found me. 👑 I'm Lila — 18, dominant, real brat, full-time creator. Gamer, anime head, findom queen, and I already know why you're here. Roleplay? Findom? Feet? Tell me what you want and your budget. I don't do vague.",
      ts: ts(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setInterval(() => setSessionTime((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const fmtTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), from: "user", text, ts: ts() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    await new Promise((r) => setTimeout(r, 1000 + Math.random() * 1200));
    setTyping(false);
    const reply = getReply(text);
    const lilaMsg: Message = { id: Date.now() + 1, from: "lila", text: reply, ts: ts() };
    setMessages((m) => [...m, lilaMsg]);
    inputRef.current?.focus();
  };

  return (
    <div className="fixed inset-0 z-[100] modal-backdrop bg-black/85 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl h-[90vh] flex flex-col rounded-3xl overflow-hidden border border-[#8B00FF]/40 bg-[#0d0015] shadow-2xl"
        style={{ boxShadow: "0 0 60px #8B00FF22, 0 0 120px #FF149311" }}>

        {/* Header */}
        <div className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-[#8B00FF]/20 to-[#FF1493]/10 border-b border-[#8B00FF]/25 flex-shrink-0">
          {/* Avatar */}
          <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#8B00FF] to-[#FF1493] flex items-center justify-center text-xl flex-shrink-0">
            <span>👾</span>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#00FF00] rounded-full border-2 border-[#0d0015] animate-pulse" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-orbitron font-bold text-white text-sm shimmer-text">LilaVibes</div>
            <div className="flex items-center gap-2">
              <span className="text-[#00FF00] text-xs font-rajdhani">● Online · Open for Bookings</span>
            </div>
          </div>
          {/* Timer */}
          <div className="flex flex-col items-center px-4 py-2 bg-[#8B00FF]/15 border border-[#8B00FF]/30 rounded-xl">
            <span className="text-[#00FFFF] font-orbitron font-bold text-lg leading-none">{fmtTime(sessionTime)}</span>
            <span className="text-white/30 text-[9px] font-rajdhani tracking-widest mt-0.5">SESSION</span>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#FF1493]/20 border border-white/10 hover:border-[#FF1493]/50 text-white/50 hover:text-[#FF1493] transition-all text-sm flex-shrink-0">
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 scrollbar-thin">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.from === "user" ? "flex-row-reverse" : "flex-row"}`}>
              {msg.from === "lila" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B00FF] to-[#FF1493] flex items-center justify-center text-sm flex-shrink-0">
                  👾
                </div>
              )}
              <div className={`max-w-[75%] ${msg.from === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                <div className={`px-4 py-3 text-sm font-inter leading-relaxed ${msg.from === "lila" ? "chat-bubble-lila text-white/90" : "chat-bubble-user text-white/85"}`}>
                  {msg.text}
                </div>
                <span className="text-white/25 text-[10px] font-rajdhani px-1">{msg.ts}</span>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B00FF] to-[#FF1493] flex items-center justify-center text-sm">👾</div>
              <div className="chat-bubble-lila px-4 py-3 flex items-center gap-1.5">
                <span className="typing-dot w-2 h-2 rounded-full bg-[#8B00FF]" />
                <span className="typing-dot w-2 h-2 rounded-full bg-[#8B00FF]" />
                <span className="typing-dot w-2 h-2 rounded-full bg-[#8B00FF]" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick replies */}
        <div className="px-5 py-3 flex gap-2 overflow-x-auto flex-shrink-0 border-t border-[#8B00FF]/15">
          {QUICK_REPLIES.map((qr) => (
            <button
              key={qr}
              onClick={() => sendMessage(qr)}
              className="flex-shrink-0 px-3 py-1.5 text-xs font-rajdhani font-semibold bg-[#8B00FF]/12 border border-[#8B00FF]/30 hover:border-[#8B00FF] text-[#8B00FF] hover:text-white hover:bg-[#8B00FF]/25 rounded-full transition-all whitespace-nowrap"
            >
              {qr}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="px-5 py-4 flex gap-3 border-t border-[#8B00FF]/20 flex-shrink-0">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Tell me what you want..."
            className="flex-1 bg-[#111]/80 border border-white/10 hover:border-[#8B00FF]/40 focus:border-[#8B00FF] text-white placeholder-white/25 px-4 py-3 rounded-2xl font-inter text-sm outline-none transition-all"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || typing}
            className="w-12 h-12 bg-gradient-to-br from-[#8B00FF] to-[#FF1493] rounded-2xl flex items-center justify-center text-white text-lg transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed neon-border-purple flex-shrink-0"
          >
            ▶
          </button>
        </div>

        {/* Disclaimer */}
        <div className="px-5 py-2 text-center flex-shrink-0">
          <p className="text-white/20 text-[10px] font-rajdhani tracking-wider">
            Preview chat · Full sessions booked via menu · 18+ adults only
          </p>
        </div>
      </div>
    </div>
  );
}
