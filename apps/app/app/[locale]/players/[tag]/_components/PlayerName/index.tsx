import styles from "./index.module.scss"

type PlayerNameProps = {
  name: string;
  nameColor?: string;
}

// normalizeColor(0xffff8afb) => #ff8afb
const normalizeColor = (nameColor?: string | null) => {
  if (!nameColor) return undefined;
  const normalized = nameColor.toString().replace(/^0x/i, "");
  if (normalized.length < 6) return undefined;
  return `#${normalized.slice(-6)}`
}

export default function PlayerName({
  name,
  nameColor
}: PlayerNameProps) {
  const nameColorCode = normalizeColor(nameColor);

  return (
    <h2 
      className={styles.playerName}
      style={nameColorCode ? { color: nameColorCode} : undefined}
    >
      {name}
    </h2>
  )

}