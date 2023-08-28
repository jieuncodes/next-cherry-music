"use client";
import { fetchCherryMusicTracks } from "@/app/api/cherryMusic/track/service";
import { PlaylistGrid } from "@/styles/Panel/PlaylistCard";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { currPlayingTrackYoutubeId } from "../../atoms";
import ArtistPlaylistCard from "./ArtistPlaylistCard";
import ArtistTrackCardsSkeleton from "./ArtistTopTrackCardSkeleton";
import { Track } from "@/lib/server/database.types";

export function ArtistPlaylistCards({ artist }: { artist: string }) {
  const playingTrack = useRecoilValue(currPlayingTrackYoutubeId);
  const [artistTopTracks, setArtistTopTracks] = useState<Track[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCherryMusicTracks({
        query: "artisttop",
        artist,
      });
      setArtistTopTracks(data);
    };

    fetchData();
  }, [artist]);

  return (
    <PlaylistGrid>
      {artistTopTracks ? (
        artistTopTracks
          .slice(0, 6)
          .map((track: Track, index: number) => (
            <ArtistPlaylistCard
              key={index}
              track={track}
              index={index}
              isPlayingTrack={track.youtubeId === playingTrack}
            />
          ))
      ) : (
        <ArtistTrackCardsSkeleton />
      )}
    </PlaylistGrid>
  );
}
