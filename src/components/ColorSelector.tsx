import React from 'react';

type ColorOption = {
  name: string;
  value: string;
};

type ColorSelectorProps = {
  colors: ColorOption[];
  selectedColor: string;
  onColorSelect: (color: string) => void;
};

export function ColorSelector({ colors, selectedColor, onColorSelect }: ColorSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Select Color</label>
      <div className="flex gap-2">
        {colors.map((color) => (
          <button
            key={color.value}
            onClick={() => onColorSelect(color.value)}
            className={`w-8 h-8 rounded-full border-2 transition-all ${
              selectedColor === color.value ? 'border-black' : 'border-transparent'
            }`}
            style={{ backgroundColor: color.value }}
            title={color.name}
          >
            <span className="sr-only">{color.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}