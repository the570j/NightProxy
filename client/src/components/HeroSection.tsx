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
                    <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#94A3B8" />
                      <stop offset="50%" stopColor="#CBD5E1" />
                      <stop offset="100%" stopColor="#E2E8F0" />
                    </linearGradient>
                    <radialGradient id="moonShadow" cx="30%" cy="30%" r="70%" fx="30%" fy="30%">
                      <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#64748B" stopOpacity="1" />
                    </radialGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="8" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    
                    {/* Rocket ship flame gradient */}
                    <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FDE68A" />
                      <stop offset="70%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#DC2626" />
                    </linearGradient>
                    
                    {/* Animation for rocket orbit */}
                    <animateTransform
                      id="orbitAnimation"
                      attributeName="transform"
                      type="rotate"
                      from="0 100 100"
                      to="360 100 100"
                      dur="20s"
                      repeatCount="indefinite"
                    />
                  </defs>
                  
                  {/* Moon */}
                  <circle cx="100" cy="100" r="90" fill="url(#moonGradient)" />
                  <circle cx="100" cy="100" r="90" fill="url(#moonShadow)" />
                  
                  {/* Moon craters */}
                  <circle cx="70" cy="60" r="15" fill="#94A3B8" opacity="0.4" />
                  <circle cx="130" cy="90" r="20" fill="#94A3B8" opacity="0.4" />
                  <circle cx="80" cy="130" r="12" fill="#94A3B8" opacity="0.4" />
                  <circle cx="40" cy="100" r="10" fill="#94A3B8" opacity="0.3" />
                  <circle cx="160" cy="60" r="8" fill="#94A3B8" opacity="0.3" />
                  <circle cx="150" cy="140" r="15" fill="#94A3B8" opacity="0.3" />
                  
                  {/* Subtle glow around the moon */}
                  <circle cx="100" cy="100" r="95" fill="none" stroke="#E2E8F0" strokeWidth="2" opacity="0.2" filter="url(#glow)" />
                  
                  {/* Orbital path (slightly visible circle) */}
                  <circle cx="100" cy="100" r="120" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2 3" opacity="0.2" />
                  
                  {/* Rocket Ship Group with animation */}
                  <g>
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 100 100"
                      to="360 100 100"
                      dur="15s"
                      repeatCount="indefinite"
                    />
                    
                    {/* Rocket at orbital position */}
                    <g transform="translate(220, 100) rotate(90)">
                      {/* Rocket body */}
                      <path d="M0,0 L-4,10 L4,10 Z" fill="#F43F5E" />
                      <rect x="-4" y="10" width="8" height="15" fill="#F43F5E" />
                      
                      {/* Rocket windows */}
                      <circle cx="0" cy="15" r="2" fill="#E2E8F0" />
                      
                      {/* Rocket fins */}
                      <path d="M-4,25 L-8,30 L-4,25 Z" fill="#F43F5E" />
                      <path d="M4,25 L8,30 L4,25 Z" fill="#F43F5E" />
                      
                      {/* Rocket flame */}
                      <path d="M-3,25 L0,35 L3,25 Z" fill="url(#flameGradient)">
                        <animate
                          attributeName="d"
                          values="M-3,25 L0,32 L3,25 Z; M-3,25 L0,38 L3,25 Z; M-3,25 L0,32 L3,25 Z"
                          dur="0.5s"
                          repeatCount="indefinite"
                        />
                      </path>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
