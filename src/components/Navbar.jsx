// import React from "react";
// import { ShoppingBag, Search, User, UserCircle } from "lucide-react"; // Import UserCircle icon
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { FaChevronRight } from "react-icons/fa";
// import LogoutButton from "./LogoutButton";
// import { useUser } from "@clerk/clerk-react";

// export function Navbar() {
//   const { t, i18n } = useTranslation();
//   const { isSignedIn, user, isLoaded } = useUser();

//   const switchLanguage = (lang) => {
//     i18n.changeLanguage(lang);
//   };

//   return (
//     <>
//       <nav className="border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex-shrink-0">
//               <h1 className="text-2xl font-bold">GEBEYA</h1>
//             </div>
//             <div className="flex-1 max-w-2xl mx-8">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder={t("navbar.searchPlaceholder")}
//                   className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-black"
//                 />
//               </div>
//             </div>
//             <div className="flex items-center gap-4">
//               <Link to="/cart" className="p-2">
//                 <ShoppingBag className="w-6 h-6" />
//               </Link>
//               {isLoaded ? (
//                 isSignedIn ? (
//                   <span>{user?.emailAddresses[0]?.emailAddress}</span>
//                 ) : (
//                   <Link to="/sign-in" className="p-2 flex items-center gap-2">
//                     <User className="w-6 h-6" /> {t("navbar.signIn")}
//                   </Link>
//                 )
//               ) : (
//                 <div>Loading...</div>
//               )}
//               <LogoutButton />
//               <Link to="/dashboard" className="p-2">
//                 <UserCircle className="w-6 h-6" />
//               </Link>
//             </div>
//             <div className="flex items-center ml-4 gap-2">
//               <button onClick={() => switchLanguage("en")} className="p-2">
//                 EN
//               </button>
//               <button onClick={() => switchLanguage("am")} className="p-2">
//                 አማ
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3">
//         <div className="flex justify-start gap-3 items-start text-gray-600">
//           <Link to="/">
//             <span>{t("navbar.home")}</span>
//           </Link>
//           <Link to="/shop">
//             <span>{t("navbar.shop")}</span>
//           </Link>
//           <Link to="/cart">
//             <span>{t("navbar.cart")}</span>
//           </Link>
//           <Link to="/wish">
//             <span>{t("navbar.wishlist")}</span>
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useState } from "react";
import { ShoppingBag, Search, User, UserCircle, Camera } from "lucide-react"; // Import Camera icon
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaChevronRight } from "react-icons/fa";
import LogoutButton from "./LogoutButton";
import { useUser } from "@clerk/clerk-react";

export function Navbar() {
  const { t, i18n } = useTranslation();
  const { isSignedIn, user, isLoaded } = useUser();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const switchLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      // Handle the image upload logic here
      alert("Image uploaded for reverse search!");
      setShowDialog(false);
    }
  };

  return (
    <>
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold">GEBEYA</h1>
            </div>
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t("navbar.searchPlaceholder")}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-black"
                />
                <Camera
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer"
                  onClick={() => setShowDialog(true)}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/cart" className="p-2">
                <ShoppingBag className="w-6 h-6" />
              </Link>
              {isLoaded ? (
                isSignedIn ? (
                  <span>{user?.emailAddresses[0]?.emailAddress}</span>
                ) : (
                  <Link to="/sign-in" className="p-2 flex items-center gap-2">
                    <User className="w-6 h-6" /> {t("navbar.signIn")}
                  </Link>
                )
              ) : (
                <div>Loading...</div>
              )}
              <LogoutButton />
              <Link to="/dashboard" className="p-2">
                <UserCircle className="w-6 h-6" />
              </Link>
            </div>
            <div className="flex items-center ml-4 gap-2">
              <button onClick={() => switchLanguage("en")} className="p-2">
                EN
              </button>
              <button onClick={() => switchLanguage("am")} className="p-2">
                አማ
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3">
        <div className="flex justify-start gap-3 items-start text-gray-600">
          <Link to="/">
            <span>{t("navbar.home")}</span>
          </Link>
          <Link to="/shop">
            <span>{t("navbar.shop")}</span>
          </Link>
          <Link to="/cart">
            <span>{t("navbar.cart")}</span>
          </Link>
          <Link to="/wish">
            <span>{t("navbar.wishlist")}</span>
          </Link>
        </div>
      </div>

      {showDialog && (
        <div className="fixed z-10 z- inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Upload Image for Reverse Search
            </h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDialog(false)}
                className="py-2 px-4 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
