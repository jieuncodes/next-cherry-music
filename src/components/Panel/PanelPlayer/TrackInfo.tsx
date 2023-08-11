import Marquee from "@/animations/marquee";
import { Artist, TrackDetails, TrackTitle } from "@/styles/Panel/PanelPlayer";
import { useRouter } from "next/navigation";

interface TrackInfoProps {
  trackTitle: string;
  artist: string;
}

function TrackInfo({ trackTitle, artist }: TrackInfoProps) {
  const router = useRouter();
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

      <Artist onClick={() => router.push(`/artist/${artist}`)}>
        {artist || "ARTIST"}
      </Artist>
    </TrackDetails>
  );
}
export default TrackInfo;
