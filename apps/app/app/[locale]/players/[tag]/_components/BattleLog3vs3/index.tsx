
import Image from "next/image"
import { shortenMapName } from "@/_libs/common"
import { Duration, RelativeTime } from "@/_libs/time"
import { classifyModeByMapName } from "@/_libs/unknownMode"
import Link from "next/link"
import PlayerCard from "../PlayerCard"
import styles from "./index.module.scss"
import { BattleLogItem, BattlePlayer } from "shared/brawl-stars-api/types"

const BattleLog3vs3 = ({battleLog, ownTag, locale}: {
  battleLog: BattleLogItem
  ownTag: string
  locale: string
}) => {
  const tag = ownTag.trim().toUpperCase().replace(/O/g, "0");
  const ownTeam = battleLog?.battle?.teams.find((team: BattlePlayer[]) => {
    return team.some((player: BattlePlayer) => player.tag === `#${tag}`);
  });
  const enemyTeam = battleLog?.battle?.teams.find((team: BattlePlayer[]) => {
    return team.every((player: BattlePlayer) => player.tag !== `#${tag}`);
  });
  const starPlayerTag = battleLog?.battle?.starPlayer?.tag;
  const mode =
    battleLog?.event?.mode !== "unknown"
      ? battleLog?.event.mode
      : classifyModeByMapName(battleLog?.event?.map);
  const mapId = battleLog?.event?.id;

  return (
    <div className={styles.container} data-testid="battleLog">
      <div className={styles.topContainer}>
        <div className={styles.left}></div>
        <h5>
          {battleLog.battle.type === "friendly"
            ? battleLog?.battle?.type?.toUpperCase()
            : ""}
        </h5>
        {battleLog?.battleTime && (
          <div className={`${styles.right}  `}>
            <RelativeTime target={battleLog?.battleTime} />
          </div>
        )}
      </div>
      <div className={styles.middleContainer}>
        <Link className={styles.left} href={`/${locale}/maps/${mapId}`}>
          <Image
            src={`/modes/${mode}.png`}
            alt={battleLog?.event?.mode || "mode"}
            width={30}
            height={30}
            sizes="30px"
          />
          <div className={styles.modeAndMapContainer}>
            <h5>
              {battleLog?.event?.mode === "unknown"
                ? mode?.toUpperCase()
                : battleLog?.event?.mode?.toUpperCase()}
            </h5>
            <h6 style={{ WebkitTouchCallout: "none" } as React.CSSProperties}>
              {shortenMapName(battleLog?.event?.map)}
            </h6>
          </div>
        </Link>
        <h5
          className={
            battleLog?.battle?.result === "victory"
              ? styles.victory
              : battleLog?.battle?.result === "defeat"
                ? styles.defeat
                : styles.draw
          }
        >
          {battleLog?.battle?.result}
        </h5>
        <div className={styles.right}>
          {battleLog?.battle.type === "ranked" &&
          battleLog?.battle?.trophyChange ? (
            <>
              {battleLog?.battle?.trophyChange > 0
                ? `+${battleLog?.battle?.trophyChange}`
                : battleLog?.battle?.trophyChange}
              <Image
                src="/icon_trophy1.png"
                alt="trophy icon"
                width={15}
                height={15}
                sizes="15px"
              />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.bottomContainerInner}>
          <div className={styles.teamContainer}>
            {ownTeam?.map((player: BattlePlayer) => {
              return (
                <PlayerCard
                  key={player?.tag}
                  player={player}
                  starPlayerTag={starPlayerTag}
                  battleType={battleLog?.battle?.type}
                  locale={locale}
                />
              );
            })}
          </div>
          <div className={styles.vsContainer}>
            <strong>VS</strong>
            <Duration seconds={battleLog?.battle.duration} />
          </div>
          <div className={styles.teamContainer}>
            {enemyTeam?.map((player: BattlePlayer) => {
              return (
                <PlayerCard
                  key={player?.tag}
                  player={player}
                  starPlayerTag={starPlayerTag}
                  battleType={battleLog?.battle?.type}
                  locale={locale}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BattleLog3vs3;