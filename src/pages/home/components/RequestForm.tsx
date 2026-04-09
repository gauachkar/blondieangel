import { useState } from "react";

const SCENARIO_TYPES = ["Dark Fantasy", "Anime Scenario", "Gaming Co-op", "Dominant Arc", "Horror Story", "Sci-Fi World", "Custom / Other"];
const LENGTHS = ["Short (30 min)", "Standard (1hr)", "Extended (3hr)", "Ongoing Campaign"];

export default function RequestForm() {
  const [form, setForm] = useState({ name: "", email: "", type: "", length: "", scenario: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="request" className="relative w-full bg-[#080808] py-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B00FF]/40 to-transparent" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-[#8B00FF]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-[#FF1493] text-xs font-rajdhani font-bold tracking-widest uppercase mb-4">
            <div className="h-px w-8 bg-[#FF1493]" />
            Custom Requests
            <div className="h-px w-8 bg-[#FF1493]" />
          </div>
          <h2 className="font-orbitron font-black text-3xl md:text-4xl text-white mb-3 glitch-text">
            Tell Me What You <span className="shimmer-text">Want</span>
          </h2>
          <p className="text-white/40 font-rajdhani text-lg">Don't be vague. The more detail you give me, the more damage I do.</p>
        </div>

        {submitted ? (
          <div className="gradient-border-card rounded-3xl p-12 text-center">
            <span className="text-7xl block mb-6 float-anim">👾</span>
            <h3 className="font-orbitron font-bold text-2xl text-white mb-3">Got it. You're in my queue now. 👑</h3>
            <p className="text-white/60 font-inter text-base mb-6">
              I'll hit you back within 24hrs. Obsessed and Owned members jump the queue. Get ready — this is going to be good.
            </p>
            <button
              onClick={() => { setSubmitted(false); setForm({ name: "", email: "", type: "", length: "", scenario: "", notes: "" }); }}
              className="bg-[#8B00FF] hover:bg-[#7a00e6] text-white px-8 py-3 rounded-full font-rajdhani font-bold tracking-wider transition-all hover:scale-105"
            >
              Send Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="gradient-border-card rounded-3xl p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#00FFFF] text-xs font-rajdhani font-bold tracking-widest uppercase mb-2">Your Name / Handle *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Your handle or name..."
                  className="w-full bg-[#0d0d0d] border border-white/10 hover:border-[#8B00FF]/50 focus:border-[#8B00FF] text-white placeholder-white/25 px-4 py-3 rounded-xl font-inter text-sm outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[#00FFFF] text-xs font-rajdhani font-bold tracking-widest uppercase mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-[#0d0d0d] border border-white/10 hover:border-[#8B00FF]/50 focus:border-[#8B00FF] text-white placeholder-white/25 px-4 py-3 rounded-xl font-inter text-sm outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#00FFFF] text-xs font-rajdhani font-bold tracking-widest uppercase mb-2">Scenario Type *</label>
              <div className="flex flex-wrap gap-2">
                {SCENARIO_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => set("type", t)}
                    className="px-4 py-2 rounded-full text-sm font-rajdhani font-semibold border transition-all"
                    style={{
                      background: form.type === t ? "#8B00FF" : "#8B00FF12",
                      borderColor: form.type === t ? "#8B00FF" : "#8B00FF33",
                      color: form.type === t ? "#fff" : "#8B00FF",
                      boxShadow: form.type === t ? "0 0 12px #8B00FF44" : "none",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[#00FFFF] text-xs font-rajdhani font-bold tracking-widest uppercase mb-2">Session Length</label>
              <div className="flex flex-wrap gap-2">
                {LENGTHS.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => set("length", l)}
                    className="px-4 py-2 rounded-full text-sm font-rajdhani font-semibold border transition-all"
                    style={{
                      background: form.length === l ? "#FF1493" : "#FF149312",
                      borderColor: form.length === l ? "#FF1493" : "#FF149333",
                      color: form.length === l ? "#fff" : "#FF1493",
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[#00FFFF] text-xs font-rajdhani font-bold tracking-widest uppercase mb-2">Describe Your Fantasy Scenario *</label>
              <textarea
                required
                value={form.scenario}
                onChange={(e) => set("scenario", e.target.value)}
                rows={4}
                placeholder="Setting, characters, tone, kink, energy — give me everything. The more specific you are, the better this gets..."
                className="w-full bg-[#0d0d0d] border border-white/10 hover:border-[#8B00FF]/50 focus:border-[#8B00FF] text-white placeholder-white/25 px-4 py-3 rounded-xl font-inter text-sm outline-none transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-[#00FFFF] text-xs font-rajdhani font-bold tracking-widest uppercase mb-2">Anything Else?</label>
              <textarea
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                rows={2}
                placeholder="Budget, hard limits, chaos level, anything else I should know before I ruin you..."
                className="w-full bg-[#0d0d0d] border border-white/10 hover:border-[#8B00FF]/50 focus:border-[#8B00FF] text-white placeholder-white/25 px-4 py-3 rounded-xl font-inter text-sm outline-none transition-all resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-[#8B00FF] to-[#FF1493] text-white py-4 rounded-full font-rajdhani font-bold text-base tracking-wider transition-all hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed neon-border-purple"
              >
                {loading ? "⚡ Sending..." : "👑 Send It to Lila"}
              </button>
              <p className="text-white/25 text-xs font-rajdhani text-center sm:text-right">
                18+ only · Real sessions · Response within 24hrs
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
