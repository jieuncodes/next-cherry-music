"use client";

import { lastFmFetcher } from "@/app/api/lastFm/fetcher";
import { TrackArrayWithType } from "@/types/itemTypes";
import { useEffect, useState } from "react";
import HorizontalTiles from "../Tile/HorizontalTiles";

function TopTags() {
  const [tagTopAlbumsDataWithType, setTagTopAlbumsDataWithType] =
    useState<TrackArrayWithType>();

  useEffect(() => {
    const fetchTopTags = async () => {
      const data = await lastFmFetcher.fetchTopTags();
      const dataWithType = {
        type: "hashtag",
        items: data.tags.tag,
      };
      setTagTopAlbumsDataWithType(dataWithType);
    };
    fetchTopTags();
  }, []);
  return (
    <>
      {tagTopAlbumsDataWithType && (
        <HorizontalTiles
          sectionTitle="Top Tags"
          arr={tagTopAlbumsDataWithType}
          nav
          isHashtag
        />
      )}
    </>
  );
}
export default TopTags;
