// ADMIN PANEL SPECIALIST AGENT — Full admin dashboard
// Route: /admin  (self-contained login — does NOT use ProtectedRoute)
// Auth: Supabase signIn + VITE_ADMIN_EMAIL check
// Persistence: localStorage (swap localStorage calls → Supabase tables for multi-device sync)

import { useState } from "react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useAuth } from "../../contexts/AuthContext";

// ── Types ──────────────────────────────────────────────────────────────────
interface Drop {
  id: string;
  emoji: string;
  title: string;
  type: string;
  price: string;
  active: boolean;
}

interface PriceTier { name: string; price: string; }
interface PriceDef { id: string; title: string; tiers: PriceTier[]; }

type DayStatus = "available" | "busy" | "vip";
interface AvailSlot { status: DayStatus; label: string; }
type AvailMap = Record<string, AvailSlot[]>;

// ── Default data (mirrors existing site constants) ─────────────────────────
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const DEFAULT_AVAIL: AvailMap = {
  Mon: [{ status: "available", label: "2PM–6PM" }, { status: "vip", label: "8PM–11PM" }],
  Tue: [{ status: "busy", label: "All Day" }],
  Wed: [{ status: "available", label: "3PM–10PM" }],
  Thu: [{ status: "available", label: "1PM–5PM" }, { status: "vip", label: "9PM–Midnight" }],
  Fri: [{ status: "available", label: "5PM–11PM" }],
  Sat: [{ status: "vip", label: "All Day VIP" }],
  Sun: [{ status: "available", label: "12PM–8PM" }],
};

const DEFAULT_PRICES: PriceDef[] = [
  { id: "roleplay", title: "Dominant Roleplay", tiers: [{ name: "Starter", price: "$15" }, { name: "Full Arc", price: "$35" }, { name: "Epic", price: "$75" }] },
  { id: "findom", title: "Findom & Tribute", tiers: [{ name: "Tribute", price: "$20+" }, { name: "Owned", price: "$60/wk" }, { name: "Wallet Slave", price: "$150/mo" }] },
  { id: "feet", title: "Feet Content", tiers: [{ name: "Basic Set", price: "$25" }, { name: "Custom", price: "$50" }, { name: "Worship Session", price: "$40" }] },
  { id: "gaming", title: "Gamer RP", tiers: [{ name: "Session", price: "$20" }, { name: "Campaign", price: "$50" }] },
  { id: "anime", title: "Anime Scenarios", tiers: [{ name: "Scene", price: "$12" }, { name: "Arc", price: "$28" }] },
  { id: "ppv", title: "PPV Drops", tiers: [{ name: "Drop", price: "$8–$40" }] },
];

const DEFAULT_DROPS: Drop[] = [
  { id: "1", emoji: "🌸", title: "Sakura Arc Vol.1", type: "Story Pack", price: "$12", active: true },
  { id: "2", emoji: "⚔️", title: "Dark Knight Campaign", type: "Roleplay Set", price: "$28", active: true },
  { id: "3", emoji: "🎮", title: "Gaming Night Vol.3", type: "Fiction Pack", price: "$15", active: true },
  { id: "4", emoji: "🦶", title: "Spring Feet Set", type: "Photo Pack", price: "$25", active: false },
  { id: "5", emoji: "👑", title: "VIP Bundle April", type: "VIP Exclusive", price: "$40", active: true },
];

const EARNINGS_DATA = [
  { month: "Nov", revenue: 2840, sessions: 38 },
  { month: "Dec", revenue: 3200, sessions: 42 },
  { month: "Jan", revenue: 2950, sessions: 35 },
  { month: "Feb", revenue: 3680, sessions: 48 },
  { month: "Mar", revenue: 4120, sessions: 52 },
  { month: "Apr", revenue: 4830, sessions: 61 },
];

