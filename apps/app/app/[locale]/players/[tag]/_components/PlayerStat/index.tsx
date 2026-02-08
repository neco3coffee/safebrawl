import Image from "next/image";
import styles from "./index.module.scss"

type PlayerStatProps = {
  label: string;
  imagePath: string;
  value: number;
}


export default function PlayerStat({
  label,
  imagePath,
  value
}: PlayerStatProps) {
  return (
    <div className={styles.container}>
      <h5>{label}</h5>
      <div className={styles.statContainer}>
        <Image
          src={imagePath}
          alt={label}
          width={28}
          height={28}
          sizes={"28px"}
        />
        <p>{value}</p>
      </div>
    </div>
  )
}