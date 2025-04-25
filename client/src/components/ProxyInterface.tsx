import { useState, useRef, FormEvent } from "react";

export default function ProxyInterface() {
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate URL format
    if (!url) {
      setError("Please enter a URL to browse");
      return;
    }

    // Make sure URL has http:// or https:// prefix
    let processedUrl = url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      processedUrl = "https://" + url;
    }

    try {
      // For demo purposes, we're displaying the website in an iframe
      // In a real proxy service, this would be a server-side request that handles the connection
      setLoading(true);
      
      // Simulate processing time
      setTimeout(() => {
        if (iframeRef.current) {
          try {
            iframeRef.current.src = processedUrl;
          } catch (err) {
            setError("Unable to access the requested website");
          }
        }
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError("Failed to connect to the proxy service");
      setLoading(false);
    }
  };

  return (
    <div className="glass rounded-2xl p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-6 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-space-accent to-space-highlight">
          NightProxy Browser
        </span>
      </h2>

      <form ref={formRef} onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <i className="fas fa-globe text-gray-400"></i>
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL (e.g., google.com)"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-space-dark/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-space-accent"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-space-accent to-space-highlight px-6 py-3 rounded-lg font-poppins font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? (
              <i className="fas fa-circle-notch fa-spin mr-2"></i>
            ) : (
              <i className="fas fa-rocket mr-2"></i>
            )}
            {loading ? "Connecting..." : "Browse"}
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-white p-3 rounded-lg mb-6">
          <i className="fas fa-exclamation-triangle mr-2"></i> {error}
        </div>
      )}

      <div className="w-full h-[60vh] bg-space-dark/30 rounded-lg overflow-hidden border border-white/10">
        {loading ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-space-accent border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-300">Establishing secure connection...</p>
          </div>
        ) : !url ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
            <div className="text-5xl text-space-accent mb-6">
              <i className="fas fa-globe"></i>
            </div>
            <h3 className="text-xl font-poppins font-semibold mb-2">
              Enter a URL to begin browsing
            </h3>
            <p className="text-gray-400 max-w-lg">
              NightProxy allows you to browse the web freely and securely.
              Simply enter a URL above to get started.
            </p>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            className="w-full h-full border-none"
            title="Proxy Browser"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          ></iframe>
        )}
      </div>

      <div className="mt-4 text-center text-sm text-gray-400">
        <p>
          <i className="fas fa-shield-alt mr-1"></i> Your connection is secure
          and private
        </p>
      </div>
    </div>
  );
}