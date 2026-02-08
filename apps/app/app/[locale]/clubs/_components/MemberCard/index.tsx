import Link from "next/link";
import { Member } from "shared/brawl-stars-api/types";
import styles from "./index.module.scss"
import Image from "next/image";


export default function MemberCard({
  locale,
  member,
  roleText,
  nameColorCode
}: {
  locale: string
  member: Member
  roleText: string
  nameColorCode: string
}) {
  const playerTag = member.tag.startsWith("#") ? member.tag.substring(1) : member.tag;

  return (
    <Link
      href={`/${locale}/players/${playerTag}`}
      className={styles.memberCardContainer}
    >
      <div className={styles.iconAndNameContainer}>
        <Image
          src={`https://cdn.brawlify.com/profile-icons/regular/${member.icon.id}.png`}
          alt="Player Icon"
          width={40}
          height={40}
          sizes={"40px"}
        />
        <div className={styles.nameAndRoleContainer}>
          <h3
            style={{ color: `${nameColorCode}`}}
          >{member.name}</h3>
          <h5>{roleText}</h5>
        </div>
      </div>
      <div className={styles.trophyContainer}>
        <Image
            src={"/icon_trophy1.png"}
            alt="trophy icon"
            width={16}
            height={12}
            sizes={"16px"}
            className={styles.trophyImg}
          />
          <h3 className={styles.clubTrophy}>{member.trophies}</h3>
      </div>
    </Link>
  )
}