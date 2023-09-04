import HorizontalTiles from "@/components/Tile/HorizontalTiles";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { fetchUserFavoriteArtists } from "@/lib/utils/favoriteArtsits";
import { likeArtistData } from "@/lib/server/database.types";
import { arrWithType } from "@/types/itemTypes";

function FavoriteArtists() {
  const user = useUser();
  const [userFavoriteArtists, setUserFavoriteArtists] = useState<arrWithType>();

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const favorites = await fetchUserFavoriteArtists(user.id);
      console.log("favorites", favorites);
      const userFavoriteArtistsWithType: arrWithType = {
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
