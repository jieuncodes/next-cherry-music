import { Track } from "@/lib/server/database.types";
import { RowSection, SectionTitle } from "@/styles/Section";
import ArtistPlaylistCards from "./ArtistPlaylistCards";

function ArtsitPlaylist({ playlist }: { playlist: Track[] }) {
  return (
    <>
      <RowSection>
        <SectionTitle>Popular</SectionTitle>
        <ArtistPlaylistCards playlist={playlist} />
      </RowSection>
    </>
  );
}
export default ArtsitPlaylist;
