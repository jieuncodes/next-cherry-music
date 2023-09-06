"use client";

import useArtistImgUrl from "@/hooks/useArtistImgUrl";
import { Tiles } from "@/styles/Artist/Artist";
import { SectionGridContainer, SectionTitle } from "@/styles/Section";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SectionNavigator from "../SectionNavigator";
import Tile from "./Tile";
import TileSkeleton from "./TileSkeleton";
import { SliderItemProps, arrWithType } from "@/types/itemTypes";
import useWindowSize from "@/hooks/useWindowSize";

interface HorizontalTilesProps {
  sectionTitle?: string;
  arr: arrWithType;
  isCircle?: boolean;
  nav?: boolean;
  isHashtag?: boolean;
}

function HorizontalTiles({
  sectionTitle,
  arr,
  isCircle,
  nav,
  isHashtag,
}: HorizontalTilesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { artistImgUrls, loading } = useArtistImgUrl(arr.items);
  const router = useRouter();
  const windowSize = useWindowSize();
  const handleTileClick = ({
    albumArtist,
    name,
  }: {
    albumArtist?: string;
    name: string;
  }) => {
    router.push(
      albumArtist ? `/artist/${albumArtist}/${name}` : `/${arr.type}/${name}}`
    );
  };
  const [isOverFlow, setIsOverFlow] = useState(true);

  useEffect(() => {
    const refSize = ref.current?.getBoundingClientRect();
    if (refSize) {
      setIsOverFlow(refSize.width > windowSize.width - 500);
    }
  }, [windowSize, ref]);

  return (
    <SectionGridContainer>
      {nav && isOverFlow && (
        <SectionNavigator refContainer={ref} scrollAmount={650} />
      )}
      <SectionTitle>{sectionTitle}</SectionTitle>
      <Tiles
        ref={ref}
        className={`${!isOverFlow ? "w-fit" : "w-full"} ${
          nav ? "gap-3" : "w-fit gap-10"
        } ${isCircle ? "gap-5" : ""} snap-x row-start-2 col-start-1 col-span-2`}
      >
        {arr.items
          .slice(0, arr.items.length)
          .map((item: SliderItemProps, index) =>
            loading.has(index) ? (
              <TileSkeleton key={index} isCircle={isCircle} />
            ) : (
              <Tile
                key={index}
                item={item}
                handleTileClick={() =>
                  handleTileClick({
                    name: item.name,
                    albumArtist: item.artist?.name,
                  })
                }
                isCircle={isCircle}
                artistImgUrl={artistImgUrls.get(item.name!)}
                isHashtag={isHashtag}
              />
            )
          )}
      </Tiles>
    </SectionGridContainer>
  );
}

export default HorizontalTiles;
