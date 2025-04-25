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
      
      // Forward the request
      protocol.get(targetUrl.toString(), (response) => {
        // Check if we got redirected
        if (response.statusCode === 301 || response.statusCode === 302) {
          return res.status(response.statusCode).json({ 
            redirect: response.headers.location,
            status: response.statusCode
          });
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
          
          protocol.get(url, (response) => {
            let body = '';
            
            response.on('data', (chunk) => {
              body += chunk;
            });
            
            response.on('end', () => {
              if (ws.readyState === ws.OPEN) {
                ws.send(JSON.stringify({
                  type: 'FETCH_RESPONSE',
                  url: url,
                  status: response.statusCode,
                  contentType: response.headers['content-type'],
                  data: body
                }));
              }
            });
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
