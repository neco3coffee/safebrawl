import TagInput from "./_components/client/TagInput";
import LiveFeed from "./_components/client/LiveFeed";
import styles from "./page.module.scss";
export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <TagInput locale={locale} />
      </div>
      <LiveFeed locale={locale} />
    </div>
  )
} 