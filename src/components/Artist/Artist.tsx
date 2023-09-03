"use client";

import { lastFmFetcher } from "@/app/api/lastFm/fetcher";
import ArtistTopTracks from "@/components/Artist/ArtistTopTracks";
import LikeButton from "@/components/Btns/LikeButton";
import GradientHeader from "@/components/GradientHeader";
import Hashtags from "@/components/Hashtags";
import LoadingSpinner from "@/components/LoadingSpinner";
import HorizontalTiles from "@/components/Tile/HorizontalTiles";
import { cleanedStr, truncateString } from "@/lib/utils/utils";
import {
  ArtistDesc,
  ArtistInfo,
  ArtistInfoHeader,
  ArtistName,
  ArtistNameArea,
  Desc,
} from "@/styles/Artist/Artist";
import { LastFmArtistInfo } from "@/types/lastFmTypes";
import { useEffect, useState } from "react";

interface ArtistProps {
  artist: string;
  artistImgUrl: string;
}

function Artist({ artist, artistImgUrl }: ArtistProps) {
  const [liked, setLiked] = useState<boolean>(false);
  const [artistData, setArtistData] = useState<LastFmArtistInfo | null>(null);

  useEffect(() => {
    const getLastFmArtist = async () => {
      const artistInfo = await lastFmFetcher.fetchArtistInfo(artist);
      setArtistData(artistInfo);
    };
    getLastFmArtist();
  }, [artist]);

  const cleanedArtistBio = cleanedStr(artistData?.artist?.bio?.summary || "");

  const similarArtistDataWithType = {
    type: "artist",
    items: artistData?.artist.similar.artist || [],
  };

  if (!artistData) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <GradientHeader imageUrl={artistImgUrl} name={artistData.artist.name} />
      <ArtistInfo>
        <ArtistInfoHeader>
          <ArtistNameArea>
            <ArtistName>{artistData.artist.name}</ArtistName>
            <LikeButton liked={liked} setLiked={setLiked} iconColor="black" />
          </ArtistNameArea>

          <Hashtags tags={artistData.artist.tags.tag} />
        </ArtistInfoHeader>

        {cleanedArtistBio.length !== 1 && (
          <ArtistDesc>
            <Desc>{truncateString(cleanedArtistBio, 200)}</Desc>
          </ArtistDesc>
        )}
        <ArtistTopTracks artist={artistData.artist.name} />
        {/* <ArtistAlbums artist={params.artist} /> */}
        <HorizontalTiles
          sectionTitle="Fans might also like"
          arr={similarArtistDataWithType}
          isCircle
        />
      </ArtistInfo>
    </>
  );
}
export default Artist;
