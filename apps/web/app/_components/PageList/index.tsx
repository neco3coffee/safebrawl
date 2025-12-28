
import { routing } from "../../_i18n/routing"
import Link from "next/link";
import styles from "./index.module.scss";

const paths = [
  {
    "path": "/",
    "name": "ランディングページ",
    "implemented": false,
    "cache-duration": "1 year"
  },
  {
    "path": "/home",
    "name": "ホームページ",
    "implemented": false,
    "cache-duration": "1 hour"
  },
  {
    "path": "/players/Y2YPGCGC",
    "name": "プレイヤー詳細ページ",
    "implemented": false,
    "cache-duration": "1 minute"
  },
  {
    "path": "/players/Y2YPGCGC/stats",
    "name": "プレイヤー統計ページ(ワンクリックでXでシェアできる画像生成)",
    "implemented": false,
    "cache-duration": "1 hour"
  },
  {
    "path": "/maps/123456",
    "name": "マップ詳細ページ(マップ画像&使用キャラランキング&勝率)",
    "implemented": false,
    "cache-duration": "1 hour"
  },
  {
    "path": "/login",
    "name": "ログインページ",
    "implemented": false,
    "cache-duration": "No Cache(cookie)"
  },
  {
    "path": "/myAccount",
    "name": "マイアカウントページ(ログイン中プレイヤー表示&ポイント確認&ブロスタパス応募)",
    "implemented": false,
    "cache-duration": "No Cache(cookie) -> clientでSWR(5分)"
  },
  {
    "path": "/ranked",
    "name": "ガチバトルページ(プレイヤー報告&バトル履歴&自動記録トグル)",
    "implemented": false,
    "cache-duration": "No Cache(cookie) -> clientでSWR(1分)"
  },
  {
    "path": "/reportedPlayerList",
    "name": "レポート済みプレイヤー一覧ページ(オンライン状況順に表示)",
    "implemented": false,
    "cache-duration": "No Cache(cookie) -> clientでSWR(1分)"
  },
  {
    "path": "/brawlstarsPass",
    "name": "ブロスタパス応募ページ(ポイント使用&応募履歴確認)",
    "implemented": false,
    "cache-duration": "No Cache(cookie) -> clientでSWR(5分)"
  }
]

type Locale = (typeof routing.locales)[number];

export default function PageList({
  locale,
}: {
  locale: Locale;
}) {
  return (
    <div className={styles.container}>
      <h1>プロジェクト構成を変えた変更が正常にgithub actionsからデプロイされ反映されてるか確認テキスト!1</h1>
      <ul className={styles.pageList}>
        {paths.map(({path, name, implemented, "cache-duration": cacheDuration}) => (
          <li key={path} className={styles.pageListItem}>
              <Link href={`/${locale}${path}`} className={styles.pageLink}>
                {implemented ? "✅" : "🔲"}  {name} ja{path} <br /> {cacheDuration}
              </Link>
          </li>
        ))}
      </ul>
    </div>
  )


}