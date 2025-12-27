import feature1s from "./page.module.scss";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import styles from "./page.module.scss";

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
      <section className={styles.section}>
        <span>HeroSection</span>
        <h3>{t("HeroSection.title")}</h3>
        <p>{t("HeroSection.description")}</p>
      </section>
      <section className={styles.section}>
        <span>FeatureSection</span>
        <h3>{t("FeatureSection.feature1.title")}</h3>
        <p>{t("FeatureSection.feature1.description")}</p>
        <h3>{t("FeatureSection.feature2.title")}</h3>
        <p>{t("FeatureSection.feature2.description")}</p>
        <h3>{t("FeatureSection.feature3.title")}</h3>
        <p>{t("FeatureSection.feature3.description")}</p>
      </section>
      <section className={styles.section}>
        <span>SocialProofSection</span>
        <h3>{t("SocialProofSection.title")}</h3>
      </section>
      <section className={styles.section}>
        <span>FAQSection</span>
        <h3>{t("FAQSection.question1.question")}</h3>
        <p>{t("FAQSection.question1.answer")}</p>
        <h3>{t("FAQSection.question2.question")}</h3>
        <p>{t("FAQSection.question2.answer")}</p>
        <h3>{t("FAQSection.question3.question")}</h3>
        <p>{t("FAQSection.question3.answer")}</p>
      </section>
      <section className={styles.section}>
        <span>CallToActionSection</span>
        <h3>{t("CallToActionSection.title")}</h3>
        <p>{t("CallToActionSection.description")}</p>
        <button>{t("CallToActionSection.buttonText")}</button>
      </section>
      
    </main>
  );
}