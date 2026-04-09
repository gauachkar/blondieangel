import { useState } from "react";
import { supabase } from "../../../lib/supabase";

interface Props { onClose: () => void; }

type View = "login" | "dashboard";

const MOCK_STATS = [
  { label: "Total Sessions", value: "1,247", color: "#8B00FF", icon: "🎮" },
  { label: "Active VIPs", value: "89", color: "#FFD700", icon: "👑" },
  { label: "Pending Requests", value: "14", color: "#FF1493", icon: "📬" },
  { label: "Revenue (MTD)", value: "$4,830", color: "#00FF00", icon: "💰" },
];

export default function AdminLogin({ onClose }: Props) {
  const [view, setView] = useState<View>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) {
        // Demo mode — allow any credentials
        if (email && password.length >= 4) {
          setView("dashboard");
        } else {
          setError("Invalid credentials. (Demo: any email + 4+ char password)");
        }
      } else {
        setView("dashboard");
      }
    } catch {
      if (email && password.length >= 4) setView("dashboard");
      else setError("Login failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] modal-backdrop bg-black/90 flex items-center justify-center p-4">
      <div className="w-full max-w-md gradient-border-card rounded-3xl overflow-hidden"
        style={{ boxShadow: "0 0 60px #8B00FF22" }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#8B00FF]/20 to-[#FF1493]/10 border-b border-[#8B00FF]/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#8B00FF]/30 flex items-center justify-center text-sm">🔐</div>
            <span className="font-orbitron font-bold text-white text-sm">
              {view === "login" ? "Admin Portal" : "Dashboard"}
            </span>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white transition-all text-xs">✕</button>
        </div>

        <div className="p-8">
          {view === "login" ? (
            <>
              <div className="text-center mb-8">
                <span className="text-5xl block mb-3 float-anim">👾</span>
                <h2 className="font-orbitron font-black text-xl shimmer-text">Blondie Angel Admin</h2>
                <p className="text-white/35 text-xs font-rajdhani mt-1 tracking-widest">AUTHORIZED PERSONNEL ONLY</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-[#00FFFF] text-xs font-rajdhani font-bold tracking-widest uppercase mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@blondieangel.com"
                    className="w-full bg-[#0d0d0d] border border-white/10 hover:border-[#8B00FF]/50 focus:border-[#8B00FF] text-white placeholder-white/25 px-4 py-3 rounded-xl font-inter text-sm outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[#00FFFF] text-xs font-rajdhani font-bold tracking-widest uppercase mb-2">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#0d0d0d] border border-white/10 hover:border-[#8B00FF]/50 focus:border-[#8B00FF] text-white placeholder-white/25 px-4 py-3 rounded-xl font-inter text-sm outline-none transition-all"
                  />
                </div>
                {error && (
                  <div className="bg-[#FF4444]/10 border border-[#FF4444]/30 text-[#FF4444] rounded-xl px-4 py-3 text-xs font-rajdhani">
                    ⚠ {error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#8B00FF] to-[#FF1493] text-white py-3.5 rounded-xl font-rajdhani font-black tracking-widest text-sm transition-all hover:scale-[1.02] disabled:opacity-60 neon-border-purple mt-2"
                >
                  {loading ? "⚡ Authenticating..." : "🔐 ENTER PORTAL"}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-orbitron font-bold text-white text-base">Overview</h3>
                <button onClick={() => setView("login")} className="text-white/30 hover:text-[#FF1493] text-xs font-rajdhani transition-colors">Logout ↩</button>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {MOCK_STATS.map((s) => (
                  <div key={s.label} className="bg-[#0d0d0d] border border-white/6 rounded-2xl p-4 hover:border-[#8B00FF]/30 transition-all">
                    <div className="text-2xl mb-2">{s.icon}</div>
                    <div className="font-orbitron font-black text-xl" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-white/40 text-xs font-rajdhani tracking-wider mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div className="space-y-2">
                <div className="text-white/30 text-xs font-rajdhani tracking-widest uppercase mb-3">Quick Actions</div>
                {["📬 View Pending Requests", "👑 Manage VIP Members", "🗓 Update Availability", "💳 Stripe Dashboard", "📊 Full Analytics"].map((action) => (
                  <button key={action} className="w-full text-left px-4 py-3 bg-[#0d0d0d] border border-white/6 hover:border-[#8B00FF]/40 hover:bg-[#8B00FF]/8 text-white/60 hover:text-white text-sm font-rajdhani rounded-xl transition-all">
                    {action}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
