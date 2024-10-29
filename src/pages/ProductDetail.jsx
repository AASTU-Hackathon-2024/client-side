import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ProductImage } from "../components/ProductImage";
import { SizeSelector } from "../components/SizeSelector";
import { ColorSelector } from "../components/ColorSelector";
import { RelatedProducts } from "../components/RelatedProducts";
import { Minus, Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const RELATED_PRODUCTS = [
  {
    id: "1",
    name: "Polo with Contrast Trims",
    price: 120,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800",
  },
  {
    id: "2",
    name: "Gradient Graphic T-shirt",
    price: 120,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800",
  },
  {
    id: "3",
    name: "Polo with Tipping Details",
    price: 120,
    image: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800",
  },
  {
    id: "4",
    name: "Black Striped T-shirt",
    price: 120,
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800",
  },
];

export function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [productDetail, setProductDetail] = useState(null);
  const { id } = useParams();
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/products/list");
        const data = await response.json();
        const product = data.find((item) => item.id === Number(id));
        setProductDetail(product);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!productDetail)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading product details...</p>
      </div>
    );

  console.log(productDetail.productId);

  const productImages = JSON.parse(productDetail.variations[0].imgUrl);
  const availableSizes = JSON.parse(productDetail.variations[0].size);
  const availableColors = productDetail.variations.map((variation) => ({
    name: variation.color,
    value: variation.color.toLowerCase(),
  }));

  const handleAddToCart = async () => {
    if (!selectedColor || !selectedSize) {
      alert("Please select both a color and a size.");
      return;
    }
    const variationId = productDetail.variations.find(
      (variation) => variation.color.toLowerCase() === selectedColor
    )?.variationId;

    if (!variationId) {
      alert("The selected color and size combination is not available.");
      return;
    }

    console.log("currentUser", currentUser?.userId);
    console.log("productDetail", productDetail?.productId);
    console.log("variationId", variationId);
    console.log("quantity", quantity);

    try {
      const response = await fetch("http://localhost:8000/user/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser?.userId,
          productId: productDetail?.productId,
          variationId,
          quantity,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
      } else {
        console.error("Add to cart error:", result);
        alert(result.message || "Failed to add item to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductImage
            mainImage={productImages[activeImageIndex]}
            thumbnails={productImages}
            onThumbnailClick={setActiveImageIndex}
            activeIndex={activeImageIndex}
          />

          <div className="space-y-8">
          <div className="mt-4">
    <button
      className="bg-black text-white py-2 px-4 rounded-full"
      onClick={() => {
        const uniqueLink = `${window.location.href}?ref=${user.id}`;
        navigator.clipboard.writeText(uniqueLink);
        alert("Affiliate link copied to clipboard!");
      }}
    >
      Generate Affiliate Link
    </button>
  </div>
            <div>
              <h1 className="text-3xl font-bold">{productDetail.title}</h1>
              <p className="text-2xl font-medium mt-2">
                Br {productDetail.price}
              </p>
              <p className="text-gray-600 mt-4">{productDetail.description}</p>
            </div>

            <ColorSelector
              colors={availableColors}
              selectedColor={selectedColor}
              onColorSelect={setSelectedColor}
            />

            <SizeSelector
              sizes={availableSizes}
              selectedSize={selectedSize}
              onSizeSelect={setSelectedSize}
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <Minus size={20} />
                </button>
                <span className="text-lg font-medium w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-4 rounded-full font-medium hover:bg-gray-900 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>

        <RelatedProducts products={RELATED_PRODUCTS} />
      </main>

      <Footer />
    </div>
  );
}
