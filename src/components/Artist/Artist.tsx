"use client";

import { lastFmFetcher } from "@/app/api/lastFm/fetcher";
import ArtistTopTracks from "@/components/Artist/ArtistTopTracks";
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
import LikeArtistBtn from "../Btns/LikeArtistBtn";
import { useUser } from "@supabase/auth-helpers-react";

interface ArtistProps {
  artistName: string;
  artistImgUrl: string;
}

function Artist({ artistName, artistImgUrl }: ArtistProps) {
  const [artistData, setArtistData] = useState<LastFmArtistInfo | null>(null);
  const user = useUser();

  useEffect(() => {
    const getLastFmArtist = async () => {
      const artistInfo = await lastFmFetcher.fetchArtistInfo(artistName);
      setArtistData(artistInfo);
    };
    getLastFmArtist();
  }, [artistName]);

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
            <LikeArtistBtn user={user} artistName={artistName} isBlack />
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
