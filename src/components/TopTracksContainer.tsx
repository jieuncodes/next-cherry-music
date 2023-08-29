"use client";

import { useEffect, useState, Suspense } from "react";
import TopTracks from "./TopTracks";
import { Track } from "@/lib/server/database.types";
import { fetchCherryMusicTracks } from "@/app/api/cherryMusic/track/service";
import { SectionTitle } from "@/styles/Section";

interface TopTracksContainerProps {
  query: "top" | "koreatop" | "ustop" | "colombiatop";
  top20?: Track[];
}

function TopTracksContainer({ query, top20 }: TopTracksContainerProps) {
  const [topTracks, setTopTracks] = useState<Track[]>([]);

  useEffect(() => {
    setTopTracks(top20 || []);
    const fetchAdditionalTracks = async () => {
      const additionalTracks = await fetchCherryMusicTracks({
        query,
        offset: top20 ? top20.length : 0,
        count: 50,
      });
      setTopTracks((prevTracks) => [...prevTracks, ...additionalTracks]);
    };

    fetchAdditionalTracks();
  }, []);

  return (
    <>
      <SectionTitle>{`Today's Top50`}</SectionTitle>
      <TopTracks trackList={topTracks} count={50} />
    </>
  );
}
export default TopTracksContainer;
