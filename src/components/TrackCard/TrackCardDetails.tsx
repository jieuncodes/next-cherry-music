import { Artist, TrackTitle, CardDetails } from "@/styles/TrackCard";
import Marquee from "@/animations/marquee";
import { Database } from "@/lib/server/database.types";

interface TrackCardDetailsProps {
  isCardHover: boolean;
  track: Database["public"]["Tables"]["tracks"]["Row"];
  size?: "small" | "medium" | "large";
}

function TrackCardDetails({ isCardHover, track, size }: TrackCardDetailsProps) {
  return (
    <CardDetails>
      {track.trackTitle && track.trackTitle.length > 20 && isCardHover ? (
        <Marquee trackTitleText={track.trackTitle} />
      ) : (
        <TrackTitle
          className={`${isCardHover ? "text-white" : ""} ${
            size === "small" ? "text-xs -mb-[2px] -ml-2 -mt-[3px]" : ""
          }`}
        >
          {track.trackTitle}
        </TrackTitle>
      )}
      <Artist
        className={`${isCardHover ? "text-white/70" : ""} ${
          size === "small" ? "text-xs -ml-2 -mt-[3px]" : ""
        }`}
      >
        {track.artist}
      </Artist>
    </CardDetails>
  );
}

export default TrackCardDetails;
