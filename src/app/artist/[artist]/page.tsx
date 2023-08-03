"use client";

import { LastFmArtistInfo } from "@/types/trackTypes";
import { useEffect, useState } from "react";

function Artist({ params }: { params: { artist: string } }) {
  const [artistData, setArtistData] = useState<LastFmArtistInfo>();
  const [artistImageUrl, setAritstImageUrl] = useState<string>("");

  const fetchSpotifyArtistData = async (artistName: string): Promise<void> => {
    console.log("fetch");
    const tokenResponse = await fetch(
      "https://open.spotify.com/get_access_token?reason=transport&productType=web_player"
    );
    const tokenData = await tokenResponse.json();
    const token = tokenData.accessToken;
    console.log("token", tokenData);
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
    });

    const response = await fetch(
      `https://api.spotify.com/v1/search?type=artist&q=${artistName}&decorate_restrictions=false&best_match=true&include_external=audio&limit=1`,
      { headers }
    );
    const data = await response.json();

    if (
      data.artists &&
      data.artists.items.length > 0 &&
      data.artists.items[0].images.length > 0
    ) {
      setAritstImageUrl(data.artists.items[0].images[0].url);
    }
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
    fetchLastFmArtistData();
    fetchSpotifyArtistData(params.artist);
  }, [params.artist]);

  if (!artistData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={artistImageUrl} alt={artistData.name} />
      <h1>{params.artist}</h1>
    </div>
  );
}
export default Artist;
