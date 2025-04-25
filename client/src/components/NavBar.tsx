import { useState } from "react";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50">
      <nav className="glass px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold font-poppins text-white flex items-center hover:opacity-80 transition-opacity">
              <span className="text-space-accent mr-2">
                <i className="fas fa-rocket"></i>
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-space-accent to-space-highlight">
                NightProxy
              </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="font-poppins font-medium hover:text-space-accent transition-colors"
            >
              Features
            </a>
            <a
              href="#about"
              className="font-poppins font-medium hover:text-space-accent transition-colors"
            >
              About
            </a>
            <a
              href="#support"
              className="font-poppins font-medium hover:text-space-accent transition-colors"
            >
              Support
            </a>
            <a
              href="/proxy"
              className="bg-gradient-to-r from-space-accent to-space-highlight px-5 py-2 rounded-lg font-poppins font-medium hover:opacity-90 transition-opacity shadow-lg"
            >
              Launch Proxy
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
            >
              <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${
            isMobileMenuOpen ? "" : "hidden"
          } py-4 px-6 mt-2 glass rounded-lg`}
        >
          <div className="flex flex-col space-y-4">
            <a
              href="#features"
              className="font-poppins font-medium hover:text-space-accent transition-colors"
              onClick={closeMobileMenu}
            >
              Features
            </a>
            <a
              href="#about"
              className="font-poppins font-medium hover:text-space-accent transition-colors"
              onClick={closeMobileMenu}
            >
              About
            </a>
            <a
              href="#support"
              className="font-poppins font-medium hover:text-space-accent transition-colors"
              onClick={closeMobileMenu}
            >
              Support
            </a>
            <a
              href="/proxy"
              className="bg-gradient-to-r from-space-accent to-space-highlight px-5 py-2 rounded-lg font-poppins font-medium hover:opacity-90 transition-opacity shadow-lg text-center"
              onClick={closeMobileMenu}
            >
              Launch Proxy
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
