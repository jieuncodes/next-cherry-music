"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Artist({ params }: { params: { artist: string } }) {
  // console.log("params", params.artist);
  // const [artistData, setArtistData] = useState(null);
  // const router = useRouter();
  // console.log("router", router);
  // //   const artistName = router.query.artist;

  // const fetchArtistData = async () => {
  //   const response = await fetch(`/api/lastFm/artist?artist=${artistName}`);
  //   const data = await response.json();
  //   console.log("data");
  // };

  // useEffect(() => {
  //   if (artistName) {
  //     console.log("artistName", artistName);

  //     fetchArtistData();
  //   }
  // }, [artistName]);

  // if (!artistData) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <h1>page</h1>
    </div>
  );
}
export default Artist;
