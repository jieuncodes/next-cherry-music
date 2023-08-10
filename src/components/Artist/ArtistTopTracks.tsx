import { SectionContainer, SectionTitle } from "../../styles/Section";
import useDbTracks from "@/hooks/useDbTracks";
import ArtsitPlaylist from "./ArtistPlaylist";

function ArtistTopTracks({ artist }: { artist: string }) {
  const { isSaved, isLoading, reqTracks } = useDbTracks({
    trackCategory: "artistTopTracks",
    query: "artist-top",
    artist,
  });
  return (
    <SectionContainer>
      {!isSaved && isLoading ? <></> : <ArtsitPlaylist playlist={reqTracks} />}
    </SectionContainer>
  );
}
export default ArtistTopTracks;
