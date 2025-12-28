import styles from "./page.module.scss"

export const dynamic = 'force-dynamic'

export default async function Page() {
  const apiUrl = process.env.API_URL
  const res = await fetch(apiUrl!)

  const messageFromApi = await res.text()


  return (
    <main className={styles.container}>
      {messageFromApi}
    </main>
  )
}