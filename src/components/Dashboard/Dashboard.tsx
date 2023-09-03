"use client";

import { currPlayingTrackYoutubeId } from "@/atoms";
import { Database, LikeTrackData, Track } from "@/lib/server/database.types";
import { ColSection, RowSection, SectionTitle } from "@/styles/Section";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import LongPlaylistCard from "../LongTrackCards/LongPlaylistCard";
import LongTrackCardsSkeleton from "../LongTrackCards/LongTrackCardsSkeleton";
import { PlaylistGrid } from "@/styles/Artist/ArtistPlaylist";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

function Dashboard() {
  const user = useUser();
  console.log("user", user);
  const [userFavorites, setUserFavorites] = useState<Track[]>([]);
  const playingTrack = useRecoilValue(currPlayingTrackYoutubeId);
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const getUserFavorites = async () => {
    if (!user) return;

    let { data: favorites, error } = await supabase
      .from("like")
      .select("*")
      .eq("userId", user.id);

    console.log("favorites", favorites);

    const favoritesArr: Track[] = (favorites || []).map(
      (likeTrackData: LikeTrackData) => ({
        albumImgUrl: likeTrackData.albumImgUrl,
        albumTitle: likeTrackData.albumTitle,
        artist: likeTrackData.artist,
        id: likeTrackData.id,
        key: likeTrackData.key,
        playCount: likeTrackData.playCount,
        rank: likeTrackData.rank,
        tags: likeTrackData.tags,
        trackTitle: likeTrackData.trackTitle,
        updated_at: likeTrackData.updated_at,
        wiki: likeTrackData.wiki,
        youtubeId: likeTrackData.trackYoutubeId,
      })
    );
    if (error) {
      console.log("error", error);
      return;
    }
    setUserFavorites(favoritesArr || []);
  };
  useEffect(() => {
    if (!user) return;

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
            router.refresh();
            console.log("payload.new", payload.new);
            setUserFavorites((prev) => [...prev, payload.new as Track]);
          }
        }
      )
      .subscribe();
    getUserFavorites();

    return () => {
      supabase.removeChannel(likeChannel);
    };
  }, [supabase, router, userFavorites]);

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
