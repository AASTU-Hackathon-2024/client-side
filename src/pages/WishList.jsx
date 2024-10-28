import { Heart, Search, ShoppingCart, User, X } from "lucide-react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

export default function WishList() {
  const [product, setProduct] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const { user, isLoaded } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;

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

  console.log(currentUser);

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

  async function handleDelete(id) {
    try {
      const response = await fetch(
        `http://localhost:8000/user/wishlist/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log("error", error);
    }
  }

  const productIds = currentUser?.wishlists.map((item) => item?.productId);
  const wishListId = currentUser?.wishlists.map((item) => item?.id);
  const filteredProducts = product?.filter((item) =>
    productIds?.includes(item?.productId)
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold mb-6">My Wish List</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts?.map((item, index) => (
            <>
              <div
                key={item.id}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                <img
                  src={JSON.parse(item.variations[0].imgUrl)}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600">Br {item.price}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <button className="bg-black text-white px-4 py-2 rounded">
                      Add to Cart
                    </button>
                    <button onClick={() => handleDelete(wishListId[index])}>
                      <X className="h-6 w-6 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </main>

      {/* Newsletter */}
      <section className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-2xl font-bold mb-4 md:mb-0">
              STAY UP TO DATE ABOUT OUR LATEST OFFERS
            </h2>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-4 py-2 text-black rounded-l-md"
              />
              <button className="bg-white text-black px-4 py-2 rounded-r-md">
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
