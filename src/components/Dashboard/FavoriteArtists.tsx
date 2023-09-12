import HorizontalTiles from "@/components/Tile/HorizontalTiles";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { fetchUserFavoriteArtists } from "@/lib/utils/favoriteArtsits";
import { LikeArtistData } from "@/lib/server/database.types";
import { ArrWithType } from "@/types/itemTypes";

function FavoriteArtists() {
  const user = useUser();
  const [userFavoriteArtists, setUserFavoriteArtists] =
    useState<ArrWithType<LikeArtistData>>();

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const favorites = await fetchUserFavoriteArtists(user.id);
      const userFavoriteArtistsWithType: ArrWithType<LikeArtistData> = {
        type: "artist",
        items: favorites,
      };
      setUserFavoriteArtists(userFavoriteArtistsWithType);
    };
    fetchData();
  }, []);

  return (
    <>
      {userFavoriteArtists && (
        <HorizontalTiles
          sectionTitle={
            user
              ? `${user.user_metadata.name}'s Favorite Artists`
              : "Your Favorite Artists"
          }
          arr={userFavoriteArtists}
          nav
          isCircle
        />
      )}
    </>
  );
}
export default FavoriteArtists;
