import Image from "next/image"
import { shortenMapName } from "@/_libs/common"
import { Duration, RelativeTime } from "@/_libs/time"
import { classifyModeByMapName } from "@/_libs/unknownMode"
import Link from "next/link"
import PlayerCard from "../PlayerCard"
import styles from "./index.module.scss"
import { BattleLogItem, BattlePlayer } from "shared/brawl-stars-api/types"


const BattleLogDuel = ({ battleLog, ownTag, locale }: {
  battleLog: BattleLogItem
  ownTag: string
  locale: string
}) => {
  const mode =
    battleLog?.event?.mode !== "unknown"
      ? battleLog?.event.mode
      : classifyModeByMapName(battleLog?.event?.map);
  const starPlayerTag = battleLog?.battle?.starPlayer?.tag;
  const tag = ownTag.trim().toUpperCase().replace(/O/g, "0");
  const me = battleLog?.battle?.players?.find(
    (player: BattlePlayer) => player?.tag === `#${tag}`,
  );
  const enemy = battleLog?.battle?.players?.find(
    (player: BattlePlayer) => player?.tag !== `#${tag}`,
  );
  const isDuel = true;
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
            <div></div>
          )}
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.bottomContainerInner}>
          {me && (
            <PlayerCard
              player={me}
              starPlayerTag={starPlayerTag}
              battleType={battleLog?.battle?.type}
              isDuel={isDuel}
              locale={locale}
            />
          )}
          <div className={styles.vsContainer}>
            <strong>VS</strong>
            <Duration seconds={battleLog?.battle.duration} />
          </div>
          {enemy && (
            <PlayerCard
              player={enemy}
              starPlayerTag={starPlayerTag}
              battleType={battleLog?.battle?.type}
              isDuel={isDuel}
              locale={locale}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BattleLogDuel;
