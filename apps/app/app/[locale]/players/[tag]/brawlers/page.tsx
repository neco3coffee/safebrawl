import Link from "next/link";
import { Brawler, Player, Brawlers } from "shared/brawl-stars-api/types";
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

  const [playerInfoResponse, brawlersResponse] = await Promise.all([
    fetch(`${proxyTargetUrl}/v1/players/%23${encodeURIComponent(tag)}`, {
      next: { revalidate: 60 }
    }),
    fetch(`${proxyTargetUrl}/v1/brawlers`, {
      next: { revalidate: 86400 }
    })
  ]);
  const playerInfo = await playerInfoResponse.json() as Player;
  const { items: allBrawlers} = await brawlersResponse.json() as Brawlers;

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
          {t("brawler")}{brawlers.length}/{allBrawlers.length} <span>({t("powerLevelSorted")})</span>
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