import { Buffies, HyperCharge } from "shared/brawl-stars-api/types"
import styles from "./index.module.scss"
import Image from "next/image"

interface PowerBadge {
  power: number
  hyperCharges: HyperCharge[] | []
  buffies: Buffies
}

export default function PowerBadge({
  power,
  hyperCharges,
  buffies
}: PowerBadge) {

  {/* hyperChargeがある且つ、buffiesのhyperChargeがある場合 */}
  if (hyperCharges.length > 0 && buffies.hyperCharge) {
    return (
      <div className={styles.buffiesPowerBadgeContainer}>
        <div className={styles.buffiesPowerBadgeBox}>
          <Image
            src="/powerBadge/buffiesPowerBadge.png"
            alt="buffies hypercharge power badge icon"
            fill={true}
            sizes="30px"
          />
          <span className={styles.buffiesPower}>
            {power}
          </span>
        </div>
      </div>
    )
  }

  {/* hpyerChargeがある且つ、buffiesのhyperChargeがない場合 */}
  {/* 実際のゲームのUIではhyperChargeを持っていてもpowerが11未満の場合はhyperChargeBadgeで表示されてない、
      safebrawlではhyperChargeを持っていてpowerが11未満の場合にhyperChargeBadgeで表示している
      理由: 一覧画面でhyperCharge, starPower, gadget, gear全ての情報を詰め込んで表示させたいからである。
      懸念点: 実際のゲームのUIと違うからユーザーが混乱してしまう可能性があること
  */}
  if (hyperCharges.length > 0 && !buffies.hyperCharge) {
    return (
      <div className={styles.hyperChargePowerBadgeContainer}>
        <div className={styles.hyperChargePowerBadgeBox}>
          <Image
            src="/powerBadge/hyperChargePowerBadge.png"
            alt="hypercharge power badge icon"
            fill={true}
            sizes="30px"
          />
          <span className={styles.hyperChargePower}>
            {power}
          </span>
        </div>
      </div>
    )
  }

  {/* hyperChargaがない場合 */}
  return (
    <div className={styles.powerBadgeContainer}>
      <div className={styles.powerBadgeBox}>
        <Image
          src="/powerBadge/powerBadge.png"
          alt="power badge icon"
          fill={true}
          sizes="30px"
        />
        <span 
          className={styles.powerBadgePower}
          style={{paddingRight: power === 11 ? "0.5px" : ""}}
        >
          {power}
        </span>
      </div>
    </div>
  )

}