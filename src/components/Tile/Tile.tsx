"use client";

import Image from "next/image";
import TileSkeleton from "./TileSkeleton";
import { SliderItemProps } from "@/types/itemTypes";

interface TileProps {
  item: SliderItemProps;
  isCircle?: boolean;
  handleTileClick: (artist: string) => void;
  artistImgUrl?: string;
  isHashtag?: boolean;
}

function Tile({
  item,
  isCircle,
  handleTileClick,
  artistImgUrl,
  isHashtag,
}: TileProps) {
  if (!artistImgUrl) {
    return <TileSkeleton isCircle={isCircle} withNameBelow={isHashtag} />;
  }
  return (
    <div
      className={`flex flex-col justify-start align-middle items-center hover:cursor-pointer snap-start ${
        isCircle ? "h-52 gap-1" : ""
      }${isHashtag && " justify-center text-center "}`}
      onClick={() => handleTileClick(item.name)}
    >
      <div
        className={`${
          isCircle ? "rounded-full h-28 w-28" : "rounded-md h-40 w-40"
        } overflow-hidden bg-cover aspect-square`}
      >
        <Image
          className={`${isHashtag && "opacity-70 hover:opacity-100"}`}
          src={artistImgUrl}
          width={isCircle ? 120 : 170}
          height={isCircle ? 120 : 170}
          alt={`${item} image`}
          placeholder="blur"
          loading="lazy"
          blurDataURL="/images/default_user_avatar.jpeg"
        />
      </div>
      <span
        className={`${
          isHashtag
            ? "absolute text-white text-xl font-extrabold text-stroke-black "
            : "mt-1 text-black/70 whitespace-nowrap truncate"
        }  font-semibold mt-2 text-md  ${
          isCircle ? "w-28 text-center" : "w-40 "
        }`}
      >
        {item.name}
      </span>
      {item.artist && (
        <span
          className={`whitespace-nowrap font-semibold text-sm truncate w-40 mt-1 text-black/70`}
        >
          {item.artist.name}
        </span>
      )}
    </div>
  );
}
export default Tile;
