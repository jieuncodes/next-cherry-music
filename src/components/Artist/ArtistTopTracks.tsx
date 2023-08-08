import { SectionContainer, SectionTitle } from "../../styles/Section";
import useDbTracks from "@/hooks/useDbTracks";
import Playlist from "../Playlist/Playlist";

function ArtistTopTracks({ artist }: { artist: string }) {
  const { isSaved, isLoading, reqTracks } = useDbTracks({
    trackCategory: "artistTopTracks",
    query: "artist-top",
    artist,
  });

  return (
    <SectionContainer>
      <SectionTitle>Popular Tracks</SectionTitle>
      {!isSaved && isLoading ? <></> : <Playlist playlist={reqTracks} />}
    </SectionContainer>
  );
}
export default ArtistTopTracks;
