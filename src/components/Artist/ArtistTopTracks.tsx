import {
  RowSection,
  SectionContainer,
  SectionTitle,
} from "../../styles/Section";
import useDbTracks from "@/hooks/useDbTracks";
import ArtsitPlaylist from "./ArtistPlaylist";
import ArtistTrackCardsSkeleton from "./ArtistTopTrackCardSkeleton";

function ArtistTopTracks({ artist }: { artist: string }) {
  const { isSaved, isLoading, reqTracks } = useDbTracks({
    trackCategory: "artistTopTracks",
    query: "artist-top",
    artist,
  });
  console.log("req", reqTracks);
  return (
    <SectionContainer>
      {!isSaved && isLoading ? (
        <ArtistTrackCardsSkeleton />
      ) : (
        <ArtsitPlaylist playlist={reqTracks.slice(0, 6)} />
      )}
    </SectionContainer>
  );
}
export default ArtistTopTracks;
