import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { ProductGrid } from "../components/ProductGrid";
import { CategoryGrid } from "../components/CategoryGrid";
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";

const NEW_ARRIVALS = [
  {
    id: "1",
    name: "T-shirt with Tape Details",
    price: 120,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800",
  },
  {
    id: "2",
    name: "Skinny Fit Jeans",
    price: 120,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800",
  },
  {
    id: "3",
    name: "Checkered Shirt",
    price: 120,
    image: "https://images.unsplash.com/photo-1608063615781-e2ef8c73d114?w=800",
  },
  {
    id: "4",
    name: "Sleeve Striped T-shirt",
    price: 120,
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800",
  },
];

const TOP_SELLING = [
  {
    id: "5",
    name: "Vertical Striped Shirt",
    price: 120,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800",
  },
  {
    id: "6",
    name: "Courage Graphic T-shirt",
    price: 120,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800",
  },
  {
    id: "7",
    name: "Loose Fit Bermuda Shorts",
    price: 120,
    image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=800",
  },
  {
    id: "8",
    name: "Faded Skinny Jeans",
    price: 120,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800",
  },
];

export function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ProductGrid title="NEW ARRIVALS" products={NEW_ARRIVALS} />
      <ProductGrid title="TOP SELLING" products={TOP_SELLING} />
      <CategoryGrid />
      <Footer />
    </div>
  );
}
