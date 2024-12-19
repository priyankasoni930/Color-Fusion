import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ColorPalette {
  name: string;
  likes: number;
  colors: string[];
}

const colorPalettes: ColorPalette[] = [
  {
    name: "Clay and Sea",
    likes: 965,
    colors: ["#C84B31", "#DEB887", "#FFF8DC", "#8FBC8F", "#008B8B"],
  },
  {
    name: "Pastel Vibes",
    likes: 784,
    colors: ["#E6F0FF", "#E0FFFF", "#FFF5EE", "#FFE4E1", "#E6E6FA"],
  },
  {
    name: "Forest Breeze",
    likes: 784,
    colors: ["#f1ddbf", "#525e75", "#78938a", "#92ba92"],
  },
   {
    name: "Snow Solitude",
    likes: 784,
    colors: ["#e1e4e8", "#939ca3", "#646f77", "#b5bdc4", "#aeb4ac"],
  },
  {
    name: "Celestial Sea",
    likes: 784,
    colors: ["#809bce", "#95b8d1", "#b8e0d4", "#d6eadf", "#eac4d5"],
  },
  {
    name: "Faded Blues",
    likes: 784,
    colors: ["#edf2fa", "#d7e3fc", "#ccdbfd", "#c1d3fe", "#abc4ff"],
  },
  {
    name: "Earthly",
    likes: 784,
    colors: ["#d9d0b4", "#7d6b57", "#879e82", "#666b5e"],
  },
  {
    name: "Creamish",
    likes: 784,
    colors: ["#ffeeee", "#fff6ea", "#f7e9d7", "#ebd8c3"],
  },
  {
    name: "Ocean Blues",
    likes: 554,
    colors: ["#F0F8FF", "#B0C4DE", "#4682B4", "#000080"],
  },
  {
    name: "Purple Dream",
    likes: 489,
    colors: ["#af92b5", "#8b7991", "#6f597a", "#624b6e", "#503d5c"],
  },
  {
    name: "Blue Vibes",
    likes: 367,
    colors: ["#dfe2fe", "#b1cbfa", "#8e98f5", "#7971ea"],
  },
  {
    name: "Pastel Rainbow",
    likes: 672,
    colors: [
      "#FFB6C1",
      "#FFDAB9",
      "#FFFFE0",
      "#98FB98",
      "#87CEEB",
      "#9370DB",
      "#DDA0DD",
    ],
  },
  {
    name: "Soft Pastels",
    likes: 432,
    colors: ["#F2FCE2", "#FEF7CD", "#FEC6A1", "#E5DEFF", "#FFDEE2"],
  },
  {
    name: "Earth Tones",
    likes: 345,
    colors: ["#8E9196", "#A67B5B", "#C4A484", "#483C32", "#6B4423"],
  },
  {
    name: "Sunset Gradient",
    likes: 777,
    colors: [
      "#001F3F",
      "#003366",
      "#1A237E",
      "#800080",
      "#FF69B4",
      "#FF6B6B",
      "#FFA500",
      "#FFD700",
    ],
  },
  {
    name: "Moody Sunset",
    likes: 642,
    colors: ["#001F3F", "#4B0082", "#C71585", "#FF6B6B", "#FFA500"],
  },
  {
    name: "Vivid Mix",
    likes: 398,
    colors: ["#8B5CF6", "#D946EF", "#F97316", "#0EA5E9"],
  },
  {
    name: "Neon Nights",
    likes: 312,
    colors: ["#FF1493", "#00FF00", "#FF4500", "#7B68EE", "#00FFFF"],
  },
];

const ColorPalettes = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Color Palette Inspiration
          </h1>
          <Button variant="outline" asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {colorPalettes.map((palette) => (
            <div
              key={palette.name}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
            >
              <div className="flex h-32 w-full relative">
                {palette.colors.map((color) => (
                  <TooltipProvider key={color} delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className="flex-1 transition-transform hover:scale-105 relative"
                          style={{ backgroundColor: color }}
                        />
                      </TooltipTrigger>
                      <TooltipContent
                        className="z-50 bg-white px-3 py-1.5 text-sm font-mono border shadow-md"
                        side="top"
                      >
                        {color}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
              <div className="p-4 flex justify-between items-center">
                <span className="text-gray-900 font-medium">
                  {palette.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPalettes;
