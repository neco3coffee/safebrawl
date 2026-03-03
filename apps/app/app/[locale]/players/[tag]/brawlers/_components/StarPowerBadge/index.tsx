import { Buffies, StarPower } from "shared/brawl-stars-api/types";
import styles from "./index.module.scss";
import Image from "next/image";

interface StarPowerBadge {
  starPowers: StarPower[] | []
  buffies: Buffies
}


export default function StarPowerBadge({
  starPowers,
  buffies
}: StarPowerBadge) {

  // star powerがある且つ、star powerのbuffiesがある場合
  if (starPowers.length > 0 && buffies.starPower) {
    return (
      <div className={styles.starPowerContainer}>
        <Image
          src="/starPowerBadge/buffieStarPowerBadge.png"
          alt="buffies star power badge"
          fill={true}
          sizes="30px"
        />
        <span className={styles.starPowers}>
          {starPowers.length}
        </span>
      </div>
    )
  }


  // star powerがある場合
  if (starPowers.length > 0) {
    return (
      <div className={styles.starPowerContainer}>
        <Image
          src="/starPowerBadge/starPowerBadge.png"
          alt="buffies star power badge"
          fill={true}
          sizes="30px"
        />
        <span className={styles.starPowers}>
          {starPowers.length}
        </span>
      </div>
    )
  }


  // star powerがない場合
  return (
    <div className={styles.starPowerContainer}></div>
  )

}


