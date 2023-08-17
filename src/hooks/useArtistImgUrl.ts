import { useState, useEffect } from "react";
import { fetchSpotifyArtist } from "@/app/api/spotify/service";
import { ItemProps } from "@/types/itemTypes";

const useArtistImgUrl = (items: ItemProps[]) => {
  const [artistImgUrls, setArtistImgUrls] = useState<Map<string, string>>(
    new Map()
  );
  const [loading, setLoading] = useState(
    new Set(items.map((_, index) => index))
  );

  useEffect(() => {
    items.forEach(async (item, index) => {
      try {
        const spotifyArtistData = await fetchSpotifyArtist(item.name);
        const url =
          spotifyArtistData?.best_match?.items[0]?.images[0]?.url ||
          "/images/default_user_avatar.jpeg";

        setArtistImgUrls((prevUrls) => {
          const newUrls = new Map(prevUrls);
          newUrls.set(item.name, url);
          return newUrls;
        });

        setLoading((prevLoading) => {
          const newLoading = new Set(prevLoading);
          newLoading.delete(index);
          return newLoading;
        });
      } catch (error) {
        console.error("Error fetching artist image for", item.name, error);
      }
    });
  }, [items]);

  return { artistImgUrls, loading };
};

export default useArtistImgUrl;
