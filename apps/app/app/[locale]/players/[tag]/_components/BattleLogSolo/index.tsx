
import Image from "next/image"
import { shortenMapName } from "@/_libs/common"
import { Duration, RelativeTime } from "@/_libs/time"
import { classifyModeByMapName } from "@/_libs/unknownMode"
import Link from "next/link"
import PlayerCard from "../PlayerCard"
import styles from "./index.module.scss"
import { BattleLogItem, BattlePlayer } from "shared/brawl-stars-api/types"


const BattleLogSolo = ({ battleLog, ownTag, locale }: {
  battleLog: BattleLogItem
  ownTag: string
  locale: string
}) => {
  const tag = ownTag.trim().toUpperCase().replace(/O/g, "0");
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
            {/* TODO:DADGEBALLじゃなくてDOGDEBRAWLって表示できるようにする */}
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
            (battleLog?.battle?.rank ?? 0) < 4 ? styles.victory : styles.defeat
          }
        >
          {battleLog?.battle?.rank !== undefined
            ? battleLog?.battle?.rank
            : ""}
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
            <div></div>
          )}
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.bottomContainerInner}>
          {battleLog?.battle.players.map((player: BattlePlayer) => {
            return (
              <div className={styles.playerWrapper} key={player?.tag}>
                {
                  <PlayerCard
                    key={player?.tag}
                    player={player}
                    starPlayerTag={starPlayerTag}
                    battleType={battleLog?.battle?.type}
                    locale={locale}
                  />
                }
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BattleLogSolo;
