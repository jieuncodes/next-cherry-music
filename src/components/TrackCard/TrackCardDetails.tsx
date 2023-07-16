import { Artist, TrackTitle, CardDetails } from "@/styles/TrackCard";
import Marquee from "@/animations/marquee";
import { Database } from "@/lib/server/database.types";

interface TrackCardDetailsProps {
  isCardHover: boolean;
  track: Database["public"]["Tables"]["tracks"]["Row"];
}

function TrackCardDetails({ isCardHover, track }: TrackCardDetailsProps) {
  return (
    <CardDetails>
      {track.trackTitle && track.trackTitle.length > 20 && isCardHover ? (
        <Marquee trackTitleText={track.trackTitle} />
      ) : (
        <TrackTitle className={isCardHover ? "text-white" : ""}>
          {track.trackTitle}
        </TrackTitle>
      )}

      <Artist className={isCardHover ? "text-white/70" : ""}>
        {track.artist}
      </Artist>
    </CardDetails>
  );
}

export default TrackCardDetails;
