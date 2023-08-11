import useDbTracks from "@/hooks/useDbTracks";
import { SectionContainer } from "../../styles/Section";
import ArtsitPlaylist from "./ArtistPlaylist";
import ArtistTrackCardsSkeleton from "./ArtistTopTrackCardSkeleton";

function ArtistTopTracks({ artist }: { artist: string }) {
  const { isSaved, isLoading, reqTracks } = useDbTracks({
    trackCategory: "artistTopTracks",
    query: "artist-top",
    artist,
  });
  return (
    <SectionContainer className="mb-12">
      {!isSaved && isLoading ? (
        <ArtistTrackCardsSkeleton />
      ) : (
        <ArtsitPlaylist playlist={reqTracks.slice(0, 6)} />
      )}
    </SectionContainer>
  );
}
export default ArtistTopTracks;
