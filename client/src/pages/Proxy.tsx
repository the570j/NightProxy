import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ProxyInterface from "@/components/ProxyInterface";

export default function Proxy() {
  return (
    <>
      <NavBar />
      <main className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-poppins leading-tight mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-space-accent to-space-highlight">
                NightProxy
              </span>{" "}
              Space
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Browse the internet securely and without restrictions
            </p>
          </div>
          
          <ProxyInterface />
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-poppins font-semibold mb-4">
              How to use NightProxy
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="glass p-6 rounded-xl">
                <div className="text-3xl text-space-accent mb-4">
                  <i className="fas fa-keyboard"></i>
                </div>
                <h4 className="text-lg font-medium mb-2">Step 1</h4>
                <p className="text-gray-300">
                  Enter the website URL you want to visit in the address bar
                </p>
              </div>
              <div className="glass p-6 rounded-xl">
                <div className="text-3xl text-space-accent mb-4">
                  <i className="fas fa-rocket"></i>
                </div>
                <h4 className="text-lg font-medium mb-2">Step 2</h4>
                <p className="text-gray-300">
                  Click the Browse button to establish a secure connection
                </p>
              </div>
              <div className="glass p-6 rounded-xl">
                <div className="text-3xl text-space-accent mb-4">
                  <i className="fas fa-globe"></i>
                </div>
                <h4 className="text-lg font-medium mb-2">Step 3</h4>
                <p className="text-gray-300">
                  Browse freely with enhanced privacy and no restrictions
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}