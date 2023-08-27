import { CardDetails } from "@/styles/TrackCard";
import { useRouter } from "next/navigation";
import { TrackTitle } from "@/styles/Album/album";
import { CherryTrack } from "@/types/itemTypes";

interface TrackCardDetailsProps {
  isCardHover: boolean;
  track: CherryTrack;
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
