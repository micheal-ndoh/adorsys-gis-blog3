import Link from "next/link";

export default async function Home() {
  return (
    <div className="relative">
      {/* Background layer */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><radialGradient id="bg" cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stop-color="%230f172a"/><stop offset="100%" stop-color="%2303121f"/></radialGradient><linearGradient id="grid" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%230ea5e9" stop-opacity="0.1"/><stop offset="100%" stop-color="%238b5cf6" stop-opacity="0.1"/></linearGradient><pattern id="hex" width="60" height="52" patternUnits="userSpaceOnUse"><path d="M30 0l30 26v26L30 78 0 52V26L30 0z" fill="none" stroke="%230ea5e9" stroke-width="1" opacity="0.2"/></pattern><pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="%230ea5e9" opacity="0.3"/></pattern></defs><rect width="1200" height="800" fill="url(%23bg)"/><rect width="1200" height="800" fill="url(%23grid)"/><rect width="1200" height="800" fill="url(%23hex)"/><rect width="1200" height="800" fill="url(%23dots)"/><circle cx="200" cy="150" r="100" fill="%230ea5e9" opacity="0.05"/><circle cx="1000" cy="600" r="150" fill="%238b5cf6" opacity="0.05"/><polygon points="300,400 400,300 500,400 400,500" fill="%2310b981" opacity="0.05"/><path d="M100 700 Q300 600 500 700 T900 700" stroke="%230ea5e9" stroke-width="2" fill="none" opacity="0.1"/><path d="M150 100 Q350 200 550 100 T950 100" stroke="%238b5cf6" stroke-width="2" fill="none" opacity="0.1"/></svg>')`,
          }}
        />
      </div>

      {/* Foreground wrapper - restructured to match console layout */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto p-4 relative z-10 ml-0 md:ml-24">
          <div className="flex flex-col lg:flex-row items-center min-h-[calc(100vh-120px)] gap-16">
            {/* Left: Heading and CTA */}
            <div className="flex-1 text-center lg:text-left md:ml-8 lg:ml-12">
              <div className="mb-12">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white/90 leading-tight tracking-tight">
                  <span className="block bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">Knowledge Hub</span>
                </h1>
                <div className="w-32 h-1.5 bg-gradient-to-r from-[#0ea5e9] to-[#8b5cf6] rounded-full mx-auto lg:mx-0 mb-10"></div>
                <h2 className="text-2xl md:text-3xl text-white/90 mb-6 font-semibold leading-relaxed">Your Gateway to Professional Excellence</h2>
                <p className="text-lg md:text-xl text-white/70 mb-8 max-w-3xl leading-relaxed font-light mx-auto lg:mx-0">
                  Embark on a transformative learning journey with our curated courses and resources designed to elevate your skills.
                </p>
              </div>

              {/* Feature bullets */}
              <div className="flex flex-wrap gap-6 mb-12 text-white/80">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#0ea5e9] rounded-full" />
                  <span className="text-sm font-medium">Expert-Led Content</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#8b5cf6] rounded-full" />
                  <span className="text-sm font-medium">Interactive Learning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#10b981] rounded-full" />
                  <span className="text-sm font-medium">Practical Skills</span>
                </div>
              </div>
            </div>

            {/* Right: Image card, overlay info card, and bottom image card (unchanged) */}
            <div className="flex-1 max-w-lg hidden md:flex flex-col">
              {/* Top image-like glass card */}
              <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-xl p-3 md:p-4 shadow-xl">
                <div
                  className="aspect-video rounded-xl bg-cover bg-center shadow-inner"
                  style={{
                    backgroundImage: "url('https://st2.depositphotos.com/3591429/6301/i/950/depositphotos_63016959-stock-photo-man-working-on-a-computer.jpg')",
                  }}
                  aria-label="illustrative image"
                />
              </div>

              {/* Transparent info card overlapping below the first */}
              <div className="-mt-8 self-end w-full max-w-md rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-5 shadow-xl">
                <div className="flex items-center gap-3 text-white/90">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                  <span className="text-sm">Live Session</span>
                </div>
                <div className="mt-2 text-3xl font-semibold text-white/90">2.5k+</div>
                <div className="text-xs text-white/70">Active Learners</div>
                <div className="mt-3 flex items-center gap-2 text-white/70 text-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0ea5e9]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6]" />
                  <span>Global Community</span>
                </div>
              </div>

              {/* Bottom image-like glass card */}
              <div className="mt-6 rounded-2xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-xl p-3 md:p-4 shadow-xl">
                <div
                  className="aspect-video rounded-xl bg-cover bg-center shadow-inner"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
                  }}
                  aria-label="illustrative image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
