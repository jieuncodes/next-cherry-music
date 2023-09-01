import { Track } from "@/lib/server/database.types";
import {
  AlbumCoverBox,
  AlbumCoverImg,
  Artist,
  Title,
  TrackInfoBox,
} from "@/styles/PlayBar";

function PlayBarTrackInfo({ track }: { track: Track }) {
  return (
    <TrackInfoBox>
      <AlbumCoverBox>
        <AlbumCoverImg
          src={track.albumImgUrl || "/images/default_album_img.png"}
        />
      </AlbumCoverBox>
      <Title>{track.trackTitle}</Title>
      <Artist>
        {track.artist}
        {track.albumTitle ? ` • ${track.albumTitle}` : ""}
      </Artist>
    </TrackInfoBox>
  );
}

export default PlayBarTrackInfo;
