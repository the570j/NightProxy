import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer } from "ws";
import { storage } from "./storage";
import path from "path";
import https from "https";
import http from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Add API endpoint for proxying requests
  app.get("/api/proxy", async (req: Request, res: Response) => {
    const url = req.query.url as string;
    
    if (!url) {
      return res.status(400).json({ error: "URL parameter is required" });
    }
    
    try {
      // Simple validation
      const targetUrl = new URL(url.startsWith("http") ? url : `https://${url}`);
      
      // Determine protocol to use
      const protocol = targetUrl.protocol === "https:" ? https : http;
      
      // Setup browser-like headers to avoid being detected as a bot
      const options = {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Referer': targetUrl.origin
        }
      };
      
      // Forward the request with browser-like headers
      protocol.get(targetUrl.toString(), options, (response) => {
        // Check if we got redirected
        if (response.statusCode === 301 || response.statusCode === 302) {
          const redirectUrl = response.headers.location;
          if (redirectUrl) {
            // Follow the redirect automatically
            try {
              const redirectTargetUrl = new URL(
                redirectUrl.startsWith('http') ? 
                  redirectUrl : 
                  new URL(redirectUrl, targetUrl.toString()).toString()
              );
              
              const redirectProtocol = redirectTargetUrl.protocol === "https:" ? https : http;
              
              redirectProtocol.get(redirectTargetUrl.toString(), (redirectResponse) => {
                // Set appropriate content type
                res.setHeader("Content-Type", redirectResponse.headers["content-type"] || "text/html");
                
                let redirectData = "";
                redirectResponse.on("data", (chunk) => {
                  redirectData += chunk;
                });
                
                redirectResponse.on("end", () => {
                  res.send(redirectData);
                });
              }).on("error", (err) => {
                res.status(500).json({ error: `Redirect failed: ${err.message}` });
              });
              
              return; // End the function here since we're handling the redirect
            } catch (error) {
              res.status(500).json({ error: "Failed to follow redirect" });
              return;
            }
          }
        }
        
        // Set appropriate content type
        res.setHeader("Content-Type", response.headers["content-type"] || "text/html");
        
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });
        
        response.on("end", () => {
          res.send(data);
        });
      }).on("error", (err) => {
        res.status(500).json({ error: err.message });
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to proxy request" });
    }
  });

  const httpServer = createServer(app);
  
  // Setup WebSocket server for real-time communication
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  wss.on('connection', (ws) => {
    console.log('Client connected to WebSocket');
    
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message.toString());
        
        // Handle different message types
        if (data.type === 'FETCH_URL') {
          const url = data.url;
          
          // Fetch the URL
          const protocol = url.startsWith('https') ? https : http;
          
          const handleResponse = (response: http.IncomingMessage, originalUrl: string) => {
            // Handle redirects
            if (response.statusCode === 301 || response.statusCode === 302) {
              const redirectUrl = response.headers.location;
              if (redirectUrl && ws.readyState === ws.OPEN) {
                try {
                  // Resolve relative URLs
                  const redirectTargetUrl = new URL(
                    redirectUrl.startsWith('http') ? 
                      redirectUrl : 
                      new URL(redirectUrl, originalUrl).toString()
                  );
                  
                  // Follow the redirect
                  const redirectProtocol = redirectTargetUrl.protocol === "https:" ? https : http;
                  redirectProtocol.get(redirectTargetUrl.toString(), (redirectResponse) => {
                    handleResponse(redirectResponse, redirectTargetUrl.toString());
                  }).on('error', (err) => {
                    if (ws.readyState === ws.OPEN) {
                      ws.send(JSON.stringify({
                        type: 'ERROR',
                        message: `Redirect failed: ${err.message}`
                      }));
                    }
                  });
                  return;
                } catch (error) {
                  if (ws.readyState === ws.OPEN) {
                    ws.send(JSON.stringify({
                      type: 'ERROR',
                      message: 'Failed to follow redirect'
                    }));
                  }
                  return;
                }
              }
            }
            
            // Handle normal response
            let body = '';
            
            response.on('data', (chunk: Buffer) => {
              body += chunk.toString();
            });
            
            response.on('end', () => {
              if (ws.readyState === ws.OPEN) {
                ws.send(JSON.stringify({
                  type: 'FETCH_RESPONSE',
                  url: originalUrl,
                  status: response.statusCode,
                  contentType: response.headers['content-type'],
                  data: body
                }));
              }
            });
          };
          
          // Setup browser-like headers
          const options = {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
              'Accept-Language': 'en-US,en;q=0.5',
              'Referer': new URL(url).origin
            }
          };
          
          protocol.get(url, options, (response) => {
            handleResponse(response, url);
          }).on('error', (err) => {
            if (ws.readyState === ws.OPEN) {
              ws.send(JSON.stringify({
                type: 'ERROR',
                message: err.message
              }));
            }
          });
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    });
    
    ws.on('close', () => {
      console.log('Client disconnected from WebSocket');
    });
  });

  return httpServer;
}
