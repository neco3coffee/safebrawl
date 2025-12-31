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

export interface Gadget {
  id: number
  name: string
}