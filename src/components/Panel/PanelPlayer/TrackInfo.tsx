import Marquee from "@/animations/marquee";
import { TrackDetails } from "@/styles/Panel/PanelPlayer";
import { Artist } from "@/styles/TrackCard";

const track = {
  trackTitle: "⬅︎ Play the music by clicking the card!",
  artist: "ARTIST",
};
function TrackInfo() {
  return (
    <TrackDetails>
      <Marquee
        trackTitleText={track.trackTitle}
        largeTitle={true}
        isBlack={true}
      />

      <Artist>{track.artist}</Artist>
    </TrackDetails>
  );
}
export default TrackInfo;
