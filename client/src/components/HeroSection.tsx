export default function HeroSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins leading-tight">
              <span className="block">Navigate Beyond</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-space-accent to-space-highlight">
                Boundaries
              </span>
            </h1>
            <p className="text-lg mt-6 text-gray-300 max-w-lg">
              Experience the internet without restrictions. NightProxy provides
              secure, fast, and reliable proxy services to help you explore the
              digital universe freely.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#proxy"
                className="bg-gradient-to-r from-space-accent to-space-highlight px-8 py-3 rounded-lg font-poppins font-medium hover:opacity-90 transition-opacity shadow-lg flex items-center"
              >
                <span>Launch Proxy</span>
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
              <a
                href="#features"
                className="px-8 py-3 rounded-lg font-poppins font-medium border border-white/20 hover:bg-white/10 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-gradient-to-br from-space-accent/30 to-space-highlight/30 rounded-full blur-3xl opacity-30"></div>
              <div className="relative z-10 rounded-full w-64 h-64 md:w-80 md:h-80 overflow-hidden border-4 border-white/20 shadow-2xl">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    <linearGradient id="earthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1E40AF" />
                      <stop offset="50%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#60A5FA" />
                    </linearGradient>
                    <radialGradient id="earthShadow" cx="30%" cy="30%" r="70%" fx="30%" fy="30%">
                      <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#1E3A8A" stopOpacity="1" />
                    </radialGradient>
                  </defs>
                  <circle cx="100" cy="100" r="90" fill="url(#earthGradient)" />
                  <circle cx="100" cy="100" r="90" fill="url(#earthShadow)" />
                  
                  {/* Continents */}
                  <path d="M70,40 Q90,30 110,45 T140,60 Q130,90 100,95 T50,85 Q60,60 70,40" fill="#4ADE80" opacity="0.8" />
                  <path d="M130,120 Q150,100 170,130 T150,160 Q120,170 110,150 T130,120" fill="#4ADE80" opacity="0.8" />
                  <path d="M40,100 Q60,90 80,110 T70,140 Q50,150 30,130 T40,100" fill="#4ADE80" opacity="0.8" />
                  
                  {/* Clouds */}
                  <ellipse cx="60" cy="50" rx="20" ry="10" fill="white" opacity="0.5" />
                  <ellipse cx="140" cy="80" rx="25" ry="12" fill="white" opacity="0.5" />
                  <ellipse cx="90" cy="140" rx="18" ry="9" fill="white" opacity="0.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
