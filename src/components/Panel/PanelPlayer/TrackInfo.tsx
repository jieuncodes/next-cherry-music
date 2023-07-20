import Marquee from "@/animations/marquee";
import { TrackDetails } from "@/styles/Panel/PanelPlayer";
import { Artist } from "@/styles/TrackCard";

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
