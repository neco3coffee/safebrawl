

import styles from "./page.module.scss";
import { setRequestLocale, getTranslations } from "next-intl/server";

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const t = await getTranslations("profile");

  return (
    <div className={styles.container}>
      list page
    </div>
  )
}