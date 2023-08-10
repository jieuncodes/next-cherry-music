import { StyledCard } from "@/styles/Artist/ArtistPlaylist";
import { RowSection, SectionTitle } from "@/styles/Section";
import { Skeleton } from "@nextui-org/react";

function ArtistTrackCardsSkeleton() {
  return (
    <>
      <RowSection>
        <SectionTitle>Popular</SectionTitle>
        <div className="grid grid-cols gap-1">
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <StyledCard className="flex flex-row pl-2 rounded-lg">
                <div className="grid grid-cols-[1.7fr_15fr_3fr] pt-2 w-full">
                  <Skeleton className="relative flex rounded-md w-10 h-9" />
                  <div className="grid grid-cols-[2.4fr_1fr_2fr] gap-2 place-content-center mb-2">
                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                    <Skeleton className="h-3 w-6/5 rounded-lg" />
                    <Skeleton className="h-3 w-8/5 rounded-lg" />
                  </div>
                  <div>{""}</div>
                </div>
              </StyledCard>
            ))}
        </div>
      </RowSection>
    </>
  );
}
export default ArtistTrackCardsSkeleton;
