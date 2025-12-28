import styles from "./page.module.scss"

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`)
  console.log("API_URL:", process.env.NEXT_PUBLIC_API_URL)

  const messageFromApi = res.text()


  return (
    <main className={styles.container}>
      {messageFromApi}
    </main>
  )
}