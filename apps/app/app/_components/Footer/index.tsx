"use client";
import styles from "./index.module.scss";
import Link from "next/link";
import { UserRound, House, ScrollText} from "lucide-react";
import { usePathname } from "next/navigation";


export default function Footer({
  locale,
}: {
  locale: string;
}) {
  const pathname = usePathname();
  
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link href={`/${locale}/profile`} className={`${styles.footerLink} ${pathname.includes('/profile') ? styles.isLinkActive : ""}`}>
          <UserRound className={styles.footerIcon} />
        </Link>
        <Link href={`/${locale}/home`} className={`${styles.footerLink} ${pathname.includes('/home') ? styles.isLinkActive : ""}`}>
          <House className={styles.footerIcon} />
        </Link>
        <Link href={`/${locale}/list`} className={`${styles.footerLink} ${pathname.includes('/list') ? styles.isLinkActive : ""}`}>
          <ScrollText className={styles.footerIcon} />
        </Link>
      </div>
    </footer>
  )
}