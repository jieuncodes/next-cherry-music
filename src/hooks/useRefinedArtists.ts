import { lastFmFetcher } from "@/app/api/lastFm/fetcher";
import { getSpotifyArtistImg } from "@/app/api/spotify/service";
import { Artist, ArtistDetail, SimilarArtists } from "@/types/trackTypes";
import { useEffect, useState } from "react";

function useRefinedSimilarArtists(centerArtist: ArtistDetail | undefined) {
  const [refinedSimilarArtists, setRefinedSimilarArtists] = useState<
    ArtistDetail[]
  >([]);

  useEffect(() => {
    if (!centerArtist) return;
    const getRefinedArtists = async () => {
      const similarArtists: SimilarArtists =
        await lastFmFetcher.fetchSimilarArtists(centerArtist.name);
      const refinedSimilarArtists = await refineSimilarArtistTypeToArtistDetail(
        similarArtists
      );
      const combiedSimilarArtists = [centerArtist, ...refinedSimilarArtists];
      setRefinedSimilarArtists(combiedSimilarArtists);
    };
    getRefinedArtists();
  }, [centerArtist]);

  return { refinedSimilarArtists };
}
export default useRefinedSimilarArtists;

const refineSimilarArtistTypeToArtistDetail = async (
  similarArtists: SimilarArtists
) => {
  const RANGE = 15;
  const arr = similarArtists.similarartists.artist.slice(0, RANGE);
  const refinedSimilarArtists = await Promise.all(
    arr.map(async (artist: Artist) => {
      const artistData = await lastFmFetcher.fetchArtistInfo(artist.name);
      const artistImg = await getSpotifyArtistImg(artist.name);
      return {
        name: artistData.artist.name,
        playcount: artistData.artist.stats?.playcount,
        listeners: artistData.artist.stats?.listeners,
        mbid: artistData.artist.mbid || "",
        url: artistData.artist.url,
        image: artistImg || "images/default_band.png",
        streamable: artistData.streamable,
      };
    })
  );
  return refinedSimilarArtists;
};
