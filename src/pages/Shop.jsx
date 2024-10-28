import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ProductGrid } from "../components/ProductGrid";
import { Filters } from "../components/Filters";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useAuth, useUser } from "@clerk/clerk-react";

// const PRODUCTS = [
//   {
//     id: "1",
//     name: "Gradient Graphic T-shirt",
//     price: 120,
//     image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800",
//   },
//   {
//     id: "2",
//     name: "Polo with Tipping Details",
//     price: 120,
//     image: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800",
//   },
//   {
//     id: "3",
//     name: "Black Striped T-shirt",
//     price: 120,
//     image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800",
//   },
//   {
//     id: "4",
//     name: "Skinny Fit Jeans",
//     price: 120,
//     image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800",
//   },
//   {
//     id: "5",
//     name: "Checkered Shirt",
//     price: 120,
//     image: "https://images.unsplash.com/photo-1608063615781-e2ef8c73d114?w=800",
//   },
//   {
//     id: "6",
//     name: "Sleeve Striped T-shirt",
//     price: 120,
//     image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800",
//   },
//   {
//     id: "7",
//     name: "Vertical Striped Shirt",
//     price: 120,
//     image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800",
//   },
//   {
//     id: "8",
//     name: "Courage Graphic T-shirt",
//     price: 120,
//     image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800",
//   },
//   {
//     id: "9",
//     name: "Loose Fit Bermuda Shorts",
//     price: 120,
//     image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=800",
//   },
// ];

export function Shop() {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [product, setProduct] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const { user, isLoaded } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/products/list");
        const data = await response.json();

        setProduct(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/user/list");
        const data = await response.json();
        const filterd = data?.filter((item) => item.email == email);
        setCurrentUser(filterd[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [email, isLoaded]);

  async function handleWishList(id) {
    try {
      const filterd = product.filter((item) => item.productId === id);
      if (isLoaded) {
        const addWishList = await fetch(
          "http://localhost:8000/user/wishlist/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: currentUser.userId,
              productId: filterd[0].productId,
              variationId: filterd[0].variations[0].variationId,
            }),
          }
        );
      }
      window.location.reload();
    } catch (error) {
      console.log("error", error);
    }
  }

  const wishlistProducts = currentUser?.wishlists.map(
    (item) => item?.productId
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <aside className="w-64 flex-shrink-0">
            <Filters priceRange={priceRange} setPriceRange={setPriceRange} />
          </aside>

          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Casual</h1>
              <select className="border rounded-md px-3 py-1.5">
                <option>Most Popular</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {product?.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col gap-1 items-center"
                >
                  <Link
                    to={`/product/${product.id}`}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-lg bg-gray-100">
                      <img
                        src={JSON.parse(product.variations?.at(0)?.imgUrl)}
                        alt={product.title}
                        className="w-full h-72 transition-transform group-hover:scale-105 object-cover "
                      />
                    </div>
                  </Link>
                  <section className="flex items-center justify-around w-full">
                    <div className="mt-4">
                      <h3 className="text-lg font-medium">{product.title}</h3>
                      <p className="text-gray-600">Br {product.price}</p>
                    </div>
                    <button onClick={() => handleWishList(product.productId)}>
                      {wishlistProducts?.includes(product.productId) ? (
                        <Heart color="red" fill="red" />
                      ) : (
                        <Heart color="red" />
                      )}
                    </button>
                  </section>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8 gap-2">
              {[1, 2, 3, 4, 5, 10].map((page) => (
                <button
                  key={page}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
                >
                  {page}
                </button>
              ))}
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
