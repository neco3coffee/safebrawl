"use client";

import { useEffect, useRef } from "react";

export default function TrackSearchEvent({
  playerTag,
  playerName,
  iconId,
}: {
  playerTag: string;
  playerName: string;
  iconId: number;
}) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    fetch(`${apiUrl}/api/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        player_tag: playerTag,
        player_name: playerName,
        icon_id: iconId,
      }),
    }).catch(() => {});
  }, []);

  return null;
}
