import styles from "./page.module.scss";

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ locale: string}>
}>) {
  const { locale } = await params;

  return (
    <main className={styles.main}>
      <h1>Landing Page! ({locale})</h1>
    </main>
  )
}