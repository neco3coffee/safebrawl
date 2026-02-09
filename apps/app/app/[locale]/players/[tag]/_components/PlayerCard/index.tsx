import Image from "next/image"
import { appendToEightDigits, shortenPlayerName } from "@/_libs/common"
import Link from "next/link"
import styles from "./index.module.scss"
import { BattlePlayer } from "shared/brawl-stars-api/types"

export default function PlayerCard({
  player,
  starPlayerTag,
  battleType,
  isDuel,
  locale
}: {
  player: BattlePlayer
  starPlayerTag: string
  battleType: string
  isDuel?: boolean
  locale: string
}) {
  const shortenedName = shortenPlayerName(player?.name);
  const isStarPlayer = player?.tag === starPlayerTag;
  const hashRemovedPlayerTag = player?.tag?.startsWith("#")
    ? player?.tag.slice(1)
    : player?.tag

  // タグが4文字未満のプレイヤーはボットなのでhomeに遷移させる
  const isBot = hashRemovedPlayerTag && hashRemovedPlayerTag.length < 4;
  const href = isBot ? "/" : `/${locale}/players/${hashRemovedPlayerTag}`;


  return (
    <Link
      key={player?.tag}
      href={href}
      className={styles.playerContainer}
      data-testid="playerComponent"
    >
      {isStarPlayer && (
        <div className={`${styles.mvpContainer}  `}>STAR PLAYER</div>
      )}
      <div className={styles.brawlerContainer}>
        <Image
          src={`https://cdn.brawlify.com/brawlers/borderless/${isDuel ? player?.brawlers![0].id : player?.brawler?.id}.png`}
          alt={
            isDuel
              ? player?.brawlers![0].name
              : player?.brawler?.name || "brawler"
          }
          fill={true}
          sizes="42px"
        />
        {battleType === "ranked" && (
          <div className={styles.trophiesContainer}>
            <Image
              src={"/icon_trophy1.png"}
              alt="trophy icon"
              width={8}
              height={8}
              sizes="8px"
              style={{ transform: `rotate(7deg)` }}
            />
            {player?.brawler?.trophies}
          </div>
        )}
        {battleType === "soloRanked" && (
          <div className={styles.rank}>
            <Image
              src={`https://cdn.brawlify.com/ranked/tiered/${appendToEightDigits(58000000, (player?.brawler?.trophies ?? 0) > 0 ? (player?.brawler?.trophies ?? 0) - 1 : 0)}.png`}
              alt="rank"
              height={20}
              width={20}
              sizes="20px"
              style={{ height: "20px", width: "auto" }}
            />
          </div>
        )}
        {(battleType === "ranked" || battleType === "soloRanked") && (
          <div className={styles.levelContainer}>
            <strong>LVL</strong>
            <h6>{player?.brawler?.power}</h6>
          </div>
        )}
      </div>
      <span>{shortenedName}</span>
    </Link>
  )
}