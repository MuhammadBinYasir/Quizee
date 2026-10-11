"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";

export default function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={
        className ||
        "w-full flex items-center gap-2 px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded cursor-pointer transition-colors"
      }
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-red-500" />
      ) : (
        <LogOut className="w-4 h-4 text-red-500" />
      )}
      <span>{isLoading ? "Signing out..." : "Log out"}</span>
    </button>
  );
}
