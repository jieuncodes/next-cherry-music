import { SectionContainerMain } from "@/styles/Section";
import ArtsitPlaylist from "./ArtistPlaylist";

function ArtistTopTracks({ artist }: { artist: string }) {
  return (
    <SectionContainerMain className="mb-12">
      <ArtsitPlaylist artist={artist} />
    </SectionContainerMain>
  );
}
export default ArtistTopTracks;
