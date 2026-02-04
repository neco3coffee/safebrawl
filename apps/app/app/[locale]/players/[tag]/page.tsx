import { setRequestLocale, getTranslations } from "next-intl/server";
import styles from "./page.module.scss";
import { BattleLog, Player } from "shared/brawl-stars-api/types"

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ locale: string, tag: string }>;
}>) {
  const { locale, tag } = await params;
  
  const t = await getTranslations("playerDetail");

  const proxyTargetUrl = process.env.PROXY_TARGET_URL
  
  console.time('fetch-parallel');
  const [playerInfoResponse, playerBattleLogResponse] = await Promise.all([
    fetch(`${proxyTargetUrl}/v1/players/%23${encodeURIComponent(tag)}`, {
      next: { revalidate: 60 }
    }),
    fetch(`${proxyTargetUrl}/v1/players/%23${encodeURIComponent(tag)}/battlelog`, {
      next: { revalidate: 60 }
    })
  ]);
  console.timeEnd('fetch-parallel');

  const [playerInfo, playerBattleLog] = await Promise.all([
    playerInfoResponse.json() as Promise<Player>,
    playerBattleLogResponse.json() as Promise<BattleLog>
  ]);

  const { name, brawlers } = playerInfo;
  const { items: battleLogItems } = playerBattleLog;

  return (
    <div className={styles.container}>
      {name && <h2>{name}</h2>}
      <p data-testid="brawler-item-count">{brawlers && brawlers.length}</p>
      {battleLogItems.map((item, index) => (
        <div key={index} data-testid="battle-history-item" className={styles.battleHistoryItem}>
          <p>{item?.battle?.starPlayer?.name || "Unknown"}</p>
        </div>
      ))} 
      {/* <pre>{JSON.stringify(playerBattleLog, null, 2)}</pre> */}
    </div>
  )
  
}