const MOCK_LEADS = [
  { id: 1, handle: "RPG_Lord", type: "Dominant Roleplay", length: "Full Arc", date: "Apr 8 10:42", status: "new" },
  { id: 2, handle: "DarkFan99", type: "Anime Scenarios", length: "Standard (1hr)", date: "Apr 8 09:15", status: "new" },
  { id: 3, handle: "WalletBoy", type: "Findom & Tribute", length: "—", date: "Apr 7 23:50", status: "read" },
  { id: 4, handle: "FeetFanatic", type: "Feet Content", length: "—", date: "Apr 7 18:30", status: "read" },
  { id: 5, handle: "GamerKing88", type: "Gamer RP Companion", length: "Campaign", date: "Apr 7 12:00", status: "read" },
];

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "status", label: "Online Status", icon: "🟢" },
  { id: "schedule", label: "Availability", icon: "🗓" },
  { id: "pricing", label: "Pricing", icon: "💰" },
  { id: "drops", label: "Drops", icon: "📦" },
  { id: "leads", label: "Leads", icon: "📬" },
];

const STATUS_COLORS: Record<DayStatus, string> = {
  available: "#00FF00",
  vip: "#8B00FF",
  busy: "#FF4444",
};

// ── LocalStorage helper ────────────────────────────────────────────────────
// To-do (Supabase migration): replace localStorage.getItem/setItem with
// supabase.from('admin_settings').select/upsert where .eq('key', key)
function useLocalStore<T>(key: string, def: T) {
  const [val, setVal] = useState<T>(() => {
    try { return JSON.parse(localStorage.getItem(key) ?? "null") ?? def; }
    catch { return def; }
  });
  const save = (v: T) => { setVal(v); localStorage.setItem(key, JSON.stringify(v)); };
  return [val, save] as const;
}

