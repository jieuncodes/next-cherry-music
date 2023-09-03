import { StyledCard } from "@/styles/Artist/ArtistPlaylist";
import { Skeleton } from "@nextui-org/react";

function LongTrackCardsSkeleton() {
  return (
    <>
      {Array(6)
        .fill(null)
        .map((_, index) => (
          <StyledCard key={index} className="flex flex-row pl-2 rounded-lg">
            <div className="grid grid-cols-[1.7fr_15fr_3fr] pt-2 w-full">
              <Skeleton className="relative flex rounded-md w-9 h-8" />
              <div className="grid grid-cols-[2.4fr_1fr_2fr] gap-2 place-content-center mb-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-6/5 rounded-lg" />
                <Skeleton className="h-3 w-8/5 rounded-lg" />
              </div>
              <div>{""}</div>
            </div>
          </StyledCard>
        ))}
    </>
  );
}
export default LongTrackCardsSkeleton;
