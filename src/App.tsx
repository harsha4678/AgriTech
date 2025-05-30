
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CartProvider } from "@/context/CartContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import LandLeasing from "./pages/LandLeasing";
import NutritionChatbot from "./pages/NutritionChatbot";
import WeatherAdvisory from "./pages/WeatherAdvisory";
import DiseaseDetection from "./pages/DiseaseDetection";
import BlockchainTraceability from "./pages/BlockchainTraceability";
import CropManagement from "./pages/CropManagement";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="agritech-theme">
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/land-leasing" element={<LandLeasing />} />
              <Route path="/nutrition-chatbot" element={<NutritionChatbot />} />
              <Route path="/weather-advisory" element={<WeatherAdvisory />} />
              <Route path="/disease-detection" element={<DiseaseDetection />} />
              <Route path="/blockchain-traceability" element={<BlockchainTraceability />} />
              <Route path="/crop-management" element={<CropManagement />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
