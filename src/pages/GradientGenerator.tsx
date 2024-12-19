import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const GradientGenerator = () => {
  const [angle, setAngle] = useState(90);
  const [color1, setColor1] = useState("#E5DEFF");
  const [color2, setColor2] = useState("#F6F6F7");
  const [gradientType, setGradientType] = useState<"linear" | "radial">("linear");
  const { toast } = useToast();

  const gradientStyle = {
    background:
      gradientType === "linear"
        ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
        : `radial-gradient(circle at center, ${color1}, ${color2})`,
  };

  const getDirectionClass = (angle: number) => {
    // Convert angle to Tailwind direction class
    if (angle >= 337.5 || angle < 22.5) return "bg-gradient-to-r";
    if (angle >= 22.5 && angle < 67.5) return "bg-gradient-to-br";
    if (angle >= 67.5 && angle < 112.5) return "bg-gradient-to-b";
    if (angle >= 112.5 && angle < 157.5) return "bg-gradient-to-bl";
    if (angle >= 157.5 && angle < 202.5) return "bg-gradient-to-l";
    if (angle >= 202.5 && angle < 247.5) return "bg-gradient-to-tl";
    if (angle >= 247.5 && angle < 292.5) return "bg-gradient-to-t";
    return "bg-gradient-to-tr";
  };

  const hexToTailwindColor = (hex: string) => {
    // Convert hex to closest Tailwind color
    // This is a simplified version - you might want to expand this with more colors
    const colors = {
      "#E5DEFF": "purple-100",
      "#F6F6F7": "gray-50",
      // Add more color mappings as needed
    };
    return colors[hex] || hex.replace("#", "");
  };

  const copyToClipboard = () => {
    let tailwindClasses = "";
    
    if (gradientType === "linear") {
      const directionClass = getDirectionClass(angle);
      const color1Class = `from-[${color1}]`;
      const color2Class = `to-[${color2}]`;
      tailwindClasses = `${directionClass} ${color1Class} ${color2Class}`;
    } else {
      // For radial gradients
      tailwindClasses = `bg-[radial-gradient(circle_at_center,_${color1},_${color2})]`;
    }

    navigator.clipboard.writeText(tailwindClasses);
    toast({
      title: "Copied!",
      description: "Tailwind CSS classes copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Gradient Generator
          </h1>
          <Button variant="outline" onClick={() => window.history.back()}>
            Back to Color Palette
          </Button>
        </div>

        <div className="space-y-8">
          <div
            className="rounded-lg h-64 shadow-lg transition-all duration-300"
            style={gradientStyle}
          ></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color 1
                </label>
                <input
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="w-3/4 h-12 rounded-md cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color 2
                </label>
                <input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="w-3/4 h-12 rounded-md cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Gradient Type
                </label>
                <ToggleGroup
                  type="single"
                  value={gradientType}
                  onValueChange={(value) => {
                    if (value) setGradientType(value as "linear" | "radial");
                  }}
                  className="justify-start"
                >
                  <ToggleGroupItem value="linear" aria-label="Linear gradient">
                    Linear
                  </ToggleGroupItem>
                  <ToggleGroupItem value="radial" aria-label="Radial gradient">
                    Radial
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Angle: {angle}°
                </label>
                <Slider
                  value={[angle]}
                  onValueChange={(value) => setAngle(value[0])}
                  max={360}
                  step={1}
                  disabled={gradientType === "radial"}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>

          <Button
            onClick={copyToClipboard}
            className="w-full py-6 text-lg"
            size="lg"
          >
            Copy Tailwind CSS Classes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GradientGenerator;