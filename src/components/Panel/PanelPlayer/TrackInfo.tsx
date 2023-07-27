import Marquee from "@/animations/marquee";
import { Artist, TrackDetails } from "@/styles/Panel/PanelPlayer";

interface TrackInfoProps {
  trackTitle: string;
  artist: string;
}

function TrackInfo({ trackTitle, artist }: TrackInfoProps) {
  return (
    <TrackDetails>
      <Marquee
        trackTitleText={trackTitle || "⬅︎ Play the music by clicking the card!"}
        largeTitle={true}
        isBlack={true}
      />

      <Artist>{artist || "ARTIST"}</Artist>
    </TrackDetails>
  );
}
export default TrackInfo;
