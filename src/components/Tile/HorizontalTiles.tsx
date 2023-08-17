"use client";

import { Tiles } from "@/styles/Artist/Artist";
import { SectionContainer, SectionTitle } from "@/styles/Section";
import { useRouter } from "next/navigation";
import Tile from "./Tile";
import SectionNavigator from "../SectionNavigator";
import { useEffect, useRef, useState } from "react";
import { fetchSpotifyArtist } from "@/app/api/spotify/service";

interface HorizontalTilesProps {
  sectionTitle?: string;
  arr: { type: string; items: any[] };
  isCircle?: boolean;
  nav?: boolean;
}
export interface ItemProps {
  name: string;
  artist?: { name: string };
}

function HorizontalTiles({
  sectionTitle,
  arr,
  isCircle,
  nav,
}: HorizontalTilesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [artistImgUrls, setArtistImgUrls] = useState<Map<string, string>>(
    new Map()
  );

  if (arr.items.length === 0) return <></>;

  const handleTileClick = (name: string) => {
    router.push(`/${arr.type}/${name}`);
    return;
  };

  const getArtistImgUrl = async (name: string) => {
    console.log("getArtistImgUrl");
    try {
      const spotifyArtistData = await fetchSpotifyArtist(name);
      console.log("spotifyArtistData", spotifyArtistData);
      const url =
        spotifyArtistData?.best_match?.items[0]?.images[0]?.url ||
        "/images/default_user_avatar.jpeg";
      console.log("url***", url);
      setArtistImgUrls((prevUrls) => {
        const newUrls = new Map(prevUrls);
        newUrls.set(name, url);
        return newUrls;
      });
    } catch (error) {
      console.error("Error fetching artist image for", name, error);
    }
  };

  useEffect(() => {
    arr.items.forEach((item) => {
      console.log("item", item);
      getArtistImgUrl(item.name);
    });
  }, [arr.items]);

  return (
    <SectionContainer>
      {nav && <SectionNavigator refContainer={ref} scrollAmount={650} />}
      <SectionTitle>{sectionTitle}</SectionTitle>
      <Tiles
        ref={ref}
        className={`snap-x ${nav ? "gap-3" : "w-fit gap-10"} ${
          isCircle ? "gap-5" : ""
        }`}
      >
        {arr.items
          .slice(0, arr.items.length - 1)
          .map((item: ItemProps, index) => (
            <Tile
              key={index}
              item={item}
              handleTileClick={() => handleTileClick(item.name)}
              isCircle={isCircle}
              artistImgUrl={artistImgUrls.get(item.name!)}
            />
          ))}
      </Tiles>
    </SectionContainer>
  );
}
export default HorizontalTiles;
