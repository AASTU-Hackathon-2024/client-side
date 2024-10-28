import React from 'react';
import { ShoppingBag } from 'lucide-react';

export function ProductGrid({ title, products }) {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button className="text-gray-600 hover:text-black">View All</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="relative overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                />
                <button className="absolute bottom-4 right-4 bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <ShoppingBag size={20} />
                </button>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-gray-600">Br {product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}