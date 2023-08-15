import { Track } from "@/lib/server/database.types";
import { SectionContainer } from "../../styles/Section";
import ArtsitPlaylist from "./ArtistPlaylist";
import ArtistTrackCardsSkeleton from "./ArtistTopTrackCardSkeleton";

function ArtistTopTracks({ tracks }: { tracks: Track[] }) {
  return (
    // <ArtistTrackCardsSkeleton />

    <SectionContainer className="mb-12">
      <ArtsitPlaylist playlist={tracks.slice(0, 6)} />
    </SectionContainer>
  );
}
export default ArtistTopTracks;
