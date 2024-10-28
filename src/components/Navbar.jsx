import React from "react";
import { ShoppingBag, Search, User } from "lucide-react";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";
import path from "path";
import { FaChevronRight } from "react-icons/fa";
import {
  SignInButton,
  SignOutButton,
  useAuth,
  useUser,
} from "@clerk/clerk-react";
import LogoutButton from "./LogoutButton";
export function Navbar() {
  const pathname = useLocation().pathname;

  const { isSignedIn, user, isLoaded } = useUser();

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
                  placeholder="Search for products..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-black"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to={"/cart"} className="p-2">
                <ShoppingBag className="w-6 h-6" />
              </Link>

              {isLoaded ? (
                isSignedIn ? (
                  user &&
                  user.emailAddresses &&
                  user.emailAddresses[0] &&
                  user.emailAddresses[0].emailAddress
                ) : (
                  <Link to={"/sign-in"} className="p-2 flex items-center gap-2">
                    <User className="w-6 h-6" /> Sign in
                  </Link>
                )
              ) : (
                <div>Loading...</div>
              )}

              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3">
        <div className="flex justify-start gap-3 items-start text-gray-600">
          <Link to="/">
            {pathname === "/" ? (
              <span className="text-black flex items-center gap-2">
                Home <FaChevronRight />
              </span>
            ) : (
              <span>Home</span>
            )}
          </Link>
          <Link to="/shop">
            {pathname === "/shop" ? (
              <span className="text-black flex items-center gap-2">
                Shop <FaChevronRight />
              </span>
            ) : (
              <span>Shop</span>
            )}
          </Link>

          <Link to="/cart">
            {pathname === "/cart" ? (
              <span className="text-black flex items-center gap-2">
                Cart <FaChevronRight />
              </span>
            ) : (
              <span>Cart</span>
            )}
          </Link>

          <Link to="/wish">
            {pathname === "/wish" ? (
              <span className="text-black flex items-center gap-2">
                WishList <FaChevronRight />
              </span>
            ) : (
              <span>WishList</span>
            )}
          </Link>
        </div>
      </div>
    </>
  );
}
