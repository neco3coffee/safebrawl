import styles from "./index.module.scss"

type PlayerNameProps = {
  name: string;
  nameColor?: string;
}

// normalizeColor(0xffff8afb) => #ff8afb
export const normalizeColor = (nameColor?: string | null) => {
  const defaultColor = "#fff"
  if (!nameColor) return defaultColor;
  const normalized = nameColor.toString().replace(/^0x/i, "");
  if (normalized.length < 6) return defaultColor;
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
      style={{color: nameColorCode}}
    >
      {name}
    </h2>
  )
}