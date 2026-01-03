'use client';

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function PlayerTagInput() {
  const params = useParams();
  const locale = params.locale as string;
  const router = useRouter();
  const [playerTag, setPlayerTag] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && playerTag.trim()) {
      router.push(`/${locale}/players/${encodeURIComponent(playerTag.trim())}`);
    }
  };

  return (
    <input 
      type="text" 
      placeholder={'Y2YPGCGC'} 
      data-testid="player-tag-input"
      value={playerTag}
      onChange={(e) => setPlayerTag(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}
