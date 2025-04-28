
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import GoogleAnalytics from "./components/GoogleAnalytics";

// Track page views on route changes
const RouteChangeTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-FPC2HLGQZZ', {
        page_path: location.pathname + location.search
      });
      console.log('Page view tracked:', location.pathname + location.search);
    }
  }, [location]);

  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <GoogleAnalytics />
        <RouteChangeTracker />
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
