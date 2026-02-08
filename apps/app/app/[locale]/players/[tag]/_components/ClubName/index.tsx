import styles from "./index.module.scss"


type ClubNameProps = {
  clubName?: string
  roleText?: string
  notInClubText: string
}

export default function ClubName({
  clubName,
  roleText,
  notInClubText,
}: ClubNameProps) {
  if (!clubName) {
    return <span>{notInClubText}</span>
  }
  
  // クラブ名に <c0>B • W</c> みたいな色コードが含まれている場合に除去しつつ、0-9の色コードに応じて色を変える
  const clubNameRegex = /<c([0-9])>(.*?)<\/c>/;
  const match = clubName.match(clubNameRegex);

  if (match) {
    const colorCode = match[1];
    const name = match[2];
    return (
      <div className={styles.container}>
        {/* global.cssに--club-color-c? を登録済み */}
        <h3 style ={{ color: `var(--club-color-c${colorCode})`}}>{name}</h3>
        <h5>{roleText}</h5>
      </div>
    )
  } else {
    return (
      <div className={styles.container}>
        <h3 style={{ color: "var(--white)"}}>{clubName}</h3>
        <h5>{roleText}</h5>
      </div>
    )
  }
}