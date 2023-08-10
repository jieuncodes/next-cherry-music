import Marquee from "@/animations/marquee";
import { Database } from "@/lib/server/database.types";
import { cn } from "@/lib/utils";
import {
  AlbumTitle,
  Artist,
  CardDetails,
  TrackTitle,
} from "@/styles/Artist/ArtistTrackCard";

interface ArtistPlaylistCardDetailsProps {
  isCardHover: boolean;
  track: Database["public"]["Tables"]["tracks"]["Row"];
  size?: "small" | "medium" | "large";
  onPlaylist?: boolean;
  isPlayingTrack?: boolean;
}

function ArtistPlaylistCardDetails({
  isCardHover,
  track,
  onPlaylist,
  isPlayingTrack,
}: ArtistPlaylistCardDetailsProps) {
  const trackInfoClassNames = `${
    isCardHover || isPlayingTrack ? "text-white/70" : ""
  } ${onPlaylist ? "text-xs -ml-2 -mt-[3px]" : ""}`;

  return (
    <CardDetails>
      {track.trackTitle &&
      track.trackTitle.length > 20 &&
      (isCardHover || isPlayingTrack) ? (
        <Marquee trackTitleText={track.trackTitle} onPlaylist={onPlaylist} />
      ) : (
        <TrackTitle className={trackInfoClassNames}>
          {track.trackTitle}
        </TrackTitle>
      )}
      <Artist className={trackInfoClassNames}>{track.artist}</Artist>
      <AlbumTitle className={trackInfoClassNames}>
        <span className="block overflow-hidden text-ellipsis max-w-full">
          {track.albumTitle || "single"}
        </span>{" "}
      </AlbumTitle>
    </CardDetails>
  );
}

export default ArtistPlaylistCardDetails;
