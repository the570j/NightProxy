import { useState, useRef, FormEvent, useEffect } from "react";

export default function ProxyInterface() {
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pageContent, setPageContent] = useState<string>("");
  const [pageTitle, setPageTitle] = useState<string>("");
  const [wsConnected, setWsConnected] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  // Connect to WebSocket
  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;
    
    socket.onopen = () => {
      console.log("Connected to WebSocket server");
      setWsConnected(true);
    };
    
    socket.onclose = () => {
      console.log("Disconnected from WebSocket server");
      setWsConnected(false);
    };
    
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.type === 'FETCH_RESPONSE') {
          setLoading(false);
          
          if (data.status >= 200 && data.status < 300) {
            // Extract and set page title
            const titleRegex = /<title>(.*?)<\/title>/i;
            const titleMatch = titleRegex.exec(data.data);
            setPageTitle(titleMatch && titleMatch[1] ? titleMatch[1] : "Webpage");
            
            // Set the content
            setPageContent(data.data);
          } else {
            setError(`Error loading page: Status ${data.status}`);
          }
        } else if (data.type === 'ERROR') {
          setLoading(false);
          setError(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message", error);
      }
    };
    
    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setError("Connection error with proxy server");
    };
    
    return () => {
      socket.close();
    };
  }, []);

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setHasSubmitted(true);

    // Validate URL
    if (!url) {
      setError("Please enter a URL to browse");
      return;
    }

    // Clean and process URL
    let processedUrl = url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      processedUrl = "https://" + url;
    }

    setLoading(true);

    // Use the WebSocket to fetch URL
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({
        type: 'FETCH_URL',
        url: processedUrl
      }));
    } else {
      // Fallback to API if WebSocket is not connected
      fetchWithApi(processedUrl);
    }
  };

  // Fetch URL using the API endpoint
  const fetchWithApi = async (urlToFetch: string) => {
    try {
      const response = await fetch(`/api/proxy?url=${encodeURIComponent(urlToFetch)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to load website");
      }
      
      const data = await response.text();
      
      // Extract page title
      const titleRegex = /<title>(.*?)<\/title>/i;
      const titleMatch = titleRegex.exec(data);
      setPageTitle(titleMatch && titleMatch[1] ? titleMatch[1] : "Webpage");
      
      setPageContent(data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message || "Failed to load website");
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
        ) : pageContent && hasSubmitted ? (
          <div className="w-full h-full overflow-auto">
            <div className="bg-black/30 p-2 flex items-center">
              <div className="flex items-center space-x-2 px-3 py-1 bg-space-deep rounded">
                <i className="fas fa-lock text-green-400 text-xs"></i>
                <span className="text-gray-300 text-sm truncate max-w-[300px]">
                  {url}
                </span>
              </div>
              <div className="ml-4 text-white text-sm">
                {pageTitle}
              </div>
            </div>
            <div 
              ref={contentRef}
              className="p-4 bg-space-deep text-white h-full overflow-auto"
            >
              <div className="proxy-content">
                <div className="proxy-explanation p-4 mb-4 bg-blue-600/20 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2 text-white">About This Proxy</h3>
                  <p className="mb-2 text-gray-300">
                    You're viewing content from <strong>{url}</strong> through our proxy service.
                  </p>
                  <p className="mb-2 text-gray-300">
                    <i className="fas fa-info-circle mr-2 text-blue-400"></i>
                    Modern websites like YouTube use advanced security measures that limit how content can be displayed in a proxy.
                  </p>
                  <p className="text-gray-300">
                    <i className="fas fa-exclamation-triangle mr-2 text-yellow-400"></i>
                    Javascript and interactive features might be limited for security reasons.
                  </p>
                </div>
                
                <iframe 
                  src={`/api/proxy?url=${encodeURIComponent(url.startsWith('http') ? url : `https://${url}`)}`}
                  className="w-full h-[500px] border-0 bg-white rounded-lg"
                  sandbox="allow-same-origin allow-forms"
                  title="Proxied content"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        ) : (
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
        )}
      </div>

      <div className="mt-4 text-center text-sm text-gray-400">
        <p>
          <i className="fas fa-shield-alt mr-1"></i> Your connection is secure
          and private {wsConnected && <span className="text-green-400">(WebSocket Connected)</span>}
        </p>
      </div>
    </div>
  );
}