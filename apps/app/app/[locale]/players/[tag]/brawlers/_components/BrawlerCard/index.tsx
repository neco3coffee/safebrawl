import { Brawler } from "shared/brawl-stars-api/types"
import styles from "./index.module.scss"
import Image from "next/image"
import { brawlerBgColor } from "../../brawlerRarity"

export default function BrawlerCard({
  brawler,
}: {
  brawler: Brawler
}) {

  return (
    <div className={styles.brawlerCard} key={brawler.id}>
      <div className={styles.topContainer}>
        <div className={styles.brawlerTrophyContainer}>
          <Image
            src="/icon_trophy1.png"
            alt="Trophy Icon"
            width={18}
            height={18}
            sizes={"18px"}
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
        />
        {/* FIXME: キャrクターのpowerのバッジをもっとゲームのUIに寄せたい */}
        <span className={styles.powerBadge}>
          {brawler.power}
        </span>
      </div>

      {/* TODO: brawlerのギア・スタパ・ガジェットをどこかで見れるようにする */}
      {/* <div className={styles.bottomContainer}>

      </div> */}
    </div>
  )
}