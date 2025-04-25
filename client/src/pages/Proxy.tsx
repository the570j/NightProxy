import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ProxyInterface from "@/components/ProxyInterface";

export default function Proxy() {
  return (
    <>
      <NavBar />
      <main className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 relative">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-space-accent/20 rounded-full blur-3xl opacity-30 -z-10"></div>
            
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-space-accent/30 to-space-highlight/30 blur-xl animate-pulse-slow"></div>
              <div className="text-6xl text-space-accent mb-4 animate-float relative">
                <i className="fas fa-satellite-dish"></i>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold font-poppins leading-tight mb-4 relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-space-accent via-purple-400 to-space-highlight">
                NightProxy
              </span>{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Space</span>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-space-accent to-space-highlight"></div>
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-4">
              Browse the internet securely and without restrictions
            </p>
            
            <div className="flex gap-3 items-center justify-center">
              <div className="px-3 py-1 bg-black/30 rounded-full text-sm flex items-center border border-white/5">
                <i className="fas fa-shield-alt text-green-400 mr-2"></i>
                <span>Secure Proxy</span>
              </div>
              <div className="px-3 py-1 bg-black/30 rounded-full text-sm flex items-center border border-white/5">
                <i className="fas fa-bolt text-blue-400 mr-2"></i>
                <span>Fast Connection</span>
              </div>
              <div className="px-3 py-1 bg-black/30 rounded-full text-sm flex items-center border border-white/5">
                <i className="fas fa-mask text-purple-400 mr-2"></i>
                <span>Anonymous Browsing</span>
              </div>
            </div>
          </div>
          
          <ProxyInterface />
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-poppins font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-space-accent to-space-highlight inline-block">
              How to Use NightProxy
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="glass p-6 rounded-xl border border-white/5 shadow-lg hover:shadow-space-accent/20 transition-shadow group relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-12 h-12 bg-space-accent/10 rounded-full blur-xl group-hover:bg-space-accent/20 transition-all"></div>
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-space-accent/20 to-space-highlight/20 flex items-center justify-center mb-4 mx-auto">
                    <i className="fas fa-keyboard text-3xl text-space-accent group-hover:text-space-highlight transition-colors"></i>
                  </div>
                  <h4 className="text-xl font-medium mb-2 group-hover:text-space-accent transition-colors">Step 1</h4>
                  <p className="text-gray-300">
                    Enter the website URL you want to visit in the address bar above, or use one of our quick access buttons.
                  </p>
                </div>
              </div>
              
              <div className="glass p-6 rounded-xl border border-white/5 shadow-lg hover:shadow-purple-500/20 transition-shadow group relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-12 h-12 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all"></div>
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center mb-4 mx-auto">
                    <i className="fas fa-rocket text-3xl text-purple-500 group-hover:text-purple-400 transition-colors"></i>
                  </div>
                  <h4 className="text-xl font-medium mb-2 group-hover:text-purple-400 transition-colors">Step 2</h4>
                  <p className="text-gray-300">
                    Click the Browse button to establish a secure connection through our advanced proxy system.
                  </p>
                </div>
              </div>
              
              <div className="glass p-6 rounded-xl border border-white/5 shadow-lg hover:shadow-blue-500/20 transition-shadow group relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-12 h-12 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all"></div>
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-sky-500/20 flex items-center justify-center mb-4 mx-auto">
                    <i className="fas fa-globe text-3xl text-blue-500 group-hover:text-blue-400 transition-colors"></i>
                  </div>
                  <h4 className="text-xl font-medium mb-2 group-hover:text-blue-400 transition-colors">Step 3</h4>
                  <p className="text-gray-300">
                    Browse freely with enhanced privacy and no restrictions. Use fullscreen mode for a better experience.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 max-w-2xl mx-auto glass p-5 rounded-xl border border-space-accent/20">
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-lg bg-space-accent/20 mr-3">
                  <i className="fas fa-shield-alt text-space-accent"></i>
                </div>
                <h4 className="text-lg font-medium">Privacy & Security</h4>
              </div>
              <p className="text-gray-300 text-sm">
                NightProxy is designed to help you maintain your privacy while browsing. 
                Your connection is encrypted and your browsing activity cannot be tracked by third parties. 
                For optimal security, we recommend using the fullscreen mode or opening sites in a new tab.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}