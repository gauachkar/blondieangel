// AUTH SPECIALIST AGENT — Sign In / Sign Up / Magic Link page
// Route: /auth  →  redirects to /portal on success (or original destination)

import { useState } from "react";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

type Tab = "signin" | "signup" | "magic";

export default function AuthPage() {
  const { user, signIn, signUp, signInWithMagicLink } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Redirect back to wherever they came from, default /portal
  const from: string = (location.state as { from?: { pathname: string } })?.from?.pathname ?? "/portal";

  const [tab, setTab] = useState<Tab>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Already logged in → skip to portal
  if (user) return <Navigate to={from} replace />;

  const reset = () => { setError(""); setSuccess(""); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    reset();

    if (tab === "magic") {
      const { error } = await signInWithMagicLink(email);
      error ? setError(error) : setSuccess("Magic link sent! Check your inbox. 👾");
    } else if (tab === "signin") {
      const { error } = await signIn(email, password);
      error ? setError(error) : navigate(from, { replace: true });
    } else {
      const { error } = await signUp(email, password);
      error ? setError(error) : setSuccess("Account created! Check your email to verify. 👑");
    }

    setLoading(false);
  };

  const TABS: { id: Tab; label: string }[] = [
    { id: "signin", label: "Sign In" },
    { id: "signup", label: "Sign Up" },
    { id: "magic", label: "Magic Link ✨" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#8B00FF]/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#FF1493]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "linear-gradient(#8B00FF 1px,transparent 1px),linear-gradient(90deg,#8B00FF 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-1 mb-3">
            <span className="font-orbitron font-black text-2xl shimmer-text">BLONDIE</span>
            <span className="font-orbitron font-black text-2xl text-[#FF1493]" style={{ textShadow: "0 0 15px #FF1493" }}>ANGEL</span>
          </Link>
          <p className="text-white/30 text-[10px] font-rajdhani tracking-[0.25em] uppercase">Member Access · 18+ Only</p>
        </div>

        {/* Auth card */}
        <div className="gradient-border-card rounded-3xl overflow-hidden" style={{ boxShadow: "0 0 60px #8B00FF18" }}>
          {/* Tab bar */}
          <div className="flex border-b border-[#8B00FF]/20">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTab(t.id); reset(); }}
                className={`flex-1 py-3.5 text-[11px] font-rajdhani font-bold tracking-widest uppercase transition-all ${
                  tab === t.id
                    ? "text-[#00FFFF] border-b-2 border-[#8B00FF] bg-[#8B00FF]/8"
                    : "text-white/30 hover:text-white/60 bg-transparent"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-7">
            {/* Headings per tab */}
            <div className="mb-6 text-center">
              <span className="text-4xl block mb-2">
                {tab === "signin" ? "🎮" : tab === "signup" ? "👑" : "✨"}
              </span>
              <h1 className="font-orbitron font-black text-white text-lg">
                {tab === "signin" ? "Welcome Back" : tab === "signup" ? "Join the Club" : "Passwordless Entry"}
              </h1>
              <p className="text-white/30 text-xs font-rajdhani mt-1">
                {tab === "signin" ? "Sign in to your member portal" : tab === "signup" ? "Create your member account" : "Get a one-click login link"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-[#00FFFF] text-[10px] font-rajdhani font-bold tracking-widest uppercase mb-2">Email</label>
                <input
                  type="email" required autoComplete="email"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-[#0d0d0d] border border-white/10 hover:border-[#8B00FF]/50 focus:border-[#8B00FF] text-white placeholder-white/25 px-4 py-3 rounded-xl font-inter text-sm outline-none transition-all"
                />
              </div>

              {/* Password (not for magic link) */}
              {tab !== "magic" && (
                <div>
                  <label className="block text-[#00FFFF] text-[10px] font-rajdhani font-bold tracking-widest uppercase mb-2">Password</label>
                  <input
                    type="password" required autoComplete={tab === "signup" ? "new-password" : "current-password"}
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" minLength={6}
                    className="w-full bg-[#0d0d0d] border border-white/10 hover:border-[#8B00FF]/50 focus:border-[#8B00FF] text-white placeholder-white/25 px-4 py-3 rounded-xl font-inter text-sm outline-none transition-all"
                  />
                </div>
              )}

              {/* Error/Success feedback */}
              {error && (
                <div className="bg-[#FF4444]/10 border border-[#FF4444]/30 text-[#FF4444] rounded-xl px-4 py-3 text-xs font-rajdhani">
                  ⚠ {error}
                </div>
              )}
              {success && (
                <div className="bg-[#00FF00]/10 border border-[#00FF00]/30 text-[#00FF00] rounded-xl px-4 py-3 text-xs font-rajdhani">
                  ✓ {success}
                </div>
              )}

              <button
                type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-[#8B00FF] to-[#FF1493] text-white py-4 rounded-xl font-rajdhani font-black tracking-widest text-sm transition-all hover:scale-[1.02] disabled:opacity-60 neon-border-purple"
              >
                {loading
                  ? "⚡ Please wait..."
                  : tab === "signin" ? "🎮 Enter the Portal"
                  : tab === "signup" ? "👑 Create Account"
                  : "✨ Send Magic Link"}
              </button>
            </form>

            <p className="text-center mt-6">
              <Link to="/" className="text-white/20 hover:text-[#8B00FF] text-xs font-rajdhani transition-colors">
                ← Back to Blondie's World
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-white/15 text-[10px] font-rajdhani mt-4 tracking-wider">
          18+ adults only · Discreet billing · Real sessions
        </p>
      </div>
    </div>
  );
}
