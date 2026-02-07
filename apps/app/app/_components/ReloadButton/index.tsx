"use client"
import { RotateCw } from "lucide-react"

export default function ReloadButton() {
  return (
    <button
      style={{
        position: "fixed",
        bottom: 62,
        right: 16,
        zIndex: 1000,
        padding: "8px",
        backgroundColor: "var(--blue-black)",
        color: "var(--white)",
        borderRadius: "100px",
      }}
      onClick={() => window.location.reload()}
      type="button"
    >
      <RotateCw />
    </button>
  )
}