import { useEffect, useState } from "react";
import { SectionTitle } from "../../styles/Section";
import PlaylistCards from "../Panel/PanelPlaylist/PlaylistCards";
import { Track } from "@/lib/server/database.types";

function ArtistTopTracks({ artist }: { artist: string }) {
  const [artistTopTrackList, setArtistTopTrackList] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopTracks = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/cherryMusic/track?artist=${artist}&query=artist-top`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch top tracks.");
        }

        const data = await response.json();

        setArtistTopTrackList(data.allTrackDetailsWithYoutube);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopTracks();
  }, []);

  return (
    <>
      <SectionTitle>Popular Tracks</SectionTitle>
      <PlaylistCards playlist={artistTopTrackList} />
    </>
  );
}
export default ArtistTopTracks;
