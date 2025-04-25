import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Proxy from "@/pages/Proxy";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/proxy" component={Proxy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="relative">
          {/* Star background layers */}
          <div className="fixed inset-0 stars z-0"></div>
          <div className="fixed inset-0 stars-distant z-0"></div>
          
          {/* Main content container */}
          <div className="relative z-10">
            <Router />
          </div>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
