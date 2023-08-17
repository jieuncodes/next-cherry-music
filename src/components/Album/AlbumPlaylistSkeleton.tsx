import { StyledCard, StyledHeader, TrackTitle } from "@/styles/Album/album";
import { Skeleton } from "@nextui-org/react";
import AlbumTrackCardDetails from "./AlbumTrackCardDetails";

function AlbumPlaylistSkeleton() {
  return (
    <div className="relative top-72">
      <div className="grid grid-cols gap-1">
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <StyledCard>
              <StyledHeader>
                <Skeleton className="ml-6 h-4 w-4 rounded-lg pb-2" />
                <Skeleton className="ml-8 h-4 w-72 rounded-lg pb-2" />
              </StyledHeader>
            </StyledCard>
          ))}
      </div>
    </div>
  );
}
export default AlbumPlaylistSkeleton;
