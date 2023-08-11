import { Artist, TrackTitle, CardDetails } from "@/styles/TrackCard";
import Marquee from "@/animations/marquee";
import { Database } from "@/lib/server/database.types";
import { useRouter } from "next/navigation";

interface TrackCardDetailsProps {
  isCardHover: boolean;
  track: Database["public"]["Tables"]["tracks"]["Row"];
  size?: "small" | "medium" | "large";
  onPlaylist?: boolean;
  isPlayingTrack?: boolean;
}

function TrackCardDetails({
  isCardHover,
  track,
  onPlaylist,
  isPlayingTrack,
}: TrackCardDetailsProps) {
  const router = useRouter();
  return (
    <CardDetails>
      {track.trackTitle &&
      track.trackTitle.length > 20 &&
      (isCardHover || isPlayingTrack) ? (
        <Marquee trackTitleText={track.trackTitle} onPlaylist={onPlaylist} />
      ) : (
        <TrackTitle
          className={`${isCardHover || isPlayingTrack ? "text-white" : ""} ${
            onPlaylist ? "text-xs -mb-[2px] -ml-2 -mt-[3px] w-full" : ""
          }`}
        >
          {track.trackTitle}
        </TrackTitle>
      )}
      <Artist
        onClick={() => router.push(`/artist/${track.artist}`)}
        className={`${isCardHover || isPlayingTrack ? "text-white/70" : ""} ${
          onPlaylist ? "text-xs -ml-2 -mt-[3px]" : ""
        }`}
      >
        {track.artist}
      </Artist>
    </CardDetails>
  );
}

export default TrackCardDetails;
