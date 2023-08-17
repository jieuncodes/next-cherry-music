"use client";
import { Track } from "@/lib/server/database.types";
import { PlaylistGrid } from "@/styles/Panel/PlaylistCard";
import { useRecoilValue } from "recoil";
import { currPlayingTrackYoutubeId } from "../../atoms";
import ArtistPlaylistCard from "./ArtistPlaylistCard";
import { Suspense } from "react";
import ArtistTrackCardsSkeleton from "./ArtistTopTrackCardSkeleton";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchCherryMusicTracks } from "@/app/api/cherryMusic/track/service";

export function ArtistPlaylistCards({ artist }: { artist: string }) {
  const playingTrack = useRecoilValue(currPlayingTrackYoutubeId);

  const artistTopTracks = async () =>
    await fetchCherryMusicTracks({
      query: "artisttop",
      artist,
    });

  const { data: tracks } = useSuspenseQuery({
    queryKey: ["artistTopTracks", artist],
    queryFn: () => artistTopTracks(),
  });

  return (
    <PlaylistGrid>
      <Suspense fallback={<ArtistTrackCardsSkeleton />}>
        {tracks &&
          tracks.map((track: Track, index: number) => (
            <ArtistPlaylistCard
              key={index}
              track={track}
              index={index}
              isPlayingTrack={track.youtubeId === playingTrack}
            />
          ))}
      </Suspense>
    </PlaylistGrid>
  );
}
