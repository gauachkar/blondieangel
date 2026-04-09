import { useState, useRef } from "react";

const PRIZES = [
  { label: "Free Roleplay Scene 🎭", color: "#8B00FF", desc: "I write you a custom opening scene. You're welcome." },
  { label: "Anime Drop 🌸", color: "#FF1493", desc: "Your fandom, my execution. Pick wisely." },
  { label: "10% Off Next Session 💜", color: "#00FFFF", desc: "Discount code hits your inbox. Use it." },
  { label: "48hr VIP Access 👑", color: "#FFD700", desc: "Full fan club access, no commitment. You'll want to stay." },
  { label: "Gamer Arc Teaser 🎮", color: "#FF6B35", desc: "First chapter of a co-op fiction arc. Just a taste." },
  { label: "Story Bundle Drop 📖", color: "#8B00FF", desc: "Three story previews. Curated by me. Obviously good." },
  { label: "Custom Character Sheet ✍️", color: "#FF1493", desc: "I build a character for your OC. This one's special." },
  { label: "Spin Again 🎲", color: "#444", desc: "The brat giveth and the brat taketh away. Try again." },
];

interface Props { onClose: () => void; }

export default function FantasySpinner({ onClose }: Props) {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<typeof PRIZES[0] | null>(null);
  const [rotation, setRotation] = useState(0);
  const [email, setEmail] = useState("");
  const [claimed, setClaimed] = useState(false);
  const spinRef = useRef<SVGGElement>(null);

  const SIZE = 280;
  const R = SIZE / 2;
  const SEGMENTS = PRIZES.length;
  const ARC = (2 * Math.PI) / SEGMENTS;

  const spin = () => {
    if (spinning || result) return;
    setSpinning(true);
    const winIdx = Math.floor(Math.random() * SEGMENTS);
    const targetDeg = 360 * 8 + (360 - (winIdx * (360 / SEGMENTS)) - (180 / SEGMENTS));
    const finalRot = rotation + targetDeg;
    setRotation(finalRot);
    setTimeout(() => {
      setSpinning(false);
      setResult(PRIZES[winIdx]);
    }, 4100);
  };

  const claim = async () => {
    if (!email.trim()) return;
    await new Promise((r) => setTimeout(r, 800));
    setClaimed(true);
  };

  const reset = () => {
    setResult(null);
    setClaimed(false);
    setEmail("");
  };

  const getSegmentPath = (i: number) => {
    const startAngle = i * ARC - Math.PI / 2;
    const endAngle = startAngle + ARC;
    const x1 = R + R * 0.85 * Math.cos(startAngle);
    const y1 = R + R * 0.85 * Math.sin(startAngle);
    const x2 = R + R * 0.85 * Math.cos(endAngle);
    const y2 = R + R * 0.85 * Math.sin(endAngle);
    return `M ${R} ${R} L ${x1} ${y1} A ${R * 0.85} ${R * 0.85} 0 0 1 ${x2} ${y2} Z`;
  };

  const getLabelPos = (i: number) => {
    const angle = i * ARC + ARC / 2 - Math.PI / 2;
    return {
      x: R + R * 0.55 * Math.cos(angle),
      y: R + R * 0.55 * Math.sin(angle),
    };
  };

  return (
    <div className="fixed inset-0 z-[100] modal-backdrop bg-black/85 flex items-center justify-center p-4">
      <div className="w-full max-w-lg gradient-border-card rounded-3xl p-5 sm:p-8 text-center"
        style={{ boxShadow: "0 0 60px #8B00FF22" }}>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-orbitron font-black text-xl shimmer-text">Blondie's Loot Wheel</h2>
            <p className="text-white/40 font-rajdhani text-xs tracking-widest mt-1">SPIN. WIN. TRY NOT TO FALL FOR ME.</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white transition-all text-sm">
            ✕
          </button>
        </div>

        {!result ? (
          <>
            {/* Wheel */}
            <div className="relative mx-auto mb-6" style={{ width: SIZE, height: SIZE }}>
              {/* Pointer */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10 text-2xl" style={{ textShadow: "0 0 10px #FF1493" }}>▼</div>

              <svg width={SIZE} height={SIZE} className="overflow-visible">
                <g
                  ref={spinRef}
                  style={{
                    transformOrigin: `${R}px ${R}px`,
                    transform: `rotate(${rotation}deg)`,
                    transition: spinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
                  }}
                >
                  {PRIZES.map((prize, i) => (
                    <g key={i}>
                      <path
                        d={getSegmentPath(i)}
                        fill={`${prize.color}33`}
                        stroke={prize.color}
                        strokeWidth="1.5"
                      />
                      <text
                        x={getLabelPos(i).x}
                        y={getLabelPos(i).y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="white"
                        fontSize="9"
                        fontFamily="Rajdhani, sans-serif"
                        fontWeight="700"
                        transform={`rotate(${(i * 360) / SEGMENTS + 180 / SEGMENTS}, ${getLabelPos(i).x}, ${getLabelPos(i).y})`}
                        style={{ pointerEvents: "none" }}
                      >
                        {prize.label.split(" ")[0]}
                      </text>
                    </g>
                  ))}

                  {/* Center circle */}
                  <circle cx={R} cy={R} r={24} fill="#0d0015" stroke="#8B00FF" strokeWidth="2" />
                  <text x={R} y={R} textAnchor="middle" dominantBaseline="middle" fill="#8B00FF" fontSize="20">👾</text>
                </g>

                {/* Outer ring */}
                <circle cx={R} cy={R} r={R - 2} fill="none" stroke="#8B00FF" strokeWidth="2" opacity="0.4" />
              </svg>
            </div>

            <button
              onClick={spin}
              disabled={spinning}
              className="bg-gradient-to-r from-[#8B00FF] to-[#FF1493] text-white px-10 py-4 rounded-full font-rajdhani font-black text-lg tracking-wider transition-all hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed neon-border-purple"
            >
              {spinning ? "🎰 Spinning..." : "👑 SPIN THE WHEEL"}
            </button>
            <p className="text-white/25 text-xs font-rajdhani mt-4">One free spin. Don't waste it.</p>
          </>
        ) : (
          <div className="py-4">
            {/* Prize reveal */}
            <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl float-anim"
              style={{ background: `${result.color}22`, border: `2px solid ${result.color}`, boxShadow: `0 0 30px ${result.color}44` }}>
              🎉
            </div>
            <div className="text-white/50 font-rajdhani text-sm tracking-widest uppercase mb-2">LUCKY YOU 👾</div>
            <h3 className="font-orbitron font-black text-2xl mb-2" style={{ color: result.color }}>{result.label}</h3>
            <p className="text-white/60 font-inter text-sm mb-8 leading-relaxed">{result.desc}</p>

            {!claimed ? (
              <>
                <div className="flex gap-3 mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email to claim prize..."
                    className="flex-1 bg-[#111] border border-white/10 focus:border-[#8B00FF] text-white placeholder-white/25 px-4 py-3 rounded-xl font-inter text-sm outline-none transition-all"
                  />
                  <button
                    onClick={claim}
                    disabled={!email.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-[#8B00FF] to-[#FF1493] text-white rounded-xl font-rajdhani font-bold tracking-wider hover:scale-105 transition-all disabled:opacity-40"
                  >
                    Claim
                  </button>
                </div>
                <button onClick={reset} className="text-white/30 text-xs font-rajdhani hover:text-white transition-colors underline">
                  Spin again
                </button>
              </>
            ) : (
              <div>
                <div className="bg-[#00FF00]/10 border border-[#00FF00]/30 text-[#00FF00] rounded-2xl px-6 py-4 mb-6 font-rajdhani font-bold">
                  ✓ Prize is heading to your inbox. You're welcome.
                </div>
                <button onClick={() => { reset(); onClose(); }}
                  className="bg-[#8B00FF] hover:bg-[#7a00e6] text-white px-8 py-3 rounded-full font-rajdhani font-bold tracking-wider transition-all hover:scale-105">
                  Back to Chaos
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
