export default function Footer() {
  return (
    <footer className="py-10 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-space-accent mr-2">
                <i className="fas fa-rocket"></i>
              </span>
              <span className="text-xl font-bold font-poppins">NightProxy</span>
            </div>
            <p className="text-gray-400 text-sm">
              Breaking barriers in the digital universe since 2023.
            </p>
            <div className="mt-4 flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-space-accent transition-colors"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-space-accent transition-colors"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-space-accent transition-colors"
              >
                <i className="fab fa-discord"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold font-poppins mb-4">Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="#features"
                  className="hover:text-space-accent transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-space-accent transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#support"
                  className="hover:text-space-accent transition-colors"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="#proxy"
                  className="hover:text-space-accent transition-colors"
                >
                  Launch Proxy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold font-poppins mb-4">
              Resources
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-space-accent transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-space-accent transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-space-accent transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-space-accent transition-colors">
                  Status
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold font-poppins mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-2 text-space-accent"></i>
                <span>support@nightproxy.com</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-clock mt-1 mr-2 text-space-accent"></i>
                <span>24/7 Support Available</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; 2023 NightProxy. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Designed with <i className="fas fa-heart text-space-accent"></i> for
            the digital explorers
          </p>
        </div>
      </div>
    </footer>
  );
}
