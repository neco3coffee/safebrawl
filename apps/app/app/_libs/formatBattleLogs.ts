import { BattleLogItem, BattlePlayer, Player, Round } from "shared/brawl-stars-api/types";


export const formatBattleLog = (battleLogs: BattleLogItem[]) => {
  const formattedBattleLogs: BattleLogItem[] = [];
  battleLogs.forEach((battleLog: BattleLogItem) => {
    if (battleLog.battle.type === "soloRanked") {
      const existingBattle = formattedBattleLogs.find((b) => {
        if (!b?.battle?.teams) {
          return false;
        }

        const beforeBattleLogId = b.battle.teams
          .flat()
          .map((player: BattlePlayer) => player.tag)
          .sort()
          .join("-");
        const currentBattleLogId = battleLog.battle.teams?.flat()
          .map((player: BattlePlayer) => player.tag)
          .sort()
          .join("-");
        return beforeBattleLogId === currentBattleLogId;
      });
      const roundData = {
        battleTime: battleLog.battleTime,
        result: battleLog.battle.result,
        duration: battleLog.battle.duration,
      };
      if (existingBattle) {
        existingBattle?.rounds?.push(roundData);
        existingBattle?.rounds?.sort((a: Round, b: Round) =>
          a.battleTime.localeCompare(b.battleTime),
        );
      } else {
        battleLog.rounds = [roundData];
        formattedBattleLogs.push(battleLog);
      }
    } else {
      formattedBattleLogs.push(battleLog);
    }
  });
  return formattedBattleLogs;
};