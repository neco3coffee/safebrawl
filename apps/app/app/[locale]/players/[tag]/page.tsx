import { getTranslations } from "next-intl/server";
import styles from "./page.module.scss";
import { BattleLog, Player, Club, Member, Brawlers } from "shared/brawl-stars-api/types"
import SearchedPlayerToLocalStorage from "./_components/SearchedPlayerToLocalStorage";
import Link from "next/link";
import PlayerName from "./_components/PlayerName";
import Image from "next/image";
import PlayerStat from "./_components/PlayerStat";
import ClubName from "./_components/ClubName";
import { formatBattleLog } from "@/_libs/formatBattleLogs";
import BattleLogSoloRanked from "./_components/BattleLogSoloRanked";
import BattleLog3vs3 from "./_components/BattleLog3vs3";
import BattleLog5vs5 from "./_components/BattleLog5vs5";
import BattleLogTrio from "./_components/BattleLogTrio";
import BattleLogDuo from "./_components/BattleLogDuo";
import BattleLogSolo from "./_components/BattleLogSolo";
import BattleLogDuel from "./_components/BattleLogDuel";
import BattleLogLastStand from "./_components/BattleLogLastStand";

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ locale: string, tag: string }>;
}>) {
  const { locale, tag } = await params;
  
  const t = await getTranslations("playerDetail");

  const proxyTargetUrl = process.env.PROXY_TARGET_URL
  
  // プレイヤー情報とバトルログをネットワーク経由で並列取得
  // 並列で取得することで待ち時間を最小化
  console.time('fetch-parallel');
  const [playerInfoResponse, playerBattleLogResponse, brawlersResponse] = await Promise.all([
    fetch(`${proxyTargetUrl}/v1/players/%23${encodeURIComponent(tag)}`, {
      next: { revalidate: 60 }
    }),
    fetch(`${proxyTargetUrl}/v1/players/%23${encodeURIComponent(tag)}/battlelog`, {
      next: { revalidate: 60 }
    }),
    fetch(`${proxyTargetUrl}/v1/brawlers`, {
      next: { revalidate: 86400 }
    })
  ]);
  console.timeEnd('fetch-parallel');

  const playerInfo = await playerInfoResponse.json() as Player;
  const playerBattleLog = await playerBattleLogResponse.json() as BattleLog;
  const { items: allBrawlers} = await brawlersResponse.json() as Brawlers;

  // playerInfo -> clubInfoの順に依存関係があるため、直列で取得
  // このブロックのみで使用するためletを使用
  let clubInfo: Club | null;
  let matchedPlayer: Member | undefined;

  if (playerInfo.club.tag) {
    const clubInfoResponse = await fetch(`${proxyTargetUrl}/v1/clubs/${encodeURIComponent(playerInfo.club.tag)}`, {
      next: { revalidate: 3600 }
    })
    clubInfo = await clubInfoResponse.json();
    matchedPlayer = clubInfo?.members.find(member => member.tag === playerInfo.tag);
  } else {
    clubInfo = null;
    matchedPlayer = undefined;
  }

  const { items: battleLogItems } = playerBattleLog;
  const formattedBattleLogs = formatBattleLog(battleLogItems)

  // 検索中のプレイヤーが存在しなかった場合
  if (!playerInfo || !playerInfo?.tag) {
    return (
      <div className={styles.container}>
        <p>#{tag}</p>
        <p>{t("playerNotFound")}</p>
        <Link
          href={`/${locale}/home`}
          className={styles.goBackToHomeLink}
        >
          {t("goBackToHome")}
        </Link>
      </div>
    )
  }

  return (
    <>
      <SearchedPlayerToLocalStorage playerTag={tag} playerName={playerInfo.name} />
      {/* <div className={styles.container}>
        {name && <h2>{name}</h2>}
        <p data-testid="brawler-item-count">{brawlers && brawlers.length}</p>
        {battleLogItems.map((item, index) => (
          <div key={index} data-testid="battle-history-item" className={styles.battleHistoryItem}>
            <p>{item?.battle?.starPlayer?.name || "Unknown"}</p>
          </div>
        ))} 
      </div> */}
      <div className={styles.container}>

        {/* プロフィール　　キャラクター(98/99) */}
        <div className={styles.profileHeaderContainer}>
          <h4 className={styles.profileHeaderTitle}>{t("profile")}</h4>
          <Link
            href={`/${locale}/players/${encodeURIComponent(tag)}/brawlers`}
            className={styles.brawlersLink}
            >
            {t("brawlers")} ({playerInfo.brawlers.length}/{allBrawlers.length})
          </Link>
        </div>

        {/* アイコン  名前 */}
        {/*  タグ         */}
        <div className={styles.playerInfoContainer}>
          <div className={styles.iconAndTagContainer}>
            <Image
              src={`https://cdn.brawlify.com/profile-icons/regular/${playerInfo.icon.id}.png`}
              alt="Player Icon"
              width={80}
              height={80}
              sizes={"80px"}
              />
            <h3 className={styles.playerTag}>{playerInfo.tag}</h3>
          </div>
          <div className={styles.nameContainer}>
            <PlayerName name={playerInfo.name} nameColor={playerInfo.nameColor} />
          </div>
        </div>

        {/* シーズン記録　 3対3勝利数 */}
        {/*  歴代記録      勝利数    */}
        <div className={styles.playerStatsContainer}>
          <PlayerStat
            label={t("seasonHigh")}
            imagePath="/icon_trophy1.png"
            value={playerInfo.trophies}
            />
          <PlayerStat
            label={t("allTimeHigh")}
            imagePath="/icon_trophy1.png"
            value={playerInfo.highestTrophies}
            />
          <PlayerStat
            label={t("3vs3Victories")}
            imagePath="/3vs3.png"
            value={playerInfo["3vs3Victories"]}
            />
          <PlayerStat
            label={t("victories")}
            imagePath="https://cdn.brawlify.com/game-modes/regular/48000006.png"
            value={playerInfo.soloVictories + playerInfo.duoVictories}
            />
        </div>

        {/* クラブバッチ   クラブ名  */}
        {/*              ロール */}
        <Link 
          href={clubInfo?.tag ? `/${locale}/clubs/${clubInfo.tag.substring(1)}` : `#`}
          className={styles.playerClubContainer}
          >
          {
            clubInfo && clubInfo.badgeId ? (
              <Image
              src={`https://cdn.brawlify.com/club-badges/regular/${clubInfo.badgeId}.png`}
              alt=""
              width={32}
              height={36}
              sizes="32px"
              />
            ) : (
              <></>
            )
          }
          <div className={styles.clubNameContainer}>
            <ClubName
              clubName={clubInfo?.name}
              roleText={matchedPlayer ? t(matchedPlayer?.role) : ""}
              notInClubText={t("notInClub")}
              />
          </div>
        </Link>

        {/* バトル履歴 */}
        <div className={styles.battleLogContainer}>
          <h2 className={styles.battleLogTitle}>{t("battleLog")}</h2>
          {
            formattedBattleLogs.map((battleLog) => {
              if (battleLog.rounds) {
                return (
                  <BattleLogSoloRanked
                    key={battleLog?.battleTime}
                    battleLog={battleLog}
                    ownTag={tag}
                    locale={locale}
                  />
                )
              } else if (
                battleLog.battle.teams &&
                battleLog.battle.teams.length === 2 &&
                battleLog.battle.teams[0].length === 3
              ) {
                return (
                  <BattleLog3vs3
                    key={battleLog?.battleTime}
                    battleLog={battleLog}
                    ownTag={tag}
                    locale={locale}
                  />
                )
              } else if (
                  battleLog.battle.teams &&
                  battleLog.battle.teams.length === 2 &&
                  battleLog.battle.teams[0].length === 5
                ) {
                  return (
                    <BattleLog5vs5
                      key={battleLog?.battleTime}
                      battleLog={battleLog}
                      ownTag={tag}
                      locale={locale}
                    />
                  );
                } else if (
                  battleLog.battle.teams &&
                  battleLog.battle.teams.length === 4
                ) {
                  return (
                    <BattleLogTrio
                      key={battleLog?.battleTime}
                      battleLog={battleLog}
                      ownTag={tag}
                      locale={locale}
                    />
                  );
                } else if (
                  battleLog.battle.teams &&
                  battleLog.battle.teams.length === 5
                ) {
                  return (
                    <BattleLogDuo
                      key={battleLog?.battleTime}
                      battleLog={battleLog}
                      ownTag={tag}
                      locale={locale}
                    />
                  );
                } else if (
                  battleLog.battle.players &&
                  battleLog.battle.players.length === 10
                ) {
                  return (
                    <BattleLogSolo
                      key={battleLog?.battleTime}
                      battleLog={battleLog}
                      ownTag={tag}
                      locale={locale}
                    />
                  );
                } else if (
                  battleLog.battle.players &&
                  battleLog.battle.players.length === 2
                ) {
                  return (
                    <BattleLogDuel
                      key={battleLog?.battleTime}
                      battleLog={battleLog}
                      ownTag={tag}
                      locale={locale}
                    />
                  );
                } else if (
                  battleLog.battle.players &&
                  battleLog.battle.players.length === 3 &&
                  battleLog.battle.level
                ) {
                  return (
                    <BattleLogLastStand
                      key={battleLog?.battleTime}
                      battleLog={battleLog}
                      ownTag={tag}
                      locale={locale}
                    />
                  );
                } else if (
                  battleLog.battle.type === "friendly" &&
                  battleLog.battle.teams &&
                  battleLog.battle.teams.length === 2
                ) {
                  return (
                    <BattleLog3vs3
                      key={battleLog?.battleTime}
                      battleLog={battleLog}
                      ownTag={tag}
                    />
                  );
                } else {
                return (
                  <div 
                    key={battleLog?.battleTime}
                  >
                    safebrawlがまだ対応していない試合形式です🙇‍♂️
                  </div>
                )
              }
            })
          }
        </div>

      </div>

      {/* <pre>{JSON.stringify(playerInfo, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(clubInfo, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(playerBattleLog, null, 2)}</pre> */}
    </>
  )
  
}