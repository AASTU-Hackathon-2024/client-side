import React from "react";

export function Hero() {
  return (
    <div className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              FIND CLOTHES
              <br />
              THAT MATCHES
              <br />
              YOUR STYLE
            </h1>
            <p className="text-gray-600 mb-6 max-w-lg">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring your individuality and cater to your sense of
              style.
            </p>
            <button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-900 transition-colors">
              Shop Now
            </button>
            <div className="grid grid-cols-3 gap-8 mt-12">
              <div>
                <h3 className="text-2xl font-bold">200+</h3>
                <p className="text-gray-600">International Brands</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold">2,000+</h3>
                <p className="text-gray-600">High-Quality Products</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold">30,000+</h3>
                <p className="text-gray-600">Happy Customers</p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800"
              alt="Fashion"
              className="w-full rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
      <div className="bg-black py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {["VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein"].map(
              (brand) => (
                <span key={brand} className="text-white font-bold text-xl">
                  {brand}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
