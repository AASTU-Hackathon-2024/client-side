import React from 'react';

const categories = [
  {
    name: 'Casual',
    image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800',
  },
  {
    name: 'Formal',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800',
  },
  {
    name: 'Party',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800',
  },
  {
    name: 'Gym',
    image: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=800',
  },
];

export function CategoryGrid() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-8">BROWSE BY dress STYLE</h2>
        <div className="grid grid-cols-2 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="relative overflow-hidden rounded-lg h-64 group cursor-pointer"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}