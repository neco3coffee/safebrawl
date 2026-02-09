/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { shortenMapName } from "@/_libs/common"
import { Duration, RelativeTime } from "@/_libs/time"
import { classifyModeByMapName } from "@/_libs/unknownMode"
import Link from "next/link"
import PlayerCard from "../PlayerCard"
import styles from "./index.module.scss"
import { BattleLogItem, BattlePlayer, Round } from "shared/brawl-stars-api/types"


const BattleLogSoloRanked = ({ battleLog, ownTag, locale}: {
  battleLog: BattleLogItem
  ownTag: string
  locale: string
}) => {
  const tag = ownTag.trim().toUpperCase().replace(/O/g, "0");
  const ownTeam = battleLog?.battle?.teams?.find((team: BattlePlayer[]) => {
    return team.some((player: BattlePlayer) => player.tag === `#${tag}`);
  });
  const enemyTeam = battleLog?.battle?.teams?.find((team: BattlePlayer[]) => {
    return team.every((player: BattlePlayer) => player.tag !== `#${tag}`);
  })
  const starPlayerTag = battleLog?.battle?.starPlayer?.tag;
  const mode =
    battleLog?.event?.mode !== "unknown"
      ? battleLog?.event.mode
      : classifyModeByMapName(battleLog?.event?.map);
  const mythic1 = 12; // diamond1 = 9, mythic1 = 12, legendary1 = 15, master1 = 18, pro = 21
  const existAtLeastMythic1 = battleLog?.battle?.teams?.flat()
    .some((player: any) => {
      return (
        player?.brawler?.trophies - 1 >= mythic1 &&
        player?.brawler?.trophies <= 21
      )
    })
  let result = null;
  if (existAtLeastMythic1) {
    result = getResult(battleLog?.rounds)
  } else {
    result = battleLog?.battle.result;
  }
  const t = getTranslations("playerDetail");
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
            result === "victory"
              ? styles.victory
              : result === "defeat"
                ? styles.defeat
                : result === "ongoing"
                  ? styles.ongoing
                  : styles.draw
          }
        >
          {/* FIXME: t(resuot)のように多言語対応しつつ, このコンポーネントはserverで描画したいかも */}
          {result}
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
        <div className={styles.roundsContainer}>
          {battleLog?.rounds?.map((round: Round, index: number) => {
            return (
              <div
                key={`${index}-${round.duration}`}
                className={styles.roundContainer}
              >
                <div className={styles.left}>
                  <h6>ROUND {index + 1}</h6>
                  <Duration seconds={round?.duration} />
                </div>
                <h5
                  className={
                    round.result === "victory"
                      ? styles.victory
                      : round.result === "defeat"
                        ? styles.defeat
                        : styles.draw
                  }
                >
                  {/* FIXME: t(round?.result)のように多言語対応したいかも */}
                  {round?.result} 
                </h5>
                <div className={styles.right}>
                  {/* <button type="button" className={styles.reportButton}>
                    REPORT <TriangleAlert className={styles.icon} />
                  </button> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default BattleLogSoloRanked;

const getResult = (rounds: Round[] | undefined) => {
  if (!rounds) return "undefined"
  const victoryCount = rounds.filter(
    (round) => round.result === "victory",
  ).length;
  const defeatCount = rounds.filter(
    (round) => round.result === "defeat",
  ).length;

  if (victoryCount >= 2) return "victory";
  if (defeatCount >= 2) return "defeat";
  if (rounds.length < 3) return "ongoing";
  return "draw"
}