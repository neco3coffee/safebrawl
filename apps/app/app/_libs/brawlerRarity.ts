const normal = ["SHELLY"];

const rare = [
  "NITA",
  "COLT",
  "BULL",
  "BROCK",
  "EL PRIMO",
  "BARLEY",
  "POCO",
  "ROSA",
];

const superRare = [
  "JESSIE",
  "DYNAMIKE",
  "TICK",
  "8-BIT",
  "RICO",
  "DARRYL",
  "PENNY",
  "CARL",
  "JACKY",
  "GUS",
];

const hyperRare = [
  "BO",
  "EMZ",
  "STU",
  "PIPER",
  "PAM",
  "FRANK",
  "BIBI",
  "BEA",
  "NANI",
  "EDGAR",
  "GRIFF",
  "GROM",
  "BONNIE",
  "GALE",
  "COLETTE",
  "BELLE",
  "ASH",
  "LOLA",
  "SAM",
  "MANDY",
  "MAISIE",
  "HANK",
  "PEARL",
  "LARRY & LAWRIE",
  "ANGELO",
  "BERRY",
  "SHADE",
  "MEEPLE",
  "TRUNK",
];

const ultraRare = [
  "MORTIS",
  "TARA",
  "GENE",
  "MAX",
  "MR. P",
  "SPROUT",
  "BYRON",
  "SQUEAK",
  "LOU",
  "RUFFS",
  "BUZZ",
  "FANG",
  "EVE",
  "JANET",
  "OTIS",
  "BUSTER",
  "GRAY",
  "R-T",
  "WILLOW",
  "DOUG",
  "CHUCK",
  "CHARLIE",
  "MICO",
  "MELODIE",
  "LILY",
  "CLANCY",
  "MOE",
  "JUJU",
  "OLLIE",
  "LUMI",
  "MINA",
  "FINX",
  "JAE-YONG",
  "ALLI",
  "GIGI",
  "GLOWBERT",
  "ZIGGY"
];

const legendary = [
  "SPIKE",
  "CROW",
  "LEON",
  "SANDY",
  "AMBER",
  "MEG",
  "SURGE",
  "CHESTER",
  "CORDELIUS",
  "KIT",
  "DRACO",
  "KENJI",
  "PIERCE",
];

const _ultraLegendary = ["KAZE"];

export const brawlerBgColor = (name: string) => {
  if (normal.includes(name)) return "#94D7F4";
  if (rare.includes(name)) return "#2EDD1B";
  if (superRare.includes(name)) return "#0087FA";
  if (hyperRare.includes(name)) return "#B116EC";
  if (ultraRare.includes(name)) return "#FF0021";
  if (legendary.includes(name)) return "#FFF11E";
  return "#262626";
};
