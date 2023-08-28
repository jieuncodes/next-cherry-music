"use client";

import { useEffect, useState, Suspense } from "react";
import TopTracks from "./TopTracks";
import { Track } from "@/lib/server/database.types";
import { fetchCherryMusicTracks } from "@/app/api/cherryMusic/track/service";
import { SectionTitle } from "@/styles/Section";

interface TopTracksContainerProps {
  todayTop20?: Track[];
}

function TopTracksContainer({ todayTop20 }: TopTracksContainerProps) {
  const [topTracks, setTopTracks] = useState<Track[]>([]);

  useEffect(() => {
    setTopTracks(todayTop20 || []);
    const fetchAdditionalTracks = async () => {
      const additionalTracks = await fetchCherryMusicTracks({
        query: "top",
        offset: todayTop20 ? todayTop20.length : 0,
        count: 50,
      });
      setTopTracks((prevTracks) => [...prevTracks, ...additionalTracks]);
    };

    fetchAdditionalTracks();
  }, []);

  return (
    <>
      <SectionTitle>Today Top50</SectionTitle>
      <TopTracks trackList={topTracks} count={50} />;
    </>
  );
}
export default TopTracksContainer;
