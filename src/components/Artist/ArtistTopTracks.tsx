import { SectionContainer } from "../../styles/Section";
import ArtsitPlaylist from "./ArtistPlaylist";

function ArtistTopTracks({ artist }: { artist: string }) {
  return (
    <SectionContainer className="mb-12">
      <ArtsitPlaylist artist={artist} />
    </SectionContainer>
  );
}
export default ArtistTopTracks;
