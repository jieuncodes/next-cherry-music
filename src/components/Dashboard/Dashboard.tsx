"use client";

import { currPlayingTrackYoutubeId } from "@/atoms";
import { Database, Track } from "@/lib/server/database.types";

import { PlaylistGrid } from "@/styles/Artist/ArtistPlaylist";
import { ColSection, SectionTitle } from "@/styles/Section";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import LongPlaylistCard from "../LongTrackCards/LongPlaylistCard";
import LongTrackCardsSkeleton from "../LongTrackCards/LongTrackCardsSkeleton";
import {
  fetchUserFavoriteTracks,
  subscribeToUserFavoriteTracks,
} from "@/lib/utils/favoriteTracks";

function Dashboard() {
  const user = useUser();
  const [userFavorites, setUserFavorites] = useState<Track[]>([]);
  const playingTrack = useRecoilValue(currPlayingTrackYoutubeId);
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const favorites = await fetchUserFavoriteTracks(user.id);
      setUserFavorites(favorites);
    };

    subscribeToUserFavoriteTracks({ userId: user.id, setUserFavorites });
    const likeChannel = supabase
      .channel("custom-filter-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "like",
          filter: `userId=eq.${user.id}`,
        },
        (payload) => {
          console.log("change received!", payload);
          if (payload.new) {
            console.log("payload.new", payload.new);
            setUserFavorites((prev) => [...prev, payload.new as Track]);
          }
        }
      )
      .subscribe();

    fetchData();

    return () => {
      supabase.removeChannel(likeChannel);
    };
  }, [user, userFavorites]);

  return (
    <>
      {user ? (
        <ColSection>
          <SectionTitle>
            {user ? `${user.user_metadata.name}'s Favorites` : "Dashboard"}
          </SectionTitle>
          <PlaylistGrid>
            {userFavorites ? (
              userFavorites.map((track: Track, index: number) => (
                <LongPlaylistCard
                  key={index}
                  track={track}
                  index={index}
                  isPlayingTrack={track.youtubeId === playingTrack}
                />
              ))
            ) : (
              <LongTrackCardsSkeleton />
            )}
          </PlaylistGrid>
        </ColSection>
      ) : (
        <>
          <div>Login to see Dashboard page</div>
        </>
      )}
    </>
  );
}
export default Dashboard;
