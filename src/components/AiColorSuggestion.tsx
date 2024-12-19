import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import ColorManipulator from "./ColorManipulator";

interface ColorShade {
  hex: string;
  shade: number;
}

const AiColorSuggestion = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestedColor, setSuggestedColor] = useState<string | null>(null);
  const [colorShades, setColorShades] = useState<ColorShade[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const { toast } = useToast();

  const generateShades = (baseColor: string) => {
    const shades: ColorShade[] = [];
    for (let i = 100; i <= 900; i += 100) {
      // Darken the color based on the shade level
      const shade = i / 900;
      const r = Math.round(parseInt(baseColor.slice(1, 3), 16) * (1 - shade));
      const g = Math.round(parseInt(baseColor.slice(3, 5), 16) * (1 - shade));
      const b = Math.round(parseInt(baseColor.slice(5, 7), 16) * (1 - shade));

      const hex = `#${r.toString(16).padStart(2, "0")}${g
        .toString(16)
        .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
      shades.push({ hex, shade: i });
    }
    return shades;
  };

  const getSuggestedColor = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a description",
        description: "Enter a theme or mood to get color suggestions",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyCW_r7FL-2ysAfiSMvko4h40giJ1ndYtuw`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Generate a single hexadecimal color code that best represents this theme or mood: "${prompt}". Only respond with the hex code, nothing else. Format should be: #RRGGBB`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const colorHex = data.candidates[0].content.parts[0].text.trim();

      if (colorHex.match(/^#[0-9A-Fa-f]{6}$/)) {
        setSuggestedColor(colorHex);
        setColorShades(generateShades(colorHex));
      } else {
        throw new Error("Invalid color format received");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate color suggestion. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast({
      title: "Color copied!",
      description: `${color} has been copied to your clipboard.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Input
          placeholder="Describe a theme or mood (e.g., 'sunset at the beach')"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1"
        />
        <Button onClick={getSuggestedColor} disabled={loading}>
          {loading ? "Generating..." : "Get Color"}
        </Button>
      </div>

      {suggestedColor && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl overflow-hidden shadow-sm p-4">
            <h3 className="text-lg font-semibold mb-3">Suggested Color</h3>
            <div className="flex items-center gap-4">
              <div
                className="w-2/4 h-24 rounded-lg cursor-pointer"
                style={{ backgroundColor: suggestedColor }}
                onClick={() => setSelectedColor(suggestedColor)}
              />
              <p className="text-2xl font-mono">{suggestedColor}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Color Shades</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {colorShades.map((shade) => (
                <div
                  key={shade.shade}
                  className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedColor(shade.hex)}
                >
                  <div className="text-sm font-mono text-gray-500 mb-2">
                    {shade.shade}
                  </div>
                  <div
                    className="h-16 rounded-md mb-2"
                    style={{ backgroundColor: shade.hex }}
                  />
                  <div className="text-sm font-mono text-gray-600">
                    {shade.hex}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedColor && (
        <ColorManipulator
          color={selectedColor}
          onClose={() => setSelectedColor(null)}
        />
      )}
    </div>
  );
};

export default AiColorSuggestion;
