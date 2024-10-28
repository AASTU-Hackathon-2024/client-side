import React from "react";
import { useAuth } from "@clerk/clerk-react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const { isSignedIn, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      console.log("Successfully logged out");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (!isSignedIn) return null; // Don't render if the user is not signed in

  return (
    <button onClick={handleLogout} className="flex items-center gap-2">
      Log out <LogOut />
    </button>
  );
}
