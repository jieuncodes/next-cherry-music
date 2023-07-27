import Marquee from "@/animations/marquee";
import { Artist, TrackDetails, TrackTitle } from "@/styles/Panel/PanelPlayer";

interface TrackInfoProps {
  trackTitle: string;
  artist: string;
}

function TrackInfo({ trackTitle, artist }: TrackInfoProps) {
  return (
    <TrackDetails>
      {trackTitle.length > 20 ? (
        <Marquee
          trackTitleText={
            trackTitle || "⬅︎ Play the music by clicking the card!"
          }
          largeTitle={true}
          isBlack={true}
        />
      ) : (
        <TrackTitle>{trackTitle}</TrackTitle>
      )}

      <Artist>{artist || "ARTIST"}</Artist>
    </TrackDetails>
  );
}
export default TrackInfo;
