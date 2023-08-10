import { ArtistBadges } from "@/styles/Artist/Artist";
import { SectionContainer, SectionTitle } from "@/styles/Section";
import { Artist } from "@/types/trackTypes";
import ArtistBadge from "./ArtistBadge";
import { useRouter } from "next/navigation";

function SimilarArtists({ artists }: { artists: Artist[] }) {
  const router = useRouter();
  if (artists.length === 0) return <></>;

  const handleArtistBadgeClick = (artist: string) => {
    router.push(`/artist/${artist}`);
    return;
  };

  return (
    <SectionContainer>
      <SectionTitle>Fans might also like</SectionTitle>
      <ArtistBadges>
        {artists.slice(0, 5).map((artist) => (
          <ArtistBadge
            artist={artist.name}
            handleArtistBadgeClick={handleArtistBadgeClick}
          />
        ))}
      </ArtistBadges>
    </SectionContainer>
  );
}
export default SimilarArtists;
