import { Track } from "@/lib/server/database.types";
import { SectionContainer } from "../../styles/Section";
import ArtsitPlaylist from "./ArtistPlaylist";
import ArtistTrackCardsSkeleton from "./ArtistTopTrackCardSkeleton";
import { Suspense } from "react";

function ArtistTopTracks({ tracks }: { tracks: Track[] }) {
  return (
    <SectionContainer className="mb-12">
      <Suspense fallback={<ArtistTrackCardsSkeleton />}>
        <ArtsitPlaylist playlist={tracks.slice(0, 6)} />
      </Suspense>
    </SectionContainer>
  );
}
export default ArtistTopTracks;
