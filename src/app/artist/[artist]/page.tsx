"use client";

import { useEffect, useState } from "react";

function Artist({ params }: { params: { artist: string } }) {
  const [artistData, setArtistData] = useState(null);

  const fetchArtistData = async () => {
    const response = await fetch(`/api/lastFm/artist?artist=${params.artist}`);
    const data = await response.json();
    console.log("data", data);
  };

  useEffect(() => {
    fetchArtistData();
  }, [params.artist]);

  if (!artistData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{params.artist}</h1>
    </div>
  );
}
export default Artist;
