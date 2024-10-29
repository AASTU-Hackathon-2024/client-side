// "use client";

// import React, { useState, useEffect } from "react";
// import { CreditCard, Building, Wallet, MapPin } from "lucide-react";
// import { Navbar } from "../components/Navbar";
// import { Footer } from "../components/Footer";
// import { useAmount } from "../context/cartContext";
// import { useUser } from "@clerk/clerk-react";
// import { redirect, useNavigate } from "react-router-dom";

// export default function CheckOut() {
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [formData, setFormData] = useState({
//     address: "",
//     zipcode: "",
//     phone: "",
//   });
//   const { user } = useUser();
//   const { amount } = useAmount();
//   const [location, setLocation] = useState("");
//   const [currentUser, setCurrentUser] = useState(null);
//   const email = user?.primaryEmailAddress?.emailAddress;
//   const [products, setProducts] = useState([]);
//   const [cartItems, setCartItems] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Set the amount from context when the component mounts
//     setFormData((prevState) => ({
//       ...prevState,
//       amount: amount,
//     }));
//   }, [amount]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/products/list");
//         if (!response.ok) throw new Error("Failed to fetch products");
//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/user/list");
//         if (!response.ok) throw new Error("Failed to fetch users");
//         const data = await response.json();
//         const user = data.find((item) => item.email === email);
//         setCurrentUser(user);
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };
//     fetchUser();
//   }, [email]);

//   // Fetch cart items for the current user
//   useEffect(() => {
//     const fetchCartItems = async () => {
//       if (!currentUser) return;
//       try {
//         const response = await fetch(
//           `http://localhost:8000/user/${currentUser.userId}`
//         );
//         if (!response.ok) throw new Error("Failed to fetch cart items");
//         const user = await response.json();
//         setCartItems(user.carts || []);
//       } catch (error) {
//         console.error("Error fetching cart items:", error);
//       }
//     };
//     fetchCartItems();
//   }, [currentUser]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form submitted", { ...formData, paymentMethod });

//     try {
//       const orderder = await fetch("http://localhost:8000/order/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           amount,
//           status: "pending",
//           address: formData.address,
//           userId: currentUser?.userId,
//           productId: cartItems.map((value) => value.productId)[0],
//           variationId: cartItems.map((value) => value.variationId)[0],
//           zipcode: formData.zipcode,
//           phone: formData.phone,
//           paymentMethod: paymentMethod,
//           isBnpl: paymentMethod === "bnpl" ? true : false,
//         }),
//       });
//       alert("Order created successfully");
//       navigate("/");
//     } catch (error) {
//       console.error("Error creating order:", error);
//     }
//   };

//   const getLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setLocation(`${latitude}, ${longitude}`);
//           setFormData((prevState) => ({
//             ...prevState,
//             address: `${latitude}, ${longitude}`,
//           }));
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-10 mt-5">
//         <div className="max-w-4xl w-full space-y-8 bg-white p-6 rounded-lg shadow-md">
//           <div>
//             <h2 className="text-center text-3xl font-extrabold text-gray-900">
//               Complete Your Order
//             </h2>
//           </div>
//           <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//             <div className="flex flex-col md:flex-row gap-8">
//               <div className="flex-1 space-y-6">
//                 <div>
//                   <label
//                     htmlFor="amount"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Amount
//                   </label>
//                   <input
//                     id="amount"
//                     name="amount"
//                     type="text"
//                     disabled
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 text-gray-700 sm:text-sm"
//                     value={formData.amount || ""}
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="address"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Address
//                   </label>
//                   <div className="mt-1 flex rounded-md shadow-sm">
//                     <input
//                       id="address"
//                       name="address"
//                       type="text"
//                       required
//                       className="flex-grow border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
//                       placeholder="Address"
//                       value={formData.address}
//                       onChange={handleInputChange}
//                     />
//                     <button
//                       type="button"
//                       onClick={getLocation}
//                       className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"
//                     >
//                       <MapPin className="h-5 w-5" />
//                     </button>
//                   </div>
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="zipcode"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Zipcode
//                   </label>
//                   <input
//                     id="zipcode"
//                     name="zipcode"
//                     type="text"
//                     required
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
//                     placeholder="Zipcode"
//                     value={formData.zipcode}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="phone"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Phone
//                   </label>
//                   <input
//                     id="phone"
//                     name="phone"
//                     type="tel"
//                     required
//                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
//                     placeholder="Phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//               </div>
//               <div className="flex-1 space-y-6">
//                 <div>
//                   <span className="block text-sm font-medium text-gray-700 mb-2">
//                     Payment Method
//                   </span>
//                   <div className="space-y-4">
//                     {[
//                       {
//                         id: "chappa",
//                         label: "Chappa",
//                         icon: <CreditCard className="h-6 w-6" />,
//                       },
//                       {
//                         id: "bnpl",
//                         label: "BNPL",
//                         icon: <Wallet className="h-6 w-6" />,
//                       },
//                       {
//                         id: "btb",
//                         label: "Bank to Bank",
//                         icon: <Building className="h-6 w-6" />,
//                       },
//                       {
//                         id: "other",
//                         label: "Cash on Delivery",
//                         icon: <span className="text-2xl font-bold">...</span>,
//                       },
//                     ].map((option) => (
//                       <div
//                         key={option.id}
//                         className="flex items-center space-x-3 border border-gray-200 rounded-md p-4"
//                       >
//                         <input
//                           id={option.id}
//                           name="paymentMethod"
//                           type="radio"
//                           value={option.id}
//                           checked={paymentMethod === option.id}
//                           onChange={(e) => setPaymentMethod(e.target.value)}
//                           className="focus:ring-black h-4 w-4 text-black border-gray-300"
//                         />
//                         <label
//                           htmlFor={option.id}
//                           className="flex items-center space-x-3 cursor-pointer"
//                         >
//                           {option.icon}
//                           <span>{option.label}</span>
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div>
//               <button
//                 type="submit"
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
//               >
//                 Go to Checkout
//               </button>
//             </div>
//           </form>
//         </div>
//         <Footer />
//       </div>
//     </>
//   );
// }
import React, { useState, useEffect } from "react";
import { CreditCard, Building, Wallet, MapPin, CheckCircle } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useAmount } from "../context/cartContext";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function CheckOut() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [formData, setFormData] = useState({
    address: "",
    zipcode: "",
    phone: "",
  });
  const { user } = useUser();
  const { amount } = useAmount();
  const [location, setLocation] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const email = user?.primaryEmailAddress?.emailAddress;
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [isTransactionValid, setIsTransactionValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      amount: amount,
    }));
  }, [amount]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", { ...formData, paymentMethod });

    try {
      const order = await fetch("http://localhost:8000/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          status: "pending",
          address: formData.address,
          userId: currentUser?.userId,
          productId: cartItems.map((value) => value.productId)[0],
          variationId: cartItems.map((value) => value.variationId)[0],
          zipcode: formData.zipcode,
          phone: formData.phone,
          paymentMethod: paymentMethod,
          isBnpl: paymentMethod === "bnpl" ? true : false,
        }),
      });
      alert("Order created successfully");
      navigate("/");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude}, ${longitude}`);
          setFormData((prevState) => ({
            ...prevState,
            address: `${latitude}, ${longitude}`,
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleTransactionIdChange = (e) => {
    setTransactionId(e.target.value);
  };

  const verifyTransactionId = async () => {
    const url = `https://apps.cbe.com.et:100/?id=${transactionId}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        setIsTransactionValid(true);
        alert("Transaction ID confirmed!");
        setShowModal(false);
      } else {
        setIsTransactionValid(false);
        alert("Transaction ID not confirmed!");
      }
    } catch (error) {
      setIsTransactionValid(false);
      alert("Error verifying transaction ID!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-10 mt-5">
        <div className="max-w-4xl w-full space-y-8 bg-white p-6 rounded-lg shadow-md">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Complete Your Order
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-6">
                <div>
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Amount
                  </label>
                  <input
                    id="amount"
                    name="amount"
                    type="text"
                    disabled
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 text-gray-700 sm:text-sm"
                    value={formData.amount || ""}
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      id="address"
                      name="address"
                      type="text"
                      required
                      className="flex-grow border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      onClick={getLocation}
                      className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"
                    >
                      <MapPin className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="zipcode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Zipcode
                  </label>
                  <input
                    id="zipcode"
                    name="zipcode"
                    type="text"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                    placeholder="Zipcode"
                    value={formData.zipcode}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex-1 space-y-6">
                <div>
                  <span className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </span>
                  <div className="space-y-4">
                    {[
                      {
                        id: "chappa",
                        label: "Chappa",
                        icon: <CreditCard className="h-6 w-6" />,
                      },
                      {
                        id: "bnpl",
                        label: "BNPL",
                        icon: <Wallet className="h-6 w-6" />,
                      },
                      {
                        id: "btb",
                        label: "Bank to Bank",
                        icon: <Building className="h-6 w-6" />,
                      },
                      {
                        id: "other",
                        label: "Cash on Delivery",
                        icon: <span className="text-2xl font-bold">...</span>,
                      },
                    ].map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center space-x-3 border border-gray-200 rounded-md p-4"
                      >
                        <input
                          id={option.id}
                          name="paymentMethod"
                          type="radio"
                          value={option.id}
                          checked={paymentMethod === option.id}
                          onChange={(e) => {
                            setPaymentMethod(e.target.value);
                            if (e.target.value === "btb") {
                              setShowModal(true);
                            }
                          }}
                          className="focus:ring-black h-4 w-4 text-black border-gray-300"
                        />
                        <label
                          htmlFor={option.id}
                          className="flex items-center space-x-3 cursor-pointer"
                        >
                          {option.icon}
                          <span>{option.label}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                {isTransactionValid && (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="h-6 w-6" />
                    <span>Transaction ID confirmed!</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                disabled={paymentMethod === "btb" && !isTransactionValid}
              >
                Go to Checkout
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Enter CBE Transaction ID</h2>
            <input
              type="text"
              value={transactionId}
              onChange={handleTransactionIdChange}
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 mb-4"
              placeholder="Transaction ID"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="py-2 px-4 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={verifyTransactionId}
                className="py-2 px-4 bg-blue-500 text-white rounded-md"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}