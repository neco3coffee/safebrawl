"use client";
// RelativeTime.tsx
import type React from "react";
import { useEffect, useState } from "react";

type Props = {
  target: string; // e.g. "20250927T154245.000Z"
  updateInterval?: number; // Update interval (ms), default 1 minute
};

function formatRelativeTime(targetIsoString: string, now: Date): string {
  const iso = targetIsoString.replace(
    /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})\.000Z$/,
    "$1-$2-$3T$4:$5:$6.000Z",
  );
  const targetDate = new Date(iso);

  let diff = now.getTime() - targetDate.getTime();
  if (diff < 0) diff = 0;

  const SECOND = 1000;
  const MINUTE = SECOND * 60;
  const HOUR = MINUTE * 60;
  const DAY = HOUR * 24;

  const days = Math.floor(diff / DAY);
  diff -= days * DAY;
  const hours = Math.floor(diff / HOUR);
  diff -= hours * HOUR;
  const minutes = Math.floor(diff / MINUTE);

  let result = "";
  if (days > 0) result += `${days}d`;
  if (hours > 0) result += `${hours}h`;
  if (minutes > 0) result += `${minutes}m`;
  result = result.trim() || "just now";
  if (result !== "just now") result += " ago";
  return result;
}

export const RelativeTime: React.FC<Props> = ({
  target,
  updateInterval = 60000,
}) => {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => {
      setNow(new Date());
    }, updateInterval);
    return () => clearInterval(timer);
  }, [updateInterval]);

  if (!now) return <span>just now</span>;

  return <span>{formatRelativeTime(target, now)}</span>;
};

const formatDuration = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m === 0 ? `${s}s` : `${m}m${s}s`;
};

export const Duration: React.FC<{ seconds: number }> = ({ seconds }) => {
  return <time dateTime={`PT${seconds}S`}>{formatDuration(seconds)}</time>;
};
