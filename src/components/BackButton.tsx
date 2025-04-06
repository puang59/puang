"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className="text-green-300 mb-4 text-sm rounded hover:text-green-400"
    >
      ← Back
    </button>
  );
}
