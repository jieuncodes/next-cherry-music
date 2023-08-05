"use client";

import LikeButton from "@/components/Btns/LikeButton";
import {
  ArtistDesc,
  ArtistInfo,
  ArtistName,
  BlurredGradient,
  HeaderImg,
  PlayAllBtn,
} from "@/styles/Artist";
import { LastFmArtistInfo } from "@/types/trackTypes";
import Image from "next/image";
import { useEffect, useState } from "react";

function Artist({ params }: { params: { artist: string } }) {
  const [artistData, setArtistData] = useState<LastFmArtistInfo>();
  const [artistImageUrl, setAritstImageUrl] = useState<string>("");
  const [liked, setLiked] = useState<boolean>(false);

  const fetchArtistData = async (): Promise<LastFmArtistInfo | undefined> => {
    const response = await fetch(`/api/lastFm/artist?artist=${params.artist}`);

    if (!response.ok) {
      console.log("error");
    }

    const data: LastFmArtistInfo = await response.json();
    return data;
  };

  const fetchSpotifyImage = async (artist: string) => {
    const response = await fetch(`/api/spotify/artist?artist=${artist}`);
    const data = await response.json();
    setAritstImageUrl(data.best_match.items[0].images[0].url);
  };

  const fetchLastFmArtistData = async () => {
    const artistData = await fetchArtistData();
    setArtistData(artistData);
  };

  useEffect(() => {
    console.log("artistData", artistData);
    fetchLastFmArtistData();
    fetchSpotifyImage(params.artist);
  }, [params.artist]);

  if (!artistData) {
    return <div>Loading...</div>;
  }
  console.log("artist", artistData);
  return (
    <>
      <HeaderImg>
        <Image
          src={artistImageUrl}
          alt={artistData.artist.name}
          fill
          sizes="(min-width: 808px) 50vw, 100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center 40%",
          }}
          priority
        />
        <BlurredGradient />
      </HeaderImg>
      <ArtistInfo>
        <ArtistName>{artistData.artist.name}</ArtistName>
        <ArtistDesc>{artistData.artist.bio?.summary}</ArtistDesc>
        <PlayAllBtn>Play All</PlayAllBtn>
        <LikeButton liked={liked} setLiked={setLiked} iconColor="black" />
      </ArtistInfo>
    </>
  );
}
export default Artist;
