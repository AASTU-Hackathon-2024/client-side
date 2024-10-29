import React from "react";
import { ShoppingBag, Search, User, UserCircle } from "lucide-react"; // Import UserCircle icon
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaChevronRight } from "react-icons/fa";
import LogoutButton from "./LogoutButton";
import { useUser } from "@clerk/clerk-react";

export function Navbar() {
  const { t, i18n } = useTranslation();
  const { isSignedIn, user, isLoaded } = useUser();

  const switchLanguage = (lang) => {
    i18n.changeLanguage(lang);
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
    </>
  );
}