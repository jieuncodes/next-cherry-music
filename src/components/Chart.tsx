"use client";
import BubbleChart from "@/components/BubbleChart/BubbleChart";
import TopTracks from "@/components/TopTracks";
import HorizontalTiles from "@/components/Tile/HorizontalTiles";
import TrackCardsSkeleton from "@/components/TrackCard/TrackCardsSkeleton";
import { lastFmFetcher } from "@/app/api/lastFm/fetcher";
import { fetchCherryMusicTracks } from "@/app/api/cherryMusic/track/service";
import { useEffect, useState } from "react";
import { TrackArrayWithType } from "@/types/itemTypes";
import LoadingSpinner from "./LoadingSpinner";
import { ArtistDetail } from "@/types/lastFmTypes";
import { Track } from "@/lib/server/database.types";
import { SectionTitle } from "@/styles/Section";

function Chart() {
  const [topArtistsDataWithType, setTopArtistsDataWithType] = useState<{
    type: string;
    items: ArtistDetail[];
  }>();
  const [todayTop50, setTodayTop50] = useState<Track[]>();
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
    const fetchTodayTop50 = async () => {
      const data = await fetchCherryMusicTracks({ query: "top", count: 50 });
      setTodayTop50(data);
    };
    const fetchTopTags = async () => {
      const data = await lastFmFetcher.fetchTopTags();
      const dataWithType = {
        type: "hashtag",
        items: data.tags.tag,
      };
      setTagTopAlbumsDataWithType(dataWithType);
    };
    fetchTopArtists();
    fetchTodayTop50();
    fetchTopTags();
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

      <>
        <SectionTitle>{`Today's Top50`}</SectionTitle>
        {todayTop50 ? (
          <TopTracks trackList={todayTop50} />
        ) : (
          <TrackCardsSkeleton />
        )}
      </>

      {tagTopAlbumsDataWithType && (
        <HorizontalTiles
          sectionTitle="Top Tag Albums"
          arr={tagTopAlbumsDataWithType}
          nav
          isHashtag
        />
      )}
    </>
  );
}
export default Chart;
