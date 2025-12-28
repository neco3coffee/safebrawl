import styles from "./page.module.scss";
import { setRequestLocale, getTranslations } from "next-intl/server";

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h3>{t("playerTagSearchSection.title")}</h3>
        <p>{t("playerTagSearchSection.description")}</p>
      </section>
      <section className={styles.section}>
        <h3>{t("cheaterTimeHeatmapSection.title")}</h3>
        <p>{t("cheaterTimeHeatmapSection.description")}</p>
      </section>
      <section className={styles.section}>
        <h3>{t("rankedTopPlayersStatsSection.title")}</h3>
        <p>{t("rankedTopPlayersStatsSection.description")}</p>
      </section>
      <section className={styles.section}>
        <h3>{t("currentSeasonRankedMapSection.title")}</h3>
        <p>{t("currentSeasonRankedMapSection.description")}</p>
      </section>
    </main>
  )

} 