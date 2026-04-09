const ctaLinks = [
  {
    label: "Subscribe on OnlyFans",
    icon: "ri-heart-fill",
    bg: "#FF1493",
    textColor: "#fff",
    url: "https://onlyfans.com",
  },
  {
    label: "Explore FeetFinder",
    icon: "ri-footprint-line",
    bg: "#FF6B35",
    textColor: "#fff",
    url: "https://feetfinder.com",
  },
  {
    label: "Text Me on SextPanther",
    icon: "ri-message-3-fill",
    bg: "#9B59B6",
    textColor: "#fff",
    url: "https://sextpanther.com",
  },
  {
    label: "Join Fansly Exclusives",
    icon: "ri-star-fill",
    bg: "#D4AF37",
    textColor: "#000",
    url: "https://fansly.com",
  },
];

export default function CTASection() {
  return (
    <section id="cta" className="relative w-full min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://readdy.ai/api/search-image?query=stunning%20beautiful%2019%20year%20old%20blonde%20american%20girl%20with%20long%20wavy%20golden%20hair%20bright%20blue%20eyes%20gorgeous%20hourglass%20figure%20lying%20on%20dark%20luxury%20bed%20seductive%20confident%20expression%20showing%20beautiful%20bare%20feet%20legs%20cinematic%20moody%20deep%20pink%20magenta%20purple%20lighting%20dark%20dramatic%20background%20high%20fashion%20editorial%20photography%20glamour%20luxury%20aesthetic%20wide%20angle&width=1920&height=1080&seq=cta001&orientation=landscape"
          alt="Sophie CTA"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#FF1493]/20 border border-[#FF1493]/40 text-[#FF1493] text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-[#FF1493] rounded-full animate-pulse" />
            </span>
            Ready to Connect?
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Ready to Have a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF1493] via-[#DC143C] to-[#D4AF37]">
              Hot 19yo ASU Blonde
            </span>{" "}
            Fulfill Your Fantasies?
          </h2>

          {/* Sub-headline */}
          <p className="text-white/60 text-lg font-light leading-relaxed mb-10">
            From soft foot worship to your wildest adult video requests — I&apos;ve got you. 
            Whatever you crave, I deliver. No judgment, just pure fantasy.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            {ctaLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="group flex items-center justify-center gap-3 px-7 py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 hover:scale-105 hover:opacity-90 whitespace-nowrap cursor-pointer"
                style={{ backgroundColor: link.bg, color: link.textColor }}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className={`${link.icon}`} />
                </div>
                {link.label}
              </a>
            ))}
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-white/10">
            {[
              { icon: "ri-shield-check-line", text: "100% Authentic" },
              { icon: "ri-lock-line", text: "Discreet & Private" },
              { icon: "ri-time-line", text: "Fast Delivery" },
              { icon: "ri-customer-service-line", text: "Always Responsive" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                <div className="w-4 h-4 flex items-center justify-center text-[#D4AF37]">
                  <i className={`${item.icon} text-sm`} />
                </div>
                <span className="text-white/50 text-xs font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
