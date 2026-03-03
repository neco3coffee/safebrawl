import { Gear } from "shared/brawl-stars-api/types";
import styles from "./index.module.scss";
import Image from "next/image";


interface GearsBadge {
  gears: Gear[] | []
}

export default function GearsBadge({
  gears
}: GearsBadge) {

  // gearsがある場合
  if (gears.length > 0) {
    return (
      <div className={styles.gearsBadgeContainer}>
        <Image
          src="/gearBadge/gearsBadge.png"
          alt="gears badge"
          fill={true}
          sizes="30px"
        />
        <span className={styles.gears}>
          {gears.length}
        </span>
      </div>
    )
  }


  // gearsがない場合
  return (
    <div className={styles.gearsBadgeContainer}></div>
  )

}