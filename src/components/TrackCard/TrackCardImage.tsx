import Image from "next/image";
import { Database } from "@/lib/server/database.types";
import { Icons } from "../Icons";
import { TrackImgBox } from "@/styles/TrackCard";

interface TrackCardImageProps {
  isCardHover: boolean;
  track: Database["public"]["Tables"]["tracks"]["Row"];
  size?: "small" | "medium" | "large";
}

function TrackCardImage({ isCardHover, track, size }: TrackCardImageProps) {
  return (
    <TrackImgBox>
      {isCardHover && size !== "small" && (
        <Icons.play
          color="white"
          fill="white"
          size={17}
          className="absolute ml-[0.8rem] mt-[0.7rem] opacity-100 z-10"
        />
      )}
      <Image
        alt="album image"
        className={`object-cover rounded-md box-border ${
          isCardHover ? "opacity-80" : ""
        } ${size === "small" ? "-mt-1" : ""}`}
        src={track.albumImgUrl || ""}
        height={size === "small" ? 36 : 47}
        width={size === "small" ? 36 : 47}
      />
    </TrackImgBox>
  );
}

export default TrackCardImage;
