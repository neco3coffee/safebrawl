import { setRequestLocale, getTranslations } from "next-intl/server";
import styles from "./page.module.scss";

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ locale: string, tag: string }>;
}>) {
  const { locale, tag } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations("playerDetail");

  return (
    <main className={styles.main}>
      <h2>{tag}</h2>
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