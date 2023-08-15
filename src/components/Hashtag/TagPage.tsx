import HorizontalTiles from "@/components/Tile/HorizontalTiles";
import TopTracks from "@/components/TopTracks";
import GradientHeader from "@/components/GradientHeader";
import { Track } from "@/lib/server/database.types";

interface TagPageProps {
  hashtag: string;
  tagTopAlbums: { type: string; items: Track[] };
  tagTopArtists: { type: string; items: Track[] };
  firstArtistImgUrl: string;
  tagTopTracks: Track[];
}

function TagPage({
  hashtag,
  tagTopAlbums,
  tagTopArtists,
  firstArtistImgUrl,
  tagTopTracks,
}: TagPageProps) {
  return (
    <div className="flex flex-col gap-6 pt-32">
      <GradientHeader
        imageUrl={firstArtistImgUrl}
        name={`#${hashtag.toUpperCase()}`}
      />

      <h1 className="absolute top-10 text-2xl font-bold">
        # {hashtag.toUpperCase()}
      </h1>
      <HorizontalTiles sectionTitle="Top Tag Albums" arr={tagTopAlbums} nav />

      <TopTracks
        title={`Top30 of Tag #${hashtag}`}
        tag={hashtag}
        count={30}
        trackList={tagTopTracks}
      />

      <HorizontalTiles
        sectionTitle="Related Artists"
        arr={tagTopArtists}
        isCircle
        nav
      />
    </div>
  );
}
export default TagPage;
