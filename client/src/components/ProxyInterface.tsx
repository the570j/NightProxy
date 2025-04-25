import { useState, useRef, FormEvent, useEffect } from "react";
import { useLocation } from "wouter";

export default function ProxyInterface() {
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pageContent, setPageContent] = useState<string>("");
  const [pageTitle, setPageTitle] = useState<string>("");
  const [wsConnected, setWsConnected] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [, navigate] = useLocation();

  // Handle ESC key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);
  
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
    <div className="glass rounded-2xl p-8 max-w-4xl mx-auto shadow-xl border border-space-accent/30">
      <div className="flex items-center justify-center mb-8">
        <div className="mr-3 text-4xl md:text-5xl text-space-accent">
          <i className="fas fa-rocket-launch"></i>
        </div>
        <h2 className="text-2xl md:text-4xl font-bold font-poppins text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-space-accent via-purple-500 to-space-highlight">
            NightProxy Browser
          </span>
          <div className="text-sm font-normal text-gray-400 mt-1">Secure and private web browsing</div>
        </h2>
      </div>

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
        
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          <div className="text-sm text-gray-400 my-auto mr-2">Quick Access:</div>
          <button 
            type="button"
            onClick={() => {
              setUrl("blooketbot.glitch.me");
              setHasSubmitted(true);
              setLoading(true);
              fetchWithApi("https://blooketbot.glitch.me");
            }}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-medium hover:opacity-90 transition-all transform hover:scale-105 border border-white/10 shadow-lg"
          >
            <i className="fas fa-gamepad mr-2"></i>
            Blooket Bot
          </button>
          <button 
            type="button"
            onClick={() => {
              setUrl("example.com");
              setHasSubmitted(true);
              setLoading(true);
              fetchWithApi("https://example.com");
            }}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white text-sm font-medium hover:opacity-90 transition-all transform hover:scale-105 border border-white/10 shadow-lg"
          >
            <i className="fas fa-globe mr-2"></i>
            Example Site
          </button>
          <button 
            type="button"
            onClick={() => {
              setUrl("google.com");
              setHasSubmitted(true);
              setLoading(true);
              fetchWithApi("https://google.com");
            }}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium hover:opacity-90 transition-all transform hover:scale-105 border border-white/10 shadow-lg"
          >
            <i className="fas fa-search mr-2"></i>
            Google
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-white p-3 rounded-lg mb-6">
          <i className="fas fa-exclamation-triangle mr-2"></i> {error}
        </div>
      )}

      <div className="w-full h-[60vh] bg-space-dark/30 rounded-lg overflow-hidden border border-white/10 shadow-lg">
        {loading ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-space-deep to-black/60">
            <div className="w-20 h-20 border-4 border-space-accent border-t-transparent rounded-full animate-spin mb-4 shadow-lg"></div>
            <p className="text-gray-300 text-lg">Establishing secure connection...</p>
            <div className="mt-4 flex space-x-2">
              <span className="w-3 h-3 bg-space-accent rounded-full animate-pulse"></span>
              <span className="w-3 h-3 bg-space-accent rounded-full animate-pulse delay-150"></span>
              <span className="w-3 h-3 bg-space-accent rounded-full animate-pulse delay-300"></span>
            </div>
          </div>
        ) : pageContent && hasSubmitted ? (
          <div className="w-full h-full overflow-auto">
            <div className="bg-gradient-to-r from-space-deep to-black/80 p-3 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center">
                <div className="flex items-center space-x-2 px-3 py-1 bg-black/40 rounded-lg border border-white/5">
                  <i className="fas fa-lock text-green-400 text-xs"></i>
                  <span className="text-gray-300 text-sm truncate max-w-[300px]">
                    {url}
                  </span>
                </div>
                <div className="ml-4 text-white text-sm font-semibold">
                  {pageTitle}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="px-2 py-1 rounded-lg bg-green-600/20 text-green-400 text-xs border border-green-500/20">
                  <i className="fas fa-shield-alt mr-1"></i> Secure
                </div>
                {wsConnected && (
                  <div className="px-2 py-1 rounded-lg bg-blue-600/20 text-blue-400 text-xs border border-blue-500/20">
                    <i className="fas fa-bolt mr-1"></i> WebSocket
                  </div>
                )}
              </div>
            </div>
            <div 
              ref={contentRef}
              className="p-4 bg-gradient-to-b from-space-deep to-black/80 text-white h-full overflow-auto"
            >
              <div className="proxy-content">
                <div className="proxy-explanation p-5 mb-4 bg-gradient-to-r from-blue-900/40 to-indigo-900/30 rounded-lg border border-blue-500/20 backdrop-blur-sm">
                  <div className="flex items-start mb-4">
                    <div className="mr-4 p-3 bg-blue-500/20 rounded-lg text-blue-400 text-xl">
                      <i className="fas fa-satellite-dish"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-white">Secure Proxy Connection</h3>
                      <p className="text-gray-300">
                        You're now viewing <strong className="text-blue-300">{url}</strong> through NightProxy's secure connection.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div className="flex p-3 bg-black/20 rounded-lg border border-white/5">
                      <div className="mr-3 text-blue-400">
                        <i className="fas fa-info-circle"></i>
                      </div>
                      <div className="text-sm text-gray-300">
                        Modern websites like YouTube use advanced security that might limit how content displays in a proxy.
                      </div>
                    </div>
                    <div className="flex p-3 bg-black/20 rounded-lg border border-white/5">
                      <div className="mr-3 text-yellow-400">
                        <i className="fas fa-exclamation-triangle"></i>
                      </div>
                      <div className="text-sm text-gray-300">
                        JavaScript and interactive features may be limited for security reasons.
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute top-2 right-2 z-10 flex gap-2">
                    <button 
                      onClick={() => setIsFullscreen(true)}
                      className="p-2 rounded bg-space-accent text-white hover:bg-space-highlight transition-colors"
                      title="View in fullscreen"
                    >
                      <i className="fas fa-expand"></i>
                    </button>
                    <button 
                      onClick={() => window.open(`/api/proxy?url=${encodeURIComponent(url.startsWith('http') ? url : `https://${url}`)}`, '_blank')}
                      className="p-2 rounded bg-space-accent text-white hover:bg-space-highlight transition-colors"
                      title="Open in new tab"
                    >
                      <i className="fas fa-external-link-alt"></i>
                    </button>
                  </div>
                  
                  <iframe 
                    ref={iframeRef}
                    src={`/api/proxy?url=${encodeURIComponent(url.startsWith('http') ? url : `https://${url}`)}`}
                    className="w-full h-[500px] border-0 bg-white rounded-lg shadow-xl"
                    sandbox="allow-same-origin allow-forms"
                    title="Proxied content"
                    loading="eager"
                  />
                  <div className="flex justify-center mt-4">
                    <div className="flex items-center text-sm text-gray-400 px-3 py-1 rounded-lg bg-black/30 border border-white/5">
                      <i className="fas fa-info-circle mr-2"></i>
                      Press ESC to exit fullscreen mode when expanded
                    </div>
                  </div>
                </div>
                
                {isFullscreen && (
                  <div className="fixed inset-0 z-50 bg-black flex flex-col">
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-space-deep to-black border-b border-white/10">
                      <div className="flex items-center">
                        <div className="flex items-center space-x-2 px-3 py-1 bg-black/40 rounded-lg border border-white/5 mr-4">
                          <i className="fas fa-lock text-green-400 text-sm"></i>
                          <span className="text-gray-300 text-sm truncate max-w-[400px]">
                            {url}
                          </span>
                        </div>
                        <div className="hidden md:flex items-center space-x-2">
                          <div className="px-2 py-1 rounded-lg bg-green-600/20 text-green-400 text-xs border border-green-500/20">
                            <i className="fas fa-shield-alt mr-1"></i> Secure
                          </div>
                          {wsConnected && (
                            <div className="px-2 py-1 rounded-lg bg-blue-600/20 text-blue-400 text-xs border border-blue-500/20">
                              <i className="fas fa-bolt mr-1"></i> WebSocket
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => window.open(`/api/proxy?url=${encodeURIComponent(url.startsWith('http') ? url : `https://${url}`)}`, '_blank')}
                          className="p-2 rounded bg-blue-600/30 text-white hover:bg-blue-600/50 transition-colors border border-blue-500/30"
                          title="Open in new tab"
                        >
                          <i className="fas fa-external-link-alt"></i>
                        </button>
                        <button 
                          onClick={() => setIsFullscreen(false)}
                          className="px-3 py-2 rounded bg-space-accent/80 text-white hover:bg-space-accent transition-colors flex items-center"
                        >
                          <i className="fas fa-compress mr-2"></i>
                          <span className="hidden md:inline">Exit Fullscreen</span>
                        </button>
                      </div>
                    </div>
                    <iframe 
                      src={`/api/proxy?url=${encodeURIComponent(url.startsWith('http') ? url : `https://${url}`)}`}
                      className="flex-1 border-0 bg-white w-full"
                      sandbox="allow-same-origin allow-forms"
                      title="Fullscreen proxied content"
                      loading="eager"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-space-deep to-black/80">
            <div className="relative">
              <div className="absolute inset-0 w-full h-full flex justify-center items-center blur-xl opacity-50">
                <div className="w-32 h-32 rounded-full bg-space-accent animate-pulse"></div>
                <div className="w-24 h-24 rounded-full bg-purple-500 absolute top-10 left-10 animate-pulse delay-700"></div>
                <div className="w-20 h-20 rounded-full bg-space-highlight absolute bottom-5 right-10 animate-pulse delay-500"></div>
              </div>
              <div className="relative z-10">
                <div className="text-6xl text-space-accent mb-8 animate-float">
                  <i className="fas fa-rocket"></i>
                </div>
                <h3 className="text-2xl font-poppins font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-space-accent via-purple-400 to-space-highlight">
                  Ready to Explore the Web
                </h3>
                <p className="text-gray-300 max-w-lg mb-6">
                  NightProxy allows you to browse the web freely and securely.
                  Simply enter a URL above or choose from our quick access options.
                </p>
                
                <div className="flex gap-4 justify-center mt-2">
                  <div className="flex flex-col items-center p-4 rounded-lg bg-black/30 border border-white/5 w-28">
                    <div className="text-green-400 text-xl mb-2"><i className="fas fa-shield-alt"></i></div>
                    <div className="text-sm font-semibold text-white">Secure</div>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-lg bg-black/30 border border-white/5 w-28">
                    <div className="text-blue-400 text-xl mb-2"><i className="fas fa-bolt"></i></div>
                    <div className="text-sm font-semibold text-white">Fast</div>
                  </div>
                  <div className="flex flex-col items-center p-4 rounded-lg bg-black/30 border border-white/5 w-28">
                    <div className="text-purple-400 text-xl mb-2"><i className="fas fa-user-shield"></i></div>
                    <div className="text-sm font-semibold text-white">Private</div>
                  </div>
                </div>
              </div>
            </div>
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