import { useState, useEffect } from "react";
import { getSpotifyArtistImg } from "@/app/api/spotify/service";
import { ArtistDetail } from "@/types/trackTypes";

export const useCenterArtistImage = (centerArtist: ArtistDetail) => {
  const [centerArtistImgUrl, setCenterArtistImgUrl] = useState<string>("");
  const [imgLoading, setImgLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchCenterArtistImgUrl = async () => {
      const centerArtistImage = await getSpotifyArtistImg(centerArtist.name);
      setCenterArtistImgUrl(centerArtistImage);
      setImgLoading(false);
    };
    fetchCenterArtistImgUrl();
  }, [centerArtist]);

  return { centerArtistImgUrl, imgLoading };
};
