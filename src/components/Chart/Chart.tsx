"use client";

import BubbleChart from "@/components/BubbleChart/BubbleChart";
import { lastFmFetcher } from "@/app/api/lastFm/fetcher";
import { useEffect, useState } from "react";
import { TrackArrayWithType } from "@/types/itemTypes";
import LoadingSpinner from "../LoadingSpinner";
import { ArtistDetail } from "@/types/lastFmTypes";

function TopArtistsChart() {
  const [topArtistsDataWithType, setTopArtistsDataWithType] = useState<{
    type: string;
    items: ArtistDetail[];
  }>();

  const [tagTopAlbumsDataWithType, setTagTopAlbumsDataWithType] =
    useState<TrackArrayWithType>();

  useEffect(() => {
    const fetchTopArtists = async () => {
      const data = await lastFmFetcher.fetchTopArtists();
      const dataWithType = {
        type: "artist",
        items: data.artists.artist.slice(0, 30),
      };
      setTopArtistsDataWithType(dataWithType);
    };

    fetchTopArtists();
  }, []);

  return (
    <>
      {topArtistsDataWithType ? (
        <div className="-pl-12 mb-12">
          <BubbleChart arr={topArtistsDataWithType} />
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
export default TopArtistsChart;
