import styles from "./page.module.scss"

export const dynamic = 'force-dynamic'

interface PlayerData {
  name: string
  tag: string
}

export default async function Page() {
  const apiUrl = process.env.API_URL
  const honoResponse = await fetch(apiUrl!)
  const messageFromApi = await honoResponse.text()

  const proxyTargetUrl = process.env.PROXY_TARGET_URL
  const proxyResponse = await fetch(`${proxyTargetUrl}/v1/players/%23y2ypgcgc`)
  const playerData: PlayerData = await proxyResponse.json()
  const { name, tag } = playerData


  return (
    <main className={styles.container}>
      {messageFromApi} <br />
      Fetched Player: {name} ,{tag}
    </main>
  )
}