import styles from "./page.module.scss";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations("landing");

  return (
    <main className={styles.main}>
      <h1>{t("title")}</h1>
    </main>
  );
}