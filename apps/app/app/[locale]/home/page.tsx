import TagInput from "./_components/client/TagInput";
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
    <div className={styles.container}>
      <TagInput locale={locale} />
    </div>
  )
} 