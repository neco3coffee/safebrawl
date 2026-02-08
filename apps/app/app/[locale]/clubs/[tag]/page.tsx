import { getTranslations } from "next-intl/server";
import styles from "./page.module.scss"
import Image from "next/image";
import { Club } from "shared/brawl-stars-api/types";
import MemberCard from "../_components/MemberCard";
import { normalizeColor } from "@/[locale]/players/[tag]/_components/PlayerName";




export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ locale: string, tag: string}>
}>) {
  const { locale, tag } = await params;
  
  const t = await getTranslations("clubDetail");

  const proxyTargetUrl = process.env.PROXY_TARGET_URL;

  const clubInfoResponse = await fetch(`${proxyTargetUrl}/v1/clubs/${encodeURIComponent(`#${tag}`)}`, {
    next: { revalidate: 3600 }
  });
  const clubInfo = await clubInfoResponse.json() as Club;

  return (
    <>
      <div className={styles.container}>

        {/* クラブ基本情報 */}
        <Image
          src={`https://cdn.brawlify.com/club-badges/regular/${clubInfo?.badgeId}.png`}
          alt=""
          width={50}
          height={50}
          sizes="50px"
        />
        <h2 className={styles.clubName}>{clubInfo.name}</h2>
        <div className={styles.trophyContainer}>
          <Image
            src={"/icon_trophy1.png"}
            alt="trophy icon"
            width={16}
            height={12}
            sizes={"16px"}
            className={styles.trophyImg}
          />
          <h3 className={styles.clubTrophy}>{clubInfo.trophies}</h3>
        </div>
        <p className={styles.clubDescription}>{clubInfo.description}</p>
        <div className={styles.clubInfoList}>
          <div className={styles.clubInfoItem}>
            <p className={styles.clubInfoItemLabel}>{t("clubTag")}</p>
            <h5 className={styles.clubInfoItemValue}>{clubInfo.tag}</h5>
          </div>
          <div className={styles.clubInfoItem}>
            <p className={styles.clubInfoItemLabel}>{t("clubType")}</p>
            <h5 className={styles.clubInfoItemValue}>{t(clubInfo.type)}</h5>
          </div>
          <div className={styles.clubInfoItem}>
            <p className={styles.clubInfoItemLabel}>{t("clubRequiredTrophy")}</p>
            <div className={styles.trophyContainer}>
              <Image
                src={"/icon_trophy1.png"}
                alt="trophy icon"
                width={16}
                height={12}
                sizes={"16px"}
                className={styles.trophyImg}
              />
              <h5 className={styles.clubInfoItemValue}>{clubInfo.requiredTrophies}</h5>
            </div>
          </div>
        </div>

        {/* クラブメンバー情報 */}
        <div className={styles.clubMembersContainer}>
          {clubInfo.members.map((member) => {
            const roleText = t(member.role)
            const nameColorCode = normalizeColor(member.nameColor)
            return (
              <MemberCard 
                key={member.tag}
                member={member} 
                locale={locale} 
                roleText={roleText} 
                nameColorCode={nameColorCode} 
              />
            )
          })}
        </div>
      </div>
    </>
  )

}