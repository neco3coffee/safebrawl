"use client"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import styles from "./index.module.scss"

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      className={styles.button}
      onClick={() => router.back()}
      type="button"
      aria-label="Go back"
    >
      <ArrowLeft />
    </button>
  )
}