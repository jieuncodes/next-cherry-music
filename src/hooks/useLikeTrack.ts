import { supabase } from "@/lib/server/client";
import { Track } from "@/lib/server/database.types";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

interface useLikeTrackProps {
  initialValue?: boolean;
  track: Track;
  user: User | null;
}

function useLikeTrack({
  initialValue = false,
  track,
  user,
}: useLikeTrackProps) {
  const [liked, setLiked] = useState(initialValue);

  useEffect(() => {
    if (user && track) {
      const checkIfLiked = async () => {
        let { data: likes, error } = await supabase
          .from("favoriteTracks")
          .select("*")
          .eq("userId", user.id)
          .eq("trackYoutubeId", track.youtubeId || "");

        if (error) {
          console.error("Error fetching like status:", error);
        } else if (likes && likes.length > 0) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      };

      checkIfLiked();
    }
  }, [user, track]);

  const toggleLike = () => {
    if (!user) {
      window.alert("You need to be logged in to like a track");
      return;
    }
    setLiked((prevLiked) => {
      if (prevLiked) {
        user && unlikeTrack();
      } else {
        user && likeTrack();
      }

      return !prevLiked;
    });
  };

  const likeTrack = async () => {
    if (!user || !track.youtubeId) return;
    const { data, error } = await supabase
      .from("favoriteTracks")
      .insert([
        {
          userId: user.id,
          trackYoutubeId: track.youtubeId as string,
          albumImgUrl: track.albumImgUrl,
          albumTitle: track.albumTitle,
          artist: track.artist,
          key: track.key,
          playCount: track.playCount,
          rank: track.rank,
          tags: track.tags || [],
          trackTitle: track.trackTitle || "",
          updated_at: new Date().toISOString(),
          wiki: track.wiki || "",
        },
      ])
      .select();
    if (error) {
      console.error(error);
      return;
    }
  };
  const unlikeTrack = async () => {
    const { error } = await supabase
      .from("favoriteTracks")
      .delete()
      .eq("userId", user!.id)
      .eq("trackYoutubeId", track.youtubeId || "");

    if (error) {
      console.error("Error unliking track:", error);
      return;
    }
  };

  return { liked, toggleLike };
}

export default useLikeTrack;
