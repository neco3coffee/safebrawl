"use client"
import { RotateCw } from "lucide-react"
import styles from "./index.module.scss"

export default function ReloadButton() {
  return (
    <button
      className={styles.button}
      onClick={() => window.location.reload()}
      type="button"
    >
      <RotateCw />
    </button>
  )
}