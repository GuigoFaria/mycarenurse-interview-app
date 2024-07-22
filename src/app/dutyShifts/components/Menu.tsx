"use client";
import { navigateToLogin } from "@/app/actions";
import { signOut } from "next-auth/react";

export default function Menu() {
  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">MyCareNurse</div>
        <button
          onClick={() => handleSignOut()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
