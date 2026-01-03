import { setRequestLocale, getTranslations } from "next-intl/server";
import styles from "./page.module.scss";
import { Player } from "shared/brawl-stars-api/types"

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ locale: string, tag: string }>;
}>) {
  const { locale, tag } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations("playerDetail");

  const proxyTargetUrl = process.env.PROXY_TARGET_URL
  const proxyResponse = await fetch(`${proxyTargetUrl}/v1/players/%23${encodeURIComponent(tag)}`)
  const playerData: Player = await proxyResponse.json()
  const { name } = playerData

  return (
    <main className={styles.main}>
      <h2>{name}</h2>
      <section className={styles.section}>
        <h3>{t("playerInfoSection.title")}</h3>
        <p>{t("playerInfoSection.description")}</p>
      </section>
      <section className={styles.section}>
        <h3>{t("playerBattleHistorySection.title")}</h3>
        <p>{t("playerBattleHistorySection.description")}</p>
      </section>
    </main>
  )
  
}