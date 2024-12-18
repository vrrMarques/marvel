"use client";

import { signInWithGoogle, signInWithGitHub } from "../../../firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (provider) => {
    try {
      setLoading(true);
      if (provider === "google") {
        await signInWithGoogle();
      } else if (provider === "github") {
        await signInWithGitHub();
      }
      router.push("/");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Login com sua conta</h2>
        
        <button
          onClick={() => handleSignIn("google")}
          disabled={loading}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg mb-4"
        >
          {loading ? "Carregando..." : "Login com Google"}
        </button>

        <button
          onClick={() => handleSignIn("github")}
          disabled={loading}
          className="bg-gray-800 text-white px-6 py-3 rounded-lg"
        >
          {loading ? "Carregando..." : "Login com GitHub"}
        </button>
      </div>
    </div>
  );
}
