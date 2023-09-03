import { supabase } from "@/lib/server/client";
import { Artist } from "@/types/lastFmTypes";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { lastFmFetcher } from "../app/api/lastFm/fetcher";

interface useLikeArtistProps {
  initialValue?: boolean;
  artistName: string | null;
  user: User | null;
}

function useLikeArtist({
  initialValue = false,
  artistName,
  user,
}: useLikeArtistProps) {
  const [liked, setLiked] = useState(initialValue);
  const [artist, setArtist] = useState<Artist | null>(null);

  const getArtistInfo = async (artistName: string) => {
    const artistInfo = await lastFmFetcher.fetchArtistInfo(artistName);
    setArtist(artistInfo.artist);
  };

  useEffect(() => {
    if (!artistName) return;
    getArtistInfo(artistName);
  }, [artistName]);

  useEffect(() => {
    if (user && artist) {
      const checkIfLiked = async () => {
        let { data: likes, error } = await supabase
          .from("favoriteArtists")
          .select("*")
          .eq("userId", user.id)
          .eq("url", artist.url || "");

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
  }, [user, artist]);

  const toggleLike = () => {
    if (!user) {
      window.alert("You need to be logged in to like a track");
      return;
    }
    setLiked((prevLiked) => {
      if (prevLiked) {
        user && unlikeArtist();
      } else {
        user && likeArtist();
      }

      return !prevLiked;
    });
  };

  const likeArtist = async () => {
    if (!user || !artist) return;
    const { data, error } = await supabase
      .from("favoriteArtists")
      .insert([
        {
          userId: user.id,
          name: artist.name,
          mbid: artist.mbid,
          url: artist.url,
          tags: artist.tags?.tag || [],
        },
      ])
      .select();

    if (error) {
      console.error(error);
      return;
    }
  };
  const unlikeArtist = async () => {
    if (!user || !artist) return;

    const { error } = await supabase
      .from("favoriteArtists")
      .delete()
      .eq("userId", user!.id)
      .eq("name", artist.name || "");

    if (error) {
      console.error("Error unliking track:", error);
      return;
    }
  };

  return { liked, toggleLike };
}

export default useLikeArtist;
