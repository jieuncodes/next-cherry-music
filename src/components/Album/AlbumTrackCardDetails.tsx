import { CardDetails } from "@/styles/TrackCard";
import { Database } from "@/lib/server/database.types";
import { useRouter } from "next/navigation";
import { TrackTitle } from "@/styles/Album/album";

interface TrackCardDetailsProps {
  isCardHover: boolean;
  track: Database["public"]["Tables"]["tracks"]["Row"];
  size?: "small" | "medium" | "large";
  isPlayingTrack?: boolean;
}

function AlbumTrackCardDetails({
  isCardHover,
  track,
  isPlayingTrack,
}: TrackCardDetailsProps) {
  const router = useRouter();
  return (
    <CardDetails>
      <TrackTitle
        className={`${isCardHover || isPlayingTrack ? "text-white" : ""} `}
      >
        {track.trackTitle}
      </TrackTitle>
    </CardDetails>
  );
}

export default AlbumTrackCardDetails;
