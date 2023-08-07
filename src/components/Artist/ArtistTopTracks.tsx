import { SectionContainer, SectionTitle } from "../../styles/Section";
import PlaylistCards from "../Panel/PanelPlaylist/PlaylistCards";
import useDbTracks from "@/hooks/useDbTracks";

function ArtistTopTracks({ artist }: { artist: string }) {
  const { isSaved, isLoading, reqTracks } = useDbTracks({
    trackCategory: "artistTopTracks",
    query: "artist-top",
    artist,
  });

  return (
    <SectionContainer>
      <SectionTitle>Popular Tracks</SectionTitle>
      {!isSaved && isLoading ? <></> : <PlaylistCards playlist={reqTracks} />}
    </SectionContainer>
  );
}
export default ArtistTopTracks;
