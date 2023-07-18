import Image from "next/image";
import { Database } from "@/lib/server/database.types";
import { Icons } from "../Icons";
import { TrackImgBox } from "@/styles/TrackCard";
import { addToQueue } from "@/handlers";

interface TrackCardImageProps {
  isCardHover: boolean;
  track: Database["public"]["Tables"]["tracks"]["Row"];
}

function TrackCardImage({ isCardHover, track }: TrackCardImageProps) {
  return (
    <TrackImgBox onClick={addToQueue}>
      {isCardHover && (
        <Icons.play
          color="white"
          fill="white"
          size={17}
          className="absolute ml-[0.8rem] mt-[0.7rem] opacity-100 z-10"
        />
      )}
      <Image
        alt="album image"
        className={`object-cover rounded-md ${isCardHover ? "opacity-80" : ""}`}
        src={track.albumImgUrl || ""}
        height={47}
        width={47}
      />
    </TrackImgBox>
  );
}

export default TrackCardImage;
