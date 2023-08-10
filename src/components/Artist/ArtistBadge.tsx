import { useArtistImage } from "@/hooks/useArtistImage";
import Image from "next/image";

interface ArtistBadgeProps {
  artist: string;
  handleArtistBadgeClick: (artist: string) => void;
}

function ArtistBadge({ artist, handleArtistBadgeClick }: ArtistBadgeProps) {
  const imgUrl = useArtistImage(artist);
  return (
    <div
      className="flex flex-col justify-center align-middle  items-center hover:cursor-pointer"
      onClick={() => handleArtistBadgeClick(artist)}
    >
      <div className="rounded-full h-28 w-28 overflow-hidden bg-cover">
        <Image src={imgUrl} width={120} height={120} alt={`${artist} image`} />
      </div>
      <span className="font-semibold text-md mt-2">{artist}</span>
    </div>
  );
}
export default ArtistBadge;
