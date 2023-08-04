"use client";

import { LastFmArtistInfo } from "@/types/trackTypes";
import { useEffect, useState } from "react";

function Artist({ params }: { params: { artist: string } }) {
  const [artistData, setArtistData] = useState<LastFmArtistInfo>();
  const [artistImageUrl, setAritstImageUrl] = useState<string>("");

  const fetchSpotifyImage = async (artist: string) => {
    const response = await fetch(`/api/spotify/artist?artist=${artist}`);
    const data = await response.json();
    setAritstImageUrl(data.best_match.items[0].images[0].url);
  };

  const fetchArtistData = async (): Promise<LastFmArtistInfo | undefined> => {
    const response = await fetch(`/api/lastFm/artist?artist=${params.artist}`);
    const data: LastFmArtistInfo = await response.json();
    return data;
  };

  const fetchLastFmArtistData = async () => {
    const artistData = await fetchArtistData();
    setArtistData(artistData);
  };

  useEffect(() => {
    console.log("artistData", artistData);
    fetchLastFmArtistData();
    fetchSpotifyImage(params.artist);
  }, [params.artist]);

  if (!artistData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={artistImageUrl} alt={artistData.name} />
      <h1>{params.artist}</h1>
      <p className="overflow-ellipsis">{artistData.artist.bio?.summary}</p>
      <button>shuffle</button>
      <button>heart icon</button>
    </div>
  );
}
export default Artist;
