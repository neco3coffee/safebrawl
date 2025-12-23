import styles from "./page.module.scss";
import { getTranslations } from "next-intl/server";

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ locale: string}>
}>) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "landing" });

  return (
    <main className={styles.main}>
      <h1>{t("title")}</h1>
    </main>
  )
}