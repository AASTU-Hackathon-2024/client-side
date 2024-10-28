import React from 'react';

type Size = 'Small' | 'Medium' | 'Large' | 'X-Large';

type SizeSelectorProps = {
  sizes: Size[];
  selectedSize: Size | null;
  onSizeSelect: (size: Size) => void;
};

export function SizeSelector({ sizes, selectedSize, onSizeSelect }: SizeSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Choose size</label>
      <div className="flex gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeSelect(size)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all
              ${
                selectedSize === size
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}