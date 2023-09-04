import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Dispatch, SetStateAction } from "react";
import { Database, likeArtistData } from "../server/database.types";

interface subscribeToUserFavoriteTracksProps {
  userId: string;
  setUserFavoriteArtists: Dispatch<SetStateAction<likeArtistData[]>>;
}

const supabase = createClientComponentClient<Database>();

export const fetchUserFavoriteArtists = async (
  userId: string
): Promise<likeArtistData[]> => {
  let { data: favorites } = await supabase
    .from("favoriteArtists")
    .select("*")
    .eq("userId", userId);

  return favorites || [];
};
