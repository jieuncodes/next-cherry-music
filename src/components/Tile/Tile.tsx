import { useArtistImage } from "@/hooks/useArtistImage";
import Image from "next/image";
import TileSkeleton from "./TileSkeleton";

interface TileProps {
  item: string;
  isCircle?: boolean;
  handleTileClick: (artist: string) => void;
}

function Tile({ item, isCircle, handleTileClick }: TileProps) {
  const imgUrl = useArtistImage(item);

  if (!imgUrl) {
    return <TileSkeleton isCircle={isCircle} />;
  }

  return (
    <div
      className={`flex flex-col justify-start align-middle  items-center hover:cursor-pointer snap-start ${
        isCircle ? "h-52 gap-1" : ""
      }`}
      onClick={() => handleTileClick(item)}
    >
      <div
        className={`${
          isCircle ? "rounded-full h-28 w-28" : "rounded-md h-40 w-40"
        } overflow-hidden bg-cover aspect-square`}
      >
        <Image
          src={imgUrl}
          width={isCircle ? 120 : 170}
          height={isCircle ? 120 : 170}
          alt={`${item} image`}
          placeholder="blur"
          blurDataURL="/images/default_user_avatar.jpeg"
        />
      </div>
      <span
        className={`whitespace-normal font-semibold text-md mt-2 text-center ${
          isCircle ? "w-28" : "w-40 "
        }`}
      >
        {item}
      </span>
    </div>
  );
}
export default Tile;
