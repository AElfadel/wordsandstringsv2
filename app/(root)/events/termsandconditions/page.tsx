"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function TermsPage() {
  const router = useRouter();

  return (
    <div className="h-screen text-white text-4xl font-bold flex-center">
      T
      <button
        onClick={router.back}
        className="text-white text-lg cursor-pointer rounded-full bg-red-500 z-10"
      >
        BACK
      </button>
      ERMS & CONDITIONS PAGE
    </div>
  );
}
