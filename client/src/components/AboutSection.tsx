export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-space-accent/20 to-space-highlight/20 rounded-2xl blur-3xl opacity-50 transform -rotate-6"></div>
            <div className="relative glass rounded-2xl overflow-hidden">
              <div className="w-full h-auto md:h-[400px] bg-space-deep relative">
                <svg viewBox="0 0 800 600" className="w-full h-full">
                  <defs>
                    <radialGradient id="nebula" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
                      <stop offset="0%" stopColor="#7B68EE" stopOpacity="0.7" />
                      <stop offset="50%" stopColor="#4E2A84" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#050A30" stopOpacity="0.3" />
                    </radialGradient>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="10" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Background */}
                  <rect x="0" y="0" width="800" height="600" fill="url(#nebula)" />

                  {/* Stars */}
                  {Array.from({length: 100}).map((_, i) => (
                    <circle 
                      key={i}
                      cx={Math.random() * 800}
                      cy={Math.random() * 600}
                      r={Math.random() * 2 + 0.5}
                      fill="white"
                      opacity={Math.random() * 0.8 + 0.2}
                    />
                  ))}

                  {/* Nebula cloud */}
                  <path
                    d="M200,200 Q400,100 600,300 T400,500 Q200,400 200,200"
                    fill="#7B68EE"
                    opacity="0.2"
                    filter="url(#glow)"
                  />
                  <path
                    d="M300,150 Q500,250 600,200 T400,400 Q250,350 300,150"
                    fill="#00B4D8"
                    opacity="0.15"
                    filter="url(#glow)"
                  />

                  {/* Bright stars */}
                  {Array.from({length: 10}).map((_, i) => (
                    <circle 
                      key={i + 'bright'}
                      cx={Math.random() * 800}
                      cy={Math.random() * 600}
                      r={Math.random() * 3 + 2}
                      fill="white"
                      opacity="0.8"
                      filter="url(#glow)"
                    />
                  ))}
                </svg>
              </div>
            </div>
          </div>

          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">
              About{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-space-accent to-space-highlight">
                NightProxy
              </span>
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                NightProxy was born from a vision to create an internet without
                boundaries. We believe that information should be freely
                accessible to everyone, regardless of their location or
                circumstances.
              </p>
              <p>
                Our team of dedicated engineers and security experts work
                tirelessly to maintain a service that is not only powerful and
                efficient but also secure and reliable. We use cutting-edge
                technology to ensure that your browsing experience is both safe
                and seamless.
              </p>
              <p>
                With servers strategically located across the globe, we provide
                consistent, high-speed connections that allow you to navigate
                the digital universe without restrictions or limitations.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="glass rounded-lg p-4">
                <div className="text-2xl font-bold text-space-accent">99.9%</div>
                <div className="text-sm text-gray-400">Uptime</div>
              </div>
              <div className="glass rounded-lg p-4">
                <div className="text-2xl font-bold text-space-highlight">250+</div>
                <div className="text-sm text-gray-400">Servers</div>
              </div>
              <div className="glass rounded-lg p-4">
                <div className="text-2xl font-bold text-space-accent">40+</div>
                <div className="text-sm text-gray-400">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
