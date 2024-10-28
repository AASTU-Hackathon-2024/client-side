import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Minus, Plus, X } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  const email = user?.primaryEmailAddress?.emailAddress;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/products/list");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8000/user/list");
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        const user = data.find((item) => item.email === email);
        setCurrentUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [email]);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!currentUser) return;
      try {
        const response = await fetch(
          `http://localhost:8000/user/${currentUser.userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch cart items");
        const user = await response.json();
        setCartItems(user.carts || []);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, [currentUser]);

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/user/cart/${itemId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to remove item");
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleQuantityChange = async (itemId, change) => {
    const item = cartItems.find((item) => item.id === itemId);
    const newQuantity = item.quantity + change;

    if (newQuantity < 1) return;

    try {
      const response = await fetch(`http://localhost:8000/user/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser.userId,
          productId: item.productId,
          variationId: item.variationId,
          quantity: newQuantity,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update quantity");
      }

      setCartItems((prevItems) =>
        prevItems.map((i) =>
          i.id === itemId ? { ...i, quantity: newQuantity } : i
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert(error.message);
    }
  };

  const cartItemsProductId = cartItems.map((item) => item.productId);
  const productFiltered = products.filter((item) =>
    cartItemsProductId.includes(item.productId)
  );

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 15;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Your cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="space-y-8">
              {productFiltered.map((item) => {
                const cartItem = cartItems.find(
                  (i) => i.productId === item.productId
                );
                return (
                  <div key={item.id} className="flex gap-6">
                    <img
                      src={JSON.parse(item.variations?.[0]?.imgUrl)}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.title}</h3>
                        <button
                          className="text-gray-400 hover:text-gray-500"
                          onClick={() => handleRemoveItem(cartItem.id)}
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <p className="text-gray-600 mt-1">
                        Size: {cartItem.size}
                      </p>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-4">
                          <button
                            className="p-1 rounded-full hover:bg-gray-100"
                            onClick={() =>
                              handleQuantityChange(cartItem.id, -1)
                            }
                          >
                            <Minus size={16} />
                          </button>
                          <span>{cartItem.quantity}</span>
                          <button
                            className="p-1 rounded-full hover:bg-gray-100"
                            onClick={() => handleQuantityChange(cartItem.id, 1)}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <p className="font-medium">Br {item.price}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>Br {subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span>Br {deliveryFee}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>Br {total}</span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-black text-white py-3 rounded-full mt-6 font-medium hover:bg-gray-900">
                Go to Checkout
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
