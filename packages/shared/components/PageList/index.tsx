
import styles from "./index.module.scss";

const webURL = process.env.NEXT_PUBLIC_ENV === "local" ? "http://localhost:3111" 
  : process.env.NEXT_PUBLIC_ENV === "dev" ? "https://dev-web.safebrawl.com" 
  : "https://safebrawl.com";
const appURL = process.env.NEXT_PUBLIC_ENV === "local" ? "http://localhost:3333" 
  : process.env.NEXT_PUBLIC_ENV === "dev" ? "https://dev-app.safebrawl.com" 
  : "https://app.safebrawl.com";

const paths = [
  {
    "url": webURL,
    "path": "/",
    "name": "ランディングページ",
    "implemented": false,
    "cache-duration": "1 year"
  },
  {
    "url": appURL,
    "path": "/home",
    "name": "ホームページ",
    "implemented": false,
    "cache-duration": "1 hour"
  },
  {
    "url": appURL,
    "path": "/players/Y2YPGCGC",
    "name": "プレイヤー詳細ページ",
    "implemented": false,
    "cache-duration": "1 minute"
  },
  {
    "url": appURL,
    "path": "/players/Y2YPGCGC/stats",
    "name": "プレイヤー統計ページ(ワンクリックでXでシェアできる画像生成)",
    "implemented": false,
    "cache-duration": "1 hour"
  },
  {
    "url": appURL,
    "path": "/maps/123456",
    "name": "マップ詳細ページ(マップ画像&使用キャラランキング&勝率)",
    "implemented": false,
    "cache-duration": "1 hour"
  },
  {
    "url": appURL,
    "path": "/login",
    "name": "ログインページ",
    "implemented": false,
    "cache-duration": "No Cache(cookie)"
  },
  {
    "url": appURL,
    "path": "/myAccount",
    "name": "マイアカウントページ(ログイン中プレイヤー表示&ポイント確認&ブロスタパス応募)",
    "implemented": false,
    "cache-duration": "No Cache(cookie) -> clientでSWR(5分)"
  },
  {
    "url": appURL,
    "path": "/ranked",
    "name": "ガチバトルページ(プレイヤー報告&バトル履歴&自動記録トグル)",
    "implemented": false,
    "cache-duration": "No Cache(cookie) -> clientでSWR(1分)"
  },
  {
    "url": appURL,
    "path": "/reportedPlayerList",
    "name": "レポート済みプレイヤー一覧ページ(オンライン状況順に表示)",
    "implemented": false,
    "cache-duration": "No Cache(cookie) -> clientでSWR(1分)"
  },
  {
    "url": appURL,
    "path": "/brawlstarsPass",
    "name": "ブロスタパス応募ページ(ポイント使用&応募履歴確認)",
    "implemented": false,
    "cache-duration": "No Cache(cookie) -> clientでSWR(5分)"
  }
]
const locales = ['ja', 'en'] as const;

type Locale = (typeof locales)[number];

export default function PageList({
  locale,
}: {
  locale: Locale;
}) {
  return (
    <div className={styles.container}>
      
      <a href={`${appURL}/api`} >疎通確認リンク appURL/api</a>
      <ul className={styles.pageList}>
        {paths.map(({url, path, name, implemented, "cache-duration": cacheDuration}) => (
          <li key={path} className={styles.pageListItem}>
              <a href={`${url}/${locale}${path}`} className={styles.pageLink}>
                {implemented ? "✅" : "🔲"}  {name} ja{path} <br /> {cacheDuration}
              </a>
          </li>
        ))}
      </ul>
    </div>
  )


}