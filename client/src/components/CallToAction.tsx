export default function CallToAction() {
  return (
    <section id="proxy" className="py-16 md:py-24 relative">
      <div className="container mx-auto px-6">
        <div className="glass rounded-2xl p-8 md:p-12 overflow-hidden relative">
          {/* Background gradient effect */}
          <div className="absolute -inset-20 bg-gradient-to-r from-space-accent/20 to-space-highlight/20 blur-3xl opacity-50 animate-pulse-slow"></div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins mb-6">
              Ready to{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-space-accent to-space-highlight">
                Explore
              </span>{" "}
              Without Limits?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Launch NightProxy and start experiencing the internet as it was
              meant to be—free, secure, and accessible from anywhere in the
              digital universe.
            </p>
            <a
              href="https://github.com/NightProxy/Space"
              className="inline-block bg-gradient-to-r from-space-accent to-space-highlight px-8 py-4 rounded-lg font-poppins font-medium text-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              <i className="fas fa-rocket mr-2"></i> Launch Proxy Now
            </a>
            <p className="mt-4 text-sm text-gray-400">
              No registration required. Instant access to the universe of
              content.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
