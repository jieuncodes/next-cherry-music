import { useEffect, useState } from "react";
import { SectionTitle } from "../../styles/Section";
import PlaylistCards from "../Panel/PanelPlaylist/PlaylistCards";
import { Track } from "@/lib/server/database.types";

function ArtistTopTracks({ artist }: { artist: string }) {
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopTracks = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/lastFm/artist/get-top-tracks?artist=${artist}`
        );
        console.log("res", response);
        if (!response.ok) {
          throw new Error("Failed to fetch top tracks.");
        }

        const data = await response.json();
        setTopTracks(data.toptracks.track);
        console.log("data", data.toptracks.track);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopTracks();
  }, [artist]);

  const topTracksList = () => {};

  return (
    <>
      <SectionTitle>Popular Tracks</SectionTitle>
      <PlaylistCards playlist={topTracksList} />
    </>
  );
}
export default ArtistTopTracks;
