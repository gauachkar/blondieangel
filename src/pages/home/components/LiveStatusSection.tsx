import { useState } from "react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const AVAILABILITY: Record<string, { status: "available" | "busy" | "vip"; label: string }[]> = {
  Mon: [
    { status: "available", label: "2PM–6PM" },
    { status: "vip", label: "8PM–11PM" },
  ],
  Tue: [
    { status: "busy", label: "All Day" },
  ],
  Wed: [
    { status: "available", label: "3PM–10PM" },
  ],
  Thu: [
    { status: "available", label: "1PM–5PM" },
    { status: "vip", label: "9PM–Midnight" },
  ],
  Fri: [
    { status: "available", label: "5PM–11PM" },
  ],
  Sat: [
    { status: "vip", label: "All Day VIP" },
  ],
  Sun: [
    { status: "available", label: "12PM–8PM" },
  ],
};

const STATUS_COLORS = {
  available: { bg: "bg-[#00FF00]/15", border: "border-[#00FF00]/40", text: "text-[#00FF00]", dot: "bg-[#00FF00]" },
  busy: { bg: "bg-[#FF4444]/10", border: "border-[#FF4444]/30", text: "text-[#FF4444]", dot: "bg-[#FF4444]" },
  vip: { bg: "bg-[#8B00FF]/15", border: "border-[#8B00FF]/40", text: "text-[#8B00FF]", dot: "bg-[#8B00FF]" },
};

export default function LiveStatusSection() {
  const [today] = useState(() => DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]);

  return (
    <section id="status" className="relative w-full bg-[#0A0A0A] py-20 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#8B00FF]/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-[#00FFFF] text-xs font-rajdhani font-bold tracking-widest uppercase mb-4">
            <div className="h-px w-8 bg-[#00FFFF]" />
            Live Status
            <div className="h-px w-8 bg-[#00FFFF]" />
          </div>
          <h2 className="font-orbitron font-black text-3xl md:text-4xl text-white mb-3 glitch-text">
            When I'm <span className="neon-text-cyan">Available</span>
          </h2>
          <p className="text-white/40 font-rajdhani text-lg">All times Arizona MST · Text sessions, custom content & drops</p>
        </div>

        {/* Current status banner */}
        <div className="mb-10 gradient-border-card p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#8B00FF] to-[#FF1493] flex items-center justify-center text-2xl">
              <span>👾</span>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#00FF00] rounded-full border-2 border-[#0A0A0A] animate-pulse" />
            </div>
            <div>
              <div className="font-orbitron font-bold text-white text-lg">Blondie is ONLINE</div>
              <div className="text-[#00FF00] text-sm font-rajdhani font-semibold">● Open for bookings — don't make her wait</div>
            </div>
          </div>
          <div className="flex gap-3">
            <a href="#menu" className="bg-[#8B00FF] hover:bg-[#7a00e6] text-white px-6 py-3 rounded-full font-rajdhani font-bold text-sm tracking-wider transition-all hover:scale-105 neon-border-purple">
              Book Now
            </a>
            <a href="#vip" className="bg-transparent border border-[#00FFFF]/40 hover:border-[#00FFFF] text-[#00FFFF] px-6 py-3 rounded-full font-rajdhani font-bold text-sm tracking-wider transition-all">
              VIP Access
            </a>
          </div>
        </div>

        {/* Weekly calendar */}
        <div className="grid grid-cols-7 gap-2 md:gap-3">
          {DAYS.map((day) => {
            const slots = AVAILABILITY[day] ?? [];
            const isToday = day === today;
            return (
              <div
                key={day}
                className={`rounded-2xl p-3 md:p-4 border transition-all duration-300 ${
                  isToday
                    ? "bg-[#8B00FF]/15 border-[#8B00FF]/60 neon-border-purple"
                    : "bg-[#111]/60 border-white/5 hover:border-[#8B00FF]/30"
                }`}
              >
                <div className={`font-orbitron font-bold text-xs md:text-sm text-center mb-3 ${isToday ? "text-[#00FFFF]" : "text-white/50"}`}>
                  {day}
                  {isToday && <div className="text-[8px] text-[#FF1493] mt-0.5 tracking-widest">TODAY</div>}
                </div>
                <div className="space-y-1.5">
                  {slots.map((slot, i) => {
                    const c = STATUS_COLORS[slot.status];
                    return (
                      <div key={i} className={`${c.bg} ${c.border} border rounded-lg p-1.5`}>
                        <div className="flex items-center gap-1 mb-0.5">
                          <span className={`w-1.5 h-1.5 ${c.dot} rounded-full animate-pulse flex-shrink-0`} />
                          <span className={`${c.text} text-[9px] md:text-[10px] font-rajdhani font-bold uppercase tracking-wider`}>
                            {slot.status === "vip" ? "VIP" : slot.status}
                          </span>
                        </div>
                        <div className="text-white/50 text-[8px] md:text-[9px] font-inter leading-tight">{slot.label}</div>
                      </div>
                    );
                  })}
                  {slots.length === 0 && (
                    <div className="text-white/20 text-[9px] font-rajdhani text-center py-2">–</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
          {[
            { color: "bg-[#00FF00]", label: "Available" },
            { color: "bg-[#8B00FF]", label: "VIP Only" },
            { color: "bg-[#FF4444]", label: "Busy" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-2">
              <span className={`w-3 h-3 ${l.color} rounded-full`} />
              <span className="text-white/40 text-xs font-rajdhani tracking-wider">{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
