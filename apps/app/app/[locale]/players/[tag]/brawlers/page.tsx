import Link from "next/link";
import { Player } from "shared/brawl-stars-api/types";
import styles from "./page.module.scss"
import { getTranslations } from "next-intl/server";
import BrawlerCard from "./_components/BrawlerCard";



export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ locale: string, tag: string}>;
}>) {
  const { locale, tag } = await params;

  const t = await getTranslations("playerDetail");

  const proxyTargetUrl = process.env.PROXY_TARGET_URL

  const PlayerInfoResponse = await fetch(`${proxyTargetUrl}/v1/players/%23${encodeURIComponent(tag)}`, {
    next: { revalidate: 60 }
  });
  const playerInfo = await PlayerInfoResponse.json() as Player;

  if (!playerInfo || !playerInfo?.tag) {
    return (
      <div className={styles.notFoundContainer}>
        <p>#{tag}</p>
        <p>{t("playerNotFound")}</p>
        <Link
          href={`/${locale}/home`}
          className={styles.goBackToHomeLink}
        >
          {t("goBackToHome")}
        </Link>
      </div>
    )
  }

  const brawlers = playerInfo.brawlers;
  const sortedBrawlers = brawlers.sort((a, b) => b.power - a.power);

  return (
    <>
      {/* <pre style={{ maxWidth: "100%", overflow: "auto" }}>{JSON.stringify(sortedBrawlers, null, 2)}</pre> */}
      <div className={styles.container}>
        <div className={styles.brawlersHeader}>
          {t("brawler")}{brawlers.length}/99 <span>({t("powerLevelSorted")})</span>
        </div>

        {sortedBrawlers.map((brawler) => {
          return (
            <BrawlerCard brawler={brawler} key={brawler.id} />
          )
        })}
      </div>
    </>
  )


}