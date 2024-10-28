import React from 'react';
import { ShoppingBag } from 'lucide-react';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

type RelatedProductsProps = {
  products: Product[];
};

export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">You might also like</h2>
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
    </section>
  );
}