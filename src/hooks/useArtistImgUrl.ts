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
    const fetchAllArtists = async () => {
      const updatedUrls = new Map(artistImgUrls);
      const updatedLoading = new Set(loading);

      const fetchPromises = items.map(async (item, index) => {
        try {
          const spotifyArtistData = await fetchSpotifyArtist(item.name);
          const url =
            spotifyArtistData?.best_match?.items[0]?.images[0]?.url ||
            "/images/default_user_avatar.jpeg";

          updatedUrls.set(item.name, url);
          updatedLoading.delete(index);
        } catch (error) {
          console.error("Error fetching artist image for", item.name, error);
        }
      });

      await Promise.all(fetchPromises);
      setArtistImgUrls(updatedUrls);
      setLoading(updatedLoading);
    };

    fetchAllArtists();
  }, [items]);

  return { artistImgUrls, loading };
};

export default useArtistImgUrl;
