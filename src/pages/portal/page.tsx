// USER PORTAL SPECIALIST AGENT — Member portal page
// Route: /portal  (ProtectedRoute — requires login)
// Shows: profile, tier, session history, tribute tracker, quick links

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// ── Placeholder data (replace with Supabase queries once tables exist) ──
const MOCK_SESSIONS = [
  { id: 1, type: "Dominant Roleplay", date: "Apr 6, 2026", duration: "90 min", amount: "$35", status: "completed" },
  { id: 2, type: "Anime Scenario — JJK", date: "Apr 3, 2026", duration: "60 min", amount: "$28", status: "completed" },
  { id: 3, type: "Findom Tribute", date: "Mar 29, 2026", duration: "—", amount: "$60", status: "completed" },
  { id: 4, type: "Gamer RP — FFXIV", date: "Mar 25, 2026", duration: "60 min", amount: "$20", status: "completed" },
  { id: 5, type: "Feet Content Custom", date: "Mar 18, 2026", duration: "—", amount: "$50", status: "completed" },
];

const MOCK_TRIBUTES = [
  { date: "Apr 6", amount: 60 },
  { date: "Mar 29", amount: 60 },
  { date: "Mar 15", amount: 45 },
  { date: "Mar 1", amount: 60 },
];

type Tab = "overview" | "sessions" | "tributes";

