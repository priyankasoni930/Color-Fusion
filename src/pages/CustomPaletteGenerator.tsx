import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import ColorManipulator from "@/components/ColorManipulator";

interface ThemePalette {
  name: string;
  colors: string[];
}

const themes: Record<string, ThemePalette> = {
  summer: {
    name: "Summer Vibes",
    colors: ["#FF6B6B", "#4ECDC4", "#FFE66D", "#FF8B94", "#98FB98"],
  },
  vintage: {
    name: "Vintage Charm",
    colors: ["#DEB887", "#A0522D", "#CD853F", "#DAA520", "#F5DEB3"],
  },
  corporate: {
    name: "Corporate Professional",
    colors: ["#1A237E", "#0D47A1", "#1565C0", "#1976D2", "#1E88E5"],
  },
  forest: {
    name: "Forest Dream",
    colors: ["#2E7D32", "#388E3C", "#43A047", "#4CAF50", "#66BB6A"],
  },
  sunset: {
    name: "Sunset Glow",
    colors: ["#FF7043", "#FF5722", "#F4511E", "#E64A19", "#D84315"],
  },
  pastel: {
    name: "Soft Pastels",
    colors: ["#F2FCE2", "#FEF7CD", "#FEC6A1", "#E5DEFF", "#FFDEE2"],
  },
  ocean: {
    name: "Ocean Depths",
    colors: ["#006064", "#00838F", "#0097A7", "#00ACC1", "#00BCD4"],
  },
  autumn: {
    name: "Autumn Warmth",
    colors: ["#BF360C", "#D84315", "#E64A19", "#F4511E", "#FF5722"],
  },
};

const CustomPaletteGenerator = () => {
  const [selectedTheme, setSelectedTheme] = useState<string>("summer");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const { toast } = useToast();

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast({
      title: "Color copied!",
      description: `${color} has been copied to your clipboard.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Custom Palette Generator
          </h1>
          <div className="space-x-4">
            <Button variant="outline" asChild>
              <Link to="/ai-color">AI Color Generator</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Preset Theme Palettes</h2>
            <div className="mb-8 w-full max-w-xs">
              <Select
                value={selectedTheme}
                onValueChange={(value) => setSelectedTheme(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a theme" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(themes).map(([key, theme]) => (
                    <SelectItem key={key} value={key}>
                      {theme.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {themes[selectedTheme].colors.map((color, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div
                    className="h-48 w-full cursor-pointer transition-transform hover:scale-[1.02]"
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                  <div className="p-4">
                    <p className="text-sm font-mono text-gray-600">{color}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedColor && (
        <ColorManipulator
          color={selectedColor}
          onClose={() => setSelectedColor(null)}
        />
      )}
    </div>
  );
};

export default CustomPaletteGenerator;