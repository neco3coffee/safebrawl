"use client"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      style={{
        position: "fixed",
        bottom: 62,
        left: 16,
        zIndex: 1000,
        padding: "8px",
        backgroundColor: "var(--blue-black)",
        color: "var(--white)",
        borderRadius: "100px",
      }}
      onClick={() => router.back()}
      type="button"
      aria-label="Go back"
    >
      <ArrowLeft />
    </button>
  )
}