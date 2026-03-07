"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.scss";

type SearchEvent = {
  id: number;
  player_tag: string;
  player_name: string | null;
  icon_id: number | null;
  country: string | null;
  created_at: number;
};

function timeAgo(createdAt: number): string {
  const diffSec = Math.floor(Date.now() / 1000) - createdAt;
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  return `${diffHr}h ago`;
}

function countryFlag(country: string | null): string {
  if (!country || country.length !== 2) return "🌐";
  return country
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}

export default function LiveFeed({ locale }: { locale: string }) {
  const [feed, setFeed] = useState<SearchEvent[]>([]);
  const lastIdRef = useRef<number | null>(null);
  const newIdsRef = useRef<Map<number, number>>(new Map());
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // 初回取得
  useEffect(() => {
    if (!apiUrl) return;

    fetch(`${apiUrl}/api/feed`)
      .then((r) => r.json<{ events: SearchEvent[] }>())
      .then(({ events }) => {
        if (events.length > 0) {
          lastIdRef.current = events[0].id;
          setFeed(events);
        }
      })
      .catch(() => {});
  }, []);

  // 5秒ポーリングで差分取得
  useEffect(() => {
    if (!apiUrl) return;

    const interval = setInterval(() => {
      if (lastIdRef.current === null) return;

      fetch(`${apiUrl}/api/feed?after=${lastIdRef.current}`)
        .then((r) => r.json<{ events: SearchEvent[] }>())
        .then(({ events }) => {
          if (events.length === 0) return;
          lastIdRef.current = events[events.length - 1].id;
          const reversed = events.reverse();
          reversed.forEach((e, i) => newIdsRef.current.set(e.id, reversed.length - 1 -i));
          setFeed((prev) => [...reversed, ...prev].slice(0, 100));
          // アニメーション終了後にnewIdsをクリア
          setTimeout(() => {
            reversed.forEach((e) => newIdsRef.current.delete(e.id));
          }, 800);
        })
        .catch(() => {});
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (feed.length === 0) return null;

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {feed.map((event) => {
          const tag = event.player_tag.startsWith("#")
            ? event.player_tag.slice(1)
            : event.player_tag;
          const newIndex = newIdsRef.current.get(event.id);
          const isNew = newIndex !== undefined;
          return (
            <Link
              key={event.id}
              href={`/${locale}/players/${tag}`}
              className={`${styles.card} ${isNew ? styles.cardNew : ""}`}
              style={isNew ? { animationDelay: `${newIndex! * 300}ms` } : undefined}
            >
              {event.icon_id && (
                <Image
                  src={`https://cdn.brawlify.com/profile-icons/regular/${event.icon_id}.png`}
                  alt=""
                  width={36}
                  height={36}
                  sizes="36px"
                  unoptimized
                  className={styles.icon}
                />
              )}
              <div className={styles.info}>
                <span className={styles.name}>
                  {event.player_name ?? tag}
                </span>
                <span className={styles.tag}>#{tag}</span>
                <span className={styles.meta}>
                  {countryFlag(event.country)}
                  <span className={styles.metaTime}>· {timeAgo(event.created_at)}</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
