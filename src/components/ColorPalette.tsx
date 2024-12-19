import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import ColorShadeCard from "./ColorShadeCard";

interface Point {
  x: number;
  y: number;
}

interface ColorPaletteProps {
  className?: string;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ className }) => {
  const [hue, setHue] = useState(270);
  const [selectedPoint, setSelectedPoint] = useState<Point>({ x: 50, y: 50 });
  const [spherePoints, setSpherePoints] = useState<Point[]>([
    { x: 30, y: 30 },
    { x: 50, y: 50 },
    { x: 70, y: 70 },
  ]);
  const [currentColor, setCurrentColor] = useState("#a796a7");
  const graphRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);

  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

  const calculateColor = (h: number, s: number, l: number) => {
    return `hsl(${h}, ${s}%, ${l}%)`;
  };

  const hslToHex = (h: number, s: number, l: number) => {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHue = Number(e.target.value);
    setHue(newHue);
    updateColor(newHue, selectedPoint.x, selectedPoint.y);
    updateSpherePoints(newHue);
  };

  const handleGraphClick = (e: React.MouseEvent) => {
    if (graphRef.current) {
      const rect = graphRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setSelectedPoint({ x, y });
      updateColor(hue, x, y);
    }
  };

  const handleSphereClick = (e: React.MouseEvent) => {
    if (sphereRef.current) {
      const rect = sphereRef.current.getBoundingClientRect();
      const center = { x: rect.width / 2, y: rect.height / 2 };
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const angle = Math.atan2(clickY - center.y, clickX - center.x);
      const newHue = ((angle * 180) / Math.PI + 360) % 360;

      setHue(newHue);
      updateColor(newHue, selectedPoint.x, selectedPoint.y);
      updateSpherePoints(newHue);
    }
  };

  const updateSpherePoints = (currentHue: number) => {
    const newPoints = spherePoints.map((point, index) => {
      const offset = (index - 1) * 30;
      const angle = ((currentHue + offset + 360) % 360) * (Math.PI / 180);
      const radius = 35;
      const centerX = 50;
      const centerY = 50;

      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    });
    setSpherePoints(newPoints);
  };

  const updateColor = (h: number, s: number, l: number) => {
    const hslColor = calculateColor(h, s, 100 - l);
    const hexColor = hslToHex(h, s, 100 - l);
    setCurrentColor(hexColor);
  };

  const generateShade = (baseHue: number, level: number) => {
    const saturation = Math.min(100, selectedPoint.x + (level / 1000) * 100);
    const lightness = Math.max(0, 100 - (level / 1000) * 100);
    return {
      hsl: calculateColor(baseHue, saturation, lightness),
      hex: hslToHex(baseHue, saturation, lightness),
    };
  };

  useEffect(() => {
    updateColor(hue, selectedPoint.x, selectedPoint.y);
    updateSpherePoints(hue);
  }, [hue, selectedPoint]);

  return (
    <div
      className={cn(
        "p-6 rounded-lg shadow-lg max-w-4xl mx-auto",
        "bg-gradient-to-br from-[#F6F6F7] to-[#E5DEFF]/30 backdrop-blur-sm",
        className
      )}
    >
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Hue</h2>
          <input
            type="range"
            min="0"
            max="360"
            value={hue}
            onChange={handleHueChange}
            className="color-slider w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Hue Cycles</h2>
            <div
              ref={sphereRef}
              className="color-sphere cursor-pointer mx-auto"
              onClick={handleSphereClick}
            >
              {spherePoints.map((point, index) => (
                <div
                  key={index}
                  className="color-point"
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                    backgroundColor: calculateColor(
                      hue + (index - 1) * 30,
                      100,
                      50
                    ),
                  }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Lightness & Saturation</h2>
            <div
              ref={graphRef}
              className="saturation-lightness-graph cursor-crosshair"
              onClick={handleGraphClick}
              style={{
                background: `linear-gradient(to right, #fff, ${calculateColor(
                  hue,
                  100,
                  50
                )}),
                           linear-gradient(to bottom, rgba(0,0,0,0), #000)`,
                backgroundBlendMode: "multiply",
              }}
            >
              <div
                className="graph-point"
                style={{
                  left: `${selectedPoint.x}%`,
                  top: `${selectedPoint.y}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-3">Selected Color</h2>
            <div className="flex items-center space-x-4">
              <div
                className="w-3/4 h-24 rounded-lg shadow-sm"
                style={{ backgroundColor: currentColor }}
              />
              <div className="text-2xl font-mono">{currentColor}</div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Shades</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {shades.map((shade) => (
                <ColorShadeCard
                  key={shade}
                  shade={shade}
                  color={generateShade(hue, shade)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPalette;
