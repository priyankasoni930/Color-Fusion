import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ColorManipulatorProps {
  color: string;
  onClose: () => void;
}

const ColorManipulator = ({ color, onClose }: ColorManipulatorProps) => {
  const [saturation, setSaturation] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [temperature, setTemperature] = useState(0);
  const [manipulatedColor, setManipulatedColor] = useState(color);
  const { toast } = useToast();

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map(x => {
      const hex = Math.min(255, Math.max(0, Math.round(x))).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };

  const adjustColor = () => {
    const rgb = hexToRgb(color);
    if (!rgb) return;

    // Apply saturation
    const sat = saturation / 100;
    const gray = 0.2989 * rgb.r + 0.5870 * rgb.g + 0.1140 * rgb.b;
    let r = rgb.r * sat + gray * (1 - sat);
    let g = rgb.g * sat + gray * (1 - sat);
    let b = rgb.b * sat + gray * (1 - sat);

    // Apply brightness
    const bright = brightness / 100;
    r *= bright;
    g *= bright;
    b *= bright;

    // Apply contrast
    const cont = (contrast + 100) / 100;
    const factor = (259 * (cont + 255)) / (255 * (259 - cont));
    r = factor * (r - 128) + 128;
    g = factor * (g - 128) + 128;
    b = factor * (b - 128) + 128;

    // Apply temperature
    const temp = temperature / 100;
    if (temp > 0) {
      r += (255 - r) * temp;
      b -= b * temp;
    } else {
      r -= r * Math.abs(temp);
      b += (255 - b) * Math.abs(temp);
    }

    setManipulatedColor(rgbToHex(r, g, b));
  };

  useEffect(() => {
    adjustColor();
  }, [saturation, brightness, contrast, temperature, color]);

  const copyColor = () => {
    navigator.clipboard.writeText(manipulatedColor);
    toast({
      title: "Color copied!",
      description: `${manipulatedColor} has been copied to your clipboard.`,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Color Manipulator</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
        </div>

        <div className="space-y-4">
          <div 
            className="h-24 rounded-lg transition-colors duration-200"
            style={{ backgroundColor: manipulatedColor }}
          />
          
          <div className="flex justify-between items-center">
            <span className="font-mono text-sm">{manipulatedColor}</span>
            <Button size="sm" onClick={copyColor}>Copy</Button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Saturation ({saturation}%)</label>
              <Slider
                value={[saturation]}
                onValueChange={(value) => setSaturation(value[0])}
                min={0}
                max={200}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Brightness ({brightness}%)</label>
              <Slider
                value={[brightness]}
                onValueChange={(value) => setBrightness(value[0])}
                min={0}
                max={200}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Contrast ({contrast}%)</label>
              <Slider
                value={[contrast]}
                onValueChange={(value) => setContrast(value[0])}
                min={-100}
                max={100}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Temperature ({temperature})</label>
              <Slider
                value={[temperature]}
                onValueChange={(value) => setTemperature(value[0])}
                min={-100}
                max={100}
                step={1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorManipulator;