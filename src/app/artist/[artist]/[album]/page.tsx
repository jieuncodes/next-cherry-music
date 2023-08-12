"use client";

import { fetchAlbumInfo } from "@/app/api/lastFm/service";
import GradientHeader from "@/components/GradientHeader";
import { Track } from "@/lib/server/database.types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Album({ params }: { params: string }) {
  const [albumInfo, setAlbumInfo] = useState<Track[]>();
  console.log("params", params);
  // useEffect(() => {
  //   const getAlbumInfo = async () => {
  //     const albumInfo = await fetchAlbumInfo({
  //       album: params.album,
  //       artist: params.artist,
  //     });
  //     console.log("!!!!!", albumInfo);
  //     setAlbumInfo(albumInfo);
  //   };
  //   getAlbumInfo();
  // }, []);

  return (
    <>
      <GradientHeader imageUrl={""} name={""} />
    </>
  );
}

export default Album;
