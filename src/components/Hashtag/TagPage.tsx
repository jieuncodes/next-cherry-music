"use client";
import { fetchCherryMusicTracks } from "@/app/api/cherryMusic/track/service";

import GradientHeader from "@/components/GradientHeader";
import HorizontalTiles from "@/components/Tile/HorizontalTiles";
import TopTracks from "@/components/TopTracks";
import { CherryTrack, TrackArrayWithType } from "@/types/itemTypes";
import { useEffect, useState } from "react";
import TrackCardSkeleton from "../TrackCard/TrackCardSkeleton";
import TrackCardsSkeleton from "../TrackCard/TrackCardSkeleton";
import { lastFmFetcher } from "../../app/api/lastFm/fetcher";

interface TagPageProps {
  hashtag: string;
  firstArtistImgUrl: string;
}

function TagPage({ hashtag, firstArtistImgUrl }: TagPageProps) {
  const [tagTopAlbums, setTagTopAlbums] = useState<TrackArrayWithType>();
  const [tagTopArtists, setTagTopArtists] = useState<TrackArrayWithType>();
  const [trackList, setTrackList] = useState<CherryTrack[]>();

  useEffect(() => {
    const fetchData = async () => {
      const tagTopAlbumsData = await lastFmFetcher.fetchTagTopAlbums(hashtag);
      const tagTopAlbumsDataWithType = {
        type: "album",
        items: tagTopAlbumsData.albums.album,
      };
      setTagTopAlbums(tagTopAlbumsDataWithType);

      const tagTopArtistsData = await lastFmFetcher.fetchTagTopArtists(hashtag);
      const tagTopArtistsDataWithType = {
        type: "artist",
        items: tagTopArtistsData.topartists.artist,
      };
      setTagTopArtists(tagTopArtistsDataWithType);

      const tagTopTracksData = await fetchCherryMusicTracks({
        query: "tagtop",
        tag: hashtag,
      });
      setTrackList(tagTopTracksData);
    };
    fetchData();
  }, [hashtag]);

  return (
    <div className="flex flex-col gap-6 pt-32">
      <GradientHeader
        imageUrl={firstArtistImgUrl}
        name={`#${hashtag.toUpperCase()}`}
      />

      <h1 className="absolute top-10 text-2xl font-bold">
        # {hashtag.toUpperCase()}
      </h1>
      {tagTopAlbums && (
        <HorizontalTiles sectionTitle="Top Tag Albums" arr={tagTopAlbums} nav />
      )}
      {trackList ? (
        <TopTracks
          title={`Top30 of Tag #${hashtag}`}
          tag={hashtag}
          count={30}
          trackList={trackList}
        />
      ) : (
        <TrackCardsSkeleton />
      )}

      {tagTopArtists && (
        <HorizontalTiles
          sectionTitle="Related Artists"
          arr={tagTopArtists}
          isCircle
          nav
        />
      )}
    </div>
  );
}
export default TagPage;
