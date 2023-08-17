import { RowSection, SectionTitle } from "@/styles/Section";
import { ArtistPlaylistCards } from "./ArtistPlaylistCards";

function ArtsitPlaylist({ artist }: { artist: string }) {
  return (
    <>
      <RowSection>
        <SectionTitle>Popular</SectionTitle>
        <ArtistPlaylistCards artist={artist} />
      </RowSection>
    </>
  );
}
export default ArtsitPlaylist;
