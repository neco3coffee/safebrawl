export const shortenMapName = (mapName: string) => {
  const shortenMapName =
    mapName?.length > 18 ? `${mapName?.slice(0, 18)}...` : mapName;
  return shortenMapName;
};

export const shortenPlayerName = (name: string) => {
  const shortenName =
    name && Array.from(name).length > 4
      ? `${Array.from(name).slice(0, 4).join("")}...`
      : name;
  return shortenName;
};

// https://github.com/Brawlify/CDN/blob/master/ranked/tiered/58000000.png
// 上記の画像へのアクセスに必要な８桁の文字列を生成するための関数です。
// 58000000 -> 58000001 -> 58000002 ... の順番でrankのtieredが増えていきます。
// なぜかバトルタイプsoloRankedのplayer.brawler.trophiesにはバトル時のガチバトルのランク情報があります。
// player.brawler.trophies = 13 (エリート2) 14(エリート3) 15(レジェンド1) ...
// base = 58000000
// appendToEightDigits(base, player.brawler.trophies) => "58000013"
// https://github.com/Brawlify/CDN/blob/master/ranked/tiered/58000013.png
export const appendToEightDigits = (base: number, num: number) => {
  const baseStr = base.toString();
  const numStr = num.toString();

  return baseStr.slice(0, 8 - numStr.length) + numStr;
};