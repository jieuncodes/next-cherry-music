"use client";

import {
  fetchTagTopAlbums,
  fetchTagTopArtists,
} from "@/app/api/lastFm/tag/services";
import { Track } from "@/lib/server/database.types";
import { useEffect, useState } from "react";
import HorizontalTiles from "@/components/Tile/HorizontalTiles";
import TopTracks from "@/components/TopTracks";
import GradientHeader from "@/components/GradientHeader";
import { useArtistImage } from "@/hooks/useArtistImage";

function HashtagPage({ params }: { params: { hashtag: string } }) {
  const [tagTopAlbums, setTagTopAlbums] = useState<Track[]>([]);
  const [tagTopArtists, setTagTopArtists] = useState<Track[]>([]);
  const [firstArtistName, setFirstArtistName] = useState<string>("");
  const decodedHashtag = decodeURIComponent(params.hashtag);
  const firstArtistImgUrl = useArtistImage(firstArtistName);

  const fetchTagTopAlbumsData = async () => {
    const data = await fetchTagTopAlbums(params.hashtag);
    setTagTopAlbums(data);
  };
  const fetchTagTopArtistsData = async () => {
    const data = await fetchTagTopArtists(params.hashtag);
    setFirstArtistName(data[0].name);
    setTagTopArtists(data);
  };

  useEffect(() => {
    fetchTagTopAlbumsData();
    fetchTagTopArtistsData();
  }, []);

  const tagTopAlbumsDataWithType = { type: "album", items: tagTopAlbums };
  const tagTopArtistsDataWithType = { type: "artist", items: tagTopArtists };
  return (
    <div className="flex flex-col gap-6 pt-32">
      <GradientHeader
        imageUrl={firstArtistImgUrl}
        name={`#${decodedHashtag.toUpperCase()}`}
      />

      <h1 className="absolute top-10 text-2xl font-bold">
        # {decodedHashtag.toUpperCase()}
      </h1>
      <HorizontalTiles
        sectionTitle="Top Tag Albums"
        arr={tagTopAlbumsDataWithType}
        nav
      />

      <TopTracks
        title={`Top30 of Tag #${decodedHashtag}`}
        trackCategory="tagTopTracks"
        query="tag-top"
        tag={params.hashtag}
        count={30}
      />

      <HorizontalTiles
        sectionTitle="Related Artists"
        arr={tagTopArtistsDataWithType}
        isCircle
        nav
      />
    </div>
  );
}

export default HashtagPage;
