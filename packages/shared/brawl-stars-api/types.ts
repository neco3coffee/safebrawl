export interface Player {
  tag: string
  name: string
  nameColor: string
  icon: {
    id: number
  }
  trophies: number
  highestTrophies: number
  expLevel: number
  expPoints: number
  isQualifiedFromChampionshipChallenge: boolean
  '3vs3Victories': number
  soloVictories: number
  duoVictories: number
  bestRoboRumbleTime: number
  bestTimeAsBigBrawler: number
  clug: {
    tag: string
    name: string
  }
  brawlers: Array<Brawler>
}

export interface Brawler {
  id: number
  name: string
  power: number
  rank: number
  trophies: number
  highestTrophies: number
  maxWinStreak: number
  gears: Gear[] | []
  starPowers: StarPower[] | []
  gadgets: Gadget[] | []
  currentWinStreak: number
}

export interface Gear {
  id: number
  name: string
  level?: number
}

export interface StarPower {
  id: number
  name: string
}
// Battle Log Types
export interface BattleLog {
  items: BattleLogItem[]
  paging: {
    cursors: Record<string, unknown>
  }
}

export interface BattleLogItem {
  battleTime: string
  event: BattleEvent
  battle: Battle
}

export interface BattleEvent {
  id: number
  mode: string
  modeId: number
  map: string
}

export interface Battle {
  mode: string
  type: string
  result: 'victory' | 'defeat' | 'draw'
  duration: number
  trophyChange: number
  starPlayer: BattlePlayer
  teams: BattlePlayer[][]
}

export interface BattlePlayer {
  tag: string
  name: string
  brawler: BattleBrawler
}

export interface BattleBrawler {
  id: number
  name: string
  power: number
  trophies: number
}
export interface Gadget {
  id: number
  name: string
}