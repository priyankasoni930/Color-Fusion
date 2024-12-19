import React from 'react';

interface ColorShadeCardProps {
  shade: number;
  color: {
    hsl: string;
    hex: string;
  };
}

const ColorShadeCard = ({ shade, color }: ColorShadeCardProps) => {
  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="text-sm font-mono text-gray-500 mb-2">{shade}</div>
      <div
        className="h-16 rounded-md mb-2"
        style={{ backgroundColor: color.hsl }}
      />
      <div className="text-sm font-mono text-gray-600">{color.hex}</div>
    </div>
  );
};

export default ColorShadeCard;