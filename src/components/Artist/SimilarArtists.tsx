import { ArtistBadges } from "@/styles/Artist/Artist";
import { SectionContainer, SectionTitle } from "@/styles/Section";
import { Artist } from "@/types/trackTypes";
import ArtistBadge from "./ArtistBadge";

function SimilarArtists({ artists }: { artists: Artist[] }) {
  return (
    <SectionContainer>
      <SectionTitle>Fans might also like</SectionTitle>
      <ArtistBadges>
        {artists.map((artist) => (
          <ArtistBadge artist={artist.name} />
        ))}
      </ArtistBadges>
    </SectionContainer>
  );
}
export default SimilarArtists;
