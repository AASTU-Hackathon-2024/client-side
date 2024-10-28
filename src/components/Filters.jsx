import React from 'react';

export function Filters({ priceRange, setPriceRange }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Filters</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">T-shirts</h4>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span className="text-gray-600">Basic Tees</span>
            </label>
          </div>
          <div>
            <h4 className="font-medium mb-2">Shirts</h4>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span className="text-gray-600">Casual Shirts</span>
            </label>
          </div>
          <div>
            <h4 className="font-medium mb-2">Hoodies</h4>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span className="text-gray-600">Pullover</span>
            </label>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">Price</h4>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="500"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>$0</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <button className="w-full bg-black text-white py-2 rounded-full">
        Apply Filter
      </button>
    </div>
  );
}