// ══════════════════════════════════════════════════════════════════════════
// SECTION: Overview
// ══════════════════════════════════════════════════════════════════════════
function OverviewSection({ isOnline }: { isOnline: boolean }) {
  const mtdRevenue = EARNINGS_DATA[EARNINGS_DATA.length - 1].revenue;
  const prevRevenue = EARNINGS_DATA[EARNINGS_DATA.length - 2].revenue;
  const growth = (((mtdRevenue - prevRevenue) / prevRevenue) * 100).toFixed(1);

  const STATS = [
    { icon: "💰", label: "Revenue (MTD)", value: `$${mtdRevenue.toLocaleString()}`, sub: `+${growth}% vs last month`, color: "#00FF00" },
    { icon: "🎮", label: "Sessions (MTD)", value: "61", sub: "+9 vs last month", color: "#8B00FF" },
    { icon: "👑", label: "Active VIPs", value: "89", sub: "12 new this month", color: "#FFD700" },
    { icon: "📬", label: "Pending Leads", value: `${MOCK_LEADS.filter((l) => l.status === "new").length}`, sub: "2 new today", color: "#FF1493" },
  ];

  return (
    <div className="space-y-6">
      {/* Online status badge */}
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-rajdhani font-bold tracking-widest ${
        isOnline ? "bg-[#00FF00]/10 border-[#00FF00]/30 text-[#00FF00]" : "bg-[#FF4444]/10 border-[#FF4444]/30 text-[#FF4444]"
      }`}>
        <span className={`w-2 h-2 rounded-full animate-pulse ${isOnline ? "bg-[#00FF00]" : "bg-[#FF4444]"}`} />
        {isOnline ? "BLONDIE IS ONLINE" : "BLONDIE IS OFFLINE"}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="gradient-border-card rounded-2xl p-5">
            <div className="text-2xl mb-3">{s.icon}</div>
            <div className="font-orbitron font-black text-2xl mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-white/60 text-xs font-rajdhani font-semibold mb-1">{s.label}</div>
            <div className="text-white/25 text-[10px] font-inter">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="gradient-border-card rounded-2xl p-5">
        <h3 className="font-rajdhani font-bold text-white text-xs tracking-widest uppercase mb-5">Revenue — Last 6 Months</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={EARNINGS_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="month" tick={{ fill: "#ffffff44", fontSize: 10, fontFamily: "Rajdhani" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#ffffff44", fontSize: 10, fontFamily: "Rajdhani" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: "#0d0015", border: "1px solid #8B00FF44", borderRadius: 8, fontFamily: "Rajdhani", fontSize: 12 }}
              labelStyle={{ color: "#00FFFF" }} itemStyle={{ color: "#FF1493" }}
            />
            <Line type="monotone" dataKey="revenue" stroke="#FF1493" strokeWidth={2} dot={{ fill: "#8B00FF", r: 4 }} activeDot={{ r: 6, fill: "#FF1493" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Sessions bar chart */}
      <div className="gradient-border-card rounded-2xl p-5">
        <h3 className="font-rajdhani font-bold text-white text-xs tracking-widest uppercase mb-5">Sessions — Last 6 Months</h3>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={EARNINGS_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="month" tick={{ fill: "#ffffff44", fontSize: 10, fontFamily: "Rajdhani" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#ffffff44", fontSize: 10, fontFamily: "Rajdhani" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "#0d0015", border: "1px solid #8B00FF44", borderRadius: 8, fontFamily: "Rajdhani", fontSize: 12 }} labelStyle={{ color: "#00FFFF" }} itemStyle={{ color: "#8B00FF" }} />
            <Bar dataKey="sessions" fill="#8B00FF" radius={[4, 4, 0, 0]} opacity={0.8} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// SECTION: Online Status
// ══════════════════════════════════════════════════════════════════════════
function StatusSection() {
  const [online, setOnline] = useLocalStore("ba_online", true);
  const [msg, setMsg] = useLocalStore("ba_status_msg", "Open for bookings — don't make her wait");
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    // TODO: persist to Supabase → supabase.from('settings').upsert({ key:'online_status', value: { online, msg } })
    // Then in LiveStatusSection.tsx read: const { data } = await supabase.from('settings').select().eq('key','online_status').single()
  };

  return (
    <div className="max-w-lg space-y-6">
      <div className="gradient-border-card rounded-2xl p-6">
        <h3 className="font-rajdhani font-bold text-white text-xs tracking-widest uppercase mb-5">Online Status Toggle</h3>

        {/* Toggle */}
        <div className="flex items-center justify-between mb-6 p-4 bg-[#0d0d0d] border border-white/8 rounded-xl">
          <div>
            <div className="text-white font-rajdhani font-bold text-sm">Blondie is {online ? "ONLINE" : "OFFLINE"}</div>
            <div className="text-white/40 text-xs font-inter mt-0.5">Shown on the main site hero badge</div>
          </div>
          <button
            onClick={() => setOnline(!online)}
            className={`relative w-14 h-7 rounded-full transition-all duration-300 ${online ? "bg-[#00FF00]" : "bg-white/15"}`}
          >
            <span className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${online ? "left-7" : "left-0.5"}`} />
          </button>
        </div>

        {/* Status message */}
        <div className="mb-5">
          <label className="block text-[#00FFFF] text-[10px] font-rajdhani font-bold tracking-widest uppercase mb-2">Status Message</label>
          <input
            type="text" value={msg} onChange={(e) => setMsg(e.target.value)}
            className="w-full bg-[#0d0d0d] border border-white/10 hover:border-[#8B00FF]/50 focus:border-[#8B00FF] text-white px-4 py-3 rounded-xl font-inter text-sm outline-none transition-all"
          />
          <p className="text-white/25 text-[10px] font-inter mt-1.5">Appears below the online indicator in LiveStatusSection and HeroSection.</p>
        </div>

        <button onClick={save}
          className={`w-full py-3 rounded-xl font-rajdhani font-bold text-sm tracking-wider transition-all ${saved ? "bg-[#00FF00]/20 border border-[#00FF00]/50 text-[#00FF00]" : "bg-[#8B00FF] hover:bg-[#7a00e6] text-white"}`}>
          {saved ? "✓ Saved to localStorage" : "💾 Save Status"}
        </button>
        <p className="text-white/20 text-[10px] font-inter mt-2 text-center">Connect to Supabase realtime for live site updates</p>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// SECTION: Availability Schedule
// ══════════════════════════════════════════════════════════════════════════
function ScheduleSection() {
  const [avail, setAvail] = useLocalStore<AvailMap>("ba_avail", DEFAULT_AVAIL);
  const [saved, setSaved] = useState(false);

  const updateSlot = (day: string, idx: number, field: keyof AvailSlot, val: string) => {
    const next = { ...avail, [day]: avail[day].map((s, i) => i === idx ? { ...s, [field]: val } : s) };
    setAvail(next);
  };

  const addSlot = (day: string) => {
    setAvail({ ...avail, [day]: [...(avail[day] ?? []), { status: "available", label: "12PM–3PM" }] });
  };

  const removeSlot = (day: string, idx: number) => {
    setAvail({ ...avail, [day]: avail[day].filter((_, i) => i !== idx) });
  };

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="space-y-4">
      <div className="gradient-border-card rounded-2xl p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-rajdhani font-bold text-white text-xs tracking-widest uppercase">Weekly Availability</h3>
          <button onClick={save}
            className={`px-5 py-2 rounded-xl font-rajdhani font-bold text-xs tracking-wider transition-all ${saved ? "bg-[#00FF00]/15 border border-[#00FF00]/40 text-[#00FF00]" : "bg-[#8B00FF] text-white hover:bg-[#7a00e6]"}`}>
            {saved ? "✓ Saved" : "💾 Save"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {DAYS.map((day) => (
            <div key={day} className="bg-[#0d0d0d] border border-white/8 rounded-xl p-3">
              <div className="font-orbitron font-bold text-xs text-white/70 mb-3 tracking-widest">{day}</div>
              <div className="space-y-2 mb-2">
                {(avail[day] ?? []).map((slot, i) => (
                  <div key={i} className="space-y-1.5 bg-white/3 rounded-lg p-2">
                    {/* Status selector */}
                    <select
                      value={slot.status}
                      onChange={(e) => updateSlot(day, i, "status", e.target.value)}
                      className="w-full bg-[#111] border border-white/10 text-white rounded-lg px-2 py-1.5 text-[11px] font-rajdhani outline-none"
                      style={{ color: STATUS_COLORS[slot.status] }}
                    >
                      <option value="available">Available</option>
                      <option value="vip">VIP Only</option>
                      <option value="busy">Busy</option>
                    </select>
                    {/* Label input */}
                    <div className="flex items-center gap-1">
                      <input
                        type="text" value={slot.label}
                        onChange={(e) => updateSlot(day, i, "label", e.target.value)}
                        className="flex-1 bg-[#111] border border-white/10 text-white/70 rounded-lg px-2 py-1 text-[11px] font-inter outline-none"
                      />
                      <button onClick={() => removeSlot(day, i)} className="text-[#FF4444]/60 hover:text-[#FF4444] text-xs px-1 transition-colors">✕</button>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => addSlot(day)}
                className="w-full py-1.5 border border-dashed border-[#8B00FF]/30 hover:border-[#8B00FF] text-[#8B00FF]/50 hover:text-[#8B00FF] text-[10px] font-rajdhani rounded-lg transition-all">
                + Add Slot
              </button>
            </div>
          ))}
        </div>
        <p className="text-white/20 text-[10px] font-inter mt-4">Saved to localStorage. Wire to Supabase 'availability' table for live site sync.</p>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// SECTION: Pricing
// ══════════════════════════════════════════════════════════════════════════
function PricingSection() {
  const [prices, setPrices] = useLocalStore<PriceDef[]>("ba_prices", DEFAULT_PRICES);
  const [saved, setSaved] = useState(false);

  const updatePrice = (svcIdx: number, tierIdx: number, val: string) => {
    setPrices(prices.map((svc, si) =>
      si === svcIdx
        ? { ...svc, tiers: svc.tiers.map((t, ti) => ti === tierIdx ? { ...t, price: val } : t) }
        : svc
    ));
  };

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-white/30 text-xs font-rajdhani">Edit prices below. Changes save to localStorage and can be wired to Stripe product prices via API.</p>
        <button onClick={save}
          className={`px-5 py-2 rounded-xl font-rajdhani font-bold text-xs tracking-wider transition-all ${saved ? "bg-[#00FF00]/15 border border-[#00FF00]/40 text-[#00FF00]" : "bg-[#8B00FF] text-white hover:bg-[#7a00e6]"}`}>
          {saved ? "✓ Saved" : "💾 Save Prices"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {prices.map((svc, si) => (
          <div key={svc.id} className="gradient-border-card rounded-2xl p-5">
            <h4 className="font-rajdhani font-bold text-white text-sm mb-4">{svc.title}</h4>
            <div className="space-y-3">
              {svc.tiers.map((tier, ti) => (
                <div key={tier.name} className="flex items-center justify-between gap-3">
                  <span className="text-white/50 text-xs font-rajdhani flex-shrink-0">{tier.name}</span>
                  <input
                    type="text" value={tier.price}
                    onChange={(e) => updatePrice(si, ti, e.target.value)}
                    className="w-28 bg-[#0d0d0d] border border-white/10 hover:border-[#8B00FF]/50 focus:border-[#8B00FF] text-[#FF1493] font-orbitron font-bold text-sm px-3 py-1.5 rounded-lg outline-none transition-all text-right"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// SECTION: Drops Manager
// ══════════════════════════════════════════════════════════════════════════
function DropsSection() {
  const [drops, setDrops] = useLocalStore<Drop[]>("ba_drops", DEFAULT_DROPS);
  const [showForm, setShowForm] = useState(false);
  const [newDrop, setNewDrop] = useState<Omit<Drop, "id" | "active">>({ emoji: "🔒", title: "", type: "", price: "" });

  const toggle = (id: string) =>
    setDrops(drops.map((d) => d.id === id ? { ...d, active: !d.active } : d));

  const remove = (id: string) => setDrops(drops.filter((d) => d.id !== id));

  const addDrop = () => {
    if (!newDrop.title) return;
    setDrops([...drops, { ...newDrop, id: Date.now().toString(), active: true }]);
    setNewDrop({ emoji: "🔒", title: "", type: "", price: "" });
    setShowForm(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-rajdhani font-bold text-white text-xs tracking-widest uppercase">Content Drops</h3>
        <button onClick={() => setShowForm(!showForm)}
          className="bg-[#8B00FF] hover:bg-[#7a00e6] text-white px-4 py-2 rounded-xl font-rajdhani font-bold text-xs tracking-wider transition-all">
          {showForm ? "✕ Cancel" : "+ New Drop"}
        </button>
      </div>

      {/* Add drop form */}
      {showForm && (
        <div className="gradient-border-card rounded-2xl p-5 space-y-3">
          <h4 className="font-rajdhani font-bold text-white text-sm mb-1">New Drop</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#00FFFF] text-[10px] font-rajdhani font-bold tracking-widest uppercase mb-1.5">Emoji</label>
              <input type="text" value={newDrop.emoji} onChange={(e) => setNewDrop({ ...newDrop, emoji: e.target.value })}
                className="w-full bg-[#0d0d0d] border border-white/10 focus:border-[#8B00FF] text-white px-3 py-2 rounded-lg font-inter text-sm outline-none" />
            </div>
            <div>
              <label className="block text-[#00FFFF] text-[10px] font-rajdhani font-bold tracking-widest uppercase mb-1.5">Price</label>
              <input type="text" placeholder="$15" value={newDrop.price} onChange={(e) => setNewDrop({ ...newDrop, price: e.target.value })}
                className="w-full bg-[#0d0d0d] border border-white/10 focus:border-[#8B00FF] text-white px-3 py-2 rounded-lg font-inter text-sm outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-[#00FFFF] text-[10px] font-rajdhani font-bold tracking-widest uppercase mb-1.5">Title</label>
            <input type="text" placeholder="Drop title..." value={newDrop.title} onChange={(e) => setNewDrop({ ...newDrop, title: e.target.value })}
              className="w-full bg-[#0d0d0d] border border-white/10 focus:border-[#8B00FF] text-white px-3 py-2 rounded-lg font-inter text-sm outline-none" />
          </div>
          <div>
            <label className="block text-[#00FFFF] text-[10px] font-rajdhani font-bold tracking-widest uppercase mb-1.5">Type</label>
            <input type="text" placeholder="Story Pack, Photo Set, etc." value={newDrop.type} onChange={(e) => setNewDrop({ ...newDrop, type: e.target.value })}
              className="w-full bg-[#0d0d0d] border border-white/10 focus:border-[#8B00FF] text-white px-3 py-2 rounded-lg font-inter text-sm outline-none" />
          </div>
          <button onClick={addDrop} className="w-full bg-gradient-to-r from-[#8B00FF] to-[#FF1493] text-white py-3 rounded-xl font-rajdhani font-bold text-sm tracking-wider transition-all hover:scale-[1.02]">
            ✓ Add Drop
          </button>
        </div>
      )}

      {/* Drops list */}
      <div className="gradient-border-card rounded-2xl overflow-hidden">
        <div className="divide-y divide-white/5">
          {drops.map((drop) => (
            <div key={drop.id} className="flex items-center gap-4 px-5 py-4 hover:bg-[#8B00FF]/5 transition-all">
              <span className="text-2xl flex-shrink-0">{drop.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="text-white font-rajdhani font-semibold text-sm">{drop.title}</div>
                <div className="text-white/30 text-xs font-inter">{drop.type}</div>
              </div>
              <span className="text-[#FFD700] font-orbitron font-bold text-sm flex-shrink-0">{drop.price}</span>
              {/* Active toggle */}
              <button onClick={() => toggle(drop.id)}
                className={`relative w-10 h-5 rounded-full transition-all flex-shrink-0 ${drop.active ? "bg-[#00FF00]" : "bg-white/15"}`}>
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${drop.active ? "left-5" : "left-0.5"}`} />
              </button>
              <button onClick={() => remove(drop.id)} className="text-[#FF4444]/40 hover:text-[#FF4444] text-xs transition-colors flex-shrink-0">✕</button>
            </div>
          ))}
        </div>
      </div>
      <p className="text-white/20 text-[10px] font-inter">Active drops shown on site. Wire to Supabase 'drops' table + GallerySection for live updates.</p>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// SECTION: Leads
// ══════════════════════════════════════════════════════════════════════════
function LeadsSection() {
  const [leads, setLeads] = useState(MOCK_LEADS);
  const markRead = (id: number) => setLeads(leads.map((l) => l.id === id ? { ...l, status: "read" } : l));

  return (
    <div className="space-y-4">
      <p className="text-white/30 text-xs font-rajdhani">Submitted request forms appear here. Wire RequestForm → Supabase 'leads' table to receive real submissions.</p>
      <div className="gradient-border-card rounded-2xl overflow-hidden">
        <div className="divide-y divide-white/5">
          {leads.map((lead) => (
            <div key={lead.id} className={`flex items-center gap-4 px-5 py-4 transition-all ${lead.status === "new" ? "bg-[#8B00FF]/5" : ""}`}>
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${lead.status === "new" ? "bg-[#FF1493] animate-pulse" : "bg-white/15"}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-white font-rajdhani font-bold text-sm">{lead.handle}</span>
                  {lead.status === "new" && <span className="text-[10px] bg-[#FF1493]/20 border border-[#FF1493]/30 text-[#FF1493] px-2 py-0.5 rounded-full font-rajdhani font-bold">NEW</span>}
                </div>
                <div className="text-white/40 text-xs font-inter">{lead.type} · {lead.length}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-white/30 text-[10px] font-inter">{lead.date}</div>
                {lead.status === "new" && (
                  <button onClick={() => markRead(lead.id)} className="text-[#8B00FF] text-[10px] font-rajdhani hover:text-white transition-colors mt-1">
                    Mark read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// ADMIN LOGIN FORM (standalone — shown when not authenticated)
// ══════════════════════════════════════════════════════════════════════════
function AdminLoginForm() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await signIn(email, password);
    if (error) setError(error);
    setLoading(false);
    // After signIn, AuthContext updates → page re-renders with user → admin check runs
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#8B00FF]/6 rounded-full blur-[100px] pointer-events-none" />
      <div className="w-full max-w-sm relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-1 mb-3">
            <span className="font-orbitron font-black text-xl shimmer-text">BLONDIE</span>
            <span className="font-orbitron font-black text-xl text-[#FF1493]" style={{ textShadow: "0 0 12px #FF1493" }}>ANGEL</span>
          </Link>
          <p className="text-white/30 text-[10px] font-rajdhani tracking-[0.25em] uppercase">Admin Portal · Authorized Only</p>
        </div>

        <div className="gradient-border-card rounded-3xl p-7" style={{ boxShadow: "0 0 50px #8B00FF15" }}>
          <div className="text-center mb-6">
            <span className="text-5xl block mb-3">🔐</span>
            <h1 className="font-orbitron font-black text-white text-lg">Admin Access</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#00FFFF] text-[10px] font-rajdhani font-bold tracking-widest uppercase mb-2">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@blondieangel.com"
                className="w-full bg-[#0d0d0d] border border-white/10 hover:border-[#8B00FF]/50 focus:border-[#8B00FF] text-white placeholder-white/25 px-4 py-3 rounded-xl font-inter text-sm outline-none transition-all" />
            </div>
            <div>
              <label className="block text-[#00FFFF] text-[10px] font-rajdhani font-bold tracking-widest uppercase mb-2">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                className="w-full bg-[#0d0d0d] border border-white/10 hover:border-[#8B00FF]/50 focus:border-[#8B00FF] text-white placeholder-white/25 px-4 py-3 rounded-xl font-inter text-sm outline-none transition-all" />
            </div>
            {error && <div className="bg-[#FF4444]/10 border border-[#FF4444]/30 text-[#FF4444] rounded-xl px-4 py-3 text-xs font-rajdhani">⚠ {error}</div>}
            <button type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-[#8B00FF] to-[#FF1493] text-white py-4 rounded-xl font-rajdhani font-black tracking-widest text-sm transition-all hover:scale-[1.02] disabled:opacity-60 neon-border-purple">
              {loading ? "⚡ Authenticating..." : "🔐 Enter Admin Panel"}
            </button>
          </form>
          <p className="text-center mt-5"><Link to="/" className="text-white/20 hover:text-[#8B00FF] text-xs font-rajdhani transition-colors">← Back to site</Link></p>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// MAIN EXPORT — AdminPage
// ══════════════════════════════════════════════════════════════════════════
export default function AdminPage() {
  const { user, loading, signOut } = useAuth();
  const [section, setSection] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [onlineStatus] = useLocalStore("ba_online", true);

  const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL ?? "").trim().toLowerCase();
  const isAdmin = !ADMIN_EMAIL || user?.email?.trim().toLowerCase() === ADMIN_EMAIL;

  // Loading spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <span className="font-orbitron text-[#8B00FF] text-xs tracking-widest animate-pulse">LOADING...</span>
      </div>
    );
  }

  // Not logged in → show admin-specific login form
  if (!user) return <AdminLoginForm />;

  // Logged in but not admin email
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center gap-6 p-4">
        <span className="text-6xl">🚫</span>
        <h1 className="font-orbitron font-black text-white text-xl">Not Authorized</h1>
        <p className="text-white/40 font-rajdhani text-sm">Your account doesn't have admin access.</p>
        <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-left space-y-1.5 max-w-sm w-full">
          <p className="text-white/30 font-mono text-xs">signed in as: <span className="text-[#00FFFF]">{user.email}</span></p>
          <p className="text-white/30 font-mono text-xs">admin email set to: <span className="text-[#FFD700]">{ADMIN_EMAIL || "(not set — any user gets access)"}</span></p>
        </div>
        <div className="flex gap-3">
          <Link to="/" className="px-6 py-3 bg-[#8B00FF] text-white rounded-full font-rajdhani font-bold text-sm tracking-wider">Back to Site</Link>
          <button onClick={() => signOut().then(() => window.location.reload())} className="px-6 py-3 border border-white/15 text-white/50 rounded-full font-rajdhani font-bold text-sm tracking-wider hover:border-white/30 transition-all">Sign Out</button>
        </div>
      </div>
    );
  }

  // ── Authenticated admin dashboard ──────────────────────────────────────
  const SECTION_COMPONENTS: Record<string, React.ReactNode> = {
    overview: <OverviewSection isOnline={onlineStatus} />,
    status: <StatusSection />,
    schedule: <ScheduleSection />,
    pricing: <PricingSection />,
    drops: <DropsSection />,
    leads: <LeadsSection />,
  };

  const activeNav = NAV_ITEMS.find((n) => n.id === section);

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#8B00FF]/4 rounded-full blur-[120px] pointer-events-none" />

      {/* ── SIDEBAR (desktop) ── */}
      <aside className="hidden lg:flex flex-col w-56 flex-shrink-0 bg-[#080808] border-r border-[#8B00FF]/15 min-h-screen sticky top-0 z-20">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-[#8B00FF]/15">
          <Link to="/" className="flex items-center gap-1 mb-0.5">
            <span className="font-orbitron font-black text-base shimmer-text">BLONDIE</span>
            <span className="font-orbitron font-black text-base text-[#FF1493]" style={{ textShadow: "0 0 10px #FF1493" }}>ANGEL</span>
          </Link>
          <span className="text-white/25 text-[9px] font-rajdhani tracking-widest">ADMIN PANEL</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                section === item.id
                  ? "bg-[#8B00FF]/15 border border-[#8B00FF]/30 text-white"
                  : "text-white/35 hover:text-white/70 hover:bg-white/4"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span className="font-rajdhani font-semibold text-sm tracking-wide">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="px-4 py-4 border-t border-[#8B00FF]/15 space-y-2">
          <div className="text-white/25 text-[10px] font-inter truncate">{user.email}</div>
          <button onClick={() => signOut()} className="w-full text-left text-[#FF1493]/50 hover:text-[#FF1493] text-xs font-rajdhani transition-colors">
            Sign Out ↩
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-[#0A0A0A]/95 backdrop-blur border-b border-[#8B00FF]/15 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button className="lg:hidden text-white/50 hover:text-white text-xl" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
            <div>
              <h1 className="font-orbitron font-bold text-white text-sm">{activeNav?.label}</h1>
              <p className="text-white/25 text-[10px] font-rajdhani">Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-1.5 text-[10px] font-rajdhani font-bold tracking-widest ${onlineStatus ? "text-[#00FF00]" : "text-[#FF4444]"}`}>
              <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${onlineStatus ? "bg-[#00FF00]" : "bg-[#FF4444]"}`} />
              {onlineStatus ? "ONLINE" : "OFFLINE"}
            </div>
            <Link to="/" className="hidden sm:block text-white/25 hover:text-white text-xs font-rajdhani transition-colors">← Site</Link>
            <button onClick={() => signOut()} className="lg:hidden text-[#FF1493]/50 hover:text-[#FF1493] text-xs font-rajdhani transition-colors">Out ↩</button>
          </div>
        </header>

        {/* Mobile nav drawer */}
        {menuOpen && (
          <div className="lg:hidden bg-[#080808] border-b border-[#8B00FF]/15 px-4 py-3 grid grid-cols-3 gap-2">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => { setSection(item.id); setMenuOpen(false); }}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl text-center transition-all text-xs font-rajdhani font-semibold ${
                  section === item.id ? "bg-[#8B00FF]/15 text-white border border-[#8B00FF]/30" : "text-white/35 hover:text-white/60"
                }`}>
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* Section content */}
        <main className="flex-1 p-5 md:p-7 overflow-auto">
          {SECTION_COMPONENTS[section]}
        </main>
      </div>
    </div>
  );
}