export default function PortalPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const handleSignOut = async () => {
    await signOut();
    navigate("/", { replace: true });
  };

  // Computed stats
  const totalSpent = MOCK_SESSIONS.reduce((s, x) => s + parseFloat(x.amount.replace("$", "")), 0);
  const tributeTotal = MOCK_TRIBUTES.reduce((s, x) => s + x.amount, 0);
  const maxTribute = Math.max(...MOCK_TRIBUTES.map((t) => t.amount));

  const STATS = [
    { icon: "💜", label: "Tier", value: "Simp Tier", color: "#8B00FF" },
    { icon: "🎮", label: "Sessions", value: String(MOCK_SESSIONS.length), color: "#00FFFF" },
    { icon: "💸", label: "Total Spent", value: `$${totalSpent}`, color: "#FF1493" },
    { icon: "👑", label: "Tribute Total", value: `$${tributeTotal}`, color: "#FFD700" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] relative overflow-hidden">
      {/* Ambient bg */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#8B00FF]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#FF1493]/4 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02]"
        style={{ backgroundImage: "linear-gradient(#8B00FF 1px,transparent 1px),linear-gradient(90deg,#8B00FF 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* Sticky nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-[#8B00FF]/20 py-3">
        <div className="max-w-5xl mx-auto px-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1">
            <span className="font-orbitron font-black text-xl shimmer-text">BLONDIE</span>
            <span className="font-orbitron font-black text-xl text-[#FF1493]" style={{ textShadow: "0 0 12px #FF1493" }}>ANGEL</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-white/30 text-xs font-rajdhani hidden sm:block truncate max-w-[180px]">{user?.email}</span>
            <button onClick={handleSignOut} className="text-white/40 hover:text-[#FF1493] text-xs font-rajdhani font-bold tracking-widest transition-colors">
              Sign Out ↩
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-5xl mx-auto px-5 pt-24 pb-16">

        {/* Page header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-[#8B00FF]/15 border border-[#8B00FF]/40 text-[#00FFFF] text-[10px] font-rajdhani font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-4">
            <span className="w-2 h-2 bg-[#00FF00] rounded-full animate-pulse" />
            Member Portal
          </div>
          <h1 className="font-orbitron font-black text-3xl md:text-4xl text-white mb-2 glitch-text">
            Welcome Back, <span className="shimmer-text">Simp</span> 👾
          </h1>
          <p className="text-white/40 font-rajdhani text-sm">
            Logged in as <span className="text-[#00FFFF]">{user?.email}</span>
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {STATS.map((s) => (
            <div key={s.label} className="gradient-border-card rounded-2xl p-4">
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="font-orbitron font-bold text-lg leading-none" style={{ color: s.color }}>{s.value}</div>
              <div className="text-white/40 text-xs font-rajdhani tracking-wider mt-1.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tab switcher */}
        <div className="flex gap-1 mb-6 bg-[#111]/80 border border-white/6 rounded-2xl p-1.5">
          {(["overview", "sessions", "tributes"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`flex-1 py-2.5 text-xs font-rajdhani font-bold tracking-widest uppercase rounded-xl transition-all ${
                activeTab === t ? "bg-[#8B00FF] text-white" : "text-white/30 hover:text-white/60"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Membership card */}
            <div className="gradient-border-card rounded-3xl p-6">
              <h3 className="font-rajdhani font-bold text-white text-xs tracking-widest uppercase mb-5 neon-text-purple">Your Membership</h3>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8B00FF] to-[#FF1493] flex items-center justify-center text-2xl flex-shrink-0">👾</div>
                <div>
                  <div className="font-orbitron font-bold text-white text-base">Simp Tier</div>
                  <div className="text-white/40 text-xs font-rajdhani mt-0.5">$9.99 / month</div>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="w-1.5 h-1.5 bg-[#00FF00] rounded-full animate-pulse" />
                    <span className="text-[#00FF00] text-xs font-rajdhani font-bold">Active</span>
                  </div>
                </div>
              </div>
              {/* Upgrade CTA */}
              <a href="/#vip" className="block w-full text-center py-3 bg-[#8B00FF]/12 border border-[#8B00FF]/30 hover:border-[#8B00FF] hover:bg-[#8B00FF]/20 text-[#8B00FF] rounded-xl font-rajdhani font-bold text-sm tracking-wider transition-all">
                Upgrade Tier 👑
              </a>
            </div>

            {/* Recent sessions */}
            <div className="gradient-border-card rounded-3xl p-6">
              <h3 className="font-rajdhani font-bold text-white text-xs tracking-widest uppercase mb-5 neon-text-cyan">Recent Activity</h3>
              <div className="space-y-4">
                {MOCK_SESSIONS.slice(0, 4).map((s) => (
                  <div key={s.id} className="flex items-center justify-between">
                    <div>
                      <div className="text-white text-sm font-rajdhani font-semibold leading-tight">{s.type}</div>
                      <div className="text-white/30 text-xs font-inter mt-0.5">{s.date}</div>
                    </div>
                    <span className="text-[#FF1493] font-orbitron font-bold text-sm">{s.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick access */}
            <div className="gradient-border-card rounded-3xl p-6 md:col-span-2">
              <h3 className="font-rajdhani font-bold text-white text-xs tracking-widest uppercase mb-5 neon-text-pink">Quick Access</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Book Session", href: "/#menu", icon: "🎮" },
                  { label: "Browse Gallery", href: "/#gallery", icon: "🖼️" },
                  { label: "VIP Drops", href: "/#vip", icon: "👑" },
                  { label: "My Platforms", href: "/#platforms", icon: "💙" },
                ].map((a) => (
                  <a key={a.label} href={a.href}
                    className="flex flex-col items-center gap-2 p-4 bg-[#0d0d0d] border border-white/6 hover:border-[#8B00FF]/40 hover:bg-[#8B00FF]/5 rounded-2xl text-center transition-all hover:-translate-y-1">
                    <span className="text-2xl">{a.icon}</span>
                    <span className="text-white/60 text-xs font-rajdhani font-semibold">{a.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── SESSIONS TAB ── */}
        {activeTab === "sessions" && (
          <div className="gradient-border-card rounded-3xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#8B00FF]/20 flex items-center justify-between">
              <h3 className="font-rajdhani font-bold text-white text-xs tracking-widest uppercase">Session History</h3>
              <span className="text-white/30 text-xs font-rajdhani">{MOCK_SESSIONS.length} sessions · ${totalSpent} total</span>
            </div>
            <div className="divide-y divide-white/5">
              {MOCK_SESSIONS.map((s) => (
                <div key={s.id} className="px-5 py-4 flex items-center justify-between hover:bg-[#8B00FF]/5 transition-all">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#8B00FF]/12 border border-[#8B00FF]/25 flex items-center justify-center text-lg flex-shrink-0">🎮</div>
                    <div className="min-w-0">
                      <div className="text-white font-rajdhani font-semibold text-sm truncate">{s.type}</div>
                      <div className="text-white/30 text-xs font-inter">{s.date} · {s.duration}</div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-3">
                    <div className="text-[#FF1493] font-orbitron font-bold text-sm">{s.amount}</div>
                    <div className="text-[#00FF00] text-[10px] font-rajdhani tracking-widest mt-0.5">{s.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TRIBUTES TAB ── */}
        {activeTab === "tributes" && (
          <div className="space-y-5">
            <div className="gradient-border-card rounded-3xl p-6">
              <h3 className="font-rajdhani font-bold text-white text-xs tracking-widest uppercase mb-1 neon-text-pink">Tribute Tracker</h3>
              <p className="text-white/35 text-xs font-inter mb-6">Every tribute is remembered. Pay respects accordingly.</p>

              {/* Summary row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {[
                  { label: "Total Tributed", value: `$${tributeTotal}`, color: "#FFD700" },
                  { label: "Times Drained", value: String(MOCK_TRIBUTES.length), color: "#FF1493" },
                  { label: "Largest Tribute", value: `$${maxTribute}`, color: "#8B00FF" },
                ].map((s) => (
                  <div key={s.label} className="bg-[#0d0d0d] border border-white/6 rounded-2xl p-4 text-center">
                    <div className="font-orbitron font-black text-2xl mb-1" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-white/40 text-xs font-rajdhani tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Bar chart (CSS) */}
              <div className="space-y-3">
                {MOCK_TRIBUTES.map((t, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-white/30 text-xs font-rajdhani w-12 flex-shrink-0">{t.date}</span>
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${(t.amount / maxTribute) * 100}%`, background: "linear-gradient(90deg, #8B00FF, #FF1493)" }}
                      />
                    </div>
                    <span className="text-[#FFD700] font-orbitron font-bold text-sm w-10 text-right flex-shrink-0">${t.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <a href="/#menu"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#8B00FF] to-[#FF1493] text-white px-8 py-4 rounded-full font-rajdhani font-bold tracking-wider transition-all hover:scale-105 neon-border-purple">
                💸 Tribute Again
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
