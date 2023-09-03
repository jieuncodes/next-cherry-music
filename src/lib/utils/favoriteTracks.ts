import { Database, LikeTrackData, Track } from "@/lib/server/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Dispatch, SetStateAction } from "react";

interface subscribeToUserFavoriteTracksProps {
  userId: string;
  setUserFavorites: Dispatch<SetStateAction<Track[]>>;
}

const supabase = createClientComponentClient<Database>();

export const fetchUserFavoriteTracks = async (
  userId: string
): Promise<Track[]> => {
  let { data: favorites } = await supabase
    .from("like")
    .select("*")
    .eq("userId", userId);

  return (favorites || []).map(transformFavoriteTrackData);
};

const transformFavoriteTrackData = (likeTrackData: LikeTrackData): Track => {
  return {
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
  };
};

export const subscribeToUserFavoriteTracks = ({
  userId,
  setUserFavorites,
}: subscribeToUserFavoriteTracksProps) => {
  const likeChannel = supabase
    .channel("custom-filter-channel")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "like",
        filter: `userId=eq.${userId}`,
      },
      (payload) => {
        if (payload.new) {
          console.log("payload.new", payload.new);
          setUserFavorites((prev) => [...prev, payload.new as Track]);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(likeChannel);
  };
};
