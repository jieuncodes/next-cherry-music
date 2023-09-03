import Marquee from "@/animations/marquee";
import { Track } from "@/lib/server/database.types";
import { AlbumTitleSpan } from "@/styles/Artist/Artist";
import {
  AlbumTitle,
  Artist,
  CardDetails,
  TrackTitle,
} from "@/styles/Artist/ArtistTrackCard";
import { useRouter } from "next/navigation";

interface LongPlaylistCardDetailsProps {
  isCardHover: boolean;
  track: Track;
  size?: "small" | "medium" | "large";
  onPlaylist?: boolean;
  isPlayingTrack?: boolean;
}

function LongPlaylistCardDetails({
  isCardHover,
  track,
  onPlaylist,
  isPlayingTrack,
}: LongPlaylistCardDetailsProps) {
  const router = useRouter();

  const trackInfoClassNames = `${
    isCardHover || isPlayingTrack ? "text-white/70" : ""
  } ${onPlaylist ? "text-xs -ml-2 -mt-[3px]" : ""}`;

  const handleAlbumTitleClick = () => {
    if (!track.albumTitle || !track.artist) return;
    router.push(
      `/artist/${encodeURIComponent(track.artist)}/${encodeURIComponent(
        track.albumTitle
      )}`
    );
  };

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
      <AlbumTitle
        className={trackInfoClassNames}
        onClick={track.albumTitle ? handleAlbumTitleClick : undefined}
      >
        <AlbumTitleSpan>{track.albumTitle || "single"}</AlbumTitleSpan>
      </AlbumTitle>
    </CardDetails>
  );
}

export default LongPlaylistCardDetails;
