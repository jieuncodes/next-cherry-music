"use client";

import LikeButton from "@/components/Btns/LikeButton";
import { truncateString } from "@/lib/utils";
import {
  ArtistDesc,
  ArtistInfo,
  ArtistName,
  BlurredGradient,
  Buttons,
  Desc,
  HeaderImg,
} from "@/styles/Artist";
import { LastFmArtistInfo } from "@/types/trackTypes";
import { Button } from "@nextui-org/react";
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
    console.log("artistData", artistData?.artist);
    fetchLastFmArtistData();
    fetchSpotifyImage(params.artist);
  }, [params.artist]);

  if (!artistData) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <HeaderImg>
        <Image
          src={artistImageUrl || "/images/default_band.png"}
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
        <ArtistDesc>
          <Desc>{truncateString(artistData.artist.bio?.summary, 200)}</Desc>
        </ArtistDesc>
        <Buttons>
          <Button variant="flat">Play All</Button>
          <LikeButton liked={liked} setLiked={setLiked} iconColor="black" />
        </Buttons>
      </ArtistInfo>
    </>
  );
}
export default Artist;
