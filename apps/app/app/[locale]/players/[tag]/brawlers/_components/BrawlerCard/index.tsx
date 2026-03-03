import { Brawler } from "shared/brawl-stars-api/types"
import styles from "./index.module.scss"
import Image from "next/image"
import { brawlerBgColor } from "../../../../../../_libs/brawlerRarity"
import PowerBadge from "../PowerBadge"
import GadgetBadge from "../GadgetBadge"
import StarPowerBadge from "../StarPowerBadge"
import GearsBadge from "../GearsBadge"

export default function BrawlerCard({
  brawler,
}: {
  brawler: Brawler
}) {

  return (
    <div className={styles.brawlerCard} key={brawler.id}>
      <div className={styles.topContainer}>

        {/* TODO: prestigeLevel表記でbrawlerのtrophyを表示する */}
        {/* 0〜1000 => 0 */}
        {/* 1000〜2000 => 1 */}
        {/* 2000〜3000 => 2 */}
        {/* 3000〜 => 3 */}
        <div className={styles.brawlerTrophyContainer}>
          <Image
            src="/icon_trophy1.png"
            alt="Trophy Icon"
            width={18}
            height={18}
            sizes={"18px"}
            unoptimized
          />
          <p>{brawler.trophies}</p>
        </div>
        {
          brawler.currentWinStreak > 0 && (
            <div className={styles.currentWinStreakBadge} aria-label="flame badge">
              <div className={styles.flame}></div>
              <div className={styles.num}>{brawler.currentWinStreak}</div>
            </div>
          )
        }
      </div>

      <div className={styles.middleContainer} style={{ backgroundColor: brawlerBgColor(brawler.name)}}>
        <Image
          src={`https://cdn.brawlify.com/brawlers/portraits/${brawler.id}.png`}
          alt={brawler.name}
          fill
          unoptimized
        />

        <PowerBadge
          power={brawler.power}
          hyperCharges={brawler.hyperCharges}
          buffies={brawler.buffies}
        />
        
        <h4 className={styles.brawlerName}>
          {brawler.name}
        </h4>
      </div>

      <div className={styles.bottomContainer}>
        {/* gadget */}
        <GadgetBadge
          gadgets={brawler.gadgets}
          buffies={brawler.buffies}
        />

        {/* star power */}
        <StarPowerBadge
          starPowers={brawler.starPowers}
          buffies={brawler.buffies}
        />

        {/* gears */}
        <GearsBadge
          gears={brawler.gears}
        />
        
      </div>
    </div>
  )
}