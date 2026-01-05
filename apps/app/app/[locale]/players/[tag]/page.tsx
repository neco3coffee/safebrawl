import { setRequestLocale, getTranslations } from "next-intl/server";
import styles from "./page.module.scss";
import { BattleLog, Player } from "shared/brawl-stars-api/types"

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ locale: string, tag: string }>;
}>) {
  const { locale, tag } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations("playerDetail");
  console.log("tag:", tag);

  const proxyTargetUrl = process.env.PROXY_TARGET_URL
  console.log("proxyTargetUrl:", proxyTargetUrl);
  const playerInfoResponse = await fetch(`${proxyTargetUrl}/v1/players/%23${encodeURIComponent(tag)}`)
  console.log("playerInfoResponse.status:", playerInfoResponse.status);
  const playerInfo: Player = await playerInfoResponse.json()
  console.log("playerInfo:", playerInfo);
  const { name, brawlers } = playerInfo

  const playerBattleLogResponse = await fetch(`${proxyTargetUrl}/v1/players/%23${encodeURIComponent(tag)}/battlelog`);
  const playerBattleLog: BattleLog = await playerBattleLogResponse.json();
  const { items: battleLogItems } = playerBattleLog;

  return (
    <div className={styles.container}>
      <h2>{name}</h2>
      <p data-testid="brawler-item-count">{brawlers.length}</p>
      {battleLogItems.map((item, index) => (
        <div key={index} data-testid="battle-history-item" className={styles.battleHistoryItem}>
          <p>{item.battle.starPlayer.name}</p>
        </div>
      ))} 
      {/* <pre>{JSON.stringify(playerBattleLog, null, 2)}</pre> */}
    </div>
  )
  
}