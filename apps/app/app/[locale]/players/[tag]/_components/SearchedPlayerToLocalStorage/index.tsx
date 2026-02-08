"use client";

import { useEffect } from "react";

type SearchedPlayerLog = {
  tag: string;
  name: string;
}

export default function SearchedPlayerToLocalStorage({
  playerTag,
  playerName
}: {
  playerTag: string;
  playerName: string;
}) {
  // tagを整形
  const tag = playerTag.startsWith("#") ? playerTag.substring(1) : playerTag;

  useEffect(() => {
    addPlayerTagAndNameToLocalStorage(tag, playerName);
  },[])

  const addPlayerTagAndNameToLocalStorage = (tag: string, name: string) => {
    // windowがundefinedではない = クライアントサイド(ブラウザ)で動作してる場合のみ実行
    if (typeof window !== "undefined") {
      if (!tag || !name) return;

      // 検索済みのログリストを取得
      const searchedPlayerLogList: SearchedPlayerLog[] = JSON.parse(localStorage.getItem("searchedPlayerLogList") || "[]");
      
      // 現在検索中のプレイヤーをログリストから除外
      const filteredLogList = searchedPlayerLogList.filter(log => log.tag !== tag);

      // 現在検索中のプレイヤーをログリストの先頭に追加
      const updatedLogList = [ {tag, name}, ...filteredLogList];

      // 更新後のログリストをlocalStorageに保存
      localStorage.setItem("searchedPlayerLogList", JSON.stringify(updatedLogList));
    }
  }

  return null;
}