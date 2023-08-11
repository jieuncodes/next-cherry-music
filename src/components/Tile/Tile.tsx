import { useArtistImage } from "@/hooks/useArtistImage";
import Image from "next/image";
import TileSkeleton from "./TileSkeleton";
import { ItemProps } from "./HorizontalTiles";

interface TileProps {
  item: ItemProps;
  isCircle?: boolean;
  handleTileClick: (artist: string) => void;
}

function Tile({ item, isCircle, handleTileClick }: TileProps) {
  const imgUrl = useArtistImage(item.name);

  if (!imgUrl) {
    return <TileSkeleton isCircle={isCircle} />;
  }

  return (
    <div
      className={`flex flex-col justify-start align-middle  items-center hover:cursor-pointer snap-start ${
        isCircle ? "h-52 gap-1" : ""
      }`}
      onClick={() => handleTileClick(item.name)}
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
        className={`whitespace-nowrap font-semibold mt-2 text-md truncate ${
          isCircle ? "w-28 text-center" : "w-40 "
        }`}
      >
        {item.name}
      </span>
      {item.artist && (
        <span className="whitespace-nowrap font-semibold text-sm truncate w-40 mt-1 text-black/40">
          {item.artist.name}
        </span>
      )}
    </div>
  );
}
export default Tile;
