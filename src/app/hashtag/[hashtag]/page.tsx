"use client";

import { fetchTagTopAlbums } from "@/app/api/lastFm/tag/services";
import { Track } from "@/lib/server/database.types";
import { useEffect, useState } from "react";
import HorizontalTiles from "@/components/Tile/HorizontalTiles";

function HashtagPage({ params }: { params: { hashtag: string } }) {
  const [tagTopAlbums, setTagTopAlbums] = useState<Track[]>([]);

  const decodedHashtag = decodeURIComponent(params.hashtag);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTagTopAlbums(params.hashtag);
      setTagTopAlbums(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold"># {decodedHashtag.toUpperCase()}</h1>
      <HorizontalTiles arr={tagTopAlbums} />
      {/* <TopAlbums tagTopAlbums={tagTopAlbums} /> */}
      {/* <ArtistTopTracks artist={params.artist} />
        <ArtistAlbums artist={params.artist} />
      <SimilarArtists artists={artistData.artist.similar.artist} /> */}
      {/* </ArtistInfo> */}
    </>
  );
}

export default HashtagPage;
