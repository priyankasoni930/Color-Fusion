import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GradientGenerator from "./pages/GradientGenerator";
import ColorPalettes from "./pages/ColorPalettes";
import CustomPaletteGenerator from "./pages/CustomPaletteGenerator";
import AiColorGenerator from "./pages/AiColorGenerator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/gradient" element={<GradientGenerator />} />
          <Route path="/palettes" element={<ColorPalettes />} />
          <Route path="/custom-palette" element={<CustomPaletteGenerator />} />
          <Route path="/ai-color" element={<AiColorGenerator />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;